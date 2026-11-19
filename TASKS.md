# TASKS — Bilik Aksara

**Versi:** 1.0  
**Tanggal:** 2026-11-19  
**Sumber:** `SPEC.md` v1.0 (fungsi, data, AC-01…AC-30) dan `UI-SPEC.md` v1.0 (visual, layout, wireframe)  
**Status:** Rencana kerja — belum ada implementasi kode

---

## 0. Cara pakai dokumen ini

- Setiap tugas dapat dicentang setelah **semua** acceptance criteria (AC)-nya terpenuhi.
- AC yang merujuk ke `SPEC.md` ditulis dengan kode `AC-xx`; AC tambahan khusus tugas ditulis dengan kode `Txx-y`.
- Kolom **Berkas yang mungkin berubah** bersifat prediksi, bukan kewajiban: berkas bisa berkurang/bertambah selama tetap sesuai `SPEC.md` dan `UI-SPEC.md`.
- Urutan milestone bersifat inkremental; satu milestone menghasilkan aplikasi yang bisa dijalankan.
- **Batasan tetap:** Vite + JavaScript vanilla, tanpa backend, tanpa login palsu, tanpa API key, tanpa data pribadi, tanpa dependensi runtime eksternal.

### Ringkasan milestone

| # | Milestone | Tugas | Fokus utama |
|---|---|---:|---|
| M1 | Scaffold | 3 | Proyek Vite, struktur modul, fondasi visual |
| M2 | Katalog | 3 | 8 buku, kartu, sampul, badge, metrik |
| M3 | Interaksi pencarian/filter | 2 | Pencarian, filter kategori/stok, sorting |
| M4 | WhatsApp | 2 | Tautan `wa.me`, dua template pesan, gaya tombol |
| M5 | CRUD dashboard | 3 | Tabel, form validasi, hapus/reset |
| M6 | localStorage | 2 | Persistensi, validasi data, fallback |
| M7 | Testing | 3 | Verifikasi AC manual, UI, regresi |
| M8 | Security | 3 | Audit secret, rendering aman, batas input |
| M9 | Build | 2 | Build produksi, preview, artefak bersih |
| M10 | Deployment | 2 | Hosting statis, base path, verifikasi publik |

### Dependensi utama

```
M1 ──> M2 ──> M3 ──> M4
       │       │
       └──> M6 <────── M5
                       │
        M7 <───────────┴──> M8 ──> M9 ──> M10
```

> Catatan: M6 (localStorage) diperkenalkan sejak M1/M2 agar katalog sudah persisten, lalu **diverifikasi penuh** di M6 dan M7. M5 bergantung pada M6 agar perubahan CRUD tersimpan.

---

## M1 — Scaffold

### M1-T1 — Inisialisasi proyek Vite vanilla

Buat kerangka proyek tanpa framework, tanpa backend, dan tanpa skrip login.

**Acceptance criteria**
- [ ] `npm install && npm run dev` berhasil dan Vite menampilkan URL lokal (AC-30).
- [ ] Hanya Vite yang terdaftar sebagai dev dependency; tidak ada dependency runtime (N-01, N-02).
- [ ] Folder `src/` dan `public/covers/` tersedia.
- [ ] Tidak ada file/direktori untuk server, API, database, atau autentikasi.
- [ ] Tidak ada error di console saat halaman pertama dibuka (N-10).

**Berkas yang mungkin berubah**
- `package.json`, `package-lock.json`, `index.html`, `src/main.js`, `src/styles.css`, `.gitignore`

**Dependensi:** — | **Estimasi:** 15 menit

---

### M1-T2 — Fondasi visual: navbar, tab, hero, token desain

Terapkan tema krem hangat + hijau dengan hint cokelat dan kuning hangat sesuai `UI-SPEC.md`.

