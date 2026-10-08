# LATIHAN KODING
## Soal 1 — Luas & Keliling Persegi Panjang (Aritmatika)

Simpan ukuran berikut, lalu hitung luas dan kelilingnya.

javascript
```
const panjang = 12;
const lebar = 8;

Tampilkan dengan template literal, contoh format:

Panjang: 12 cm, Lebar: 8 cm
Luas: ... cm²
Keliling: ... cm
```
Setelah berhasil, ganti nilai panjang dan lebar dengan angka lain dan pastikan hasilnya ikut berubah.

> Yang harus dikumpulkan : screenshot rumus dan hasil luas serta keliling

## Soal 2 — Struk Belanja Kantin (Aritmatika + Perbandingan)
javascript
```
const hargaNasi = 12000;
const hargaEsTeh = 4000;
const hargaKerupuk = 2500;

const jumlahNasi = 2;
const jumlahEsTeh = 3;
const jumlahKerupuk = 4;

const uangBayar = 50000;
```
Kerjakan:

1. Hitung subtotal tiap menu (harga × jumlah)
2. Hitung total belanja
3. Hitung kembalian (uangBayar dikurangi total)
4. Buat variabel "uangCukup" yang menyimpan hasil perbandingan apakah uangBayar lebih besar atau sama dengan total
5. Tampilkan struk lengkap dengan template literal

contoh:
"Total harga dari semuannya adalah {total}, kembaliannya berjumlah {kembalian}. Uang cukup bernilai {uangCukup} "

Uji kembali dengan uangBayar = 40000. Amati nilai kembalian dan uangCukup.

> Yang dikumpulkan : Screenshot hasil print di console

## Soal 3 — Mutasi Tabungan (Operator Penugasan)
javascript

```
let saldo = 200000;
```
Lakukan secara berurutan hanya dengan operator penugasan (+=, -=, /=, *=), dan tampilkan saldo setelah setiap langkah:

1. Setor Rp50.000
2. Tarik Rp75.000
3. Saldo dibagi rata ke 5 pos tabungan
4. Saldo pos pertama digandakan oleh bonus (kali 2)

> Yang dikumpulkan: tampilan semua rekening saldo ke 5 pos

## Soal 4 — Genap, Ganjil & Kelipatan (Modulus + Perbandingan)
javascript
```
const angka = 36;
```
Tampilkan hasil boolean (true/false) untuk:

- Apakah angka genap?
- Apakah angka kelipatan 5?
- Apakah angka kelipatan 6?

Petunjuk: sebuah angka adalah kelipatan n jika sisa baginya terhadap n sama dengan 0.

Uji ulang dengan angka = 45 dan angka = 7.

> Yang dikumpulkan: Penjelasan apakah angka-angka tersebut bernilai ganjil/genap

## Soal 5 — Konversi Menit ke Jam (Aritmatika + Modulus)
javascript
```
const totalMenit = 135;
```
Hitung berapa jam dan berapa sisa menit, lalu tampilkan: 135 menit = 2 jam 15 menit.

Petunjuk:

- Sisa menit bisa dicari dengan operator %
- Jumlah jam = (total menit dikurangi sisa menit) dibagi 60

Uji ulang dengan totalMenit = 200 dan totalMenit = 59.

## Soal 6 — Skor & Nyawa Game (Increment/Decrement + Perbandingan)
javascript
```
let skor = 0;
let nyawa = 3;
```
Lakukan secara berurutan, tampilkan skor dan nyawa setelah tiap langkah:

1. Pemain mengumpulkan 3 koin (gunakan skor++ sebanyak 3 kali)
2. Pemain mengalahkan musuh: skor bertambah 10 (gunakan +=)
3. Pemain terkena serangan: nyawa--
4. Tampilkan hasil perbandingan: apakah nyawa masih lebih besar dari 0?
5. Pemain terkena serangan dua kali lagi (nyawa-- dua kali)
6. Tampilkan lagi hasil perbandingan nomor 4

> Yang dikumpulkan: Hasil langkah ke 4 dan ke 6

## Soal 7 — Perbandingan Data Nilai (Operator Perbandingan)
javascript
```
const nilaiBudi = 82;
const nilaiAni = 90;
const kkm = 75;
const inputKkm = "75";   // data dari form, bertipe string
```

Tampilkan hasil (true/false) dari perbandingan berikut, beserta keterangan singkat:

1. Nilai Budi lebih besar atau sama dengan KKM
2. Nilai Ani lebih besar daripada nilai Budi
3. Nilai Budi sama dengan nilai Ani (===)
4. Nilai Budi tidak sama dengan nilai Ani (!==)
5. Selisih nilai Ani dan Budi sama dengan 8
6. kkm dibandingkan dengan inputKkm memakai ==
7. kkm dibandingkan dengan inputKkm memakai ===

Tuliskan satu lagi keterangan kenapa nomor 6 dan 7 hasilnya berbeda.

> Yang dikumpulkan: tampilan hasil perbandingan tiap nomor
