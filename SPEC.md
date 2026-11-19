# SPEC — Bilik Aksara

**Versi:** 1.0  
**Tanggal:** 2026-11-19  
**Status:** Siap untuk diimplementasikan  
**Estimasi:** 1 hari kerja (latihan)  
**Stack:** Vite + JavaScript vanilla + CSS, tanpa backend, tanpa login

---

## 1. Tujuan

Bilik Aksara adalah katalog produk toko buku berbasis web yang dibuat sebagai latihan 1 hari dengan tujuan:

1. Menyajikan 8 buku contoh dalam katalog yang rapi, cepat dipindai, dan nyaman dibaca di layar kecil maupun besar.
2. Membantu calon pembeli menemukan buku melalui pencarian, filter, dan pengurutan, lalu melanjutkan minat beli via WhatsApp.
3. Memberi pengelola toko (dalam perangkat yang sama) sarana demo CRUD untuk mengelola data katalog tanpa server dan tanpa akun.
4. Menjadi contoh implementasi frontend vanilla yang rapi: pemisahan data, penyimpanan, dan tampilan; state tersimpan di `localStorage`.
5. Menghasilkan antarmuka modern dan elegan dengan hierarki visual kuat khas desain Gen Z, tanpa dependensi UI eksternal.

**Definisi selesai proyek:** seluruh acceptance criteria (bagian 8) tercentang manually dan aplikasi dapat dijalankan dengan `npm install && npm run dev`.

---

## 2. Pengguna

| Peran | Kebutuhan utama | Akses |
|---|---|---|
| **Calon Pembeli** | Melihat sampul, nama, kategori, harga, stok, dan sinopsis; mencari/menyaring/mengurutkan buku; menghubungi toko via WhatsApp | Katalog (tab default) |
| **Pengelola Toko** | Menambah, mengubah, menghapus buku; melihat ringkasan total judul dan stok; mengembalikan data contoh | Dashboard demo (tab "Kelola") |

Catatan:

- Kedua peran memakai **satu perangkat dan satu browser**; tidak ada pembedaan akun, tidak ada autorisasi.
- Dashboard sengaja terbuka dan diberi label **"Mode Demo"** agar tidak disalahartikan sebagai sistem produksi.

---

## 3. Daftar Fitur

| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| F-01 | Katalog 8 buku contoh | Delapan produk fiktif dengan sampul lokal, nama, kategori, harga Rupiah, stok, sinopsis, deskripsi, dan penanda unggulan | MVP |
| F-02 | Kartu produk | Menampilkan sampul, badge kategori, badge status stok (`Tersedia` / `Habis`), badge `Unggulan`, nama, harga format Rupiah, dan sinopsis singkat (2–3 baris) | MVP |
| F-03 | Pencarian | Input teks bebas pada `nama`, `kategori`, `sinopsis`, dan `deskripsi`; case-insensitive; hasil langsung diperbarui saat mengetik | MVP |
| F-04 | Filter | Filter kategori (`Semua` + 5 kategori) dan status stok (`Semua` / `Tersedia` / `Habis`); dapat digabung dengan pencarian | MVP |
| F-05 | Sorting | Opsi: `Rekomendasi` (unggulan dulu, lalu nama A–Z), `Nama A–Z`, `Nama Z–A`, `Harga Terendah`, `Harga Tertinggi`, `Stok Terbanyak` | MVP |
| F-06 | Tombol pesan WhatsApp | Menghasilkan tautan `https://wa.me/<nomor>?text=<pesan>` berisi nama buku, kategori, dan harga; dibuka di tab baru. Teks beda untuk buku stok habis ("Tanya Stok") | MVP |
| F-07 | Dashboard demo CRUD | Tabel daftar buku + formulir Tambah/Ubah/Hapus + konfirmasi hapus + tombol "Reset data contoh" | MVP |
| F-08 | Ringkasan | Kartu metrik: `Total Judul`, `Total Stok`, `Judul Unggulan`, `Stok Habis`; dihitung ulang setelah setiap perubahan data | MVP |
| F-09 | Penyimpanan `localStorage` | Data produk tersimpan di browser dan tetap ada setelah halaman dimuat ulang; inisialisasi otomatis dengan data contoh jika kosong | MVP |
| F-10 | Navigasi tab | Beralih antara `Katalog` dan `Kelola` tanpa reload, dengan status tab aktif yang jelas | MVP |
| F-11 | Responsif & transisi | Tata letak grid 1/2/3/4 kolom sesuai lebar layar; transisi halus pada hover kartu, perubahan tab, dan dialog | MVP |
| F-12 | Fallback gambar | Jika `imageUrl` gagal dimuat, tampilkan placeholder berisi inisial nama buku (tidak ada gambar rusak) | MVP |