**Acceptance criteria**
- [ ] Navbar menampilkan brand `Bilik Aksara`, tab `Katalog`/`Kelola`, dan chip `Mode Demo` (UI-SPEC 5.1).
- [ ] Hero menampilkan eyebrow `KATALOG BUKU PILIHAN`, judul `Bacaan berikutnya, ada di sini.`, dan subjudul sesuai UI-SPEC 5.2.
- [ ] Palet memakai `#FBF7F0`, `#1E6B45`, `#6B4E38`, `#F6C85F`, dan `#A63D2F`; tidak ada ungu lama.
- [ ] Font sans-serif sistem; tidak ada font/CDN dari internet (N-02, N-14).
- [ ] Tab aktif ditandai jelas dan berpindah tanpa reload (F-10).
- [ ] Fokus keyboard terlihat dengan outline hijau 2px (N-07).
- [ ] Tidak ada scroll horizontal pada lebar 360px (N-06).

**Berkas yang mungkin berubah**
- `index.html`, `src/styles.css`, `src/ui.js`, `public/covers/hero-dekor.svg`

**Dependensi:** M1-T1 | **Estimasi:** 25 menit

---

### M1-T3 — Data contoh, kategori, dan konstanta

Siapkan 8 buku fiktif dan konstanta pendukung sebelum render.

**Acceptance criteria**
- [ ] Tepat 8 objek produk sesuai `SPEC.md` 4.2 dengan field lengkap: `id`, `nama`, `kategori`, `harga`, `stok`, `sinopsis`, `deskripsi`, `imageUrl`, `unggulan` (F-01).
- [ ] Lima kategori tetap tersedia: Fiksi, Non-Fiksi, Pendidikan, Komik, Puisi (SPEC 3.2).
- [ ] Nomor WhatsApp hanya placeholder `6280000000000` dan diberi penanda jelas sebagai demo (R-04).
- [ ] Tidak ada nama, email, nomor telepon, atau alamat pribadi dalam data maupun aset (SPEC 4.2, N-03).
- [ ] Harga diformat `id-ID` IDR tanpa desimal melalui helper (N-09).
- [ ] Total stok data contoh = 74 dan 3 buku ber-`unggulan: true` (AC-04).

**Berkas yang mungkin berubah**
- `src/data.js`, `src/config.js` (opsional; boleh digabung ke `data.js`), `src/utils.js` (opsional, helper format)

**Dependensi:** M1-T1 | **Estimasi:** 20 menit

---

## M2 — Katalog

### M2-T1 — Kartu produk, badge, dan sinopsis singkat

Render katalog sesuai wireframe desktop dan mobile.

**Acceptance criteria**
- [ ] Katalog menampilkan tepat 8 kartu (AC-01).
- [ ] Tiap kartu memuat sampul, badge kategori, badge status (`Tersedia`/`Habis`), badge `Unggulan` bila ya, nama, harga Rupiah, stok, dan sinopsis (AC-02, F-02).
- [ ] Sinopsis dibatasi 2 baris dengan ellipsis dan versi lengkap tersedia via `title` (UI-SPEC 3).
- [ ] Badge status menyertakan teks, bukan hanya warna (UI-SPEC 7).
- [ ] Harga `Laut yang Bercerita` tampil `Rp78.000` (AC-15, N-09).
- [ ] Gambar memiliki `alt` berisi nama buku (N-07).

**Berkas yang mungkin berubah**
- `src/ui.js`, `src/styles.css`, `index.html`

**Dependensi:** M1-T2, M1-T3 | **Estimasi:** 25 menit

---

### M2-T2 — Sampul lokal dan fallback gambar

Sediakan 8 sampul SVG lokal dan tangani kegagalan load.

**Acceptance criteria**
- [ ] Delapan file SVG ada di `public/covers/` dan `imageUrl` diawali `covers/` (SPEC 4.1).
- [ ] Path sampul digabung dengan `import.meta.env.BASE_URL` agar tetap benar di subpath (R-03).
- [ ] Jika gambar gagal dimuat, muncul placeholder berisi inisial nama buku, bukan ikon rusak (F-12).
- [ ] Tidak ada permintaan gambar ke internet sama sekali (N-14, AC-28).
- [ ] Sinopsis/deskripsi pada SVG tidak mengandung data pribadi.

**Berkas yang mungkin berubah**
- `public/covers/*.svg`, `src/data.js`, `src/ui.js`

**Dependensi:** M1-T3 | **Estimasi:** 20 menit

---

### M2-T3 — Ringkasan metrik dan navigasi tab

Tampilkan 4 kartu metrik dan pastikan tab bekerja.

