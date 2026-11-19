import { beforeEach, describe, expect, it, vi } from "vitest";

import { BOOKS } from "../src/books.js";
import { OWNER_WHATSAPP_NUMBER } from "../src/config.js";
import { filterBooks } from "../src/filters.js";
import {
  buildWhatsAppUrl,
  MAX_COVER_BYTES,
  normalizeProduct,
  normalizeWhatsAppNumber,
  toInternationalWhatsAppNumber,
  validateCoverFile,
} from "../src/products.js";
import {
  loadProducts,
  MAX_PRODUCTS,
  MAX_STORAGE_CHARS,
  saveProducts,
  STORAGE_KEY,
} from "../src/store.js";

// localStorage tiruan di memori: cukup untuk menguji store.js tanpa jsdom.
const memory = new Map();
beforeEach(() => {
  memory.clear();
  vi.stubGlobal("localStorage", {
    getItem: (key) => (memory.has(key) ? memory.get(key) : null),
    setItem: (key, value) => memory.set(key, String(value)),
    removeItem: (key) => memory.delete(key),
    clear: () => memory.clear(),
  });
});

const bukuValid = (overrides = {}) => ({
  id: "bk-test",
  nama: "Buku Uji Coba",
  kategori: "Fiksi",
  harga: 50000,
  stok: 3,
  sinopsis: "Sinopsis yang cukup panjang untuk diuji.",
  deskripsi: "Deskripsi yang cukup panjang untuk keperluan pengujian.",
  imageUrl: "covers/contoh.svg",
  unggulan: false,
  ...overrides,
});

const payloadTypeConfusion = () => ({
  id: "x-security",
  nama: {},
  kategori: "Fiksi",
  harga: [],
  stok: [],
  sinopsis: {},
  deskripsi: {},
  imageUrl: "covers/a.svg",
  unggulan: false,
});

const nama = (daftar) => daftar.map((item) => item.nama);

describe("filterBooks — pencarian, filter, dan sorting", () => {
  it("1. Rekomendasi mengutamakan 3 buku unggulan secara A–Z", () => {
    const hasil = filterBooks(BOOKS);
    expect(hasil).toHaveLength(8);
    expect(nama(hasil).slice(0, 3)).toEqual([
      "Berpikir Cepat, Berpikir Pelan",
      "Kebiasaan Kecil, Dampak Besar",
      "Laut yang Bercerita",
    ]);
  });

  it("2. Pencarian case-insensitive pada judul, sinopsis, dan deskripsi", () => {
    expect(nama(filterBooks(BOOKS, { query: "ALGORITMA" }))).toEqual([
      "Algoritma untuk Pemula",
    ]);
    expect(nama(filterBooks(BOOKS, { query: "tenang" }))).toEqual([
      "Teras Filsafat Senja",
    ]);
    expect(nama(filterBooks(BOOKS, { query: "SURAT" }))).toEqual([
      "Laut yang Bercerita",
    ]);
  });

  it("3. Kategori, stok, dan sorting harga bekerja bersamaan", () => {
    expect(
      nama(
        filterBooks(BOOKS, {
          kategori: "Fiksi",
          stok: "Tersedia",
          sort: "Harga Terendah",
        }),
      ),
    ).toEqual(["Lima Menara di Negeri Angin", "Laut yang Bercerita"]);
  });

  it("4. Sorting Harga Tertinggi dan Nama A–Z", () => {
    expect(filterBooks(BOOKS, { sort: "Harga Tertinggi" })[0].nama).toBe(
      "Berpikir Cepat, Berpikir Pelan",
    );
    expect(filterBooks(BOOKS, { sort: "Nama A-Z" })[0].nama).toBe(
      "Algoritma untuk Pemula",
    );
  });

  it("5. Hasil kosong dan input tidak dimutasi", () => {
    const sebelum = BOOKS.map((item) => item.id).join(",");
    expect(filterBooks(BOOKS, { query: "tidak-ada" })).toEqual([]);
    expect(BOOKS.map((item) => item.id).join(",")).toBe(sebelum);
  });
});

