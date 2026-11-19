// Data contoh, aturan validasi, dan helper produk untuk Bilik Aksara.

export const CATEGORIES = ["Fiksi", "Non-Fiksi", "Pendidikan", "Komik", "Puisi"];

// Nomor demo, BUKAN nomor pribadi. Ganti sebelum pemakaian produksi.
export const DEMO_WHATSAPP_NUMBER = "6280000000000";

export const SAMPLE_PRODUCTS = [
  {
    id: "bk-01",
    nama: "Laut yang Bercerita",
    kategori: "Fiksi",
    harga: 78000,
    stok: 12,
    sinopsis: "Sebuah perjalanan pulang yang penuh tersirat dan harapan.",
    deskripsi:
      "Cerita tentang persahabatan, janji yang ditunda, dan laut yang menyimpan semua surat.",
    imageUrl: "covers/laut-yang-bercerita.svg",
    unggulan: true,
  },
  {
    id: "bk-02",
    nama: "Lima Menara di Negeri Angin",
    kategori: "Fiksi",
    harga: 65000,
    stok: 8,
    sinopsis: "Lima menara menjadi saksi sebuah perjalanan yang penuh teka-teki.",
    deskripsi:
      "Petualangan seorang pengelana menembus negeri angin untuk mengumpulkan kembali lima menara yang hilang.",
    imageUrl: "covers/lima-menara.svg",
    unggulan: false,
  },
  {
    id: "bk-03",
    nama: "Kebiasaan Kecil, Dampak Besar",
    kategori: "Non-Fiksi",
    harga: 99000,
    stok: 15,
    sinopsis: "Perubahan besar berawal dari langkah kecil yang diulang setiap hari.",
    deskripsi:
      "Panduan praktis membangun kebiasaan baik dengan sistem sederhana dan target yang terukur.",
    imageUrl: "covers/kebiasaan-kecil.svg",
    unggulan: true,
  },
  {
    id: "bk-04",
    nama: "Teras Filsafat Senja",
    kategori: "Non-Fiksi",
    harga: 72000,
    stok: 0,
    sinopsis: "Renungan santai tentang cara hidup tenang di tengah hiruk pikuk.",
    deskripsi:
      "Kumpulan esai ringan yang mengajak pembaca berhenti sejenak dan memaknai hal-hal sederhana.",
    imageUrl: "covers/teras-filsafat-senja.svg",
    unggulan: false,
  },
  {
    id: "bk-05",
    nama: "Algoritma untuk Pemula",
    kategori: "Pendidikan",
    harga: 88000,
    stok: 6,
    sinopsis: "Belajar berpikir terstruktur lewat contoh dan latihan yang ramah pemula.",
    deskripsi:
      "Pengantar algoritma dari dasar hingga studi kasus, disajikan dengan bahasa yang mudah diikuti.",
    imageUrl: "covers/algoritma-pemula.svg",
    unggulan: false,
  },
  {
    id: "bk-06",
    nama: "Puisi di Ujung Hari",
    kategori: "Puisi",
    harga: 55000,
    stok: 9,
    sinopsis: "Barisan puisi pendek yang menemani saat hari mulai pelan dan redup.",
    deskripsi:
      "Antologi sajak tentang kota, senja, dan hal-hal kecil yang sering terlewat dalam keseharian.",
    imageUrl: "covers/puisi-ujung-hari.svg",
    unggulan: false,
  },
  {
    id: "bk-07",
    nama: "Kancil dan Cermin Ajaib",
    kategori: "Komik",
    harga: 45000,
    stok: 20,
    sinopsis: "Kancil menemukan cermin yang membuat setiap pintanya jadi petualangan baru.",
    deskripsi:
      "Komik ringan penuh humor tentang akal, persahabatan, dan cermin yang tidak pernah jujur.",
    imageUrl: "covers/kancil-cermin-ajaib.svg",
    unggulan: false,
  },
  {
    id: "bk-08",
    nama: "Berpikir Cepat, Berpikir Pelan",
    kategori: "Non-Fiksi",
    harga: 120000,
    stok: 4,
    sinopsis: "Memoar ringan tentang keputusan, insting, dan cara kerja pikiran kita.",
    deskripsi:
      "Bacaan populer yang mengupas dua cara kerja pikiran dan kapan masing-masing dibutuhkan.",
    imageUrl: "covers/berpikir-cepat-pelan.svg",
    unggulan: true,
  },
];

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(value) {
  const amount = Number.isFinite(Number(value)) ? Number(value) : 0;
  // Intl menyisipkan spasi tidak terlihat setelah "Rp"; seragamkan ke "Rp78.000".
  return rupiahFormatter.format(amount).replace(/\u00a0/g, "");
}

export function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `bk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function cloneProducts(products = SAMPLE_PRODUCTS) {
  return products.map((product) => ({ ...product }));
}

export function normalizeProduct(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const errors = {};

  const nama = String(source.nama ?? "").trim();
  if (nama.length < 3 || nama.length > 80) {
    errors.nama = "Nama harus 3–80 karakter.";
  }

  const kategori = String(source.kategori ?? "").trim();
  if (!CATEGORIES.includes(kategori)) {
    errors.kategori = "Pilih kategori yang tersedia.";
  }

  const harga = Number(source.harga);
  if (
    source.harga === "" ||
    source.harga === null ||
    source.harga === undefined ||
    !Number.isFinite(harga) ||
    harga < 0 ||
    harga > 999999999999999
  ) {
    errors.harga = "Harga harus angka minimal 0.";
  }

  const stok = Number(source.stok);
  if (!Number.isInteger(stok) || stok < 0) {
    errors.stok = "Stok harus bilangan bulat minimal 0.";
  }

  const sinopsis = String(source.sinopsis ?? "").trim();
  if (sinopsis.length < 10 || sinopsis.length > 200) {
    errors.sinopsis = "Sinopsis harus 10–200 karakter.";
  }

  const deskripsi = String(source.deskripsi ?? "").trim();
  if (deskripsi.length < 10 || deskripsi.length > 1000) {
    errors.deskripsi = "Deskripsi harus 10–1000 karakter.";
  }

  const imageUrl = String(source.imageUrl ?? "").trim();
  if (!/^covers\/[A-Za-z0-9._-]+$/.test(imageUrl) || imageUrl.includes("..")) {
    errors.imageUrl = "Path sampul harus diawali covers/.";
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

export function buildWhatsAppUrl(product) {
  const pesan =
    product.stok > 0
      ? `Halo Bilik Aksara, saya tertarik dengan buku "${product.nama}" (${product.kategori}, ${formatRupiah(product.harga)}). Apakah stok masih tersedia?`
      : `Halo Bilik Aksara, buku "${product.nama}" sedang habis. Kapan tersedia lagi?`;

  return `https://wa.me/${DEMO_WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
}