**Acceptance criteria**
- [ ] Ringkasan: `Total Judul = 8`, `Total Stok = 74`, `Judul Unggulan = 3`, `Stok Habis = 1` (AC-04).
- [ ] Metrik dihitung dari seluruh data, bukan hasil filter (AC-08).
- [ ] Metrik dihitung ulang setelah perubahan data (F-08).
- [ ] Tab `Katalog`/`Kelola` berpindah tanpa reload dengan status aktif jelas (F-10).
- [ ] Mobile menampilkan metrik 2×2, desktop 4 sejajar (UI-SPEC 5.3, 6).

**Berkas yang mungkin berubah**
- `src/ui.js`, `src/main.js`, `src/styles.css`, `index.html`

**Dependensi:** M2-T1 | **Estimasi:** 15 menit

---

## M3 — Interaksi pencarian/filter

### M3-T1 — Pipeline pencarian, filter, dan sorting

Terapkan state UI dan fungsi turunan data.

**Acceptance criteria**
- [ ] Pencarian menyasar `nama`, `kategori`, `sinopsis`, `deskripsi` dan bersifat case-insensitive (AC-06, AC-07).
- [ ] Filter kategori menghasilkan 2 buku untuk `Fiksi` (AC-08).
- [ ] Filter stok `Habis` hanya menampilkan `Teras Filsafat Senja` (AC-10).
- [ ] Pencarian `kecil` + filter `Non-Fiksi` hanya menampilkan `Kebiasaan Kecil, Dampak Besar` (AC-09).
- [ ] Enam opsi sorting tersedia dan bekerja: Rekomendasi, Nama A–Z, Nama Z–A, Harga Terendah, Harga Tertinggi, Stok Terbanyak (AC-05, AC-11…AC-13).
- [ ] `Rekomendasi` menampilkan 3 unggulan lebih dulu lalu nama A–Z (AC-05).
- [ ] `Stok Terbanyak` menaruh `Kancil dan Cermin Ajaib` (stok 20) di urutan pertama (AC-13).
- [ ] Mengosongkan pencarian dan filter mengembalikan 8 buku (AC-14).
- [ ] State UI tidak disimpan ke `localStorage` (SPEC 3.2).
- [ ] Toolbar tidak di-render ulang saat mengetik sehingga fokus tidak hilang (R-07).

**Berkas yang mungkin berubah**
- `src/main.js`, `src/ui.js`

**Dependensi:** M2-T3 | **Estimasi:** 25 menit

---

### M3-T2 — Kontrol toolbar dan aksesibilitas

Rapikan input pencarian, tiga select, dan labelnya.

**Acceptance criteria**
- [ ] Placeholder pencarian: `Cari nama, kategori, atau sinopsis…` dan ada tombol clear `×` (UI-SPEC 5.4).
- [ ] Label `Kategori`, `Stok`, `Urutkan` terhubung benar dengan select masing-masing (N-07).
- [ ] Opsi select persis sesuai UI-SPEC 5.4 (6 opsi kategori termasuk `Semua`, 3 opsi stok, 6 opsi sorting).
- [ ] Target klik minimal 44px dan fokus terlihat (UI-SPEC 7).
- [ ] Desktop toolbar sebaris; mobile bertumpuk tanpa scroll horizontal (UI-SPEC 6).
- [ ] Perubahan hasil langsung terlihat saat mengetik tanpa tombol submit (F-03).

**Berkas yang mungkin berubah**
- `index.html`, `src/ui.js`, `src/styles.css`

**Dependensi:** M3-T1 | **Estimasi:** 15 menit

---

## M4 — WhatsApp

### M4-T1 — Helper URL dan template pesan

Bangun tautan `wa.me` dari data produk.

**Acceptance criteria**
- [ ] Format URL `https://wa.me/<nomor>?text=<pesan-terencode>` (F-06).
- [ ] Nomor berasal dari konstanta demo placeholder, bukan data pribadi (R-04, AC-29).
- [ ] Pesan stok tersedia memuat nama buku, kategori, dan harga Rupiah (AC-15).
- [ ] Pesan stok habis bertanya kapan tersedia, bukan "saya tertarik" (AC-16).
- [ ] `encodeURIComponent` dipakai sehingga tanda kutip dan spasi aman di URL (SPEC 3.2).
- [ ] Contoh: `Laut yang Bercerita` menghasilkan pesan dengan `Fiksi` dan `Rp78.000` (AC-15).

