// Helper produk. Sumber objek buku ada di books.js; modul ini menjaga kompatibilitas
// dengan store.js, main.js, dan ui.js yang memakai nama SAMPLE_PRODUCTS.

import { BOOKS, CATEGORIES } from "./books.js";

export { BOOKS, CATEGORIES, BOOKS as SAMPLE_PRODUCTS } from "./books.js";
export { DEMO_WHATSAPP_NUMBER, OWNER_WHATSAPP_NUMBER } from "./config.js";

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const MAX_COVER_BYTES = 10 * 1024 * 1024;

export function formatRupiah(value) {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0;
  // Intl menyisipkan spasi tidak terlihat setelah "Rp"; seragamkan ke "Rp78.000".
  return rupiahFormatter.format(amount).replace(/\u00a0/g, "");
}

export function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `bk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function cloneProducts(products = BOOKS) {
  const source = Array.isArray(products) ? products : [];
  return source.map((product) => ({ ...product }));
}

// Hanya string dan angka (atau string angka dari form) yang diterima.
// Objek/array/boolean dari payload JSON tidak boleh berubah jadi "[object Object]" atau 0.
function readString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
  if (typeof value !== "string" || value.trim() === "") return NaN;
  return Number(value);
}

function isLocalCoverPath(value) {
  return /^covers\/[A-Za-z0-9._-]+$/.test(value) && !value.includes("..");
}

function isDataCover(value) {
  const match = /^data:image\/[A-Za-z0-9.+-]+;base64,([A-Za-z0-9+/=]+)$/.exec(value);
  if (!match) return false;
  const base64 = match[1];
  if (base64.length === 0 || base64.length % 4 !== 0) return false;
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  const bytes = (base64.length * 3) / 4 - padding;
  return bytes > 0 && bytes <= MAX_COVER_BYTES;
}

/** Validasi file sebelum dibaca FileReader; dipakai form Kelola Buku. */
export function validateCoverFile(file) {
  if (!file || typeof file !== "object") return "Pilih file gambar terlebih dahulu.";
  if (typeof file.type !== "string" || !file.type.startsWith("image/")) {
    return "File harus berupa gambar (PNG, JPG, WebP, atau SVG).";
  }
  if (!Number.isFinite(file.size) || file.size <= 0) return "File gambar tidak valid.";
  if (file.size > MAX_COVER_BYTES) return "Ukuran gambar maksimal 10 MB.";
  return null;
}

export function normalizeProduct(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const errors = {};

  const nama = readString(source.nama);
  if (nama.length < 3 || nama.length > 80) {
    errors.nama = "Nama harus 3–80 karakter.";
  }

  const kategori = readString(source.kategori);
  if (!CATEGORIES.includes(kategori)) {
    errors.kategori = "Pilih kategori yang tersedia.";
  }

  const harga = readNumber(source.harga);
  if (!Number.isFinite(harga) || harga < 0 || harga > 999999999999999) {
    errors.harga = "Harga harus angka minimal 0.";
  }

  const stok = readNumber(source.stok);
  if (!Number.isInteger(stok) || stok < 0) {
    errors.stok = "Stok harus bilangan bulat minimal 0.";
  }

  const sinopsis = readString(source.sinopsis);
  if (sinopsis.length < 10 || sinopsis.length > 200) {
    errors.sinopsis = "Sinopsis harus 10–200 karakter.";
  }

  const deskripsi = readString(source.deskripsi);
  if (deskripsi.length < 10 || deskripsi.length > 1000) {
    errors.deskripsi = "Deskripsi harus 10–1000 karakter.";
  }

  const imageUrl = readString(source.imageUrl);
  if (!isLocalCoverPath(imageUrl) && !isDataCover(imageUrl)) {
    errors.imageUrl = "Pilih file gambar maksimal 10 MB atau gunakan sampul lokal.";
  }

  const unggulan =
    source.unggulan === true ||
    source.unggulan === "true" ||
    source.unggulan === "on" ||
    source.unggulan === 1;

  const id = typeof source.id === "string" && source.id.trim() ? source.id.trim() : createId();

  return {
    product: {
      id,
      nama,
      kategori,
      harga: errors.harga ? 0 : harga,
      stok: errors.stok ? 0 : stok,
      sinopsis,
      deskripsi,
      imageUrl,
      unggulan,
    },
    errors,
  };
}

/**
 * Validator ketat E.164 untuk format internasional: 628..., +62 800..., atau 62-800...
 * Mengembalikan digit saja, atau melempar TypeError jika tidak valid.
 */
export function normalizeWhatsAppNumber(nomor) {
  const raw = String(nomor ?? "").trim();
  if (!raw) throw new TypeError("Nomor WhatsApp wajib diisi.");

  const cleaned = raw.replace(/[\s().-]/g, "");
  const digits = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;

  if (!/^\d+$/.test(digits)) {
    throw new TypeError("Nomor WhatsApp hanya boleh angka dengan tanda + opsional di depan.");
  }
  if (digits.startsWith("0")) {
    throw new TypeError("Gunakan format internasional, misalnya 6283115706432.");
  }
  if (digits.length < 8 || digits.length > 15) {
    throw new TypeError("Nomor WhatsApp harus 8–15 digit sesuai format E.164.");
  }

  return digits;
}

/**
 * Menerima nomor lokal 08... (konfigurasi toko) atau format internasional.
 * Nomor lokal diubah ke 62... sebelum divalidasi, sehingga tautan wa.me tetap valid.
 */
export function toInternationalWhatsAppNumber(nomor) {
  const cleaned = String(nomor ?? "")
    .trim()
    .replace(/[\s().-]/g, "");
  const withoutPlus = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;

  if (/^0\d+$/.test(withoutPlus)) {
    return normalizeWhatsAppNumber(`62${withoutPlus.slice(1)}`);
  }
  return normalizeWhatsAppNumber(cleaned);
}

/**
 * Menyusun tautan wa.me dari nomor tujuan dan objek buku.
 * Pesan memuat judul, kategori, harga Rupiah, dan informasi stok.
 */
export function buildWhatsAppUrl(nomor, buku) {
  const tujuan = toInternationalWhatsAppNumber(nomor);
  if (!buku || typeof buku !== "object") {
    throw new TypeError("Data buku tidak valid.");
  }

  const judul = String(buku.nama ?? "").trim() || "Buku tanpa nama";
  const kategori = String(buku.kategori ?? "").trim() || "Umum";
  const harga = formatRupiah(buku.harga);
  const stok = Number.isFinite(Number(buku.stok)) ? Number(buku.stok) : 0;
  const stokTeks = stok > 0 ? `Stok tersedia: ${stok}` : "Stok habis";
  const detail = `${judul} (${kategori}, ${harga})`;

  const pesan =
    stok > 0
      ? `Halo Bilik Aksara, saya tertarik dengan buku ${detail}. ${stokTeks}. Apakah bisa dipesan?`
      : `Halo Bilik Aksara, buku ${detail} sedang habis. ${stokTeks}. Kapan tersedia lagi?`;

  return `https://wa.me/${tujuan}?text=${encodeURIComponent(pesan)}`;
}
