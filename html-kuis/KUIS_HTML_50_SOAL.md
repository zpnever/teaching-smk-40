# KUMPULAN SOAL & KUNCI JAWABAN KUIS PEMROGRAMAN WEB (HTML)
**Mata Pelajaran:** Pemrograman Web  
**Kelas / Fase:** XI RPL (Rekayasa Perangkat Lunak)  
**Format:** Kuis Tanya Jawab (Esai, Pemahaman Konsep, Analisis Kasus & Debugging Kode)  
**Jumlah Soal:** 50 Soal + Kunci Jawaban Lengkap  

---

## 📋 DAFTAR DISTRIBUSI MATERI

| Modul / Pertemuan | Topik Utama | Jumlah Soal | Rentang Nomor |
| :--- | :--- | :---: | :---: |
| **Pertemuan 1** | Pengantar Web, Client-Server, Frontend vs Backend, Statis vs Dinamis, HTML/CSS/JS, Tools | 10 Soal | No. 1 – 10 |
| **Pertemuan 2** | Dasar HTML, Struktur Dokumen, Doctype, Head & Body, Heading, Paragraf, Format Teks & Komentar | 10 Soal | No. 11 – 20 |
| **Pertemuan 3** | Hyperlink (`<a>`), Gambar (`<img>`), List (`<ol>`, `<ul>`), dan Tabel (`<table>`) | 10 Soal | No. 21 – 30 |
| **Pertemuan 4** | Form HTML (`<form>`), Input Types, Textarea, Select, Label, Button & Atribut Form | 10 Soal | No. 31 – 40 |
| **Pertemuan 6** | Layout Web, Block vs Inline, Tag `<div>` & `<span>`, Atribut `class` vs `id`, Semantik HTML5 | 10 Soal | No. 41 – 50 |

---

# BAGIAN 1: PERTEMUAN 1 — PENGANTAR PEMROGRAMAN WEB & DASAR WEBSITE (NO. 1 – 10)

---

### Soal 1
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Apa pengertian dari *website* dan bagaimana alur kerja dasar ketika seorang pengguna mengakses sebuah website melalui web browser?

**Jawaban:**  
- **Pengertian Website:** Website adalah sekumpulan halaman digital yang saling terhubung dan dapat diakses melalui jaringan internet menggunakan perangkat lunak bernama web browser. Website berfungsi untuk menampilkan informasi (teks, gambar, audio, video), menyediakan layanan online, hingga menjadi sarana interaksi antar pengguna.
- **Alur Kerja Dasar:**
  1. Pengguna mengetikkan alamat URL atau domain (misal: `https://smkn40jkt.sch.id`) di address bar browser.
  2. Web browser bertindak sebagai **Client** yang mengirimkan permintaan (*HTTP/HTTPS Request*) melalui internet ke komputer **Server** tempat website disimpan.
  3. Server menerima dan memproses permintaan tersebut, lalu mengirimkan kembali data file (HTML, CSS, JavaScript, media) sebagai respon (*HTTP Response*).
  4. Web browser membaca (merender) kode-kode tersebut menjadi tampilan visual yang dapat dilihat dan diinteraksikan oleh pengguna.

---

### Soal 2
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Jelaskan perbedaan peran dan tanggung jawab antara **Frontend Developer** dan **Backend Developer** dalam proses pembangunan sebuah website!

**Jawaban:**  
- **Frontend (Client-Side):** Bagian dari website yang langsung dilihat, disentuh, dan diinteraksikan oleh pengguna di layar peramban (antarmuka/UI/UX). Fokus pada tata letak, warna, tipografi, animasi, dan responsivitas desain. Teknologi utamanya adalah **HTML, CSS, dan JavaScript**.
- **Backend (Server-Side):** Bagian di balik layar yang tidak terlihat langsung oleh pengguna. Fokus pada logika bisnis aplikasi, pengolahan data, autentikasi keamanan, transaksi, interaksi dengan database, serta pengelolaan server. Teknologi umumnya meliputi bahasa seperti **PHP, NodeJS, Python, Java**, serta database seperti **MySQL, PostgreSQL, MongoDB**.

---

### Soal 3
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Jelaskan perbedaan mendasar antara **Website Statis** dan **Website Dinamis** beserta 1 contoh skenario penggunaannya!

**Jawaban:**  
| Aspek | Website Statis | Website Dinamis |
| :--- | :--- | :--- |
| **Perubahan Konten** | Konten bersifat tetap/sama untuk semua pengunjung. Untuk mengubah konten, pengembang harus mengubah langsung kode file HTML-nya. | Konten dapat berubah secara otomatis sesuai interaksi pengguna, waktu, atau data terkini dari server. |
| **Keterlibatan Database** | Tidak memerlukan database atau pemrosesan server yang rumit. | Melibatkan database dan pemrosesan logika di sisi server. |
| **Interaktivitas** | Terbatas (hanya melihat informasi/link). | Tinggi (bisa login, register, komentar, belanja online, survey). |
| **Contoh Penggunaan** | Halaman profil perusahaan (*Company Profile*) sederhana atau portofolio biodata pribadi. | Toko online (*E-Commerce*), portal berita online, media sosial, atau aplikasi absensi online. |

---

### Soal 4
**Kategori:** Konsep / Analogi  
**Pertanyaan:**  
Dalam analogi pembangunan sebuah rumah, jelaskan peran dari **HTML**, **CSS**, dan **JavaScript**!

**Jawaban:**  
- **HTML (HyperText Markup Language):** Berperan sebagai **kerangka dasar bangunan rumah** (pondasi, tiang, dinding bata, lantai, dan atap). HTML menentukan struktur dan komponen apa saja yang ada pada halaman (seperti teks, gambar, tombol, dan form).
- **CSS (Cascading Style Sheets):** Berperan sebagai **cat, dekorasi, tata warna, dan desain interior/eksterior rumah**. CSS mempercantik tampilan kerangka rumah agar enak dilihat, rapi, estetik, dan nyaman.
- **JavaScript (JS):** Berperan sebagai **sistem kelistrikan, mesin, dan otomasi rumah** (misal: pintu otomatis terbuka saat didekati, lampu otomatis menyala saat gelap, AC pintar). JS membuat halaman web menjadi interaktif, dinamis, dan responsif terhadap aksi pengguna.

---

### Soal 5
**Kategori:** Konsep / Hafalan Tools  
**Pertanyaan:**  
Sebutkan 3 perangkat lunak (*tools*) utama yang wajib dipersiapkan oleh seorang pengembang web pemula beserta fungsi spesifiknya masing-masing!

**Jawaban:**  
1. **Visual Studio Code (VS Code):** Berfungsi sebagai *Source Code Editor* (editor teks) untuk mengetik, mengedit, mengelola struktur berkas proyek, dan memanfaatkan fitur *syntax highlighting*, ekstensi, serta *auto-completion*.
2. **Web Browser (Google Chrome / Mozilla Firefox / Edge):** Berfungsi untuk membaca, mengeksekusi, dan menampilkan visual hasil kompilasi/rendering kode HTML, CSS, dan JavaScript, serta menyediakan fitur *Developer Tools (Inspect Element)* untuk debugging.
3. **GitHub (dan Git):** Berfungsi sebagai platform penyimpanan awan (*cloud repository*), *version control*, dan kolaborasi kode antar pengembang agar riwayat perubahan kode tercatat rapi dan aman.

---