### 3.1 Keputusan desain UI/UX

- **Tata letak:** header berisi brand + tab + ringkasan metrik; toolbar berisi pencarian, filter, sorting; konten berisi grid kartu. Dashboard memakai panel/tabel di bawah tab `Kelola`.
- **Tipografi:** system font stack (tanpa font dari CDN agar tetap lokal): `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. Hierarki: judul halaman 28–32px/700, nama buku 16px/600, harga 18px/700, metadata 12–13px/500, sinopsis 13px/400.
- **Palet & identitas visual:** mengikuti `UI-SPEC.md` bagian 2 — krem hangat `#FBF7F0`, hijau daun `#1E6B45`, aksen cokelat `#6B4E38` dan kuning hangat `#F6C85F`, dengan hint status merah bata `#A63D2F`. Seluruh nilai warna dan rasio kontras ada di `UI-SPEC.md`.
- **Bentuk:** kartu dan input dengan radius 12–16px, bayangan lembut; pill/badge dengan radius penuh; Spasi konsisten 8/12/16/24px.
- **Transisi:** `150–200ms ease` untuk hover dan perubahan state; hormati `prefers-reduced-motion`.
- **Responsif:** `<640px` 1 kolom + toolbar bertumpuk, `640–1023px` 2 kolom, `1024–1279px` 3 kolom, `≥1280px` 4 kolom.

### 3.2 Konvensi teknis

- Nomor WhatsApp disimpan sebagai konstanta konfigurasi, **bukan data pribadi**: `6280000000000` (nomor demo placeholder, bukan nomor nyata). Harus diganti sebelum pemakaian produksi.
- Pesan WhatsApp: `Halo Bilik Aksara, saya tertarik dengan buku "{nama}" ({kategori}, {hargaRupiah}). Apakah stok masih tersedia?`; untuk stok habis: `Halo Bilik Aksara, buku "{nama}" sedang habis. Kapan tersedia lagi?`. Encode dengan `encodeURIComponent`.
- `hargaRupiah` ditampilkan dengan `Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })`.
- Kategori adalah daftar tetap: `Fiksi`, `Non-Fiksi`, `Pendidikan`, `Komik`, `Puisi`.
- `imageUrl` berupa path relatif (mis. `covers/laut-yang-bercerita.svg`) yang digabung dengan `import.meta.env.BASE_URL` agar tetap benar saat di-deploy di subpath.
- State UI (teks pencarian, filter, sorting, tab aktif) **tidak** disimpan; yang disimpan hanya data produk.

---

## 4. Model Data

### 4.1 Struktur produk

| Field | Tipe | Wajib | Aturan / Validasi |
|---|---|---|---|
| `id` | string | Ya | Unik; generated saat tambah (`crypto.randomUUID()`, fallback `Date.now().toString(36)`); tidak bisa diubah saat edit |
| `nama` | string | Ya | 3–80 karakter; tidak kosong setelah `trim()` |
| `kategori` | string | Ya | Salah satu dari 5 kategori tetap |
| `harga` | number | Ya | Angka ≥ 0; tidak `NaN`; maksimal 15 digit |
| `stok` | integer | Ya | Bilangan bulat ≥ 0; tidak desimal |
| `sinopsis` | string | Ya | 10–200 karakter; ditampilkan ringkas di kartu |
| `deskripsi` | string | Ya | 10–1000 karakter; detail di dashboard/form |
| `imageUrl` | string | Ya | Path relatif ke aset lokal di folder `public/covers/`; wajib diawali `covers/` |
| `unggulan` | boolean | Ya | `true` jika tampil lebih awal pada sorting `Rekomendasi` |

Contoh objek:

