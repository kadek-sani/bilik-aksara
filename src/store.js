// Persistensi katalog memakai localStorage. Tidak ada backend atau akun.

import { cloneProducts, normalizeProduct, SAMPLE_PRODUCTS } from "./products.js";

export const STORAGE_KEY = "bilik-aksara:products:v1";

export function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch {
    return false;
  }
}

export function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      const products = cloneProducts(SAMPLE_PRODUCTS);
      return { products, notice: saveProducts(products) ? null : "unavailable" };
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Format data bukan array.");

    const seenIds = new Set();
    const products = parsed.map((item) => {
      if (!item || typeof item.id !== "string" || !item.id.trim()) {
        throw new Error("Data produk tidak memiliki id.");
      }

      const { product, errors } = normalizeProduct(item);
      if (Object.keys(errors).length > 0 || seenIds.has(product.id)) {
        throw new Error("Data produk tidak valid.");
      }

      seenIds.add(product.id);
      return product;
    });

    return { products, notice: null };
  } catch {
    // Data rusak/format lama: kembalikan contoh dan beri tahu pemanggil.
    const products = cloneProducts(SAMPLE_PRODUCTS);
    return { products, notice: saveProducts(products) ? "corrupt" : "unavailable" };
  }
}