### Soal 6
**Kategori:** Problem-Based / Studi Kasus  
**Pertanyaan:**  
Sebuah restoran *"Rasa Nusantara"* memiliki website dengan 2 halaman:
- **Halaman A:** Menampilkan daftar buku menu statis (foto & harga tetap) serta denah alamat restoran.
- **Halaman B:** Memungkinkan pelanggan memilih meja, memasukkan pesanan makanan ke keranjang belanja, menghitung diskon otomatis, dan melakukan pembayaran QRIS.
Tentukan jenis website (Statis atau Dinamis) untuk Halaman A dan Halaman B, serta berikan alasan teknisnya!

**Jawaban:**  
- **Halaman A adalah Website Statis:** Karena kontennya bersifat tetap, menampilkan informasi yang sama kepada seluruh pengunjung, tidak memerlukan interaksi login maupun integrasi database langsung untuk memproses perubahan data secara otomatis.
- **Halaman B adalah Website Dinamis:** Karena isi halaman dan total tagihan berubah sesuai input spesifik tiap pelanggan. Halaman ini memerlukan pemrosesan di sisi server (backend), penghitungan logika diskon, dan penyimpanan data transaksi ke dalam database.

---

### Soal 7
**Kategori:** Problem-Based / Skenario Alur  
**Pertanyaan:**  
Ketika seorang pengguna menekan tombol **"Login"** pada halaman website perpustakaan sekolah, uraikan secara runtut apa yang dikerjakan oleh sisi **Frontend** dan apa yang diproses oleh sisi **Backend** di balik layar!

**Jawaban:**  
1. **Sisi Frontend:**
   - Menampilkan form input username dan password yang rapi kepada pengguna.
   - Melakukan validasi awal di browser (misal: memeriksa apakah kolom input sudah diisi atau masih kosong).
   - Menangkap data yang diketikkan user saat tombol "Login" ditekan, lalu membungkus data tersebut dan mengirimkannya (*HTTP POST Request*) ke alamat URL endpoint server backend.
2. **Sisi Backend:**
   - Menerima kiriman data username dan password dari frontend.
   - Mengamankan data (misalnya melakukan enkripsi/hashing password).
   - Menghubungi database perpustakaan untuk mengecek: *"Apakah ada pengguna dengan username dan password yang cocok?"*.
   - Jika cocok, backend membuat sesi login dan mengirimkan respon status sukses (beserta data hak akses pengguna) kembali ke browser.
   - Jika tidak cocok, backend mengirimkan pesan respon error (*"Username atau password salah"*), yang kemudian ditampilkan oleh frontend di layar.

---

### Soal 8
**Kategori:** Problem-Based / Analisis Kasus  
**Pertanyaan:**  
Seorang siswa RPL membuat file `index.html` yang berisi teks paragraf, heading, tabel nilai, dan beberapa tombol. Namun, ia sama sekali tidak menambahkan file CSS ataupun script JavaScript. Bagaimanakah tampilan dan fungsi halaman web tersebut saat dibuka di browser?

**Jawaban:**  
- **Tampilan:** Halaman web akan tampil dengan gaya bawaan (*default browser style*), yaitu latar belakang putih polos, teks berwarna hitam dengan font default (seperti Times New Roman), link berwarna biru bergaris bawah, tabel tanpa garis tebal yang indah, dan tata letak vertikal sederhana dari atas ke bawah tanpa tata letak modern/grid/warna.
- **Fungsi:** Struktur konten (teks, heading, tombol, tabel) tetap terbaca dan link tetap dapat diklik untuk berpindah halaman. Namun, halaman tersebut tidak memiliki interaktivitas tingkat lanjut (tidak ada validasi dinamis, animasi, modal popup, atau perubahan tampilan otomatis tanpa reload).

---

### Soal 9
**Kategori:** Pemahaman / Analisis  
**Pertanyaan:**  
Mengapa file HTML statis dapat langsung dibuka dan dijalankan di browser hanya dengan klik dua kali (*double click*) dari File Explorer lokal tanpa koneksi internet atau web server, sedangkan website dinamis seperti WordPress atau Laravel memerlukan web server lokal (seperti XAMPP / Apache / PHP Server)?

**Jawaban:**  
- File HTML statis murni berisi tag markup dan skrip klien yang dapat langsung diterjemahkan (*di-render*) secara mandiri oleh mesin peramban (*rendering engine browser*) di komputer lokal.
- Sementara itu, website dinamis (seperti PHP/Laravel/WordPress) berisi kode program sisi server (*server-side script*). Browser tidak mengerti kode PHP mentah. Kode tersebut harus dieksekusi terlebih dahulu oleh interpreter PHP dan web server (Apache/Nginx) untuk mengambil data dari database, lalu hasilnya diubah menjadi output HTML murni sebelum dikirimkan ke browser.

---

### Soal 10
**Kategori:** Problem-Based / Kasus Kolaborasi  
**Pertanyaan:**  
Tim Anda yang terdiri dari 3 orang siswa XI RPL mendapat tugas membuat proyek web profil sekolah. Setiap anggota mengerjakan halaman yang berbeda. Jika mereka hanya bertukar file menggunakan flashdisk, sering terjadi file tertimpa (*overwrite*) dan versi kode membingungkan. Solusi tool apa yang harus mereka gunakan, dan bagaimana cara kerjanya secara singkat?

**Jawaban:**  
- **Solusi Tool:** Menggunakan **Git** (sebagai *Version Control System*) yang diintegrasikan dengan **GitHub** (sebagai *Cloud Code Repository*).
- **Cara Kerja:**
  1. Membuat satu *repository* utama di GitHub untuk proyek website sekolah tersebut.
  2. Setiap anggota meng-klon (*clone*) repository tersebut ke laptop masing-masing dan membuat cabang kerja (*branch*) tersendiri untuk halaman yang dikerjakan.
  3. Setelah selesai mengedit di VS Code, anggota melakukan *commit* (mencatat riwayat perubahan) dan *push* ke GitHub.
  4. Seluruh kode digabungkan (*merge*) ke branch utama secara otomatis dan aman tanpa menimpa pekerjaan anggota lain.

---

# BAGIAN 2: PERTEMUAN 2 — STRUKTUR DASAR HTML, HEADING, PARAGRAF & FORMAT TEKS (NO. 11 – 20)

---

### Soal 11
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Apa kepanjangan dari **HTML** dan apa fungsi spesifik dari baris deklarasi `<!DOCTYPE html>` pada baris pertama dokumen HTML?

**Jawaban:**  
- **Kepanjangan HTML:** *HyperText Markup Language*.
- **Fungsi `<!DOCTYPE html>`:** Deklarasi dokumen tipe (*Document Type Declaration*) yang berfungsi memberi tahu web browser bahwa dokumen yang sedang dibaca menggunakan standar spesifikasi bahasa **HTML5**. Hal ini mencegah browser masuk ke dalam mode *quirks mode* (tampilan lawas) sehingga halaman dirender sesuai standar web modern.

---

### Soal 12
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Sebutkan dan jelaskan fungsi dari 4 komponen struktur hierarki utama pada dokumen HTML (yaitu `<!DOCTYPE html>`, `<html>`, `<head>`, dan `<body>`)!

**Jawaban:**  
1. `<!DOCTYPE html>`: Deklarasi tipe dokumen untuk memberitahu browser bahwa dokumen ini bertipe HTML5.
2. `<html lang="en">`: Elemen akar (*root element*) yang membungkus seluruh konten HTML dalam dokumen. Atribut `lang` menyatakan bahasa utama konten.
3. `<head>`: Bagian kepala dokumen yang memuat metadata, informasi konfigurasi mesin/browser (seperti `<meta charset="UTF-8">`, `<meta name="viewport">`), judul tab peramban (`<title>`), serta tautan file eksternal CSS dan font. Isinya tidak ditampilkan langsung di lembar kerja browser.
4. `<body>`: Bagian tubuh dokumen yang menampung seluruh elemen konten visual yang akan dilihat dan diakses langsung oleh pengunjung website (teks, gambar, tombol, link, tabel, video, form).

