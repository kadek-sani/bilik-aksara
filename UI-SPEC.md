# UI-SPEC — Bilik Aksara

**Versi:** 1.0  
**Tanggal:** 2026-11-19  
**Berdasarkan:** `SPEC.md` v1.0  
**Status:** Panduan visual & layout, siap dipakai saat implementasi

---

## 0. Hubungan dengan `SPEC.md`

Dokumen ini mengatur **tampilan, gaya, dan tata letak**. Fungsi, data model, aturan validasi, dan acceptance criteria tetap mengacu ke `SPEC.md`.

- `SPEC.md` 3.1 (palet ungu) **digantikan** oleh sistem warna pada bagian 2 di bawah.
- Hierarki tipografi, breakpoint, dan daftar fitur di `SPEC.md` tetap berlaku dan diperinci di sini.
- Tidak ada perubahan pada F-01…F-12, N-01…N-14, atau AC-01…AC-30.

---

## 1. Tujuan & Prinsip Visual

Menghasilkan antarmuka **modern, elegan, dan terasa segar ala Gen Z** tanpa kehilangan kenyamanan membaca:

1. **Hangat, bukan kaku.** Dominan krem hangat dan hijau daun, dengan sentuhan cokelat dan kuning seperti kopi, kertas, dan sinar matahari.
2. **Bersih dan bernapas.** Banyak ruang kosong, kartu tidak sesak, hierarki jelas dalam 1 kali pandangan.
3. **Tipografi sebagai struktur.** Judul besar berani, metadata kecil tapi terbaca, harga jadi fokus kedua setelah nama buku.
4. **Digital tapi organik.** Sudut membulat, bayangan lembut, dekorasi berupa lengkungan/daun sederhana — bukan gradient mencolok.
5. **Mobile-first.** Semua komponen dirancang untuk layar sempit dulu, lalu diperluas ke desktop.
6. **Elegan lewat detail.** Micro-interaction 150–200 ms, status yang konsisten, dan kontras yang aman.

---

## 2. Sistem Warna

### 2.1 Palet utama

| Peran | Nama | Hex | Penggunaan |
|---|---|---|---|
| Latar halaman | Cream | `#FBF7F0` | Background body, area hero |
| Permukaan kartu | White | `#FFFFFF` | Kartu produk, panel, navbar, input |
| Permukaan hangat | Sand | `#F5EDE0` | Area ringkasan, latar alias/alternatif tabel |
| Hijau utama | Leaf | `#1E6B45` | Tombol primer, tautan, judul aksen, fokus |
| Hijau hover | Leaf Dark Hover | `#237A4C` | State hover/active tombol primer |
| Hijau dekoratif | Leaf Light | `#2F8F5B` | Garis, titik, batang grafik, ikon non-teks **saja** |
| Hijau lembut | Mint | `#E7F3E9` | Latar badge `Tersedia`, latar tipisan info |
| Cokelat | Cocoa | `#6B4E38` | Metadata, label kategori netral, border hangat |
| Cokelat lembut | Latte | `#EFE3D5` | Border, divider, latar chip netral |
| Kuning hangat | Honey | `#F6C85F` | Aksen `Unggulan`, bintang, highlight tipis |
| Kuning lembut | Honey Soft | `#FFF3D6` | Latar badge `Unggulan` |
| Teks utama | Ink | `#1F2A22` | Nama buku, angka metrik, judul |
| Teks sekunder | Sage | `#5C665D` | Sinopsis, keterangan, label input |
| Status habis/error | Terra | `#A63D2F` | Badge `Habis`, pesan error, tombol hapus |

### 2.2 Kontras (diukur, WCAG AA)

| Kombinasi | Rasio | Status |
|---|---:|---|
| Ink `#1F2A22` di Cream `#FBF7F0` | 13,92:1 | Lulus (teks normal) |
| Ink di White | 14,87:1 | Lulus |
| Sage `#5C665D` di Cream | 5,60:1 | Lulus |
| Sage di Sand `#F5EDE0` | 5,14:1 | Lulus |
| Leaf `#1E6B45` di Cream | 6,06:1 | Lulus |
| White di Leaf (tombol primer) | 6,47:1 | Lulus |
| White di Leaf Hover `#237A4C` | 5,30:1 | Lulus |
| Leaf di Mint (badge) | 5,67:1 | Lulus |
| Cocoa `#6B4E38` di Cream | 7,09:1 | Lulus |
| Ink di Honey Soft `#FFF3D6` | 13,48:1 | Lulus |
| Ink di Honey `#F6C85F` | 9,45:1 | Lulus |
| Terra `#A63D2F` di White | 6,31:1 | Lulus |