describe("normalizeProduct — validasi buku (kasus batas)", () => {
  it("6. Menerima harga 0 dan stok 0", () => {
    const { errors } = normalizeProduct(bukuValid({ harga: 0, stok: 0 }));
    expect(errors).toEqual({});
  });

  it("7. Menolak harga negatif dan stok desimal", () => {
    const { errors } = normalizeProduct(bukuValid({ harga: -1, stok: 1.5 }));
    expect(errors.harga).toBeDefined();
    expect(errors.stok).toBeDefined();
  });

  it("8. Menolak harga melebihi batas 15 digit", () => {
    const { errors } = normalizeProduct(bukuValid({ harga: 1000000000000000 }));
    expect(errors.harga).toBeDefined();
  });

  it("9. Menolak kategori tak valid dan nama kurang dari 3 karakter", () => {
    const { errors } = normalizeProduct(
      bukuValid({ kategori: "Fantasi", nama: "ab" }),
    );
    expect(errors.kategori).toBeDefined();
    expect(errors.nama).toBeDefined();
  });

  it("10. Menolak sinopsis pendek dan path sampul bukan lokal", () => {
    const { errors } = normalizeProduct(
      bukuValid({ sinopsis: "pendek", imageUrl: "https://contoh/gambar.png" }),
    );
    expect(errors.sinopsis).toBeDefined();
    expect(errors.imageUrl).toBeDefined();
  });
});

describe("buildWhatsAppUrl — validasi nomor dan isi pesan", () => {
  it("11. Menerima format internasional dengan spasi, tanda +, dan tanda baca", () => {
    for (const nomor of [
      "6283115706432",
      "+62 831-1570-6432",
      "(62) 831.1570.6432",
    ]) {
      expect(normalizeWhatsAppNumber(nomor)).toBe("6283115706432");
    }
  });

  it("12. Validator ketat tetap menolak format lokal, huruf, dan panjang di luar E.164", () => {
    for (const nomor of [
      "0800000000000",
      "083115706432",
      "abc",
      "+62abc",
      "123",
      "6283115706432000000",
      "",
    ]) {
      expect(() => normalizeWhatsAppNumber(nomor)).toThrow();
    }
  });

  it("13. Pesan memuat judul, kategori, Rupiah, stok, dan ter-encode", () => {
    const url = buildWhatsAppUrl(OWNER_WHATSAPP_NUMBER, BOOKS[0]);
    expect(url.startsWith("https://wa.me/6283115706432?text=")).toBe(true);

    const pesan = decodeURIComponent(url.split("?text=")[1]);
    for (const bagian of [
      "Laut yang Bercerita",
      "Fiksi",
      "Rp78.000",
      "Stok tersedia: 12",
    ]) {
      expect(pesan).toContain(bagian);
    }

    const habis = decodeURIComponent(
      buildWhatsAppUrl(OWNER_WHATSAPP_NUMBER, BOOKS[3]).split("?text=")[1],
    );
    expect(habis).toContain("Stok habis");
  });
});