---

### Soal 13
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Bagaimana sintaks penulisan komentar dalam dokumen HTML? Mengapa komentar diperlukan dalam penulisan kode program dan apa shortcut di VS Code untuk membuatnya?

**Jawaban:**  
- **Sintaks Komentar:** `<!-- Tulis komentar di sini -->`
- **Tujuan / Fungsi:**
  1. Memberikan catatan/dokumentasi penjelas fungsi suatu blok kode bagi diri sendiri maupun pengembang lain.
  2. Menonaktifkan sementara baris kode tertentu saat proses uji coba (*debugging*) tanpa harus menghapusnya.
  3. Komentar tidak akan dieksekusi atau ditampilkan oleh browser ke layar pengguna.
- **Shortcut VS Code:** Tekan tombol `Ctrl + /` (Windows/Linux) atau `Cmd + /` (macOS).

---

### Soal 14
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Sebutkan rentang tingkatan tag **Heading** yang disediakan dalam HTML, serta sebutkan fungsi dari tag `<br>`, `<hr>`, dan `<pre>` yang sering digunakan bersamaan dengan teks/paragraf!

**Jawaban:**  
- **Tag Heading:** Terdiri dari 6 tingkatan, yaitu `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, hingga `<h6>`. `<h1>` memiliki ukuran paling besar/utama dan `<h6>` memiliki ukuran paling kecil.
- **Tag Pendukung:**
  - `<br>` (*Break*): Membuat baris baru (*line break*) di dalam teks tanpa membuat jarak paragraf baru (bersifat *self-closing* / tanpa tag penutup).
  - `<hr>` (*Horizontal Rule*): Membuat garis pembatas lurus mendatar secara horizontal untuk memisahkan topik/konten.
  - `<pre>` (*Preformatted Text*): Menampilkan teks dengan mempertahankan format aslinya (termasuk spasi beruntun, tabulasi, dan enter/pindah baris) menggunakan font *monospace*.

---

### Soal 15
**Kategori:** Konsep / Perbandingan Tag  
**Pertanyaan:**  
Jelaskan perbedaan fungsi visual maupun makna semantik dari pasangan tag format teks berikut:
1. `<b>` vs `<strong>`
2. `<i>` vs `<em>`
3. `<sub>` vs `<sup>`
4. `<del>` vs `<ins>`

**Jawaban:**  
1. `<b>` (*Bold*) hanya menebalkan teks secara visual tanpa memberikan makna khusus. Sedangkan `<strong>` menebalkan teks sekaligus memberi penegasan semantik bahwa teks tersebut memiliki tingkat kepentingan tinggi (*important text*) yang dibaca dengan penekanan oleh *screen reader*.
2. `<i>` (*Italic*) hanya memiringkan teks secara visual (misal untuk istilah asing). Sedangkan `<em>` (*Emphasized*) memiringkan teks dengan memberi nilai penekanan nada bicara (*stress emphasis*).
3. `<sub>` (*Subscript*) merendahkan posisi teks sedikit di bawah garis dasar huruf normal (contoh penulisan indeks kimia: $H_2O$). Sedangkan `<sup>` (*Superscript*) menaikkan posisi teks sedikit di atas garis normal (contoh penulisan pangkat/derajat: $x^2$, $100^\circ C$).
4. `<del>` (*Deleted*) menampilkan teks dengan garis coret horizontal di tengahnya untuk menandai teks yang dihapus/tidak berlaku lagi. Sedangkan `<ins>` (*Inserted*) menampilkan teks bergaris bawah untuk menandai teks baru yang disisipkan/ditambahkan.

---

### Soal 16
**Kategori:** Problem-Based / Debugging Kode  
**Pertanyaan:**  
Seorang siswa menuliskan kode HTML untuk halaman pertamanya seperti di bawah ini:
```html
<!DOCTYPE html>
<head>
  <title>Latihan HTML 1</title>
  <p>Selamat Datang di SMK 40</p>
</head>
</html>
```
Temukan 3 kesalahan fatal pada struktur kode di atas dan tuliskan perbaikan kodenya yang valid sesuai standar HTML5!

**Jawaban:**  
- **Analisis Kesalahan:**
  1. Tidak ada tag pembuka `<html>` setelah `<!DOCTYPE html>`.
  2. Tag `<p>` diletakkan di dalam `<head>`. Bagian `<head>` hanya untuk metadata dan judul, sedangkan elemen tampilan harus berada di dalam `<body>`.
  3. Tidak ada tag pembuka dan penutup `<body>...</body>`.
- **Perbaikan Kode yang Benar:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Latihan HTML 1</title>
</head>
<body>
  <p>Selamat Datang di SMK 40</p>
</body>
</html>
```

---

### Soal 17
**Kategori:** Problem-Based / Penulisan Kode  
**Pertanyaan:**  
Seorang guru IPA meminta siswa membuat artikel ilmiah sederhana pada web. Anda diminta menuliskan kode HTML untuk menampilkan dua rumus berikut:
1. Rumus fotosintesis dan kimia glukosa: $6CO_2 + 6H_2O \rightarrow C_6H_{12}O_6 + 6O_2$
2. Teorema Pythagoras: $a^2 + b^2 = c^2$
Tuliskan potongan kode HTML yang tepat menggunakan tag `<sub>` dan `<sup>`!

**Jawaban:**  
```html
<p>
  <strong>1. Rumus Kimia Glukosa:</strong><br>
  6CO<sub>2</sub> + 6H<sub>2</sub>O &rarr; C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub>
</p>

<p>
  <strong>2. Teorema Pythagoras:</strong><br>
  a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
</p>
```

---

### Soal 18
**Kategori:** Pemahaman Konsep & SEO  
**Pertanyaan:**  
Mengapa dalam satu halaman web artikel disarankan hanya memiliki satu buah tag `<h1>` dan tidak boleh melompati urutan hierarki heading (misal dari `<h1>` langsung meloncat ke `<h4>`)?

**Jawaban:**  
- **Optimalisasi Mesin Pencari (SEO):** Mesin pencari seperti Google menganggap `<h1>` sebagai topik utama paling penting dari seluruh halaman. Jika terdapat banyak `<h1>`, bot pencari akan kesulitan menentukan fokus inti artikel.
- **Aksesibilitas (*Accessibility*):** Pengguna tunanetra yang menggunakan alat pembaca layar (*screen reader*) mengandalkan navigasi struktur heading untuk melompat antar sub-bab. Melompati tingkatan heading (misal `<h1>` langsung ke `<h4>`) akan merusak hierarki outline dokumen dan membingungkan pengguna.
- **Kerapian Struktur Dokumen:** Heading berfungsi seperti daftar isi buku (`<h1>` = Judul Buku, `<h2>` = Bab, `<h3>` = Sub-bab). Mengikuti urutan membuat dokumen terstruktur rapi.

---

### Soal 19
**Kategori:** Problem-Based / Kasus  
**Pertanyaan:**  
Seorang siswa ingin menampilkan baris kode pemrograman Python berikut di halaman webnya:
```python
def sapa(nama):
    print("Halo, " + nama)
```
Jika menggunakan tag `<p>` biasa, spasi indentasi dan enter akan hilang menjadi satu baris mendatar. Tag apa yang harus digunakan agar format spasi dan barisnya tetap terjaga persis seperti aslinya? Tuliskan contoh kode HTML-nya!

**Jawaban:**  
Gunakan tag `<pre>` (*Preformatted Text*) yang dapat dikombinasikan dengan tag `<code>`.