**Berkas yang mungkin berubah**
- `src/main.js` atau `src/utils.js`, `src/data.js`/`src/config.js`, `src/ui.js`

**Dependensi:** M2-T1, M1-T3 | **Estimasi:** 15 menit

---

### M4-T2 — Gaya tombol dan keamanan tautan

Sesuaikan dua varian tombol dengan UI-SPEC.

**Acceptance criteria**
- [ ] Stok > 0: tombol hijau `Leaf`, teks putih, label `Pesan via WhatsApp` (UI-SPEC 5.6).
- [ ] Stok = 0: tombol putih border merah bata, teks merah bata, label `Tanya Stok` (AC-03, UI-SPEC 5.6).
- [ ] Tinggi tombol minimal 44px di mobile (UI-SPEC 7).
- [ ] Tautan memakai `target="_blank"` dan `rel="noopener noreferrer"` (AC-17).
- [ ] Hover/active memakai transisi 150–200ms dan tetap terlihat saat fokus keyboard (AC-27).

**Berkas yang mungkin berubah**
- `src/ui.js`, `src/styles.css`

**Dependensi:** M4-T1 | **Estimasi:** 10 menit

---

## M5 — CRUD dashboard

### M5-T1 — Tabel dashboard dan kartu baris mobile

Tampilkan daftar buku pada tab `Kelola`.

**Acceptance criteria**
- [ ] Tabel berisi 8 baris dengan kolom sampul, nama, kategori, harga, stok, status, aksi `Ubah`/`Hapus` (AC-18).
- [ ] Header panel menampilkan `Kelola Katalog` dan keterangan `Mode Demo — perubahan hanya tersimpan di browser ini.` (UI-SPEC 5.7).
- [ ] Tombol `+ Tambah Buku` tersedia (UI-SPEC 5.7).
- [ ] Di 360px tabel berubah menjadi kartu baris dan tidak ada scroll horizontal (AC-25).
- [ ] Status pada tabel memakai teks `Tersedia`/`Habis`, bukan warna saja (UI-SPEC 7).

**Berkas yang mungkin berubah**
- `index.html`, `src/ui.js`, `src/styles.css`

**Dependensi:** M2-T3, M6-T1 | **Estimasi:** 20 menit

---

### M5-T2 — Formulir Tambah/Ubah dan validasi

Implementasikan input sesuai model data `SPEC.md` 4.1.

**Acceptance criteria**
- [ ] Formulir memiliki field `nama`, `kategori`, `harga`, `stok`, `sinopsis`, `deskripsi`, `imageUrl`, checkbox `unggulan`, masing-masing ber-`label` (UI-SPEC 5.7, N-07).
- [ ] Tambah buku valid menambah katalog menjadi 9 dan `Total Judul` menjadi 9 (AC-19).
- [ ] `nama` < 3 karakter, `harga` negatif/NaN, `stok` desimal/negatif, dan kategori di luar daftar ditolak dengan pesan inline berwarna `Terra` (AC-20, R-09).
- [ ] `id` baru unik via `crypto.randomUUID()` dengan fallback, dan tidak berubah saat edit (SPEC 4.1).
- [ ] Ubah data mengisi formulir dengan nilai lama dan menyimpan perubahan (F-07).
- [ ] Teks dari formulir dirender dengan `textContent`, bukan `innerHTML` (N-04, R-05).
- [ ] Batas panjang sesuai model: nama 3–80, sinopsis 10–200, deskripsi 10–1000 karakter (SPEC 4.1).

**Berkas yang mungkin berubah**
- `src/ui.js`, `src/main.js`, `src/styles.css`, `index.html`

**Dependensi:** M5-T1, M6-T1 | **Estimasi:** 30 menit

---

### M5-T3 — Hapus, konfirmasi, reset, dan sinkronisasi

Pastikan semua mutasi tercermin di tabel, katalog, dan metrik.