**Aturan penting:** `Leaf Light #2F8F5B` **tidak** dipakai untuk teks putih (rasio hanya 4,04:1). Gunakan hanya sebagai elemen dekoratif atau teks besar minimal 18,66px/700. Semua teks kecil memakai `Ink`, `Sage`, `Leaf`, `Cocoa`, atau `Terra`.

### 2.3 Porsi warna (visual balance)

- ~60% Cream + White
- ~25% Leaf / Mint (aksen struktur dan status)
- ~10% Cocoa / Sand (metadata & border)
- ~5% Honey + Terra (highlight & peringatan)

---

## 3. Tipografi

- **Family:** sans-serif sistem — `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Tanpa font CDN.
- **Berat:** 400 (reguler), 500 (medium), 600 (semi-bold), 700 (bold).

| Elemen | Ukuran / Berat | Warna | Track & tinggi baris |
|---|---|---|---|
| Brand navbar | 18px / 700 | Leaf | letter-spacing -0.02em |
| Judul hero (desktop) | 36–40px / 700 | Ink | line-height 1,15 |
| Judul hero (mobile) | 26–30px / 700 | Ink | line-height 1,2 |
| Eyebrow hero | 12px / 700, uppercase | Cocoa | letter-spacing 0,12em |
| Angka metrik | 24–28px / 700 | Ink | line-height 1,1 |
| Label metrik | 12px / 500 | Sage | — |
| Nama buku | 16px / 600 | Ink | clamp 2 baris |
| Harga | 18px / 700 | Leaf | tabular-nums |
| Sinopsis kartu | 13px / 400 | Sage | clamp 2 baris, line-height 1,5 |
| Metadata (stok, kategori) | 12px / 500 | Cocoa | — |
| Label form | 12px / 600 | Ink | — |
| Teks tombol | 13–14px / 600 | White / Leaf | — |
| Teks badge | 11px / 700 uppercase | sesuai badge | letter-spacing 0,04em |

**Sinopsis singkat:** ditampilkan maksimal **2 baris** dengan ellipsis (`…`). Versi lengkap tersedia via atribut `title` saat hover dan di formulir Ubah. Tidak memotong di tengah kata bila bisa dihindari.

---

## 4. Spacing, Radius, Elevasi, Motion

- **Grid spasi:** 4 / 8 / 12 / 16 / 24 / 32 / 48 px.
- **Radius:** input & chip 10px, kartu & panel 16px, badge 999px (pill), hero dekor 24px.
- **Border:** 1px solid `#EFE3D5` (Latte); saat fokus 2px Leaf.
- **Bayangan:**
  - Kartu diam: `0 1px 2px rgba(31,42,34,.06), 0 6px 18px rgba(31,42,34,.05)`
  - Kartu hover: `0 8px 24px rgba(30,107,69,.14)`
  - Panel/dialog: `0 18px 48px rgba(31,42,34,.16)`
- **Motion:** 150–200 ms `ease`; hover kartu naik 2–4px; tombol menekan skala 0,98; badge muncul dengan fade 120 ms. Hormati `prefers-reduced-motion: reduce` → semua transisi dimatikan.
- **Fokus:** outline 2px Leaf + offset 2px, terlihat di semua elemen interaktif (tidak dihapus).

---

## 5. Struktur Halaman & Komponen

### 5.1 Navbar

- Sticky di atas, tinggi 64px mobile / 72px desktop, latar White dengan border bawah Latte.
- Kiri: ikon daun sederhana + brand **Bilik Aksara** (Leaf, 700).
- Tengah/kanan desktop: tautan tab `Katalog` dan `Kelola`; tab aktif diberi garis bawah Leaf 2px + teks Leaf.
- Kanan: chip kecil `Mode Demo` (Latte + Cocoa, 11px uppercase).
- Mobile: brand + chip demo; tab pindah ke baris kedua di bawah navbar (tidak hamburger, cukup 2 tab agar tetap jelas).