```html
<pre>
<code>
def sapa(nama):
    print("Halo, " + nama)
</code>
</pre>
```
*Penjelasan:* Tag `<pre>` mempertahankan semua karakter *whitespace*, tab, dan *newline*, serta secara default dirender menggunakan font *monospace* (lebar karakter seragam) yang sangat cocok untuk menampilkan kode program atau puisi.

---

### Soal 20
**Kategori:** Problem-Based / Format Teks Gabungan  
**Pertanyaan:**  
Buatkan satu baris kode paragraf HTML lengkap untuk menampilkan teks pengumuman flash sale toko berikut:  
*"Promo Kilat! Dapatkan Sepatu Futsal dari harga normal <del>Rp 500.000</del> kini hanya **Rp 250.000** (Diskon 50%!). Catatan: Stok terbatas."*  
Dengan ketentuan:
- Kata "Promo Kilat!" diberi tanda stabilo/kuning (`<mark>`).
- Harga lama dicoret (`<del>`).
- Harga baru dicetak tebal penting (`<strong>`).
- Catatan dicetak dalam ukuran lebih kecil (`<small>`) dan miring (`<em>`).

**Jawaban:**  
```html
<p>
  <mark>Promo Kilat!</mark> Dapatkan Sepatu Futsal dari harga normal 
  <del>Rp 500.000</del> kini hanya <strong>Rp 250.000</strong> (Diskon 50%!). 
  <small><em>Catatan: Stok terbatas.</em></small>
</p>
```

---

# BAGIAN 3: PERTEMUAN 3 — HYPERLINK, GAMBAR, LIST & TABEL HTML (NO. 21 – 30)

---

### Soal 21
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Apa fungsi dari tag `<a>` dalam HTML dan sebutkan atribut wajib apa yang harus dicantumkan agar tautan tersebut dapat berfungsi saat diklik?

**Jawaban:**  
- **Fungsi Tag `<a>` (*Anchor*):** Digunakan untuk membuat tautan hiperteks (*hyperlink*) yang menghubungkan satu halaman web ke halaman web lainnya, berkas unduhan, alamat email, nomor telepon, atau bagian tertentu dalam halaman yang sama.
- **Atribut Wajib:** Atribut `href` (*Hypertext Reference*), yang berisi alamat URL atau path file tujuan yang akan dituju saat link diklik (contoh: `<a href="https://smk40.sch.id">Website Sekolah</a>`).

---

### Soal 22
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Jelaskan perbedaan antara **Internal Link** dan **External Link**, serta sebutkan 4 nilai (*value*) yang dapat diberikan pada atribut `target` di dalam tag `<a>`!

**Jawaban:**  
- **Internal Link:** Tautan yang mengarah ke halaman lain atau file lain yang masih berada di dalam satu domain/proyek website yang sama (contoh: `<a href="kontak.html">Hubungi Kami</a>`).
- **External Link:** Tautan yang mengarah ke alamat web domain lain di luar website tersebut (contoh: `<a href="https://wikipedia.org">Wikipedia</a>`).
- **Nilai Atribut `target`:**
  1. `_blank`: Membuka halaman tujuan di jendela/tab peramban baru.
  2. `_self` (Nilai Default): Membuka halaman tujuan di tab/jendela yang sama tempat link diklik.
  3. `_top`: Membuka dokumen tujuan pada seluruh bagian layar (menghilangkan semua frame).
  4. `_parent`: Membuka dokumen tujuan pada frame induk (*parent frame*).

---

### Soal 23
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Sebutkan tag yang digunakan untuk menyisipkan gambar pada HTML beserta atribut wajibnya! Jelaskan pula fungsi dari atribut `alt`, `width`, dan `height`!

**Jawaban:**  
- **Tag Gambar:** Tag `<img>` (merupakan *empty tag* / *void element* yang tidak memerlukan tag penutup `</img>`).
- **Atribut Wajib:** Atribut `src` (*source*), yang berisi path URL atau nama file gambar yang ingin ditampilkan.
- **Fungsi Atribut Tambahan:**
  - `alt` (*Alternative Text*): Menyediakan teks deskripsi pengganti jika gambar gagal dimuat (rusak/koneksi lambat) dan sangat penting untuk dibaca oleh *screen reader* (aksesibilitas) serta robot mesin pencari (SEO).
  - `width`: Menentukan lebar tampilan gambar dalam satuan piksel (px) atau persentase (%).
  - `height`: Menentukan tinggi tampilan gambar dalam satuan piksel (px) atau persentase (%).

---

### Soal 24
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Jelaskan perbedaan antara **Ordered List** dan **Unordered List** dalam HTML, serta sebutkan nilai-nilai atribut `type` yang didukung pada masing-masing jenis list tersebut!

**Jawaban:**  
- **Ordered List (`<ol>`):** Daftar item yang memiliki urutan terstruktur (seperti langkah-langkah kerja atau peringkat) menggunakan penomoran.
  - **Nilai atribut `type` pada `<ol>`:**
    - `1` (default): Angka desimal (1, 2, 3, ...)
    - `a`: Huruf alfabet kecil (a, b, c, ...)
    - `A`: Huruf alfabet kapital (A, B, C, ...)
    - `i`: Angka romawi kecil (i, ii, iii, ...)
    - `I`: Angka romawi kapital (I, II, III, ...)
- **Unordered List (`<ul>`):** Daftar item yang tidak bergantung pada urutan angka, melainkan menggunakan simbol peluru (*bullet points*).
  - **Nilai atribut `type` pada `<ul>`:**
    - `disc` (default): Simbol lingkaran hitam pekat.
    - `circle`: Simbol lingkaran berongga (hanya garis tepi).
    - `square`: Simbol kotak bujur sangkar hitam.
    - `none`: Menghilangkan simbol peluru.

---

### Soal 25
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Sebutkan 4 tag utama dalam penyusunan tabel HTML (`<table>`, `<tr>`, `<th>`, `<td>`) dan jelaskan perbedaan peran spesifik antara `<th>` dan `<td>`!

**Jawaban:**  
1. `<table>`: Elemen pembungkus utama yang mendefinisikan keseluruhan struktur tabel.
2. `<tr>` (*Table Row*): Mendefinisikan baris horizontal di dalam tabel.
3. `<th>` (*Table Header*): Mendefinisikan sel kepala kolom/header tabel. Teks di dalam `<th>` secara otomatis dicetak **tebal (bold)** dan diposisikan di **tengah (center)**.
4. `<td>` (*Table Data*): Mendefinisikan sel isi data standar tabel. Teks di dalam `<td>` secara default dicetak dengan ketebalan **normal** dan rata **kiri (left)**.

---

### Soal 26
**Kategori:** Problem-Based / Debugging Kode  
**Pertanyaan:**  
Perhatikan potongan kode berikut:
```html
<p>Kunjungi situs pencari <a href="https://google.com">Google</a>.</p>
<img src="gambar/logo.png">
```
Pengembang mendapati dua masalah:
1. Ketika link diklik, halaman website berpindah dan tab website lama tertutup.
2. Jika file `logo.png` tidak sengaja terhapus, muncul ikon gambar rusak tanpa penjelasan teks apapun, dan ukuran gambar tidak terkontrol.
Tuliskan perbaikan kode HTML di atas untuk mengatasi kedua masalah tersebut!

