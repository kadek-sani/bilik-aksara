// Penyaringan & pengurutan murni: tanpa DOM, tanpa state global, tanpa mutasi array input.
// Bisa diuji langsung dengan: import { filterBooks } from "./src/filters.js";

const DEFAULT_FILTERS = {
  query: "",
  kategori: "Semua",
  stok: "Semua",
  sort: "Rekomendasi",
};

function byName(a, b) {
  return String(a.nama ?? "").localeCompare(String(b.nama ?? ""), "id");
}

/**
 * @param {Array} books daftar buku (tidak diubah)
 * @param {Object} filters { query, kategori, stok, sort }
 * @returns {Array} buku baru yang sudah difilter dan diurutkan
 */
export function filterBooks(books, filters = {}) {
  const { query, kategori, stok, sort } = { ...DEFAULT_FILTERS, ...filters };
  const needle = String(query ?? "").trim().toLocaleLowerCase("id-ID");
  const source = Array.isArray(books) ? books : [];

  // .filter() menghasilkan array baru, jadi .sort() di bawah tidak menyentuh input.
  const result = source.filter((book) => {
    if (!book || typeof book !== "object") return false;
    if (kategori !== "Semua" && book.kategori !== kategori) return false;
    if (stok === "Tersedia" && !(Number(book.stok) > 0)) return false;
    if (stok === "Habis" && Number(book.stok) !== 0) return false;
    if (!needle) return true;

    // F-03: nama, kategori, sinopsis, dan deskripsi; case-insensitive.
    return [book.nama, book.kategori, book.sinopsis, book.deskripsi].some((field) =>
      String(field ?? "").toLocaleLowerCase("id-ID").includes(needle),
    );
  });

  switch (sort) {
    case "Nama A-Z":
      return result.sort(byName);
    case "Nama Z-A":
      return result.sort((a, b) => -byName(a, b));
    case "Harga Terendah":
      return result.sort((a, b) => Number(a.harga) - Number(b.harga));
    case "Harga Tertinggi":
      return result.sort((a, b) => Number(b.harga) - Number(a.harga));
    case "Stok Terbanyak":
      return result.sort((a, b) => Number(b.stok) - Number(a.stok));
    default:
      // Rekomendasi: unggulan lebih dulu, lalu nama A–Z (AC-05).
      return result.sort((a, b) => Number(b.unggulan) - Number(a.unggulan) || byName(a, b));
  }
}