**Acceptance criteria**
- [ ] Klik `Hapus` memunculkan konfirmasi; Batal tidak mengubah data; OK menghapus buku (AC-22).
- [ ] Konfirmasi memakai dialog native agar bisa dipakai via keyboard (UI-SPEC 5.7).
- [ ] Ubah stok menjadi 0 mengubah badge jadi `Habis`, `Total Stok` berkurang tepat sejumlah selisih, `Stok Habis` +1 (AC-21).
- [ ] `Reset data contoh` mengembalikan 8 buku sesuai SPEC 4.2 dan mengosongkan pencarian/filter/sort (AC-23).
- [ ] Toast `Data tersimpan` / `Data contoh dikembalikan` muncul dan menghilang ±3 detik (UI-SPEC 5.8).
- [ ] Setelah mutasi, tabel, grid, dan metrik diperbarui bersamaan tanpa reload (F-07, F-08).

**Berkas yang mungkin berubah**
- `src/main.js`, `src/ui.js`, `src/styles.css`

**Dependensi:** M5-T2, M6-T1 | **Estimasi:** 20 menit

---

## M6 — localStorage

### M6-T1 — Load, validasi, dan simpan data

Terapkan persistensi dengan key `bilik-aksara:products:v1`.

**Acceptance criteria**
- [ ] Key `bilik-aksara:products:v1` berisi array JSON produk (SPEC 4.3).
- [ ] Saat key kosong, data contoh ditulis otomatis (F-09).
- [ ] Jika JSON rusak/bukan array/field wajib hilang, data direset ke contoh dengan notifikasi (R-02).
- [ ] Setiap Tambah/Ubah/Hapus/Reset menulis ulang array penuh (SPEC 4.3).
- [ ] Perubahan tetap ada setelah refresh `Ctrl+R` (AC-24).
- [ ] Hanya data produk yang disimpan; state UI tidak ikut tersimpan (SPEC 3.2).

**Berkas yang mungkin berubah**
- `src/storage.js`, `src/main.js`, `src/data.js`

**Dependensi:** M1-T3 | **Estimasi:** 20 menit

---

### M6-T2 — Penanganan kegagalan penyimpanan

Tangani private mode dan kuota penuh dengan anggun.

**Acceptance criteria**
- [ ] Jika `localStorage` tidak tersedia/gagal ditulis, muncul pesan: `Penyimpanan tidak tersedia, perubahan hanya berlaku sesi ini.` (R-01).
- [ ] UI tidak menampilkan toast `Data tersimpan` ketika penulisan gagal.
- [ ] Aplikasi tetap dapat dipakai dalam sesi tersebut tanpa error console (N-10).
- [ ] Deteksi dilakukan saat inisialisasi **dan** saat setiap penyimpanan (R-01).

**Berkas yang mungkin berubah**
- `src/storage.js`, `src/ui.js`, `src/main.js`, `src/styles.css`

**Dependensi:** M6-T1, M5-T3 | **Estimasi:** 15 menit

---

## M7 — Testing

### M7-T1 — Uji manual fungsional AC-01…AC-24

Jalankan checklist fungsional `SPEC.md` bagian 8 satu per satu.

**Acceptance criteria**
- [ ] AC-01…AC-05 (data awal & tampilan) tercentang.
- [ ] AC-06…AC-14 (pencarian, filter, sorting) tercentang.
- [ ] AC-15…AC-17 (WhatsApp) tercentang.
- [ ] AC-18…AC-24 (CRUD, ringkasan, persistensi) tercentang.
- [ ] Setiap temuan dicatat dan diberi tugas perbaikan sebelum milestone selesai.

**Berkas yang mungkin berubah**
- `TASKS.md` (centang), `docs/QA.md` (opsional)

**Dependensi:** M6-T2, M5-T3, M4-T2 | **Estimasi:** 20 menit

---

### M7-T2 — Uji UI, responsif, aksesibilitas, dan nonfungsional

Jalankan AC-25…AC-30 serta checklist `UI-SPEC.md` bagian 13.