### 5.2 Hero

- Latar Cream, panel melengkung dengan aksen Mint dan satu dekorasi buku/daun berbasis SVG lokal (tanpa gambar luar).
- Eyebrow: `KATALOG BUKU PILIHAN` (Cocoa).
- Judul: `Bacaan berikutnya, ada di sini.` (Ink).
- Subjudul: `Temukan buku favoritmu, cek stoknya, lalu pesan langsung lewat WhatsApp.` (Sage, 14px).
- Desktop: teks di kiri (60%), ilustrasi di kanan (40%). Mobile: teks di atas, ilustrasi diperkecil di bawah.
- Tidak ada tombol CTA di hero agar fokus tetap ke toolbar.

### 5.3 Ringkasan metrik

Empat kartu kecil di bawah hero: `Total Judul`, `Total Stok`, `Judul Unggulan`, `Stok Habis`.

- Desktop: 4 kartu sejajar. Mobile: grid 2×2.
- Latar Sand atau White, border Latte, radius 12px.
- Angka besar Ink; label Sage; ikon kecil di pojok kanan atas (Leaf/Mint/Honey/Terra sesuai metrik).
- Nilai mengikuti seluruh data, **bukan** hasil filter (sesuai AC-08).

### 5.4 Toolbar: pencarian, filter, sorting

- Satu baris di desktop; bertumpuk di mobile.
- **Pencarian:** input dengan ikon kaca pembesar, placeholder `Cari nama, kategori, atau sinopsis…`, lebar fleksibel (min 220px), clear button `×` saat ada teks.
- **Filter kategori:** `<select>` label `Kategori` — `Semua`, `Fiksi`, `Non-Fiksi`, `Pendidikan`, `Komik`, `Puisi`.
- **Filter stok:** `<select>` label `Stok` — `Semua`, `Tersedia`, `Habis`.
- **Sorting:** `<select>` label `Urutkan` — `Rekomendasi`, `Nama A–Z`, `Nama Z–A`, `Harga Terendah`, `Harga Tertinggi`, `Stok Terbanyak`.
- Di mobile, ke-4 kontrol tersusun: pencarian penuh → 3 select dalam grid 1 kolom (atau 2 kolom bila muat).
- Toolbar **tidak** di-render ulang saat mengetik agar fokus tidak hilang (R-07).

### 5.5 Kartu produk & badge

- Gambar sampul rasio 4:3 (mobile) / 3:2 (desktop), `object-fit: cover`, radius 12px di atas, fallback inisial di atas latar Mint.
- Badge overlay di pojok kiri atas sampul: kategori (Latte + Cocoa). Badge `Unggulan` di pojok kanan atas (Honey Soft + Ink, ikon bintang Honey).
- Di bawah sampul: status pill `Tersedia` (Mint + Leaf) atau `Habis` (putih + Terra, border Terra 1px).
- Nama buku (Ink, 2 baris maks) → harga (Leaf, 700) → `Stok: 12` (Cocoa) → sinopsis 2 baris (Sage).
- Footer kartu: tombol WhatsApp penuh lebar.
- Kartu hover: naik 3px, bayangan hijau lembut, sampul sedikit zoom 1,02.

### 5.6 Tombol WhatsApp

- Primer untuk stok > 0: latar Leaf, teks White, ikon chat, label **`Pesan via WhatsApp`**.
- Untuk stok = 0: latar White, border Terra, teks Terra, label **`Tanya Stok`**.
- Ukuran minimal 44px tinggi (mobile), radius 10px, font 13–14px/600.
- Membuka `wa.me` di tab baru dengan `rel="noopener noreferrer"` (AC-17).
- Pesan mengikuti template di `SPEC.md` 3.2.

### 5.7 Dashboard demo (`Kelola`)

- Header panel: judul `Kelola Katalog` + subjudul `Mode Demo — perubahan hanya tersimpan di browser ini.` + tombol `+ Tambah Buku` (Leaf).
- Tabel desktop kolom: `Sampul (kecil)`, `Nama`, `Kategori`, `Harga`, `Stok`, `Status`, `Aksi (Ubah | Hapus)`.
- Mobile: tabel berubah menjadi **kartu baris** — nama + thumbnail di atas, lalu pasangan label:nilai (Harga, Stok, Status), lalu tombol Ubah/Hapus.
- Formulir Tambah/Ubah muncul sebagai panel/dialog di atas konten: field sesuai model data `SPEC.md` 4.1, tiap field punya `<label>` dan pesan error inline (Terra). Checkbox `Unggulan`.
- Tombol aksi: `Simpan` (Leaf), `Batal` (White + Cocoa), `Hapus` (Terra), `Reset data contoh` (White + Cocoa, di bawah tabel).
- Konfirmasi hapus memakai dialog native untuk jaminan keyboard-accessible.

