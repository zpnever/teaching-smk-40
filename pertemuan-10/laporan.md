# Laporan Singkat — Portofolio Pribadi Danu Suko Handiyanto

## 1. Daftar CSS Selector yang Dipakai

| No | Jenis Selector | Contoh | Lokasi di `style.css` |
|----|---------------|--------|----------------------|
| 1 | **Element Selector** | `footer { ... }`, `body { ... }`, `h1, h2, h3 { ... }` | Baris 71, 76, 637 |
| 2 | **Class Selector** | `.navbar { ... }`, `.hero { ... }`, `.skill-card { ... }` | Baris 112, 190, 384 |
| 3 | **Id Selector** | `#tentang { ... }` | Baris 284 |
| 4 | **Descendant Selector** | `.navbar .logo`, `.nav-links a`, `.skill .badge`, `.card-proyek img` | Baris 138, 457, 503 |
| 5 | **Group Selector** | `h1, h2, h3 { ... }`, `.hero-buttons { ... }` | Baris 71, 231 |
| 6 | **Pseudo-class Selector** | `.nav-links a:hover`, `.btn-primary:focus`, `.card-proyek:hover` | Baris 148, 253, 488 |

## 2. Daftar Format Warna yang Dipakai

| No | Format Warna | Contoh | Lokasi di `style.css` |
|----|-------------|--------|----------------------|
| 1 | **Named Color** | `white`, `transparent` | Baris 25, 116 |
| 2 | **HEX** | `#2D2D3A`, `#E8927C`, `#1E1E2E` | Baris 24, 44, 637 |
| 3 | **RGB** | `rgb(200, 200, 215)`, `rgb(100, 100, 120)`, `rgb(160, 160, 180)` | Baris 638, 331, 656 |
| 4 | **RGBA** | `rgba(255, 255, 255, 0.8)`, `rgba(31, 56, 100, 0.08)`, `rgba(232, 146, 124, 0.35)` | Baris 113, 457, 244 |
| 5 | **HSL** | `hsl(14, 72%, 62%)`, `hsl(14, 72%, 55%)`, `hsl(14, 72%, 75%)` | Baris 242, 253 |

## 3. Alasan Pemilihan `box-sizing: border-box`

Saya memilih `box-sizing: border-box` secara global (`* { box-sizing: border-box; }`) dengan alasan:

- **Perhitungan ukuran lebih intuitif**: Dengan `border-box`, nilai `width` dan `height` sudah mencakup `padding` dan `border`. Ini membuat layout lebih mudah diprediksi.
- **Konsistensi layout**: Saat menambahkan `padding` atau `border` pada elemen, ukuran total elemen tidak berubah. Ini sangat penting untuk grid/flexbox layout agar kolom tetap sejajar.
- **Standar industri**: Hampir semua framework CSS modern (Bootstrap, Tailwind, dll.) menggunakan `border-box` sebagai default karena menghindari masalah overflow yang sering terjadi dengan `content-box`.
- **Contoh penerapan**: Foto profil (`.foto-profil`) diberi `border: 4px solid`, dan dengan `border-box`, lebar totalnya tetap 280px tanpa membengkak.

## 4. Penerapan CSS Background

| Elemen | Properti Background yang Dipakai |
|--------|--------------------------------|
| `.hero` | `background-color`, `background-image` (radial-gradient), `background-repeat: no-repeat`, `background-position: center`, `background-size: cover`, `background-attachment: scroll` |
| `.skill` | `background-color`, `background-image` (radial-gradient), `background-repeat: no-repeat`, `background-position: top left, bottom right`, `background-size: 50% 50%` |
| `.kontak` | `background-image` (radial-gradient), `background-repeat: no-repeat`, `background-position: top center`, `background-size: 100% 50%` |

## 5. Penerapan CSS Box Model

| Elemen | Properti Box Model |
|--------|-------------------|
| `.foto-profil` | `width: 280px`, `height: 340px`, `border: 4px solid`, `border-radius: 24px`, `box-sizing: border-box` |
| `.btn` | `padding: 14px 32px`, `border: 2px solid`, `border-radius: 50px`, `box-sizing: border-box` |
| `.skill .badge` | `padding: 6px 20px`, `margin: 8px 0`, `border: 1px solid`, `border-radius: 50px` |
| `.card-proyek` | `border: 1px solid`, `border-radius: 24px`, `box-sizing: border-box` |
| `.nav-links a:hover` | `outline` — diterapkan implisit via `:focus` |
| `.btn-primary:focus` | `outline: 3px solid hsl(14, 72%, 75%)`, `outline-offset: 3px` |