```js
{
  id: "bk-01",
  nama: "Laut yang Bercerita",
  kategori: "Fiksi",
  harga: 78000,
  stok: 12,
  sinopsis: "Sebuah perjalanan pulang yang penuh tersirat dan harapan.",
  deskripsi: "Cerita tentang persahabatan, janji yang ditunda, dan laut yang menyimpan semua surat.",
  imageUrl: "covers/laut-yang-bercerita.svg",
  unggulan: true
}
```

### 4.2 Data contoh (8 buku fiktif, nonpribadi)

| # | Nama | Kategori | Harga | Stok | Unggulan |
|---|---|---|---:|---:|---|
| 1 | Laut yang Bercerita | Fiksi | 78.000 | 12 | Ya |
| 2 | Lima Menara di Negeri Angin | Fiksi | 65.000 | 8 | Tidak |
| 3 | Kebiasaan Kecil, Dampak Besar | Non-Fiksi | 99.000 | 15 | Ya |
| 4 | Teras Filsafat Senja | Non-Fiksi | 72.000 | 0 | Tidak |
| 5 | Algoritma untuk Pemula | Pendidikan | 88.000 | 6 | Tidak |
| 6 | Puisi di Ujung Hari | Puisi | 55.000 | 9 | Tidak |
| 7 | Kancil dan Cermin Ajaib | Komik | 45.000 | 20 | Tidak |
| 8 | Berpikir Cepat, Berpikir Pelan | Non-Fiksi | 120.000 | 4 | Ya |

Seluruh sinopsis/deskripsi bersifat fiktif. Tidak ada nama, nomor telepon, alamat, atau email pribadi di dalam data contoh maupun sampul.

### 4.3 Penyimpanan

- Key: `bilik-aksara:products:v1`.
- Nilai: array JSON berisi objek produk sesuai tabel di atas.
- Alur: saat aplikasi dibuka, baca key. Jika tidak ada / bukan array / gagal di-`JSON.parse`, tulis data contoh ke key tersebut.
- Setiap operasi Tambah/Ubah/Hapus/Reset menulis ulang array penuh ke key yang sama.
- Jika penulisan gagal (private mode / kuota penuh), tampilkan pesan ramah di UI dan jangan mengubah tampilan seolah data tersimpan.

---

## 5. Nonfunctional Requirements

| ID | Kategori | Persyaratan |
|---|---|---|
| N-01 | Stack | Vite + JavaScript vanilla + CSS; tanpa framework UI, tanpa backend, tanpa database server, tanpa login |
| N-02 | Dependensi | Hanya Vite sebagai dev dependency; tidak ada paket runtime eksternal; tidak ada font/CDN/gambar dari internet |
| N-03 | Keamanan | Tidak ada API key, token, atau kredensial di kode maupun dokumentasi; nomor WA adalah placeholder nonpribadi |
| N-04 | Keamanan | Teks dari formulir wajib dirender sebagai teks (`textContent`), bukan `innerHTML`, untuk mencegah injection |
| N-05 | Kinerja | Katalog 8 produk render < 100 ms setelah data siap; pencarian/filter/sort terasa instan (target < 50 ms) |
| N-06 | Responsif | Tidak ada scroll horizontal pada lebar 360px; grid menyesuaikan 1–4 kolom seperti pada 3.1 |
| N-07 | Aksesibilitas | HTML semantik, `label` pada semua input, fokus terlihat, tombol bisa dipakai via keyboard, teks alternatif pada sampul |
| N-08 | Kontras | Teks dan badge memenuhi rasio kontras minimal 4,5:1 untuk teks normal |
| N-09 | Konsistensi | Seluruh uang diformat Rupiah; tidak ada angka harga tanpa pemisah ribuan |
| N-10 | Stabilitas | Tidak ada error di browser console saat alur utama dijalankan |
| N-11 | Kompatibilitas | Chrome/Edge/Firefox versi terkini (desktop & mobile) |
| N-12 | Struktur kode | Pemisahan modul minimal: `data.js` (seed + kategori), `storage.js`, `ui.js` (render), `main.js` (event & state), `styles.css` |
| N-13 | Maintainability | Komentar singkat hanya untuk logika non-jelas; nama variabel deskriptif; tidak ada kode mati |
| N-14 | Offline | Setelah halaman termuat, seluruh aset (CSS, JS, sampul) berasal dari lokal |