### 5.8 Feedback & notifikasi

- Toast kecil di kanan bawah (mobile: bawah penuh) untuk `Data tersimpan`, `Data contoh dikembalikan`, dan peringatan `Penyimpanan tidak tersedia`.
- Toast menghilang otomatis ±3 detik, tetap bisa dibaca (bukan hanya warna — ada ikon dan teks).
- Error validasi inline langsung di bawah field, tidak hanya toast.

---

## 6. Layout Responsif (Mobile-First)

| Breakpoint | Kolom grid produk | Perilaku utama |
|---|---|---|
| Base `<640px` | 1 | Navbar + tab 2 baris; hero stack; metrik 2×2; toolbar stack; kartu penuh lebar |
| `≥640px` | 2 | Hero mulai 2 kolom; toolbar pencarian + filter sebaris |
| `≥1024px` | 3 | Navbar tab sejajar; metrik 4 kolom; tabel dashboard tampil penuh |
| `≥1280px` | 4 | Konten dibatasi maksimal 1200px dan ditengahkan |

- Container: `width: 100%`, padding 16px mobile / 24px tablet / 32px desktop, `max-width: 1200px`.
- Gap grid: 12px mobile / 16px tablet / 20px desktop.
- **Tidak ada scroll horizontal** pada 360px: tabel dibungkus container `overflow-x: auto` atau berubah jadi kartu baris.
- Urutan DOM tetap: navbar → hero → metrik → toolbar → grid → dashboard → toast.

---

## 7. Aksesibilitas

- Semua kontrol memiliki `label` terhubung; placeholder bukan pengganti label.
- Urutan fokus mengikuti urutan visual; fokus selalu terlihat (outline Leaf 2px).
- Target klik minimal 44×44px untuk tombol dan select.
- Status tidak hanya dikodekan warna: badge `Tersedia`/`Habis` menyertakan teks (+ ikon opsional).
- Gambar sampul punya `alt` berisi nama buku; fallback inisial juga ber-role img dengan label yang sama.
- Toast dan error memakai `role="status"` / `role="alert"`.
- Kontras mengikuti tabel 2.2 (minimum 4,5:1 untuk teks normal).
- `prefers-reduced-motion` dimatikan; tidak ada animasi berkedip.
- Tab `Katalog`/`Kelola` memakai semantik tab/aria-selected yang benar.

---

## 8. Wireframe Teks — Desktop (≥1280px, tab `Katalog`)

```
+----------------------------------------------------------------------------------------------+
|  (leaf) Bilik Aksara     Katalog   Kelola                      [ Mode Demo ]                  |
+==============================================================================================+
|  KATALOG BUKU PILIHAN                                                                          |
|  Bacaan berikutnya,                                       +-----------------------------+     |
|  ada di sini.                                             |   [SVG daun + buku        ] |     |
|  Temukan buku favoritmu, cek stoknya, lalu pesan         |   dekorasi lokal, hijau   |     |
|  langsung lewat WhatsApp.                                 |   & kuning hangat         |     |
|                                                           +-----------------------------+     |
+----------------------------------------------------------------------------------------------+
|  [ 8  ] Total Judul  [ 74 ] Total Stok  [ 3 ] Unggulan  [ 1 ] Stok Habis                     |
+----------------------------------------------------------------------------------------------+
|  [search] Cari nama, kategori, atau sinopsis...   Kategori [Semua v] Stok [Semua v]           |
|                                                    Urutkan [Rekomendasi v]                    |
+----------------------------------------------------------------------------------------------+
|  +------------------+ +------------------+ +------------------+ +------------------+          |
|  |   [ cover 3:2 ]  | |   [ cover ]      | |   [ cover ]      | |   [ cover ]      |          |
|  | [Fiksi][*Unggul] | | [Fiksi]          | | [Non-Fiksi][*]   | | [Non-Fiksi]      |          |
|  +------------------+ +------------------+ +------------------+ +------------------+          |
|  | (Tersedia)       | | (Tersedia)       | | (Tersedia)       | | (Habis)          |          |
|  | Laut yang        | | Lima Menara di   | | Kebiasaan Kecil, | | Teras Filsafat   |          |
|  | Bercerita        | | Negeri Angin     | | Dampak Besar     | | Senja            |          |
|  | Rp78.000         | | Rp65.000         | | Rp99.000         | | Rp72.000         |          |
|  | Stok: 12         | | Stok: 8          | | Stok: 15         | | Stok: 0          |          |
|  | Sinopsis dua     | | Sinopsis dua     | | Sinopsis dua     | | Sinopsis dua     |          |
|  | baris singkat... | | baris singkat... | | baris singkat... | | baris singkat... |          |
|  | [Pesan via WA ->]| | [Pesan via WA ->]| | [Pesan via WA ->]| | [Tanya Stok ->]  |          |
|  +------------------+ +------------------+ +------------------+ +------------------+          |
|  ... baris kartu berikutnya (maks 4 per baris)                                                |
+----------------------------------------------------------------------------------------------+
```