describe("loadProducts — parser localStorage", () => {
  it("14. Storage kosong diisi 8 data contoh", () => {
    const hasil = loadProducts();
    expect(hasil.products).toHaveLength(8);
    expect(hasil.notice).toBeNull();
    expect(JSON.parse(memory.get(STORAGE_KEY))).toHaveLength(8);
  });

  it("15. JSON rusak dikembalikan ke contoh dengan notice corrupt", () => {
    memory.set(STORAGE_KEY, "{ini-json-rusak");
    const hasil = loadProducts();
    expect(hasil.notice).toBe("corrupt");
    expect(hasil.products).toHaveLength(8);
  });

  it("16. Payload valid JSON tetapi bukan array dianggap corrupt", () => {
    memory.set(STORAGE_KEY, '{"nama":"bukan array"}');
    expect(loadProducts().notice).toBe("corrupt");
  });

  it("17. Item dengan kategori tak valid membuat payload corrupt", () => {
    const rusak = structuredClone(BOOKS);
    rusak[0].kategori = "Fantasi";
    memory.set(STORAGE_KEY, JSON.stringify(rusak));
    expect(loadProducts().notice).toBe("corrupt");
  });

  it("18. ID duplikat membuat payload corrupt", () => {
    const rusak = structuredClone(BOOKS);
    rusak[1].id = rusak[0].id;
    memory.set(STORAGE_KEY, JSON.stringify(rusak));
    expect(loadProducts().notice).toBe("corrupt");
  });

  it("19. Payload array valid dibaca utuh tanpa menimpa storage", () => {
    const dua = [bukuValid(), bukuValid({ id: "bk-test-2" })];
    memory.set(STORAGE_KEY, JSON.stringify(dua));

    const hasil = loadProducts();
    expect(hasil.notice).toBeNull();
    expect(hasil.products.map((item) => item.id)).toEqual([
      "bk-test",
      "bk-test-2",
    ]);
    expect(memory.get(STORAGE_KEY)).toBe(JSON.stringify(dua));
  });

  it("20. saveProducts menulis array penuh dan dapat dibaca kembali", () => {
    const tiga = [
      bukuValid(),
      bukuValid({ id: "bk-2" }),
      bukuValid({ id: "bk-3" }),
    ];
    expect(saveProducts(tiga)).toBe(true);
    expect(loadProducts().products.map((item) => item.id)).toEqual([
      "bk-test",
      "bk-2",
      "bk-3",
    ]);
  });
});

describe("security — reproduksi temuan audit terverifikasi", () => {
  it("21. Payload objek/array ditolak normalizeProduct (P1)", () => {
    const { errors } = normalizeProduct(payloadTypeConfusion());
    for (const field of ["nama", "harga", "stok", "sinopsis", "deskripsi"]) {
      expect(errors[field], field).toBeDefined();
    }
  });

  it("22. Payload yang sama membuat loadProducts mengembalikan corrupt (P1)", () => {
    memory.set(STORAGE_KEY, JSON.stringify([payloadTypeConfusion()]));
    const hasil = loadProducts();
    expect(hasil.notice).toBe("corrupt");
    expect(hasil.products).toHaveLength(8);
  });

  it("23. String angka dari form tetap diterima, termasuk nol (P1 regresi)", () => {
    const angka = normalizeProduct(bukuValid({ harga: "78000", stok: "12" }));
    expect(angka.errors).toEqual({});
    expect(angka.product.harga).toBe(78000);
    expect(angka.product.stok).toBe(12);

    const nol = normalizeProduct(bukuValid({ harga: "0", stok: "0" }));
    expect(nol.errors).toEqual({});
    expect(nol.product.harga).toBe(0);
    expect(nol.product.stok).toBe(0);
  });

  it("24. Tipe boolean/objek/array/nomor pada field teks ditolak (P1)", () => {
    for (const field of ["nama", "kategori", "sinopsis", "deskripsi", "imageUrl"]) {
      expect(normalizeProduct(bukuValid({ [field]: 123 })).errors[field], field).toBeDefined();
    }
    for (const field of ["harga", "stok"]) {
      for (const value of [true, false, [], {}, null, undefined, ""]) {
        expect(normalizeProduct(bukuValid({ [field]: value })).errors[field], String(value)).toBeDefined();
      }
    }
  });

  it("25. Batas angka: non-finite dan stok desimal ditolak (P1)", () => {
    expect(normalizeProduct(bukuValid({ harga: "1e309" })).errors.harga).toBeDefined();
    expect(normalizeProduct(bukuValid({ harga: Number.NaN })).errors.harga).toBeDefined();
    expect(normalizeProduct(bukuValid({ harga: Infinity })).errors.harga).toBeDefined();
    expect(normalizeProduct(bukuValid({ stok: "1.5" })).errors.stok).toBeDefined();
  });

  it("26. Array melebihi MAX_PRODUCTS dianggap corrupt (P2)", () => {
    const banyak = Array.from({ length: MAX_PRODUCTS + 1 }, (_, i) =>
      bukuValid({ id: `bk-${i}` }),
    );
    memory.set(STORAGE_KEY, JSON.stringify(banyak));
    const hasil = loadProducts();
    expect(hasil.notice).toBe("corrupt");
    expect(hasil.products).toHaveLength(8);
  });

  it("27. Payload melebihi MAX_STORAGE_CHARS dianggap corrupt (P2)", () => {
    // Field asing diabaikan validator lama, jadi tanpa guard ukuran payload ini lolos.
    const besar = [
      { ...bukuValid(), padding: "x".repeat(MAX_STORAGE_CHARS + 1) },
    ];
    memory.set(STORAGE_KEY, JSON.stringify(besar));
    expect(loadProducts().notice).toBe("corrupt");
  });

  it("28. Tepat MAX_PRODUCTS masih diterima (P2 boundary)", () => {
    const tepat = Array.from({ length: MAX_PRODUCTS }, (_, i) =>
      bukuValid({ id: `bk-${i}` }),
    );
    memory.set(STORAGE_KEY, JSON.stringify(tepat));
    const hasil = loadProducts();
    expect(hasil.notice).toBeNull();
    expect(hasil.products).toHaveLength(MAX_PRODUCTS);
  });
});