---

## 6. Risiko

| ID | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R-01 | `localStorage` tidak tersedia (private mode / kuota penuh) | Data tidak persisten | Deteksi saat init & saat simpan; tampilkan pesan "Penyimpanan tidak tersedia, perubahan hanya berlaku sesi ini" |
| R-02 | Data rusak/format lama di `localStorage` | Aplikasi error saat render | Validasi tipe array + field wajib; jika invalid, reset ke data contoh dengan notifikasi |
| R-03 | Path `imageUrl` salah saat deploy di subpath | Sampul tidak muncul | Simpan path relatif dan gabungkan dengan `import.meta.env.BASE_URL`; sediakan fallback inisial (F-12) |
| R-04 | Nomor WhatsApp placeholder dipakai begitu saja | Pesan terkirim ke nomor bukan milik toko | Konstanta diberi nama jelas `DEMO_WHATSAPP_NUMBER` + komentar "ganti sebelum produksi"; dicantumkan di README |
| R-05 | Input sinopsis/deskripsi mengandung HTML | XSS / tampilan berantakan | Render dengan `textContent` (N-04); validasi panjang |
| R-06 | Hapus data tidak sengaja | Data contoh hilang | Konfirmasi hapus + tombol "Reset data contoh" |
| R-07 | Fokus state hilang saat render ulang | Input pencarian berpindah/kehilangan fokus | Render ulang hanya area grid & metrik; toolbar tidak di-recreate saat mengetik |
| R-08 | Waktu pengerjaan 1 hari terlalu padat | Fitur polish terlewat | Ikuti urutan iterasi pada bagian 9; MVP (F-01…F-10) wajib lebih dulu, F-11/F-12 setelahnya |
| R-09 | Harga dinput desimal/negatif | Ringkasan & tampilan tidak konsisten | Validasi di formulir: `Number.isInteger` untuk stok, `harga >= 0`, tolak submit dengan pesan inline |

---

## 7. Out of Scope

Tidak termasuk dalam latihan 1 hari ini:

- Backend, REST/GraphQL API, database server, atau sinkronisasi antar-perangkat.
- Sistem autentikasi, registrasi, role/permission, atau "login palsu".
- Keranjang belanja, checkout, pembayaran, ongkir, invoice, atau status pesanan.
- Upload gambar dari perangkat / pengelolaan aset gambar via UI.
- Ulasan, rating, wishlist, komentar, atau konten buku lengkap (ebook/PDF).
- Integrasi WhatsApp Business API / gateway berbayar (cukup tautan `wa.me`).
- Data pribadi atau data pelanggan sungguhan.
- PWA/service worker, notifikasi, push message, atau installable app.
- Internasionalisasi/multi-bahasa, tema gelap, dan fitur aksesibilitas lanjutan di luar N-07/N-08.
- Framework frontend, TypeScript, library komponen, test runner/CI, dan deployment otomatis.
- Menyimpan API key atau secret apa pun.

---

## 8. Acceptance Criteria

Semua kriteria dapat dicek secara manual di browser tanpa alat khusus.

### A. Data awal & tampilan

- [ ] **AC-01** Buka `index.html` lewat `npm run dev`. Katalog menampilkan **tepat 8 kartu buku** sesuai tabel 4.2, tanpa error di console.
- [ ] **AC-02** Setiap kartu memiliki sampul yang tampil (atau placeholder inisial jika file tidak ada), badge kategori, badge status stok, nama, harga Rupiah, dan sinopsis.
- [ ] **AC-03** Buku "Teras Filsafat Senja" menampilkan badge **Habis** dan tombol **Tanya Stok**; 7 buku lainnya menampilkan **Tersedia** dan tombol **Pesan via WhatsApp**.
- [ ] **AC-04** Ringkasan menampilkan `Total Judul = 8`, `Total Stok = 74` (12+8+15+0+6+9+20+4), `Judul Unggulan = 3`, `Stok Habis = 1`.
- [ ] **AC-05** Sorting awal (`Rekomendasi`) menampilkan 3 buku unggulan lebih dulu, diurutkan A–Z di dalam grupnya.