---

## 9. Wireframe Teks — Desktop (tab `Kelola`)

```
+----------------------------------------------------------------------------------------------+
|  (leaf) Bilik Aksara     Katalog  [Kelola]                      [ Mode Demo ]                  |
+==============================================================================================+
|  KELOLA KATALOG                                                                                |
|  Mode Demo — perubahan hanya tersimpan di browser ini.            [ + Tambah Buku ]           |
+----------------------------------------------------------------------------------------------+
|  +--------+---------------+------------+----------+------+----------+----------------+        |
|  | Sampul | Nama          | Kategori   | Harga    | Stok | Status   | Aksi           |        |
|  +--------+---------------+------------+----------+------+----------+----------------+        |
|  | [img]  | Laut yang     | Fiksi      |Rp78.000  |  12  | Tersedia | Ubah | Hapus  |        |
|  |        | Bercerita     |            |          |      |          |                |        |
|  | [img]  | Teras Filsafat| Non-Fiksi  |Rp72.000  |   0  | Habis    | Ubah | Hapus  |        |
|  | ...    | ...           | ...        | ...      | ...  | ...      | ...            |        |
|  +--------+---------------+------------+----------+------+----------+----------------+        |
|                                                                                              |
|  [ Reset data contoh ]                                                                        |
+----------------------------------------------------------------------------------------------+
|  DIALOG TAMBAH / UBAH BUKU                                                                    |
|  +--------------------------------------------------------------------------------------+    |
|  | Nama        [______________________________________]                                |    |
|  | Kategori    [ Fiksi v ]        Harga [ Rp __________ ]                              |    |
|  | Stok        [ ____ ]           [x] Unggulan                                        |    |
|  | Sinopsis    [______________________________________]                              |    |
|  | Deskripsi   [______________________________________]                              |    |
|  | imageUrl    [ covers/_____________________________ ]                              |    |
|  |                                            [ Batal ]  [ Simpan ]                  |    |
|  +--------------------------------------------------------------------------------------+    |
+----------------------------------------------------------------------------------------------+
```

---

## 10. Wireframe Teks — Mobile (360px, tab `Katalog`)

```
+--------------------------------+
| (leaf) Bilik Aksara   [Demo]   |
+--------------------------------+
| [ Katalog ] [ Kelola ]         |
+--------------------------------+
| KATALOG BUKU PILIHAN           |
| Bacaan berikutnya,             |
| ada di sini.                   |
| Temukan buku favoritmu,        |
| cek stok, pesan via WA.        |
|        [dekor daun kecil]      |
+--------------------------------+
| +----------+ +----------+      |
| | 8        | | 74       |      |
| | Total    | | Total    |      |
| | Judul    | | Stok     |      |
| +----------+ +----------+      |
| +----------+ +----------+      |
| | 3        | | 1        |      |
| | Unggulan | | Habis    |      |
| +----------+ +----------+      |
+--------------------------------+
| [search] Cari buku...        x |
| Kategori   [ Semua        v ]  |
| Stok       [ Semua        v ]  |
| Urutkan    [ Rekomendasi  v ]  |
+--------------------------------+
| +----------------------------+ |
| |     [ cover 4:3 ]          | |
| | [Fiksi]        [*Unggulan] | |
| +----------------------------+ |
| | (Tersedia)                 | |
| | Laut yang Bercerita        | |
| | Rp78.000      Stok: 12     | |
| | Sinopsis dua baris         | |
| | singkat...                 | |
| | [ Pesan via WhatsApp ->  ] | |
| +----------------------------+ |
|              ↑ 44px           |
| +----------------------------+ |
| | kartu berikutnya...        | |
| +----------------------------+ |
+--------------------------------+
```

