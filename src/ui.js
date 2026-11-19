// Semua penyusunan DOM berada di sini. Teks pengguna ditulis dengan textContent.

import { buildWhatsAppUrl, CATEGORIES, formatRupiah } from "./products.js";

const els = {};
let toastTimer = null;

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function initials(nama) {
  return (
    nama
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || "?"
  );
}

function statusText(product) {
  return product.stok > 0 ? "Tersedia" : "Habis";
}

function makeCover(product, small = false) {
  const cover = node("div", small ? "cover cover-small" : "cover");
  const image = node("img");

  image.src = `${import.meta.env.BASE_URL}${product.imageUrl}`;
  image.alt = `Sampul ${product.nama}`;
  image.loading = "lazy";
  image.addEventListener(
    "error",
    () => {
      const fallback = node("div", "cover-fallback", initials(product.nama));
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", `Sampul ${product.nama}`);
      cover.prepend(fallback);
      image.remove();
    },
    { once: true },
  );

  cover.append(image);
  return cover;
}

function makeStatusBadge(product) {
  const modifier = product.stok > 0 ? "is-available" : "is-out";
  return node("span", `badge badge-status ${modifier}`, statusText(product));
}

function makeWhatsAppLink(product) {
  const link = node(
    "a",
    `btn btn-wa ${product.stok > 0 ? "btn-primary" : "btn-outline-alert"}`,
    product.stok > 0 ? "Pesan via WhatsApp" : "Tanya Stok",
  );
  link.href = buildWhatsAppUrl(product);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

function makeActionButton(label, action, id, className) {
  const button = node("button", className, label);
  button.type = "button";
  button.dataset.action = action;
  button.dataset.id = id;
  return button;
}

function renderProductCard(product) {
  const card = node("article", "product-card");

  const cover = makeCover(product);
  cover.append(node("span", "badge badge-category", product.kategori));
  if (product.unggulan) {
    cover.append(node("span", "badge badge-featured", "★ Unggulan"));
  }

  const body = node("div", "card-body");
  const title = node("h3", "card-title", product.nama);
  const synopsis = node("p", "card-synopsis", product.sinopsis);
  title.title = product.nama;
  synopsis.title = product.sinopsis;

  body.append(
    makeStatusBadge(product),
    title,
    node("p", "card-price", formatRupiah(product.harga)),
    node("p", "card-stock", `Stok: ${product.stok}`),
    synopsis,
    makeWhatsAppLink(product),
  );

  card.append(cover, body);
  return card;
}

function renderAdminRow(product) {
  const row = node("tr");

  const coverCell = node("td");
  coverCell.append(makeCover(product, true));

  const statusCell = node("td");
  statusCell.append(makeStatusBadge(product));

  const actionCell = node("td", "cell-actions");
  actionCell.append(
    makeActionButton("Ubah", "edit", product.id, "btn btn-small btn-ghost"),
    makeActionButton("Hapus", "delete", product.id, "btn btn-small btn-danger"),
  );

  row.append(
    coverCell,
    node("td", "", product.nama),
    node("td", "", product.kategori),
    node("td", "", formatRupiah(product.harga)),
    node("td", "", String(product.stok)),
    statusCell,
    actionCell,
  );

  return row;
}

function renderAdminCard(product) {
  const card = node("article", "admin-card");

  const head = node("div", "admin-card-head");
  head.append(makeCover(product, true), node("strong", "", product.nama));

  const details = node("dl", "admin-card-details");
  [
    ["Kategori", product.kategori],
    ["Harga", formatRupiah(product.harga)],
    ["Stok", String(product.stok)],
    ["Status", statusText(product)],
  ].forEach(([label, value]) => {
    details.append(node("dt", "", label), node("dd", "", value));
  });

  const actions = node("div", "admin-card-actions");
  actions.append(
    makeActionButton("Ubah", "edit", product.id, "btn btn-small btn-ghost"),
    makeActionButton("Hapus", "delete", product.id, "btn btn-small btn-danger"),
  );

  card.append(head, details, actions);
  return card;
}

export function setupUI(handlers) {
  els.search = document.getElementById("search-input");
  els.searchClear = document.getElementById("search-clear");
  els.filterKategori = document.getElementById("filter-kategori");
  els.filterStok = document.getElementById("filter-stok");
  els.sort = document.getElementById("sort-by");
  els.grid = document.getElementById("product-grid");
  els.emptyState = document.getElementById("empty-state");

  els.metricJudul = document.getElementById("metric-judul");
  els.metricStok = document.getElementById("metric-stok");
  els.metricUnggulan = document.getElementById("metric-unggulan");
  els.metricHabis = document.getElementById("metric-habis");

  els.panelKatalog = document.getElementById("panel-katalog");
  els.panelKelola = document.getElementById("panel-kelola");
  els.adminTableBody = document.getElementById("admin-table-body");
  els.adminCards = document.getElementById("admin-cards");
  els.btnTambah = document.getElementById("btn-tambah");
  els.btnReset = document.getElementById("btn-reset");

  els.dialog = document.getElementById("product-dialog");
  els.form = document.getElementById("product-form");
  els.dialogTitle = document.getElementById("dialog-title");
  els.submitLabel = document.getElementById("submit-label");
  els.btnBatal = document.getElementById("btn-batal");
  els.btnClose = document.getElementById("btn-close-dialog");
  els.fieldId = document.getElementById("field-id");
  els.fieldNama = document.getElementById("field-nama");
  els.fieldKategori = document.getElementById("field-kategori");
  els.fieldHarga = document.getElementById("field-harga");
  els.fieldStok = document.getElementById("field-stok");
  els.fieldSinopsis = document.getElementById("field-sinopsis");
  els.fieldDeskripsi = document.getElementById("field-deskripsi");
  els.fieldImageUrl = document.getElementById("field-imageUrl");
  els.fieldUnggulan = document.getElementById("field-unggulan");
  els.errors = {
    nama: document.getElementById("error-nama"),
    kategori: document.getElementById("error-kategori"),
    harga: document.getElementById("error-harga"),
    stok: document.getElementById("error-stok"),
    sinopsis: document.getElementById("error-sinopsis"),
    deskripsi: document.getElementById("error-deskripsi"),
    imageUrl: document.getElementById("error-imageUrl"),
  };
  els.toast = document.getElementById("toast");

  els.filterKategori.append(...CATEGORIES.map((name) => new Option(name, name)));
  els.fieldKategori.append(
    new Option("Pilih kategori", ""),
    ...CATEGORIES.map((name) => new Option(name, name)),
  );

  els.search.addEventListener("input", () => {
    els.searchClear.hidden = els.search.value.length === 0;
    handlers.onFiltersChange();
  });

  els.searchClear.addEventListener("click", () => {
    clearSearch();
    handlers.onFiltersChange();
  });

  [els.filterKategori, els.filterStok, els.sort].forEach((control) => {
    control.addEventListener("change", handlers.onFiltersChange);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => handlers.onTabChange(tab.dataset.tab));
  });

  els.btnTambah.addEventListener("click", handlers.onAdd);
  els.btnReset.addEventListener("click", handlers.onReset);
  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    handlers.onSubmit(getFormValues());
  });
  els.btnBatal.addEventListener("click", closeDialog);
  els.btnClose.addEventListener("click", closeDialog);

  [els.adminTableBody, els.adminCards].forEach((container) => {
    container.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      if (button.dataset.action === "edit") handlers.onEdit(button.dataset.id);
      if (button.dataset.action === "delete") handlers.onDelete(button.dataset.id);
    });
  });
}