**Jawaban:**  
```html
<p>Kunjungi situs pencari <a href="https://google.com" target="_blank">Google</a>.</p>
<img src="gambar/logo.png" alt="Logo Resmi SMK Negeri 40" width="200" height="80">
```
*Penjelasan Perbaikan:*
- Menambahkan `target="_blank"` pada tag `<a>` agar tautan Google dibuka pada tab peramban baru.
- Menambahkan atribut `alt="Logo Resmi SMK Negeri 40"` sebagai teks alternatif deskriptif saat gambar gagal dimuat.
- Menambahkan atribut `width="200"` dan `height="80"` untuk mengunci dimensi gambar agar layout halaman tetap stabil (*tidak layout shifting*).

---

### Soal 27
**Kategori:** Problem-Based / Penulisan Kode  
**Pertanyaan:**  
Buatkan struktur kode HTML untuk menampilkan panduan resep membuat mie instan dengan ketentuan:
1. Menggunakan **Ordered List** dengan format penomoran **Romawi Kecil** (`type="i"`).
2. Memuat 3 langkah:
   - Rebus 400 ml air hingga mendidih.
   - Masukkan mie dan bumbu ke dalam mangkuk.
   - Tuangkan air panas ke mangkuk, aduk rata, dan sajikan.

**Jawaban:**  
```html
<h3>Panduan Memasak Mie Instan</h3>
<ol type="i">
  <li>Rebus 400 ml air hingga mendidih.</li>
  <li>Masukkan mie dan bumbu ke dalam mangkuk.</li>
  <li>Tuangkan air panas ke mangkuk, aduk rata, dan sajikan.</li>
</ol>
```

---

### Soal 28
**Kategori:** Problem-Based / Nested List  
**Pertanyaan:**  
Buatkan kode HTML untuk menampilkan struktur menu perlengkapan komputer berikut menggunakan kombinasi Unordered List (`<ul>`) bersarang (*nested list*):
- Perangkat Keras (Hardware)
  - Keyboard
  - Mouse
  - Monitor
- Perangkat Lunak (Software)
  - Sistem Operasi
  - Web Browser

**Jawaban:**  
```html
<ul>
  <li>Perangkat Keras (Hardware)
    <ul>
      <li>Keyboard</li>
      <li>Mouse</li>
      <li>Monitor</li>
    </ul>
  </li>
  <li>Perangkat Lunak (Software)
    <ul>
      <li>Sistem Operasi</li>
      <li>Web Browser</li>
    </ul>
  </li>
</ul>
```

---

### Soal 29
**Kategori:** Problem-Based / Penulisan Kode Tabel  
**Pertanyaan:**  
Buatkan kode HTML untuk membuat tabel daftar siswa kelas XI RPL dengan ketentuan:
- Baris pertama merupakan Header Tabel (`<th>`): **No**, **Nama Siswa**, **Jurusan**, dan **Nilai**.
- Baris kedua berisi data: `1`, `Ahmad Fauzi`, `RPL`, `90`.
- Baris ketiga berisi data: `2`, `Siti Nurhaliza`, `RPL`, `95`.
- Tabel memiliki atribut border `1`.

**Jawaban:**  
```html
<table border="1">
  <tr>
    <th>No</th>
    <th>Nama Siswa</th>
    <th>Jurusan</th>
    <th>Nilai</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Ahmad Fauzi</td>
    <td>RPL</td>
    <td>90</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Siti Nurhaliza</td>
    <td>RPL</td>
    <td>95</td>
  </tr>
</table>
```

---

### Soal 30
**Kategori:** Problem-Based / Analisis Struktur Tabel  
**Pertanyaan:**  
Perhatikan potongan kode tabel yang dibuat oleh seorang siswa berikut:
```html
<table border="1">
  <th>No</th>
  <th>Nama Barang</th>
  <th>Harga</th>
  <tr>
    <td>1</td>
    <td>Flashdisk 32GB</td>
    <td>Rp 65.000</td>
  </tr>
</table>
```
Jelaskan letak kesalahan sintaks pada pembuatan tabel di atas dan bagaimana dampak tampilannya di browser jika tidak diperbaiki!

**Jawaban:**  
- **Kesalahan Sintaks:** Elemen `<th>` ditulis langsung di bawah `<table>` tanpa dibungkus oleh baris tabel `<tr>` (`Table Row`). Semua sel di dalam tabel HTML (`<th>` maupun `<td>`) wajib berada di dalam tag pembungkus baris `<tr>...</tr>`.
- **Dampak di Browser:** Browser akan berusaha melakukan koreksi otomatis (*auto-correction*), namun struktur tabel menjadi tidak standar dan dapat mengakibatkan tata letak baris pertama menjadi berantakan, perataan kolom tidak sejajar (*misaligned*), serta gagal divalidasi oleh W3C Validator.
- **Koreksi:**
```html
<table border="1">
  <tr>
    <th>No</th>
    <th>Nama Barang</th>
    <th>Harga</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Flashdisk 32GB</td>
    <td>Rp 65.000</td>
  </tr>
</table>
```

---

# BAGIAN 4: PERTEMUAN 4 — FORM, INPUT TYPES, ATRIBUT & KONTROL FORM (NO. 31 – 40)

---

### Soal 31
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Apa pengertian dari elemen **Form** pada HTML dan mengapa elemen form merupakan bagian yang sangat krusial dalam interaksi aplikasi web?

**Jawaban:**  
- **Pengertian Form:** Form adalah elemen HTML (didefinisikan dengan tag `<form>`) yang berfungsi sebagai wadah untuk mengumpulkan masukan (*input data*) dari pengguna di sisi klien (*client-side*).
- **Alasan Krusial:** Form menjadi jembatan komunikasi dua arah antara pengguna dan server web. Tanpa form, website hanya bersifat searah (hanya membaca). Form memungkinkan interaksi penting seperti autentikasi (login/register), pencarian data, transaksi perbankan/e-commerce, pengisian kuesioner, dan pengunggahan berkas (*file upload*).

---

### Soal 32
**Kategori:** Konsep / Perbandingan  
**Pertanyaan:**  
Jelaskan perbedaan mendasar antara metode pengiriman form **`GET`** dan **`POST`** pada atribut `method` di tag `<form>`! Kapan masing-masing metode tersebut sebaiknya digunakan?

**Jawaban:**  
| Aspek | Method `GET` | Method `POST` |
| :--- | :--- | :--- |
| **Pengiriman Data** | Data input dikirimkan secara terbuka dengan menggabungkannya pada akhir alamat URL (*query string*, contoh: `search.php?keyword=buku`). | Data dikirimkan secara tertutup di dalam badan permintaan (*HTTP Request Body*), tidak terlihat di URL. |
| **Keamanan** | **Kurang Aman** untuk data sensitif karena terekam di riwayat (*history*) browser. | **Lebih Aman** untuk data sensitif/rahasia (password, nomor kartu kredit, token). |
| **Batasan Ukuran** | Memiliki batasan panjang karakter di URL (sekitar 2048 karakter). | Tidak memiliki batasan ukuran tertentu (bisa untuk upload file besar). |
| **Skenario Tepat** | Form pencarian (*Search Bar*), filter data, navigasi halaman (bisa di-bookmark). | Form Login, Register Akun, Transaksi Finansial, Form Tambah/Ubah Data. |

---

### Soal 33
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Sebutkan minimal 6 jenis nilai atribut `type` pada elemen `<input>` beserta fungsinya masing-masing!