---

## 11. Wireframe Teks — Mobile (360px, tab `Kelola`)

```
+--------------------------------+
| (leaf) Bilik Aksara   [Demo]   |
+--------------------------------+
| [ Katalog ] [ Kelola ]         |
+--------------------------------+
| KELOLA KATALOG                 |
| Mode Demo — tersimpan di       |
| browser ini.                   |
| [ + Tambah Buku ]              |
+--------------------------------+
| +----------------------------+ |
| | [img] Laut yang Bercerita  | |
| | Fiksi   | Rp78.000         | |
| | Stok 12 | (Tersedia)       | |
| | [ Ubah ] [ Hapus ]         | |
| +----------------------------+ |
| +----------------------------+ |
| | [img] Teras Filsafat Senja | |
| | Non-Fiksi | Rp72.000       | |
| | Stok 0    | (Habis)        | |
| | [ Ubah ] [ Hapus ]         | |
| +----------------------------+ |
| [ Reset data contoh ]          |
+--------------------------------+
| DIALOG TAMBAH / UBAH           |
| +----------------------------+ |
| | Nama [__________________]  | |
| | Kategori [ Fiksi v ]       | |
| | Harga [Rp ______]          | |
| | Stok [____] [x] Unggulan   | |
| | Sinopsis [_____________]   | |
| | Deskripsi [____________]   | |
| | imageUrl [covers/______]   | |
| | [Batal]      [Simpan]      | |
| +----------------------------+ |
+--------------------------------+
```

---

## 12. Pemetaan ke Acceptance Criteria

| Elemen UI | Mendukung AC |
|---|---|
| Grid kartu, badge, sampul, fallback | AC-01, AC-02, AC-03 |
| Kartu metrik | AC-04, AC-08, AC-21 |
| Toolbar (search/filter/sort) | AC-06…AC-14, AC-23 |
| Tombol WhatsApp & template pesan | AC-15, AC-16, AC-17 |
| Tabel & dialog CRUD | AC-18…AC-23 |
| Toast penyimpanan | AC-24, R-01 |
| Breakpoint & target 44px | AC-25, AC-26, AC-27 |
| Aset lokal & sistem warna lokal | AC-28, AC-29 |

---

## 13. Checklist Review UI (manual)

- [ ] Seluruh warna berasal dari palet bagian 2; tidak ada ungu dari spesifikasi lama.
- [ ] Teks kecil tidak memakai `Leaf Light #2F8F5B`.
- [ ] Hero, metrik, toolbar, grid, dan dashboard tampil di desktop dan 360px tanpa scroll horizontal.
- [ ] Sinopsis terpotong maksimal 2 baris dan masih terbaca.
- [ ] Badge status menyertakan teks, bukan hanya warna.
- [ ] Fokus keyboard terlihat di navbar, tab, input, select, dan tombol.
- [ ] Tombol WhatsApp stok habis memakai gaya Terra, bukan Leaf.
- [ ] Tidak ada gambar/font dari internet; dekorasi berupa SVG lokal.
- [ ] Transisi terasa halus dan menonaktif saat `prefers-reduced-motion`.

---

## 14. Out of Scope (UI)

- Dark mode, tema alternatif, atau theme switcher.
- Animasi kompleks, parallax, video background, atau micro-interaction lebih dari 200 ms.
- Ilustrasi kustom berbayar/foto stok dari internet.
- Halaman detail buku terpisah (sinopsis lengkap cukup via `title` dan formulir Ubah).
- Komponen UI pihak ketiga, library animasi, atau framework CSS.

---

**Catatan:** Dokumen ini hanya spesifikasi visual. Belum ada kode HTML/CSS/JavaScript yang dibuat.