### B. Pencarian, filter, sorting

- [ ] **AC-06** Ketik `puisi` di kolom pencarian → hanya buku yang nama/kategori/sinopsis/deskripsinya mengandung "puisi" yang tampil; hasil berubah tanpa menekan tombol.
- [ ] **AC-07** Ketik `ALGORITMA` (huruf kapital) → "Algoritma untuk Pemula" tetap ditemukan (case-insensitive).
- [ ] **AC-08** Pilih filter kategori `Fiksi` → hanya 2 buku Fiksi tampil; ringkasan tetap menampilkan angka total seluruh data (8 judul), bukan jumlah hasil filter.
- [ ] **AC-09** Gabungkan pencarian `kecil` + filter `Non-Fiksi` → hanya "Kebiasaan Kecil, Dampak Besar" tampil.
- [ ] **AC-10** Pilih filter stok `Habis` → hanya "Teras Filsafat Senja" tampil.
- [ ] **AC-11** Pilih `Harga Terendah` → harga kartu urut menaik (45.000 … 120.000); pilih `Harga Tertinggi` → urut menurun.
- [ ] **AC-12** Pilih `Nama A–Z` dan `Nama Z–A` → urutan nama berubah sesuai opsi.
- [ ] **AC-13** Pilih `Stok Terbanyak` → "Kancil dan Cermin Ajaib" (stok 20) berada di posisi pertama.
- [ ] **AC-14** Kosongkan pencarian & kembalikan filter ke `Semua` → 8 buku tampil lagi.

### C. WhatsApp

- [ ] **AC-15** Klik tombol WhatsApp pada "Laut yang Bercerita" → tab baru terbuka dengan URL `wa.me` dan pesan berisi nama buku, kategori `Fiksi`, dan harga `Rp78.000`.
- [ ] **AC-16** Klik tombol "Tanya Stok" pada buku habis → pesan bertanya kapan buku tersedia, bukan pesan "saya tertarik".
- [ ] **AC-17** Tautan WhatsApp memiliki atribut `target="_blank"` dan `rel="noopener noreferrer"` (dapat dilihat dengan inspect element).

### D. Dashboard CRUD & ringkasan

- [ ] **AC-18** Pindah ke tab `Kelola` → tabel berisi 8 baris dengan kolom nama, kategori, harga, stok, status, dan aksi Ubah/Hapus.
- [ ] **AC-19** Tambah buku baru melalui formulir dengan data valid → jumlah kartu di tab `Katalog` menjadi 9 dan `Total Judul` menjadi 9.
- [ ] **AC-20** Formulir menolak `nama` kurang dari 3 karakter, `harga` negatif, `stok` desimal/negatif, dan kategori di luar daftar; pesan error tampil inline dan data tidak berubah.
- [ ] **AC-21** Ubah stok salah satu buku menjadi `0` → badge berubah menjadi `Habis`, `Total Stok` berkurang tepat sejumlah selisih, dan `Stok Habis` bertambah 1.
- [ ] **AC-22** Klik Hapus → muncul konfirmasi; pilih batal → data tetap; pilih ok → buku hilang dari tabel dan katalog, ringkasan ikut berubah.
- [ ] **AC-23** Klik "Reset data contoh" → kembali ke 8 buku seperti tabel 4.2, field pencarian/filter/sort kembali ke nilai awal.
- [ ] **AC-24** Semua perubahan di atas tetap ada setelah halaman di-refresh (`Ctrl+R`), kecuali setelah reset.

### E. UI/UX & nonfungsional

- [ ] **AC-25** Buka dengan lebar 360px (devtools mobile): tidak ada scroll horizontal, kartu tersusun 1 kolom, tombol tetap dapat diklik.
- [ ] **AC-26** Buka dengan lebar 768px → 2 kolom; 1280px → 4 kolom.
- [ ] **AC-27** Arahkan kursor ke kartu dan tekan Tab berpindah antar kontrol → ada perubahan state yang halus dan terlihat, serta fokus keyboard tetap terlihat.
- [ ] **AC-28** Matikan JavaScript/jaringan setelah halaman dimuat → aset tetap tampil karena tidak ada permintaan ke internet (tidak ada font/CDN/API eksternal).
- [ ] **AC-29** Periksa source kode: tidak ada string `apiKey`, `token`, `secret`, atau nomor telepon pribadi; nomor WA hanya placeholder `6280000000000`.
- [ ] **AC-30** `npm install && npm run dev` berhasil di lingkungan bersih dan halaman terbuka di URL yang ditampilkan Vite.