**Jawaban:**  
1. `type="text"`: Menampung masukan satu baris teks biasa (nama, alamat singkat).
2. `type="password"`: Menampung teks kata sandi dengan menyamarkan karakter menjadi simbol titik-titik (*bullet/asterisk*) demi privasi.
3. `type="email"`: Menampung input alamat surel dan otomatis melakukan validasi format email (wajib memiliki tanda `@` dan domain).
4. `type="number"`: Menampung input berupa angka/bilangan dengan tombol panah naik/turun (*stepper*).
5. `type="date"`: Menampilkan pemilih kalender tanggal (*date picker*) interaktif.
6. `type="radio"`: Menampilkan pilihan opsi tunggal (hanya 1 dari beberapa pilihan yang dapat dipilih).
7. `type="checkbox"`: Menampilkan kotak centang untuk pilihan ganda (dapat memilih lebih dari satu opsi sekaligus).
8. `type="file"`: Menyediakan tombol untuk memilih dan mengunggah berkas dari penyimpanan lokal komputer/ponsel.

---

### Soal 34
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Kapan kita harus menggunakan tag `<textarea>` dan tag `<select>` daripada menggunakan tag `<input>` biasa? Sebutkan atribut penting pada `<textarea>`!

**Jawaban:**  
- **Penggunaan `<textarea>`:** Digunakan ketika form membutuhkan masukan teks panjang yang terdiri dari banyak baris (*multi-line*), seperti penulisan alamat lengkap, pesan kritik/saran, artikel, atau kolom komentar.
  - *Atribut Penting:* `rows` (menentukan jumlah baris/tinggi kotak) dan `cols` (menentukan jumlah kolom/lebar karakter).
- **Penggunaan `<select>`:** Digunakan untuk menyajikan menu pilihan dalam bentuk daftar tarik-turun (*dropdown list*) menggunakan elemen anak `<option>`. Sangat efisien menghemat ruang tampilan layar dibanding menampilkan belasan radio button.

---

### Soal 35
**Kategori:** Konsep / Perbandingan Atribut  
**Pertanyaan:**  
Jelaskan perbedaan fungsi dan perilaku dari pasangan atribut input form berikut:
1. `placeholder` vs `value`
2. `disabled` vs `readonly`
3. `required` vs `maxlength`

**Jawaban:**  
1. `placeholder` menampilkan teks petunjuk/petunjuk abu-abu samar yang akan otomatis hilang saat pengguna mulai mengetik (bukan data yang dikirim). Sedangkan `value` menetapkan nilai bawaan (*default value*) riil yang tersimpan di dalam input dan akan ikut terkirim ke server saat disubmit.
2. `disabled` membuat input menjadi nonaktif/abu-abu, tidak bisa diklik, tidak bisa difokuskan, dan datanya **tidak akan dikirim** ke server saat form disubmit. Sedangkan `readonly` membuat input hanya bisa dibaca (tidak bisa diubah isinya), namun tetap bisa difokuskan dan datanya **tetap terkirim** ke server.
3. `required` mewajibkan pengguna mengisi field tersebut sebelum form dapat disubmit (akan muncul peringatan jika kosong). Sedangkan `maxlength` membatasi jumlah maksimum karakter huruf/angka yang boleh diketikkan oleh user.

---

### Soal 36
**Kategori:** Problem-Based / Aksesibilitas (A11y)  
**Pertanyaan:**  
Mengapa sangat disarankan menggunakan tag `<label>` dengan atribut `for` yang dihubungkan ke `id` elemen `<input>`, daripada hanya menuliskan teks biasa di samping kotak input? Tuliskan contoh kodenya!

**Jawaban:**  
- **Alasan Aksesibilitas & Kenyamanan:**
  1. **Meningkatkan Aksesibilitas:** Membantu pengguna tuna netra yang menggunakan *screen reader* agar peranti pembaca dapat mengumumkan dengan jelas label apa yang sedang diisi oleh fokus kursor.
  2. **Memperluas Area Sentuh (Usability):** Ketika label teks diklik oleh mouse atau jari pada layar sentuh, kursor secara otomatis langsung aktif (*fokus*) masuk ke dalam kotak input terkait, atau langsung mencentang opsi checkbox/radio.
- **Contoh Kode yang Benar:**
```html
<label for="input-email">Alamat Email:</label>
<input type="email" id="input-email" name="user_email" placeholder="nama@email.com">
```

---

### Soal 37
**Kategori:** Problem-Based / Debugging Kode  
**Pertanyaan:**  
Seorang siswa membuat form pemilihan jenis kelamin dengan kode HTML berikut:
```html
<p>Pilih Jenis Kelamin:</p>
<input type="radio" name="pria" value="L"> Laki-laki
<input type="radio" name="wanita" value="P"> Perempuan
```
Ketika form diuji, pengguna mendapati bug: kedua pilihan radio button dapat dipilih secara bersamaan (*keduanya tercentang*).  
Jelaskan penyebab terjadinya masalah tersebut dan tuliskan kode perbaikannya!

**Jawaban:**  
- **Penyebab Masalah:** Nilai atribut `name` pada kedua elemen `<input type="radio">` berbeda (`name="pria"` dan `name="wanita"`). Radio button dalam HTML hanya saling terikat (*mutually exclusive*) dan mengizinkan satu pilihan jika semua opsi berada dalam satu grup dengan nilai atribut `name` yang **sama persis**.
- **Kode Perbaikan:**
```html
<p>Pilih Jenis Kelamin:</p>
<label>
  <input type="radio" name="gender" value="L"> Laki-laki
</label>
<label>
  <input type="radio" name="gender" value="P"> Perempuan
</label>
```

---

### Soal 38
**Kategori:** Problem-Based / Penulisan Kode Form  
**Pertanyaan:**  
Buatkan kode HTML untuk form pencarian artikel blog yang mengarah ke `cari.php` dengan ketentuan:
- Menggunakan metode HTTP `GET`.
- Terdapat input pencarian teks dengan `placeholder="Ketik kata kunci artikel..."` dan wajib diisi (`required`).
- Terdapat tombol `submit` bertuliskan "Cari Data" dan tombol `reset` bertuliskan "Batal/Kosongkan".

**Jawaban:**  
```html
<form action="cari.php" method="GET">
  <label for="keyword">Pencarian:</label>
  <input type="text" id="keyword" name="q" placeholder="Ketik kata kunci artikel..." required>
  
  <button type="submit">Cari Data</button>
  <button type="reset">Batal/Kosongkan</button>
</form>
```

---

### Soal 39
**Kategori:** Problem-Based / Kasus Form Keamanan  
**Pertanyaan:**  
Anda diminta membuat form autentikasi login akun siswa SMK 40 yang mengarah ke pemrosesan `proses_login.php`. Form harus memiliki:
1. Input NIS/Username (wajib diisi, maksimal 15 karakter).
2. Input Password (wajib diisi, karakter tersembunyi).
3. Pilihan dropdown peran (*Role*): `Siswa` dan `Guru`.
4. Tombol kirim bertuliskan "Masuk ke Sistem".  
Tuliskan kode HTML lengkap dengan pemilihan atribut `method` yang paling aman!

**Jawaban:**  
```html
<form action="proses_login.php" method="POST">
  <div>
    <label for="username">NIS / Username:</label><br>
    <input type="text" id="username" name="username" maxlength="15" placeholder="Masukkan NIS" required>
  </div>
  <br>
  <div>
    <label for="password">Kata Sandi:</label><br>
    <input type="password" id="password" name="password" placeholder="Masukkan Password" required>
  </div>
  <br>
  <div>
    <label for="role">Masuk Sebagai:</label><br>
    <select id="role" name="role" required>
      <option value="">-- Pilih Peran --</option>
      <option value="siswa">Siswa</option>
      <option value="guru">Guru</option>
    </select>
  </div>
  <br>
  <button type="submit">Masuk ke Sistem</button>
</form>
```
*Catatan:* Menggunakan `method="POST"` agar kata sandi pengguna tidak terekspos pada URL bar peramban.

---