describe("konfigurasi WA dan upload sampul", () => {
  const tinyPng =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

  it("29. Nomor lokal 083115706432 dinormalisasi ke 6283115706432", () => {
    expect(OWNER_WHATSAPP_NUMBER).toBe("083115706432");
    expect(toInternationalWhatsAppNumber(OWNER_WHATSAPP_NUMBER)).toBe("6283115706432");
    const url = buildWhatsAppUrl(OWNER_WHATSAPP_NUMBER, BOOKS[0]);
    expect(url.startsWith("https://wa.me/6283115706432?text=")).toBe(true);
  });

  it("30. Validasi file upload: tipe, ukuran maksimal 10 MB, dan file kosong", () => {
    expect(validateCoverFile({ type: "image/png", size: 1024 })).toBeNull();
    expect(validateCoverFile({ type: "image/jpeg", size: MAX_COVER_BYTES })).toBeNull();
    expect(validateCoverFile({ type: "text/plain", size: 100 })).toContain("gambar");
    expect(validateCoverFile({ type: "image/png", size: MAX_COVER_BYTES + 1 })).toContain(
      "10 MB",
    );
    expect(validateCoverFile({ type: "image/png", size: 0 })).toBeDefined();
    expect(validateCoverFile(null)).toBeDefined();
  });

  it("31. normalizeProduct menerima data URL gambar, menolak non-gambar dan yang > 10 MB", () => {
    expect(normalizeProduct(bukuValid({ imageUrl: tinyPng })).errors.imageUrl).toBeUndefined();
    expect(
      normalizeProduct(bukuValid({ imageUrl: "data:text/plain;base64,YQ==" })).errors.imageUrl,
    ).toBeDefined();

    const besar = "data:image/png;base64," + "A".repeat(Math.ceil((MAX_COVER_BYTES + 1) / 3) * 4);
    expect(normalizeProduct(bukuValid({ imageUrl: besar })).errors.imageUrl).toBeDefined();
  });

  it("32. Sampul data URL di localStorage dibaca utuh tanpa mengubah data", () => {
    memory.set(STORAGE_KEY, JSON.stringify([bukuValid({ id: "bk-data", imageUrl: tinyPng })]));
    const hasil = loadProducts();
    expect(hasil.notice).toBeNull();
    expect(hasil.products).toHaveLength(1);
    expect(hasil.products[0].imageUrl).toBe(tinyPng);
  });
});