---

## 9. Implementation Plan per Iterasi

Urutan bersifat inkremental: setiap iterasi menghasilkan aplikasi yang bisa dijalankan.

### Iterasi 0 — Setup & kerangka (≈15 menit)
- Inisialisasi proyek Vite vanilla; rapikan `index.html`, `src/main.js`, `src/styles.css`.
- Buat struktur folder `src/` dan `public/covers/`.
- **Selesai jika:** `npm run dev` menampilkan halaman kosong bermerek "Bilik Aksara" tanpa error.

### Iterasi 1 — Data & penyimpanan (≈20 menit)
- Tulis `src/data.js`: daftar kategori, 8 produk fiktif, generator `id`.
- Tulis `src/storage.js`: `loadProducts()`, `saveProducts()`, validasi & fallback ke seed, konstanta key `bilik-aksara:products:v1`.
- Tulis konstanta `DEMO_WHATSAPP_NUMBER` dan helper format Rupiah.
- **Selesai jika:** AC-01, AC-29 terpenuhi pada level data (console menampilkan 8 objek valid).

### Iterasi 2 — Katalog & ringkasan (≈25 menit)
- Render header, tab `Katalog`/`Kelola`, grid kartu, badge, dan 4 kartu metrik.
- Buat 8 sampul SVG lokal sederhana (warna per kategori + inisial) di `public/covers/`.
- Tambahkan fallback gambar saat `imageUrl` gagal dimuat.
- **Selesai jika:** AC-01…AC-05, AC-18 (tabel bisa menyusul), AC-25…AC-27 terpenuhi.

### Iterasi 3 — Pencarian, filter, sorting (≈20 menit)
- State UI: `query`, `kategori`, `stok`, `sort`.
- Fungsi `getVisibleProducts()` → filter lalu sort; render ulang hanya grid.
- Event listener `input`/`change`; kosongkan state saat reset.
- **Selesai jika:** AC-06…AC-14 terpenuhi.

### Iterasi 4 — Dashboard CRUD (≈30 menit)
- Formulir Tambah/Ubah dengan validasi inline sesuai 4.1.
- Aksi Hapus dengan `confirm()`; tombol Reset data contoh.
- Sinkronkan tabel, katalog, dan metrik setelah setiap mutasi; tulis ke `localStorage`.
- **Selesai jika:** AC-19…AC-24 terpenuhi.

### Iterasi 5 — WhatsApp & polish (≈20 menit)
- Helper `buildWhatsAppUrl(product)` dengan encode pesan + `target="_blank" rel="noopener noreferrer"`.
- Perbaiki transisi, hover, `prefers-reduced-motion`, dan penyesuaian breakpoint.
- Tambahkan pesan ramah saat `localStorage` gagal ditulis.
- **Selesai jika:** AC-03, AC-15…AC-17, AC-25…AC-28 terpenuhi.

### Iterasi 6 — Verifikasi & dokumentasi (≈15 menit)
- Jalankan seluruh checklist AC-01…AC-30 satu per satu.
- Tulis `README.md` singkat: cara menjalankan, struktur folder, catatan nomor WA placeholder, cara reset data.
- Perbaiki temuan terakhir; pastikan tidak ada error console.
- **Selesai jika:** semua AC tercentang dan proyek siap diserahkan.

**Total estimasi:** ≈ 145 menit aktif + buffer untuk validasi dalam 1 hari kerja.

---

## 10. Catatan Penyerahan

- File yang diharapkan: `SPEC.md`, `README.md`, `index.html`, `package.json`, `src/main.js`, `src/data.js`, `src/storage.js`, `src/ui.js`, `src/styles.css`, `public/covers/*.svg`.
- Spesifikasi ini menjadi acuan penerimaan; perubahan scope harus dicatat sebagai revisi versi pada bagian header.
