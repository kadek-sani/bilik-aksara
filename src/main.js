// State, alur pencarian/filter, dan operasi CRUD. Tidak ada backend atau login.

import { cloneProducts, normalizeProduct, SAMPLE_PRODUCTS } from "./products.js";
import { loadProducts, saveProducts } from "./store.js";
import * as ui from "./ui.js";

let products = [];

const state = {
  query: "",
  kategori: "Semua",
  stok: "Semua",
  sort: "Rekomendasi",
  tab: "Katalog",
};

function byName(a, b) {
  return a.nama.localeCompare(b.nama, "id");
}

function getVisibleProducts() {
  const query = state.query.trim().toLocaleLowerCase("id-ID");

  const result = products.filter((product) => {
    if (state.kategori !== "Semua" && product.kategori !== state.kategori) return false;
    if (state.stok === "Tersedia" && product.stok === 0) return false;
    if (state.stok === "Habis" && product.stok > 0) return false;
    if (!query) return true;

    return [product.nama, product.kategori, product.sinopsis, product.deskripsi].some((field) =>
      String(field).toLocaleLowerCase("id-ID").includes(query),
    );
  });

  switch (state.sort) {
    case "Nama A-Z":
      result.sort(byName);
      break;
    case "Nama Z-A":
      result.sort((a, b) => -byName(a, b));
      break;
    case "Harga Terendah":
      result.sort((a, b) => a.harga - b.harga);
      break;
    case "Harga Tertinggi":
      result.sort((a, b) => b.harga - a.harga);
      break;
    case "Stok Terbanyak":
      result.sort((a, b) => b.stok - a.stok);
      break;
    default:
      result.sort((a, b) => Number(b.unggulan) - Number(a.unggulan) || byName(a, b));
  }

  return result;
}

function renderCatalog() {
  ui.renderCatalog(getVisibleProducts());
}

function renderAll() {
  renderCatalog();
  ui.renderMetrics(products);
  ui.renderAdmin(products);
}

function commit(message = "Data tersimpan") {
  const saved = saveProducts(products);
  renderAll();
  ui.showToast(
    saved ? message : "Penyimpanan tidak tersedia, perubahan hanya berlaku sesi ini.",
    saved ? "success" : "error",
  );
}

const handlers = {
  onFiltersChange() {
    Object.assign(state, ui.getFilters());
    renderCatalog();
  },

  onTabChange(name) {
    state.tab = name;
    ui.setTab(name);
  },

  onAdd() {
    ui.openDialog();
  },

  onEdit(id) {
    const product = products.find((item) => item.id === id);
    if (product) ui.openDialog(product);
  },

  onDelete(id) {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    if (!window.confirm(`Hapus buku "${product.nama}" dari katalog?`)) return;

    products = products.filter((item) => item.id !== id);
    commit();
  },

  onSubmit(raw) {
    const { product, errors } = normalizeProduct(raw);
    if (Object.keys(errors).length > 0) {
      ui.setFormErrors(errors);
      return;
    }

    const index = products.findIndex((item) => item.id === product.id);
    products =
      index >= 0
        ? products.map((item, position) => (position === index ? product : item))
        : [...products, product];

    ui.closeDialog();
    commit();
  },

  onReset() {
    products = cloneProducts(SAMPLE_PRODUCTS);
    state.query = "";
    state.kategori = "Semua";
    state.stok = "Semua";
    state.sort = "Rekomendasi";
    ui.resetFilters();
    commit("Data contoh dikembalikan");
  },
};

function init() {
  const loaded = loadProducts();
  products = loaded.products;

  ui.setupUI(handlers);
  ui.setTab("Katalog");
  renderAll();

  if (loaded.notice === "corrupt") {
    ui.showToast("Data tidak valid. Data contoh dikembalikan.", "error");
  } else if (loaded.notice === "unavailable") {
    ui.showToast("Penyimpanan tidak tersedia, perubahan hanya berlaku sesi ini.", "error");
  }
}

init();
