/* Bank soal Pertemuan 17 — Percabangan (Conditional) */
window.BANK = window.BANK || {};
window.BANK['17'] = {
  judul: 'Percabangan',

  /* Praktik dari slide + studi kasus terpandu (tidak dinilai) */
  latihan: {
    p1: {
      id: 'p1',
      judul: 'Praktik 1 — Gerbang Roller Coaster Ekstrem',
      soal: '<p class="content-text">Kamu programmer sistem pengecekan otomatis di gerbang <strong>Wahana Roller Coaster Ekstrem</strong>. Data pengunjung sudah tersedia di Data Input: <code>tinggiBadan</code> (cm), <code>usia</code> (tahun), dan <code>punyaTiketVIP</code> (true/false).</p>' +
        '<ol class="task-list">' +
        '<li><strong>Syarat 1 (Jalur Reguler):</strong> boleh naik jika tinggi badan minimal 130 cm <strong>DAN</strong> usia minimal 12 tahun → tampilkan <code>Silakan naik! (jalur reguler)</code></li>' +
        '<li><strong>Syarat 2 (Jalur VIP):</strong> jika syarat reguler tidak terpenuhi, tetap boleh naik asalkan punya tiket VIP → tampilkan <code>Silakan naik! (jalur VIP)</code></li>' +
        '<li><strong>Syarat 3 (Ditolak):</strong> jika keduanya tidak terpenuhi → tampilkan <code>Maaf, kamu belum boleh naik wahana.</code></li></ol>' +
        '<p class="content-text">Kodemu diuji dengan beberapa pengunjung berbeda. Coba ganti data uji lewat menu di panel Data Input.</p>',
      input: { tinggiBadan: 140, usia: 13, punyaTiketVIP: false },
      starter: '// Cek syarat 1 (reguler), syarat 2 (VIP), lalu syarat 3 (ditolak)\n',
      solusi: 'if (tinggiBadan >= 130 && usia >= 12) {\n  console.log("Silakan naik! (jalur reguler)");\n} else if (punyaTiketVIP) {\n  console.log("Silakan naik! (jalur VIP)");\n} else {\n  console.log("Maaf, kamu belum boleh naik wahana.");\n}',
      petunjuk: [
        'Syarat 1 memakai dua kondisi yang harus benar semua → operator <code>&amp;&amp;</code>.',
        'Urutannya: <code>if</code> (reguler) → <code>else if</code> (VIP) → <code>else</code> (ditolak).',
        '<code>punyaTiketVIP</code> sudah boolean, jadi cukup tulis <code>else if (punyaTiketVIP)</code>.'
      ],
      syarat: [
        { nama: 'Memakai if', pola: /\bif\s*\(/ },
        { nama: 'Memakai operator && untuk syarat reguler', pola: /&&/ }
      ],
      tes: [
        { nama: 'Tinggi 140, usia 13, tanpa VIP', output: ['Silakan naik! (jalur reguler)'] },
        { nama: 'Tinggi 125, usia 10, punya VIP', input: { tinggiBadan: 125, usia: 10, punyaTiketVIP: true }, output: ['Silakan naik! (jalur VIP)'] },
        { nama: 'Tinggi 125, usia 14, tanpa VIP', input: { tinggiBadan: 125, usia: 14, punyaTiketVIP: false }, output: ['Maaf, kamu belum boleh naik wahana.'] },
        { nama: 'Tinggi 135, usia 11, tanpa VIP', input: { tinggiBadan: 135, usia: 11, punyaTiketVIP: false }, output: ['Maaf, kamu belum boleh naik wahana.'] },
        { nama: 'Pas di batas: tinggi 130, usia 12', input: { tinggiBadan: 130, usia: 12, punyaTiketVIP: false }, output: ['Silakan naik! (jalur reguler)'] },
        { nama: 'Lolos reguler sekaligus punya VIP', input: { tinggiBadan: 150, usia: 20, punyaTiketVIP: true }, output: ['Silakan naik! (jalur reguler)'] }
      ]
    },
    p2: {
      id: 'p2',
      judul: 'Praktik 2 — Ubah if-else Jadi Ternary',
      soal: '<p class="content-text">Kode di editor masih memakai <code>if-else</code>. Ubah menjadi <strong>operator ternary</strong> dengan output yang sama persis, misalnya <code>7 adalah bilangan GANJIL</code>. Variabel <code>angka</code> sudah ada di Data Input. Setelah selesai, <strong>tidak boleh ada <code>if</code></strong> lagi di kodemu.</p>',
      input: { angka: 7 },
      starter: 'if (angka % 2 === 0) {\n  console.log(`${angka} adalah bilangan GENAP`);\n} else {\n  console.log(`${angka} adalah bilangan GANJIL`);\n}',
      solusi: 'const jenis = angka % 2 === 0 ? "GENAP" : "GANJIL";\nconsole.log(`${angka} adalah bilangan ${jenis}`);',
      petunjuk: [
        'Bentuk ternary: <code>kondisi ? nilaiJikaBenar : nilaiJikaSalah</code>',
        'Simpan hasilnya ke variabel, misalnya <code>const jenis = angka % 2 === 0 ? "GENAP" : "GANJIL";</code>, lalu tampilkan dengan template literal.'
      ],
      syarat: [
        { nama: 'Memakai operator ternary ( ? : )', pola: /\?[^?:]+:/ },
        { nama: 'Tidak memakai if lagi', pola: /\bif\b/, tidak: true, pesan: 'Hapus if-else, ganti seluruhnya dengan ternary.' }
      ],
      tes: [
        { nama: 'angka = 7', output: ['7 adalah bilangan GANJIL'] },
        { nama: 'angka = 10', input: { angka: 10 }, output: ['10 adalah bilangan GENAP'] },
        { nama: 'angka = 0', input: { angka: 0 }, output: ['0 adalah bilangan GENAP'] }
      ]
    },
    p3: {
      id: 'p3',
      jenis: 'studi-kasus',
      judul: 'Kasir Toko — Versi Dasar',
      soal: '<p class="content-text">Data belanja ada di Data Input: <code>totalBelanja</code> (angka) dan <code>isMember</code> (true/false). Aturan diskon toko:</p>' +
        '<ol class="task-list"><li>Belanja minimal <strong>100000</strong> → diskon <strong>10%</strong> (berlaku untuk semua pembeli).</li>' +
        '<li>Kalau belum sampai 100000 tapi <strong>member</strong> → diskon <strong>5%</strong>.</li>' +
        '<li>Selain itu → diskon <strong>0%</strong>.</li></ol>' +
        '<p class="content-text">Tampilkan tepat 2 baris, contoh untuk belanja 150000:</p>' +
        '<pre class="snippet">Diskon: 10%\nBayar: 135000</pre>',
      input: { totalBelanja: 150000, isMember: false },
      starter: 'let diskon = 0;\n\n// Tentukan diskon dengan if / else if\n\n\n// Hitung yang harus dibayar, lalu tampilkan 2 baris\n',
      solusi: 'let diskon = 0;\n\nif (totalBelanja >= 100000) {\n  diskon = 10;\n} else if (isMember) {\n  diskon = 5;\n}\n\nconst bayar = totalBelanja - (totalBelanja * diskon / 100);\nconsole.log(`Diskon: ${diskon}%`);\nconsole.log(`Bayar: ${bayar}`);',
      petunjuk: [
        'Siapkan <code>let diskon = 0;</code>, lalu ubah nilainya di dalam <code>if</code> / <code>else if</code>.',
        'Potongan harga = <code>totalBelanja * diskon / 100</code>.',
        'Diskon tidak ditumpuk: member yang belanja 100000 tetap 10%, bukan 15%.'
      ],
      syarat: [{ nama: 'Memakai if', pola: /\bif\s*\(/ }],
      tes: [
        { nama: 'Belanja 150000, bukan member', output: ['Diskon: 10%', 'Bayar: 135000'] },
        { nama: 'Belanja 80000, member', input: { totalBelanja: 80000, isMember: true }, output: ['Diskon: 5%', 'Bayar: 76000'] },
        { nama: 'Belanja 80000, bukan member', input: { totalBelanja: 80000, isMember: false }, output: ['Diskon: 0%', 'Bayar: 80000'] },
        { nama: 'Belanja 100000, member (tidak ditumpuk)', input: { totalBelanja: 100000, isMember: true }, output: ['Diskon: 10%', 'Bayar: 90000'] }
      ]
    }
  },

  /* Tantangan (dinilai) */
  tantangan: [
    {
      id: 't1',
      jenis: 'tantangan',
      judul: 'Predikat & Status Kelulusan',
      soal: '<p class="content-text">Data Input berisi <code>nilai</code> dan <code>kehadiran</code> (persen). Tampilkan <strong>2 baris</strong>:</p>' +
        '<ol class="task-list"><li><code>Predikat: A</code> jika nilai ≥ 90, <code>B</code> jika ≥ 80, <code>C</code> jika ≥ 70, selain itu <code>D</code>.</li>' +
        '<li><code>Status: LULUS</code> jika nilai ≥ 75 <strong>dan</strong> kehadiran ≥ 80, selain itu <code>Status: TIDAK LULUS</code>.</li></ol>' +
        '<pre class="snippet">Predikat: B\nStatus: LULUS</pre>',
      input: { nilai: 85, kehadiran: 90 },
      starter: '// Baris 1: predikat (else if)\n\n// Baris 2: status kelulusan (&&)\n',
      solusi: 'if (nilai >= 90) {\n  console.log("Predikat: A");\n} else if (nilai >= 80) {\n  console.log("Predikat: B");\n} else if (nilai >= 70) {\n  console.log("Predikat: C");\n} else {\n  console.log("Predikat: D");\n}\n\nif (nilai >= 75 && kehadiran >= 80) {\n  console.log("Status: LULUS");\n} else {\n  console.log("Status: TIDAK LULUS");\n}',
      petunjuk: [
        'Urutkan kondisi predikat dari yang paling tinggi (≥ 90) ke yang paling rendah.',
        'Status adalah percabangan terpisah dengan kondisi <code>nilai &gt;= 75 &amp;&amp; kehadiran &gt;= 80</code>.'
      ],
      syarat: [
        { nama: 'Memakai else if', pola: /\belse\s+if\b/ },
        { nama: 'Memakai operator &&', pola: /&&/ }
      ],
      tes: [
        { nama: 'Nilai 85, hadir 90', output: ['Predikat: B', 'Status: LULUS'] },
        { nama: 'Nilai 95, hadir 70', input: { nilai: 95, kehadiran: 70 }, output: ['Predikat: A', 'Status: TIDAK LULUS'] },
        { nama: 'Nilai 72, hadir 95', input: { nilai: 72, kehadiran: 95 }, output: ['Predikat: C', 'Status: TIDAK LULUS'] },
        { nama: 'Nilai 60, hadir 100', input: { nilai: 60, kehadiran: 100 }, output: ['Predikat: D', 'Status: TIDAK LULUS'] },
        { nama: 'Pas di batas: nilai 75, hadir 80', input: { nilai: 75, kehadiran: 80 }, output: ['Predikat: C', 'Status: LULUS'] },
        { nama: 'Pas di batas: nilai 90, hadir 80', input: { nilai: 90, kehadiran: 80 }, output: ['Predikat: A', 'Status: LULUS'] }
      ]
    },
    {
      id: 't2',
      jenis: 'tantangan',
      judul: 'Harga Tiket Bioskop',
      soal: '<p class="content-text">Data Input berisi <code>hari</code> (teks, misal <code>"Sabtu"</code>) dan <code>umur</code>. Tentukan harga tiket memakai <strong><code>switch</code></strong>:</p>' +
        '<ul class="task-list"><li><code>"Sabtu"</code> atau <code>"Minggu"</code> → 50000</li><li><code>"Jumat"</code> → 40000</li><li>hari lainnya → 35000</li></ul>' +
        '<p class="content-text">Anak-anak (umur <strong>di bawah 12</strong>) cukup bayar <strong>setengah harga</strong>. Tampilkan satu baris, contoh:</p>' +
        '<pre class="snippet">Harga tiket: 35000</pre>',
      input: { hari: 'Senin', umur: 16 },
      starter: 'let harga = 0;\n\n// Tentukan harga berdasarkan hari (switch)\n\n\n// Anak di bawah 12 tahun bayar setengah harga\n\n\nconsole.log(`Harga tiket: ${harga}`);',
      solusi: 'let harga = 0;\n\nswitch (hari) {\n  case "Sabtu":\n  case "Minggu":\n    harga = 50000;\n    break;\n  case "Jumat":\n    harga = 40000;\n    break;\n  default:\n    harga = 35000;\n}\n\nif (umur < 12) {\n  harga = harga / 2;\n}\n\nconsole.log(`Harga tiket: ${harga}`);',
      petunjuk: [
        'Sabtu dan Minggu harganya sama, jadi dua <code>case</code> boleh ditumpuk tanpa <code>break</code> di antaranya.',
        'Jangan lupa <code>break;</code> di akhir setiap kelompok case, dan <code>default</code> untuk hari lainnya.',
        'Setelah switch, cek umur: <code>if (umur &lt; 12) { harga = harga / 2; }</code>'
      ],
      syarat: [{ nama: 'Memakai switch', pola: /\bswitch\s*\(/ }],
      tes: [
        { nama: 'Senin, umur 16', output: ['Harga tiket: 35000'] },
        { nama: 'Sabtu, umur 10 (anak)', input: { hari: 'Sabtu', umur: 10 }, output: ['Harga tiket: 25000'] },
        { nama: 'Jumat, umur 30', input: { hari: 'Jumat', umur: 30 }, output: ['Harga tiket: 40000'] },
        { nama: 'Minggu, umur 12 (bukan anak lagi)', input: { hari: 'Minggu', umur: 12 }, output: ['Harga tiket: 50000'] },
        { nama: 'Rabu, umur 8 (anak)', input: { hari: 'Rabu', umur: 8 }, output: ['Harga tiket: 17500'] }
      ]
    },
    {
      id: 't3',
      jenis: 'studi-kasus',
      judul: 'Kasir Toko Lengkap: Member & Voucher',
      soal: '<p class="content-text">Lanjutan studi kasus kasir. Data Input: <code>totalBelanja</code>, <code>isMember</code> (true/false), dan <code>kodeVoucher</code> (teks, bisa kosong <code>""</code>).</p>' +
        '<ol class="task-list">' +
        '<li><strong>Diskon member:</strong> total ≥ 200000 → 10%, total ≥ 100000 → 5%, selain itu 0%.</li>' +
        '<li><strong>Diskon bukan member:</strong> total ≥ 300000 → 5%, selain itu 0%.</li>' +
        '<li><strong>Voucher</strong> (dicek setelah diskon): kalau <code>kodeVoucher</code> kosong tampilkan <code>Voucher: -</code>. Kalau isinya <code>"HEMAT10"</code> potong lagi 10000 dan tampilkan <code>Voucher: HEMAT10 (-10000)</code>. Kode lainnya → <code>Voucher: tidak valid</code>.</li>' +
        '<li>Baris terakhir: <code>Total bayar: ...</code></li></ol>' +
        '<p class="content-text">Contoh output untuk belanja 250000, member, tanpa voucher:</p>' +
        '<pre class="snippet">Diskon: 10%\nVoucher: -\nTotal bayar: 225000</pre>',
      input: { totalBelanja: 250000, isMember: true, kodeVoucher: '' },
      starter: 'let diskon = 0;\n\n// 1 & 2. Tentukan diskon (nested if: member atau bukan?)\n\n\nlet bayar = totalBelanja - (totalBelanja * diskon / 100);\nconsole.log(`Diskon: ${diskon}%`);\n\n// 3. Cek voucher (ingat truthy/falsy untuk string kosong)\n\n\n// 4. Tampilkan total bayar\n',
      solusi: 'let diskon = 0;\n\nif (isMember) {\n  if (totalBelanja >= 200000) {\n    diskon = 10;\n  } else if (totalBelanja >= 100000) {\n    diskon = 5;\n  }\n} else if (totalBelanja >= 300000) {\n  diskon = 5;\n}\n\nlet bayar = totalBelanja - (totalBelanja * diskon / 100);\nconsole.log(`Diskon: ${diskon}%`);\n\nif (!kodeVoucher) {\n  console.log("Voucher: -");\n} else if (kodeVoucher === "HEMAT10") {\n  bayar = bayar - 10000;\n  console.log("Voucher: HEMAT10 (-10000)");\n} else {\n  console.log("Voucher: tidak valid");\n}\n\nconsole.log(`Total bayar: ${bayar}`);',
      petunjuk: [
        'Cabang pertama: <code>if (isMember) { ... } else { ... }</code>, lalu di dalamnya cek <code>totalBelanja</code> (nested if).',
        'String kosong <code>""</code> itu falsy, jadi <code>if (!kodeVoucher)</code> artinya "voucher kosong".',
        'Bandingkan kode voucher dengan <code>===</code>, dan kurangi <code>bayar</code> setelah diskon dihitung.'
      ],
      syarat: [
        { nama: 'Memakai if', pola: /\bif\s*\(/ },
        { nama: 'Membandingkan voucher dengan ===', pola: /===/ }
      ],
      tes: [
        { nama: 'Member 250000, tanpa voucher', output: ['Diskon: 10%', 'Voucher: -', 'Total bayar: 225000'] },
        { nama: 'Member 150000, HEMAT10', input: { totalBelanja: 150000, isMember: true, kodeVoucher: 'HEMAT10' }, output: ['Diskon: 5%', 'Voucher: HEMAT10 (-10000)', 'Total bayar: 132500'] },
        { nama: 'Bukan member 150000, HEMAT10', input: { totalBelanja: 150000, isMember: false, kodeVoucher: 'HEMAT10' }, output: ['Diskon: 0%', 'Voucher: HEMAT10 (-10000)', 'Total bayar: 140000'] },
        { nama: 'Bukan member 350000, voucher salah', input: { totalBelanja: 350000, isMember: false, kodeVoucher: 'DISKON50' }, output: ['Diskon: 5%', 'Voucher: tidak valid', 'Total bayar: 332500'] },
        { nama: 'Member 80000, tanpa voucher', input: { totalBelanja: 80000, isMember: true, kodeVoucher: '' }, output: ['Diskon: 0%', 'Voucher: -', 'Total bayar: 80000'] },
        { nama: 'Member pas 200000, HEMAT10', input: { totalBelanja: 200000, isMember: true, kodeVoucher: 'HEMAT10' }, output: ['Diskon: 10%', 'Voucher: HEMAT10 (-10000)', 'Total bayar: 170000'] }
      ]
    }
  ],

  /* Kuis (dinilai) */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Kondisi di dalam <code>if ( )</code> pada akhirnya selalu dibaca sebagai nilai bertipe…',
      opsi: ['string', 'number', 'boolean (`true`/`false`)', 'undefined'],
      jawab: 2,
      bahas: 'Percabangan menjalankan blok kode hanya jika kondisinya <code>true</code>. Hasil operator perbandingan seperti <code>suhu &gt; 30</code> adalah boolean.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const suhu = 25;\n\nif (suhu > 30) {\n  console.log("Cuaca panas, minum yang banyak!");\n}\n\nconsole.log("Program selesai.");',
      opsi: ['Cuaca panas, minum yang banyak!', 'Program selesai.', 'Tidak ada output', 'Error'],
      jawab: 1,
      cekOutput: true,
      bahas: '<code>25 &gt; 30</code> bernilai <code>false</code>, jadi blok if dilewati. Baris setelah if tetap dijalankan.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'const nilai = 85;\n\nif (nilai >= 90) {\n  console.log("Predikat A");\n} else if (nilai >= 80) {\n  console.log("Predikat B");\n} else if (nilai >= 70) {\n  console.log("Predikat C");\n} else {\n  console.log("Predikat D");\n}',
      jawab: ['Predikat B'],
      cekOutput: true,
      bahas: '<code>85 &gt;= 90</code> false, lalu <code>85 &gt;= 80</code> true → blok "Predikat B" dijalankan dan sisanya dilewati.'
    },
    {
      tipe: 'pg',
      tanya: 'Urutan kondisinya terbalik! Apa output kode ini?',
      kode: 'const nilai = 95;\n\nif (nilai >= 70) {\n  console.log("Predikat C");\n} else if (nilai >= 80) {\n  console.log("Predikat B");\n} else if (nilai >= 90) {\n  console.log("Predikat A");\n}',
      opsi: ['Predikat A', 'Predikat B', 'Predikat C', 'Predikat A, B, dan C'],
      jawab: 2,
      cekOutput: true,
      bahas: '<code>else if</code> diperiksa dari atas dan berhenti di kondisi <code>true</code> pertama. <code>95 &gt;= 70</code> sudah true, jadi yang tampil "Predikat C". Urutkan dari kondisi paling ketat!'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const umur = 15;\nconst didampingiOrtu = false;\n\nif (umur >= 17 || didampingiOrtu) {\n  console.log("Silakan masuk, selamat menonton!");\n} else {\n  console.log("Maaf, tidak diperbolehkan masuk.");\n}',
      opsi: ['Silakan masuk, selamat menonton!', 'Maaf, tidak diperbolehkan masuk.', 'Tidak ada output', 'Kedua kalimat tampil'],
      jawab: 1,
      cekOutput: true,
      bahas: '<code>||</code> butuh salah satu kondisi true. <code>15 &gt;= 17</code> false dan <code>didampingiOrtu</code> juga false, jadi masuk ke <code>else</code>.'
    },
    {
      tipe: 'bs',
      tanya: '<code>else</code> boleh ditulis sendirian tanpa didahului <code>if</code>.',
      jawab: false,
      bahas: '<code>else</code> adalah jalur alternatif dari sebuah <code>if</code>, jadi harus selalu menempel setelah blok if (atau else if).'
    },
    {
      tipe: 'pg',
      tanya: 'Manakah nilai yang termasuk <strong>falsy</strong>?',
      opsi: ['`"0"`', '`0`', '`"false"`', '`" "` (string berisi spasi)'],
      jawab: 1,
      bahas: 'Nilai falsy hanya: <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. String <code>"0"</code>, <code>"false"</code>, dan <code>" "</code> tidak kosong, jadi truthy.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'let nama = "Rani";\n\nif (nama) {\n  console.log("Halo " + nama);\n} else {\n  console.log("Nama kosong");\n}',
      jawab: ['Halo Rani'],
      cekOutput: true,
      bahas: 'String yang tidak kosong bernilai truthy, jadi blok if dijalankan.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'let nilai = 70;\nlet hasil = nilai >= 75 ? "Lulus" : "Remedial";\nconsole.log(hasil);',
      opsi: ['Lulus', 'Remedial', 'true', 'false'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Kondisi <code>70 &gt;= 75</code> false, jadi ternary mengambil nilai setelah tanda <code>:</code>, yaitu "Remedial".'
    },
    {
      tipe: 'pg',
      tanya: 'Hati-hati, ada jebakan! Apa output kode ini?',
      kode: 'let suhu = 20;\n\nif (suhu > 30); {\n  console.log("Panas!");\n}',
      opsi: ['Tidak ada output', 'Panas!', 'Error', 'undefined'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Titik koma setelah <code>if (...)</code> mengakhiri if-nya. Blok <code>{ }</code> di bawahnya jadi blok biasa yang <strong>selalu</strong> dijalankan.'
    },
    {
      tipe: 'pg',
      tanya: 'Ada <code>break</code> yang lupa ditulis. Apa output kode ini?',
      kode: 'let hari = 2;\n\nswitch (hari) {\n  case 1:\n    console.log("Senin");\n  case 2:\n    console.log("Selasa");\n  case 3:\n    console.log("Rabu");\n    break;\n  default:\n    console.log("Hari lain");\n}',
      opsi: ['Selasa', 'Selasa\nRabu', 'Selasa\nRabu\nHari lain', 'Senin\nSelasa\nRabu'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: '<code>switch</code> mulai dari <code>case 2</code>, lalu terus "jatuh" ke case berikutnya sampai bertemu <code>break</code>. Itu sebabnya "Rabu" ikut tampil.'
    },
    {
      tipe: 'bs',
      tanya: 'Kode <code>if (nilai = 100)</code> membandingkan apakah nilai sama dengan 100.',
      jawab: false,
      bahas: 'Satu tanda <code>=</code> adalah <strong>penugasan</strong>: nilai diubah menjadi 100 dan kondisinya jadi truthy. Untuk membandingkan, pakai <code>===</code>.'
    },
    {
      tipe: 'susun',
      tanya: 'Susun baris kode agar menampilkan <code>Genap</code> jika <code>angka</code> habis dibagi 2, dan <code>Ganjil</code> jika tidak.',
      baris: ['if (angka % 2 === 0) {', '  console.log("Genap");', '} else {', '  console.log("Ganjil");', '}'],
      bahas: 'Blok <code>if</code> berisi aksi saat kondisi true, lalu <code>} else {</code> membuka jalur untuk kondisi false, dan <code>}</code> menutupnya.'
    }
  ]
};