### Soal 40
**Kategori:** Problem-Based / Analisis Pengiriman Data  
**Pertanyaan:**  
Seorang developer pemula menguji form pendaftaran berikut:
```html
<form action="simpan.php" method="POST">
  <input type="text" id="nama_lengkap" placeholder="Masukkan Nama" required>
  <button type="submit">Daftar</button>
</form>
```
Ketika tombol "Daftar" ditekan, server `simpan.php` tidak menerima data nama sama sekali (`$_POST['nama_lengkap']` bernilai *undefined/null*). Atribut penting apa yang terlupa pada tag `<input>` tersebut dan jelaskan fungsinya dalam pengiriman data ke server!

**Jawaban:**  
- **Atribut yang Terlupa:** Atribut **`name`** (misalnya: `name="nama_lengkap"`).
- **Penjelasan Fungsi:** Atribut `id` hanya berfungsi sebagai pengenal unik di sisi klien (*browser/CSS/JS/label*), sedangkan atribut `name` adalah variabel/kunci (*key*) pengenal yang dikirimkan oleh browser ke server backend dalam format pasangan `key=value`. Tanpa atribut `name`, browser mengabaikan nilai input tersebut dan tidak akan menyertakannya dalam paket data pengiriman HTTP Request.
- **Koreksi:**
```html
<input type="text" id="nama_lengkap" name="nama_lengkap" placeholder="Masukkan Nama" required>
```

---

# BAGIAN 5: PERTEMUAN 6 — LAYOUT, BLOCK VS INLINE, DIV & SPAN, CLASS & ID, SEMANTIK HTML5 (NO. 41 – 50)

---

### Soal 41
**Kategori:** Konsep / Hafalan  
**Pertanyaan:**  
Apa yang dimaksud dengan **Layout** dalam halaman web dan sebutkan 4 alasan utama mengapa perancangan tata letak (*layouting*) yang baik sangat penting!

**Jawaban:**  
- **Pengertian Layout:** Layout adalah proses penyusunan, pembagian, dan penataan elemen-elemen visual (header, menu, konten, sidebar, footer) di dalam halaman web agar terstruktur rapi, proporsional, dan mudah dipahami.
- **4 Alasan Penting:**
  1. **Kerapian dan Keterbacaan:** Membantu pengguna menavigasi dan menyerap informasi dengan nyaman (*User Experience*).
  2. **Kemudahan Styling CSS:** Mempermudah desainer web dalam mengatur posisi (*flexbox, grid, margin, padding*).
  3. **Optimasi Mesin Pencari (SEO):** Membantu robot mesin pencari memahami struktur konten utama dan prioritas halaman.
  4. **Aksesibilitas (A11y):** Memudahkan pengguna berkebutuhan khusus dan *screen reader* mengenali bagian-bagian halaman.

---

### Soal 42
**Kategori:** Konsep / Perbandingan  
**Pertanyaan:**  
Jelaskan perbedaan mendasar antara **Elemen Block** (*Block-level Elements*) dan **Elemen Inline** (*Inline Elements*) dalam HTML, serta berikan masing-masing 3 contoh tag-nya!

**Jawaban:**  
| Aspek | Elemen Block (*Block-level*) | Elemen Inline (*Inline*) |
| :--- | :--- | :--- |
| **Baris Baru** | Selalu memulai pada baris baru (*new line*). | Tidak membuat baris baru; mengalir menyatu dengan teks di sekitarnya. |
| **Lebar (*Width*)** | Secara default membentang selebar layar/induknya (*full width 100%*). | Lebarnya hanya menyesuaikan ukuran panjang konten teks/media di dalamnya. |
| **Penyusunan** | Menumpuk elemen lain ke bawah. | Berjajar secara horizontal dari kiri ke kanan. |
| **Contoh Tag** | `<div>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<ol>`, `<table>`, `<form>`, `<section>`. | `<span>`, `<a>`, `<img>`, `<b>`, `<i>`, `<strong>`, `<label>`, `<mark>`. |

---

### Soal 43
**Kategori:** Konsep / Perbandingan Wadah Generik  
**Pertanyaan:**  
Jelaskan perbedaan fungsi antara elemen `<div>` dan elemen `<span>`! Kapan seorang pengembang sebaiknya menggunakan `<div>` dan kapan sebaiknya menggunakan `<span>`?

**Jawaban:**  
- **Elemen `<div>` (*Division*):** Merupakan elemen generik bertipe **block-level**. Digunakan sebagai kontainer/wadah besar untuk membungkus dan mengelompokkan sekumpulan elemen HTML (paragraf, judul, form, kartu produk) agar dapat ditata posisinya dan diberi gaya (*styling*) melalui CSS.
- **Elemen `<span>`:** Merupakan elemen generik bertipe **inline**. Digunakan untuk membungkus sebagian kecil kata/frasa di tengah-tengah kalimat/paragraf tanpa merusak aliran baris teks, biasanya untuk memberikan warna teks, font khusus, atau ikon tertentu.

---

### Soal 44
**Kategori:** Konsep / Hafalan Selektor  
**Pertanyaan:**  
Jelaskan perbedaan mendasar antara atribut **`class`** dan atribut **`id`** pada elemen HTML! Bagaimana aturan penulisan simbol selektor CSS untuk masing-masing atribut tersebut?

**Jawaban:**  
- **Atribut `class`:**
  - Digunakan untuk menandai sekelompok elemen HTML yang memiliki karakteristik/tampilan serupa.
  - Bersifat *reusable* (bisa digunakan berulang kali oleh banyak elemen berbeda dalam satu dokumen).
  - Satu elemen dapat memiliki lebih dari satu nama class (dipisahkan spasi, misal: `class="btn btn-primary"`).
  - Di CSS, selektor class ditulis diawali dengan **tanda titik (`.`)**, contoh: `.kartu-berita { background: #eee; }`.
- **Atribut `id`:**
  - Digunakan untuk memberikan identitas unik khusus pada **satu elemen saja**.
  - Nilai `id` **tidak boleh duplikat** (hanya boleh ada 1 elemen dengan id tersebut dalam satu halaman).
  - Di CSS, selektor id ditulis diawali dengan **tanda pagar (`#`)**, contoh: `#header-utama { height: 80px; }`.

---

### Soal 45
**Kategori:** Konsep / Hafalan Semantik  
**Pertanyaan:**  
Sebutkan 6 tag semantik tata letak yang diperkenalkan pada **HTML5** beserta fungsi peruntukan areanya masing-masing!

**Jawaban:**  
1. `<header>`: Menampung bagian kepala halaman atau bagian atas artikel (biasanya berisi logo website, judul halaman, atau slogan).
2. `<nav>` (*Navigation*): Menampung kumpulan menu navigasi atau tautan menu utama website.
3. `<main>`: Menampung konten utama dan terpenting dari sebuah halaman web (hanya boleh ada satu `<main>` per halaman).
4. `<section>`: Mendefinisikan sebuah bagian/seksi tematik dari suatu halaman (seperti seksi "Tentang Kami", "Layanan", "Testimoni").
5. `<article>`: Membungkus konten mandiri dan independen yang dapat berdiri sendiri atau didistribusikan ulang (seperti artikel berita, postingan blog, ulasan produk).
6. `<aside>`: Menampung konten pendamping/sampingan (*sidebar*) yang berkaitan secara tidak langsung dengan konten utama (seperti daftar artikel populer, iklan, profil penulis).
7. `<footer>`: Menampung bagian kaki/bawah website (berisi hak cipta/copyright, link kebijakan privasi, informasi kontak, dan tautan sosial media).

---