export function getFilters() {
  return {
    query: els.search.value,
    kategori: els.filterKategori.value,
    stok: els.filterStok.value,
    sort: els.sort.value,
  };
}

export function clearSearch() {
  els.search.value = "";
  els.searchClear.hidden = true;
}

export function resetFilters() {
  clearSearch();
  els.filterKategori.value = "Semua";
  els.filterStok.value = "Semua";
  els.sort.value = "Rekomendasi";
}

export function setTab(name) {
  document.querySelectorAll(".tab").forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  els.panelKatalog.hidden = name !== "Katalog";
  els.panelKelola.hidden = name !== "Kelola";
}

export function renderCatalog(products) {
  els.grid.replaceChildren(...products.map(renderProductCard));
  els.emptyState.hidden = products.length > 0;
}

export function renderMetrics(products) {
  els.metricJudul.textContent = String(products.length);
  els.metricStok.textContent = String(products.reduce((total, product) => total + product.stok, 0));
  els.metricUnggulan.textContent = String(products.filter((product) => product.unggulan).length);
  els.metricHabis.textContent = String(products.filter((product) => product.stok === 0).length);
}

export function renderAdmin(products) {
  els.adminTableBody.replaceChildren(...products.map(renderAdminRow));
  els.adminCards.replaceChildren(...products.map(renderAdminCard));
}

export function openDialog(product = null) {
  els.dialogTitle.textContent = product ? "Ubah Buku" : "Tambah Buku";
  els.submitLabel.textContent = product ? "Simpan Perubahan" : "Simpan";
  els.fieldId.value = product ? product.id : "";
  els.fieldNama.value = product ? product.nama : "";
  els.fieldKategori.value = product ? product.kategori : "";
  els.fieldHarga.value = product ? String(product.harga) : "";
  els.fieldStok.value = product ? String(product.stok) : "";
  els.fieldSinopsis.value = product ? product.sinopsis : "";
  els.fieldDeskripsi.value = product ? product.deskripsi : "";
  els.fieldImageUrl.value = product ? product.imageUrl : "covers/";
  els.fieldUnggulan.checked = Boolean(product?.unggulan);

  setFormErrors({});
  els.dialog.showModal();
  els.fieldNama.focus();
}

export function closeDialog() {
  if (els.dialog.open) els.dialog.close();
}

export function getFormValues() {
  return {
    id: els.fieldId.value,
    nama: els.fieldNama.value,
    kategori: els.fieldKategori.value,
    harga: els.fieldHarga.value,
    stok: els.fieldStok.value,
    sinopsis: els.fieldSinopsis.value,
    deskripsi: els.fieldDeskripsi.value,
    imageUrl: els.fieldImageUrl.value,
    unggulan: els.fieldUnggulan.checked,
  };
}

export function setFormErrors(errors) {
  Object.entries(els.errors).forEach(([field, element]) => {
    element.textContent = errors[field] || "";
  });
}

export function showToast(message, type = "success") {
  els.toast.textContent = message;
  els.toast.className = `toast is-visible ${type === "error" ? "toast-error" : ""}`;
  els.toast.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.hidden = true;
    els.toast.classList.remove("is-visible");
  }, 3000);
}
