// Sumber data buku fiktif Bilik Aksara.
// Seluruh nama, sinopsis, dan deskripsi adalah rekaan; tanpa data pribadi atau aset berhak cipta.

// Lima kategori tetap sesuai SPEC.md 3.2 dan UI-SPEC.md 5.4.
export const CATEGORIES = ["Fiksi", "Non-Fiksi", "Pendidikan", "Komik", "Puisi"];

// Nomor pemilik ada di config.js (konfigurasi nonrahasia, bukan data buku).

// Delapan buku contoh sesuai tabel SPEC.md 4.2.
export const BOOKS = [
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