**Acceptance criteria**
- [ ] AC-25 (360px, tanpa scroll horizontal) dan AC-26 (768px 2 kolom, 1280px 4 kolom) tercentang.
- [ ] AC-27 (hover, Tab, fokus terlihat) dan AC-28 (aset lokal, tanpa jaringan) tercentang.
- [ ] AC-29 (tanpa secret/nomor pribadi) dan AC-30 (`npm run dev`) tercentang.
- [ ] Seluruh 9 item checklist UI-SPEC 13 tercentang, termasuk `Leaf Light` tidak dipakai untuk teks kecil.
- [ ] Console browser bersih dari error dan warning (N-10).
- [ ] Diuji minimal di Chrome/Edge versi terkini (N-11).

**Berkas yang mungkin berubah**
- `TASKS.md`, `README.md`, `docs/QA.md` (opsional)

**Dependensi:** M7-T1 | **Estimasi:** 20 menit

---

### M7-T3 — Perbaikan temuan dan regresi singkat

Tutup bug yang ditemukan dan pastikan tidak merusak alur lain.

**Acceptance criteria**
- [ ] Semua temuan M7-T1 dan M7-T2 berstatus selesai.
- [ ] AC yang terdampak perbaikan dijalankan ulang dan tetap lulus.
- [ ] Tidak ada perubahan scope di luar `SPEC.md`/`UI-SPEC.md`.
- [ ] `npm run dev` masih berhasil setelah perbaikan.

**Berkas yang mungkin berubah**
- Sesuai temuan: `src/main.js`, `src/ui.js`, `src/storage.js`, `src/styles.css`, `index.html`

**Dependensi:** M7-T1, M7-T2 | **Estimasi:** 15 menit

---

## M8 — Security

### M8-T1 — Audit secret dan data pribadi

Pastikan tidak ada kredensial atau informasi pribadi.

**Acceptance criteria**
- [ ] Tidak ada string `apiKey`, `token`, `secret`, `password`, atau `.env` dengan nilai nyata di repositori (N-03, AC-29).
- [ ] Nomor WhatsApp hanya `6280000000000` dan diberi komentar "ganti sebelum produksi" (R-04).
- [ ] Delapan buku contoh, sinopsis, deskripsi, dan SVG tidak memuat data pribadi (SPEC 4.2).
- [ ] Tidak ada file konfigurasi hosting yang menyimpan kredensial.

**Berkas yang mungkin berubah**
- `src/config.js`/`src/data.js`, `README.md`, `.gitignore`

**Dependensi:** M7-T3 | **Estimasi:** 10 menit

---

### M8-T2 — Audit rendering dan tautan eksternal

Cegah injection dan kebocoran permintaan keluar.

**Acceptance criteria**
- [ ] Seluruh teks dari formulir/`localStorage` dirender memakai `textContent`; tidak ada `innerHTML` untuk input pengguna (N-04, R-05).
- [ ] Semua tautan `wa.me` memakai `rel="noopener noreferrer"` (AC-17).
- [ ] Tidak ada URL `http(s)://` eksternal di `index.html`, CSS, JS, atau SVG (N-14, AC-28).
- [ ] `imageUrl` divalidasi diawali `covers/` sebelum dipakai (SPEC 4.1).

**Berkas yang mungkin berubah**
- `src/ui.js`, `src/main.js`, `src/storage.js`, `index.html`, `public/covers/*.svg`

**Dependensi:** M8-T1 | **Estimasi:** 15 menit

---

### M8-T3 — Audit batas input dan konsistensi data

Kunci validasi agar data tetap aman dan ringkasan benar.

**Acceptance criteria**
- [ ] Validasi `nama`, `harga`, `stok`, `kategori`, `sinopsis`, `deskripsi` sesuai SPEC 4.1 masih aktif (AC-20).
- [ ] `harga >= 0` dan `Number.isInteger(stok)` ditegakkan di form **dan** saat memuat data dari `localStorage` (R-09, R-02).
- [ ] Jumlah produk tidak dibatasi secara artifisial, tetapi payload `localStorage` tetap dalam batas wajar (N-05).
- [ ] Ringkasan tidak bisa menjadi NaN/negatif setelah audit (AC-04, AC-21).

**Berkas yang mungkin berubah**
- `src/main.js`, `src/ui.js`, `src/storage.js`

**Dependensi:** M8-T2 | **Estimasi:** 10 menit

---

## M9 — Build

### M9-T1 — Build produksi dan preview lokal

Pastikan artefak produksi dapat dibuat dan dijalankan.