### Soal 46
**Kategori:** Pemahaman Konsep & SEO  
**Pertanyaan:**  
Mengapa menggunakan tag semantik HTML5 (seperti `<header>`, `<nav>`, `<article>`) jauh lebih dianjurkan daripada menyusun layout hanya menggunakan kumpulan tag `<div>` bertingkat (*div soup*, misal: `<div id="header">`, `<div class="menu">`)?

**Jawaban:**  
- **Makna Semantik (*Semantic Meaning*):** Tag `<div>` tidak memiliki makna (*non-semantic*). Penggunaan tag semantik memberikan konteks arti yang jelas kepada browser dan mesin pencari mengenai fungsi dari setiap bagian halaman.
- **Peningkatan SEO (*Search Engine Optimization*):** Bot perayap (*crawler*) Google dapat langsung membedakan mana konten utama artikel (`<article>`) dan mana menu pendukung (`<nav>`) atau catatan kaki (`<footer>`), sehingga pengindeksan peringkat web menjadi jauh lebih akurat.
- **Aksesibilitas Lebih Baik:** Perangkat lunak pembaca layar (*screen reader*) dapat memberikan opsi pintasan langsung bagi penyandang disabilitas (misal: langsung melompat ke `<main>` tanpa harus membaca ulang `<header>` dan `<nav>`).
- **Keterbacaan dan Perawatan Kode (*Maintainability*):** Kode menjadi jauh lebih bersih, rapi, terstruktur, dan mudah dipahami oleh tim pengembang saat melakukan *code review*.

---

### Soal 47
**Kategori:** Problem-Based / Debugging Validasi Kode  
**Pertanyaan:**  
Perhatikan potongan kode HTML berikut:
```html
<div id="kotak-info">
  <h2 id="judul">Pengumuman Kelulusan</h2>
  <p id="teks-deskripsi">Diumumkan pada hari Senin.</p>
</div>

<div id="kotak-info">
  <h2 id="judul">Jadwal Ujian Remedial</h2>
  <p id="teks-deskripsi">Dilaksanakan di Lab RPL.</p>
</div>
```
Jelaskan kesalahan fatal apa yang terdapat pada kode di atas menurut standar W3C dan perbaikilah kodenya agar sesuai standar pemrograman web!

**Jawaban:**  
- **Kesalahan Fatal:** Terdapat duplikasi nilai atribut `id` (`id="kotak-info"`, `id="judul"`, dan `id="teks-deskripsi"` digunakan lebih dari satu kali). Standar HTML menyatakan bahwa atribut `id` harus bersifat unik secara global di dalam satu dokumen. Penggunaan `id` ganda akan menyebabkan kegagalan manipulasi JavaScript (`document.getElementById()`) dan inkonsistensi styling.
- **Solusi Perbaikan:** Mengubah atribut `id` yang berulang menjadi atribut **`class`**, serta menggunakan tag semantik seperti `<article>`:
```html
<article class="kotak-info">
  <h2 class="judul">Pengumuman Kelulusan</h2>
  <p class="teks-deskripsi">Diumumkan pada hari Senin.</p>
</article>

<article class="kotak-info">
  <h2 class="judul">Jadwal Ujian Remedial</h2>
  <p class="teks-deskripsi">Dilaksanakan di Lab RPL.</p>
</article>
```

---

### Soal 48
**Kategori:** Problem-Based / Penulisan Kode Inline Styling  
**Pertanyaan:**  
Anda memiliki kalimat dalam paragraf:  
*"Siswa XI RPL SMK Negeri 40 Jakarta wajib menguasai bahasa pemrograman web."*  
Anda ingin memberi penanda khusus pada kata **"SMK Negeri 40 Jakarta"** agar berwarna biru dan berlatar belakang abu-abu terang tanpa membuat baris baru.  
Tuliskan kode HTML yang tepat menggunakan elemen `<span>` dengan atribut class/style!

**Jawaban:**  
```html
<p>
  Siswa XI RPL <span style="color: #0056b3; background-color: #f0f0f0; padding: 2px 6px; border-radius: 4px;">SMK Negeri 40 Jakarta</span> wajib menguasai bahasa pemrograman web.
</p>
```
*Atau menggunakan pemisahan class:*
```html
<p>
  Siswa XI RPL <span class="teks-sorot">SMK Negeri 40 Jakarta</span> wajib menguasai bahasa pemrograman web.
</p>
```

---

### Soal 49
**Kategori:** Problem-Based / Penulisan Kerangka Layout Semantik  
**Pertanyaan:**  
Buatkan sebuah struktur kerangka halaman web portal berita sekolah yang lengkap dan semantik menggunakan tag HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)!

**Jawaban:**  
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Berita SMK 40</title>
</head>
<body>

  <!-- Bagian Header Website -->
  <header>
    <h1>Portal Berita SMK Negeri 40</h1>
    <p>Pusat Informasi dan Prestasi Siswa RPL</p>
  </header>

  <!-- Bagian Navigasi Menu -->
  <nav>
    <ul>
      <li><a href="#beranda">Beranda</a></li>
      <li><a href="#prestasi">Prestasi</a></li>
      <li><a href="#kegiatan">Kegiatan</a></li>
      <li><a href="#kontak">Kontak</a></li>
    </ul>
  </nav>

  <!-- Bagian Konten Utama -->
  <main>
    <!-- Artikel Utama -->
    <article>
      <h2>Siswa RPL Juara 1 Lomba Web Design Nasional</h2>
      <p>Dipublikasikan pada: 17 Agustus 2026 oleh Admin</p>
      <p>Tim siswa jurusan Rekayasa Perangkat Lunak berhasil menorehkan prestasi membanggakan...</p>
    </article>

    <!-- Sidebar Pendamping -->
    <aside>
      <h3>Pengumuman Terpopuler</h3>
      <ul>
        <li>Jadwal Asesmen Semester Genap</li>
        <li>Pendaftaran Magang Industri 2026</li>
      </ul>
    </aside>
  </main>

  <!-- Bagian Kaki Website -->
  <footer>
    <p>&copy; 2026 SMK Negeri 40 Jakarta. All Rights Reserved.</p>
  </footer>

</body>
</html>
```

---

### Soal 50
**Kategori:** Problem-Based / Desain Komponen Antarmuka  
**Pertanyaan:**  
Sebuah toko buku online memiliki bagian halaman yang menampilkan 3 kartu produk (*product card*). Setiap kartu berisi:
1. Foto sampul buku
2. Judul buku
3. Harga buku
4. Tombol "Beli Sekarang"
Gambarkan struktur kode HTML untuk 1 buah kartu produk tersebut menggunakan pengelompokan elemen kontainer (`<div>` atau `<article>`), serta tentukan elemen mana saja yang tergolong *block* dan mana yang tergolong *inline*!

**Jawaban:**  
```html
<!-- Kartu Produk Menggunakan Tag Semantik Article / Div -->
<article class="card-produk">
  <img src="gambar/buku-html.jpg" alt="Buku Pemrograman Web Modern" width="180" height="240">
  <h3 class="judul-buku">Mastering HTML5 & CSS3</h3>
  <p class="harga">Rp 95.000</p>
  <button type="button" class="btn-beli">Beli Sekarang</button>
</article>
```
- **Analisis Kategori Elemen:**
  - **Elemen Block:** `<article>` (kontainer kartu), `<h3>` (judul buku), dan `<p>` (teks harga) — karena masing-masing menempati satu baris penuh dan mendorong elemen berikutnya ke baris bawah.
  - **Elemen Inline:** `<img>` (gambar sampul) dan `<button>` (tombol beli) — karena secara bawaan hanya mengambil lebar sesuai konten dan dapat berdampingan dengan elemen inline lainnya.