**Acceptance criteria**
- [ ] `npm run build` berhasil tanpa error (N-10).
- [ ] Folder `dist/` dihasilkan berisi HTML, CSS, JS, dan 8 SVG sampul.
- [ ] `npm run preview` menampilkan aplikasi dengan 8 kartu dan metrik benar (AC-01, AC-04).
- [ ] Semua aset di `dist/` berasal dari lokal; tidak ada permintaan internet (N-14).
- [ ] Jika dipakai subpath, konfigurasi `base` membuat sampul tetap tampil (R-03).

**Berkas yang mungkin berubah**
- `package.json`, `vite.config.js` (opsional), `index.html`, `src/main.js`, `dist/` (artefak build)

**Dependensi:** M8-T3 | **Estimasi:** 10 menit

---

### M9-T2 — Kebersihan artefak dan dokumentasi build

Rapikan hasil build dan instruksi penggunaan.

**Acceptance criteria**
- [ ] `dist/` tidak ikut ter-commit ke repositori (`.gitignore` benar).
- [ ] Tidak ada file debug, komentar rahasia, atau dependency tidak terpakai di artefak (N-13).
- [ ] `README.md` memuat cara `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
- [ ] `README.md` menjelaskan nomor WA placeholder dan cara reset data contoh (R-04, AC-23).
- [ ] Tidak ada langkah build yang membutuhkan API key (N-03).

**Berkas yang mungkin berubah**
- `.gitignore`, `README.md`, `vite.config.js` (opsional)

**Dependensi:** M9-T1 | **Estimasi:** 10 menit

---

## M10 — Deployment

### M10-T1 — Konfigurasi hosting statis

Deploy sebagai situs statis murni, tanpa server dan tanpa login.

**Acceptance criteria**
- [ ] Target deployment adalah static hosting (mis. layanan hosting statis); tidak ada backend, fungsi server, atau database.
- [ ] Tidak ada halaman/form login palsu di hasil deploy.
- [ ] Base path sesuai lokasi deploy; 8 sampul tetap tampil (R-03).
- [ ] Tidak ada environment variable berisi secret yang diperlukan (N-03).
- [ ] Konfigurasi hosting tidak menambah dependency runtime baru (N-02).

**Berkas yang mungkin berubah**
- `vite.config.js` (opsional), `index.html`, `README.md`, file konfigurasi host bila dipakai (mis. `netlify.toml` — opsional)

**Dependensi:** M9-T2 | **Estimasi:** 15 menit

---

### M10-T2 — Verifikasi URL publik dan penyerahan

Cek hasil deploy dari browser nyata dan tutup dokumentasi.

**Acceptance criteria**
- [ ] URL publik terbuka dan menampilkan katalog 8 buku tanpa error console (AC-01, AC-30).
- [ ] AC-01…AC-30 dijalankan ulang pada build yang di-deploy dan lulus.
- [ ] Tombol WhatsApp menghasilkan `wa.me` dengan pesan benar (AC-15, AC-16, AC-17).
- [ ] CRUD + `localStorage` berfungsi di browser publik (AC-19…AC-24).
- [ ] `README.md` memuat URL deploy, struktur folder, dan catatan bahwa nomor WA masih placeholder.
- [ ] `TASKS.md` seluruh tugas berstatus `[x]` dan tidak ada kode yang diubah di luar rencana ini.

**Berkas yang mungkin berubah**
- `README.md`, `TASKS.md`

**Dependensi:** M10-T1 | **Estimasi:** 15 menit

---

## 11. Definisi Selesai Keseluruhan

- [ ] Semua 25 tugas (M1-T1 … M10-T2) berstatus `[x]`.
- [ ] Seluruh AC-01…AC-30 di `SPEC.md` tercentang manual.
- [ ] Seluruh 9 poin checklist `UI-SPEC.md` bagian 13 tercentang.
- [ ] Aplikasi berjalan di `npm run dev`, `npm run preview`, dan URL deploy publik.
- [ ] Tidak ada backend, login palsu, API key, data pribadi, atau permintaan jaringan eksternal.
- [ ] Tema krem hangat + hijau dengan hint cokelat dan kuning hangat konsisten di semua layar.
