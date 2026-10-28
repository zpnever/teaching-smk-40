/* Bank soal Pertemuan 19 — Function */
(function () {
'use strict';
window.BANK = window.BANK || {};
window.BANK['19'] = {
  judul: 'Function',

  /* Praktik dari slide (tidak dinilai) */
  latihan: {
    p1: {
      id: 'p1',
      judul: 'Praktik 1 — Function panggilNama',
      soal: '<p class="content-text">Buat function bernama <code>panggilNama</code> yang menampilkan nama kalian. Lalu panggil <strong>10 kali</strong> (boleh pakai looping).</p>',
      starter: '// 1. Buat function panggilNama\n\n// 2. Panggil 10 kali\n',
      solusi: 'function panggilNama() {\n  console.log("Danu");\n}\n\nfor (let i = 1; i <= 10; i++) {\n  panggilNama();\n}',
      petunjuk: [
        'Buat dulu: <code>function panggilNama() { console.log("Nama kamu"); }</code>',
        'Memanggil function wajib pakai tanda kurung: <code>panggilNama();</code>',
        'Supaya tidak menulis 10 baris, pakai <code>for (let i = 1; i &lt;= 10; i++) { ... }</code>'
      ],
      syarat: [
        { nama: 'Membuat function panggilNama', pola: /function\s+panggilNama\s*\(|(const|let)\s+panggilNama\s*=/ }
      ],
      tes: [
        {
          nama: 'panggilNama() menampilkan 1 baris nama',
          panggil: 'panggilNama()',
          cek: function (ctx) {
            var l = ctx.hasilLogs || [];
            if (l.length !== 1) return 'Sekali dipanggil, panggilNama() harus menampilkan tepat 1 baris (sekarang ' + l.length + ' baris).';
            return l[0].trim() ? true : 'Baris yang ditampilkan masih kosong.';
          }
        },
        {
          nama: 'Output program: nama tampil 10 kali',
          cek: function (ctx) {
            var l = ctx.logs;
            if (l.length !== 10) return 'Output harus tepat 10 baris, sekarang ' + l.length + ' baris.';
            for (var i = 1; i < l.length; i++) if (l[i] !== l[0]) return 'Ke-10 baris harus sama (hasil memanggil function yang sama).';
            return true;
          }
        }
      ]
    },
    p2: {
      id: 'p2',
      judul: 'Praktik 2 — Function penjumlahan',
      soal: '<p class="content-text">Buat function <code>penjumlahan</code> dengan 3 parameter (<code>nilai1</code>, <code>nilai2</code>, <code>nilai3</code>). Output-nya adalah hasil penjumlahan dari 3 nilai parameter tersebut. Coba panggil dengan beberapa argument berbeda.</p>',
      starter: 'function penjumlahan() {\n  // tampilkan hasil penjumlahan ketiga nilai\n}\n\npenjumlahan(1, 2, 3);\n',
      solusi: 'function penjumlahan(nilai1, nilai2, nilai3) {\n  console.log(nilai1 + nilai2 + nilai3);\n}\n\npenjumlahan(1, 2, 3);\npenjumlahan(10, 20, 30);',
      petunjuk: [
        'Tulis ketiga parameter di dalam kurung, dipisah koma: <code>function penjumlahan(nilai1, nilai2, nilai3)</code>',
        'Di dalam function: <code>console.log(nilai1 + nilai2 + nilai3);</code>'
      ],
      syarat: [
        { nama: 'Punya 3 parameter: nilai1, nilai2, nilai3', pola: /penjumlahan\s*(=\s*(function\s*)?)?\(\s*nilai1\s*,\s*nilai2\s*,\s*nilai3\s*\)/ }
      ],
      tes: [
        { nama: 'penjumlahan(1, 2, 3) → 6', panggil: 'penjumlahan(1, 2, 3)', cek: cekJumlah(6) },
        { nama: 'penjumlahan(10, 20, 30) → 60', panggil: 'penjumlahan(10, 20, 30)', cek: cekJumlah(60) },
        { nama: 'penjumlahan(-5, 5, 2.5) → 2.5', panggil: 'penjumlahan(-5, 5, 2.5)', cek: cekJumlah(2.5) }
      ]
    },
    p3: {
      id: 'p3',
      judul: 'Praktik 3 — return kuadrat',
      soal: '<ol class="task-list">' +
        '<li>Buat function <code>kuadrat(angka)</code> yang <strong>me-return</strong> hasil <code>angka * angka</code>.</li>' +
        '<li>Uji dengan angka <code>13</code> dan <code>43</code>, lalu buat dua variabel yang menampung hasil kedua nilai tersebut.</li>' +
        '<li>Tampilkan hasil kuadrat serta hasil penjumlahan dari kedua nilai yang sudah dikuadratkan.</li></ol>',
      starter: 'function kuadrat(angka) {\n  // return hasil angka * angka\n}\n\n// simpan hasil kuadrat(13) dan kuadrat(43) ke variabel\n\n// tampilkan kedua hasil dan jumlahnya\n',
      solusi: 'function kuadrat(angka) {\n  return angka * angka;\n}\n\nconst hasil1 = kuadrat(13);\nconst hasil2 = kuadrat(43);\n\nconsole.log(hasil1);\nconsole.log(hasil2);\nconsole.log(hasil1 + hasil2);',
      petunjuk: [
        'Di dalam function tulis <code>return angka * angka;</code> — bukan <code>console.log</code>.',
        'Tampung hasilnya: <code>const hasil1 = kuadrat(13);</code>',
        'Jumlahkan dua variabel: <code>console.log(hasil1 + hasil2);</code> → 2018'
      ],
      tes: [
        { nama: 'kuadrat(13) me-return 169', panggil: 'kuadrat(13)', hasil: 169 },
        { nama: 'kuadrat(43) me-return 1849', panggil: 'kuadrat(43)', hasil: 1849 },
        { nama: 'kuadrat(5) me-return 25', panggil: 'kuadrat(5)', hasil: 25 },
        { nama: 'Output memuat 169, 1849, dan jumlahnya 2018', mengandung: ['169', '1849', '2018'] }
      ]
    },
    p4: {
      id: 'p4',
      judul: 'Praktik 4 — Arrow function + default parameter',
      soal: '<p class="content-text">Buat function <code>perkenalan</code> menggunakan <strong>arrow function</strong>, berisi 3 parameter (<code>nama</code>, <code>umur</code>, <code>kelas</code>). Pada parameter <code>kelas</code> buat nilai default <code>"XI RPL"</code>. Uji dengan:</p>' +
        '<pre class="snippet">perkenalan("Nama kalian", "Umur kalian", "XI RPL");\nperkenalan("Nama bestie kalian", "Umur bestie kalian");</pre>',
      starter: '// const perkenalan = ...\n\n',
      solusi: 'const perkenalan = (nama, umur, kelas = "XI RPL") => {\n  console.log(`Halo, saya ${nama}, umur ${umur} tahun, kelas ${kelas}.`);\n};\n\nperkenalan("Danu", 16, "XI RPL");\nperkenalan("Aini", 17);',
      petunjuk: [
        'Bentuk arrow function: <code>const perkenalan = (nama, umur, kelas) =&gt; { ... };</code>',
        'Default parameter ditulis langsung di parameternya: <code>kelas = "XI RPL"</code>'
      ],
      syarat: [
        { nama: 'Memakai arrow function', pola: /perkenalan\s*=\s*\([^)]*\)\s*=>/ },
        { nama: 'kelas punya nilai default "XI RPL"', pola: /kelas\s*=\s*["'`]XI RPL["'`]/ }
      ],
      tes: [
        { nama: 'Output minimal 2 baris (dua kali dipanggil)', minBaris: 2 },
        { nama: 'perkenalan("Tes", 17) → memakai kelas default XI RPL', panggil: 'perkenalan("Tes", 17)', cek: cekIsi(['Tes', '17', 'XI RPL']) },
        { nama: 'perkenalan("Rara", 16, "XII TKJ") → kelas ikut argument', panggil: 'perkenalan("Rara", 16, "XII TKJ")', cek: cekIsi(['Rara', '16', 'XII TKJ']) }
      ]
    }
  },

  /* Tantangan (dinilai) */
  tantangan: [
    {
      id: 't1',
      jenis: 'tantangan',
      judul: 'Konverter Waktu ke Detik',
      soal: '<p class="content-text">Buat <strong>arrow function</strong> <code>keDetik(jam, menit, detik)</code> yang <strong>me-return</strong> total waktu dalam detik. Parameter <code>menit</code> dan <code>detik</code> punya nilai default <code>0</code>, jadi function tetap bisa dipanggil dengan 1 atau 2 argument saja.</p>' +
        '<pre class="snippet">keDetik(1)        // 3600\nkeDetik(1, 30)    // 5400\nkeDetik(0, 2, 5)  // 125</pre>',
      starter: '// const keDetik = ...\n\n\n// uji sendiri:\n// console.log(keDetik(1, 30));\n',
      solusi: 'const keDetik = (jam, menit = 0, detik = 0) => jam * 3600 + menit * 60 + detik;\n\nconsole.log(keDetik(1));\nconsole.log(keDetik(1, 30));\nconsole.log(keDetik(0, 2, 5));',
      petunjuk: [
        '1 jam = 3600 detik, 1 menit = 60 detik.',
        'Default parameter: <code>(jam, menit = 0, detik = 0)</code>',
        'Arrow function satu baris langsung return: <code>const f = (a, b) =&gt; a * b;</code>'
      ],
      syarat: [
        { nama: 'Memakai arrow function', pola: /keDetik\s*=\s*\(?[^=)]*(=[^)]*)?\)?\s*=>/ },
        { nama: 'menit dan detik punya default 0', pola: /menit\s*=\s*0[\s\S]*detik\s*=\s*0/ }
      ],
      tes: [
        { nama: 'keDetik(1) → 3600', panggil: 'keDetik(1)', hasil: 3600 },
        { nama: 'keDetik(1, 30) → 5400', panggil: 'keDetik(1, 30)', hasil: 5400 },
        { nama: 'keDetik(0, 2, 5) → 125', panggil: 'keDetik(0, 2, 5)', hasil: 125 },
        { nama: 'keDetik(2, 0, 1) → 7201', panggil: 'keDetik(2, 0, 1)', hasil: 7201 },
        { nama: 'keDetik(0, 0, 59) → 59', panggil: 'keDetik(0, 0, 59)', hasil: 59 }
      ]
    },
    {
      id: 't2',
      jenis: 'studi-kasus',
      judul: 'Rapor Otomatis dengan 3 Function',
      soal: '<p class="content-text">Wali kelas ingin rapor dibuat otomatis. Pecah programnya menjadi 3 function yang saling memanggil:</p>' +
        '<ol class="task-list">' +
        '<li><code>hitungNilaiAkhir(tugas, uts, uas)</code> → return nilai akhir dengan bobot <strong>Tugas 30%, UTS 30%, UAS 40%</strong>.</li>' +
        '<li><code>tentukanPredikat(nilai)</code> → return <code>"A"</code> jika nilai ≥ 90, <code>"B"</code> jika ≥ 80, <code>"C"</code> jika ≥ 70, selain itu <code>"D"</code>.</li>' +
        '<li><code>rapor(nama, tugas, uts, uas)</code> → <strong>memanggil kedua function di atas</strong>, lalu return teks seperti <code>"Budi mendapat predikat B"</code>.</li></ol>',
      starter: 'function hitungNilaiAkhir(tugas, uts, uas) {\n  \n}\n\nfunction tentukanPredikat(nilai) {\n  \n}\n\nfunction rapor(nama, tugas, uts, uas) {\n  \n}\n\nconsole.log(rapor("Budi", 80, 90, 85));\n',
      solusi: 'function hitungNilaiAkhir(tugas, uts, uas) {\n  return tugas * 0.3 + uts * 0.3 + uas * 0.4;\n}\n\nfunction tentukanPredikat(nilai) {\n  if (nilai >= 90) return "A";\n  if (nilai >= 80) return "B";\n  if (nilai >= 70) return "C";\n  return "D";\n}\n\nfunction rapor(nama, tugas, uts, uas) {\n  const nilai = hitungNilaiAkhir(tugas, uts, uas);\n  const predikat = tentukanPredikat(nilai);\n  return `${nama} mendapat predikat ${predikat}`;\n}\n\nconsole.log(rapor("Budi", 80, 90, 85));',
      petunjuk: [
        'Bobot 30% artinya dikali <code>0.3</code>.',
        'Di <code>tentukanPredikat</code>, <code>return</code> langsung menghentikan function — jadi urutkan pengecekan dari nilai tertinggi.',
        'Di dalam <code>rapor</code>: <code>const nilai = hitungNilaiAkhir(tugas, uts, uas);</code> lalu <code>tentukanPredikat(nilai)</code>.'
      ],
      tes: [
        { nama: 'hitungNilaiAkhir(80, 90, 85) → 85', panggil: 'hitungNilaiAkhir(80, 90, 85)', hasil: 85 },
        { nama: 'hitungNilaiAkhir(70, 75, 72) → 72.3', panggil: 'hitungNilaiAkhir(70, 75, 72)', hasil: 72.3 },
        { nama: 'tentukanPredikat(90) → "A"', panggil: 'tentukanPredikat(90)', hasil: 'A' },
        { nama: 'tentukanPredikat(89.9) → "B"', panggil: 'tentukanPredikat(89.9)', hasil: 'B' },
        { nama: 'tentukanPredikat(70) → "C"', panggil: 'tentukanPredikat(70)', hasil: 'C' },
        { nama: 'tentukanPredikat(55) → "D"', panggil: 'tentukanPredikat(55)', hasil: 'D' },
        { nama: 'rapor("Budi", 80, 90, 85)', panggil: 'rapor("Budi", 80, 90, 85)', hasil: 'Budi mendapat predikat B' },
        { nama: 'rapor("Ani", 100, 90, 95)', panggil: 'rapor("Ani", 100, 90, 95)', hasil: 'Ani mendapat predikat A' },
        { nama: 'rapor("Citra", 60, 70, 65)', panggil: 'rapor("Citra", 60, 70, 65)', hasil: 'Citra mendapat predikat D' },
        {
          nama: 'rapor() memanggil tentukanPredikat() (tidak menulis ulang if-nya)',
          cek: function (ctx) {
            var k = ctx.kodeBersih;
            var dekl = /function\s+tentukanPredikat\s*\(/.test(k) ? 1 : 0;
            var n = (k.match(/tentukanPredikat\s*\(/g) || []).length - dekl;
            return n >= 1 ? true : 'Panggil tentukanPredikat(...) dari dalam rapor(), jangan menulis ulang if-nya.';
          }
        }
      ]
    },
    {
      id: 't3',
      jenis: 'studi-kasus',
      judul: 'Kasir Tiket Bioskop',
      soal: '<p class="content-text">Bioskop "Layar Kaca" punya aturan harga tiket:</p>' +
        '<ul class="task-list"><li>Anak di bawah 3 tahun <strong>gratis</strong> (harga 0) — langsung return di awal (<em>early return</em>).</li>' +
        '<li>Harga normal <strong>Rp35.000</strong>, tapi hari <code>"Sabtu"</code> atau <code>"Minggu"</code> <strong>Rp50.000</strong>.</li>' +
        '<li>Umur 60 tahun ke atas dapat diskon <strong>50%</strong>.</li></ul>' +
        '<p class="content-text">Buat function <code>hargaTiket(umur, hari)</code> yang me-return harga satu tiket, lalu <code>totalTiket(umur1, umur2, umur3, hari)</code> yang me-return total harga 3 tiket dengan <strong>memanggil</strong> <code>hargaTiket</code>.</p>',
      starter: 'function hargaTiket(umur, hari) {\n  \n}\n\nfunction totalTiket(umur1, umur2, umur3, hari) {\n  \n}\n\nconsole.log(hargaTiket(17, "Senin"));   // 35000\nconsole.log(totalTiket(2, 17, 65, "Sabtu")); // 75000\n',
      solusi: 'function hargaTiket(umur, hari) {\n  if (umur < 3) {\n    return 0;\n  }\n\n  let harga = 35000;\n  if (hari === "Sabtu" || hari === "Minggu") {\n    harga = 50000;\n  }\n\n  if (umur >= 60) {\n    return harga / 2;\n  }\n  return harga;\n}\n\nfunction totalTiket(umur1, umur2, umur3, hari) {\n  return hargaTiket(umur1, hari) + hargaTiket(umur2, hari) + hargaTiket(umur3, hari);\n}\n\nconsole.log(hargaTiket(17, "Senin"));\nconsole.log(totalTiket(2, 17, 65, "Sabtu"));',
      petunjuk: [
        'Early return: <code>if (umur &lt; 3) { return 0; }</code> di baris paling atas function.',
        'Hari libur: <code>hari === "Sabtu" || hari === "Minggu"</code>',
        '<code>totalTiket</code> cukup menjumlahkan tiga panggilan <code>hargaTiket(...)</code>.'
      ],
      tes: [
        { nama: 'hargaTiket(2, "Senin") → 0 (gratis)', panggil: 'hargaTiket(2, "Senin")', hasil: 0 },
        { nama: 'hargaTiket(17, "Senin") → 35000', panggil: 'hargaTiket(17, "Senin")', hasil: 35000 },
        { nama: 'hargaTiket(17, "Sabtu") → 50000', panggil: 'hargaTiket(17, "Sabtu")', hasil: 50000 },
        { nama: 'hargaTiket(3, "Minggu") → 50000', panggil: 'hargaTiket(3, "Minggu")', hasil: 50000 },
        { nama: 'hargaTiket(65, "Minggu") → 25000', panggil: 'hargaTiket(65, "Minggu")', hasil: 25000 },
        { nama: 'hargaTiket(60, "Rabu") → 17500', panggil: 'hargaTiket(60, "Rabu")', hasil: 17500 },
        { nama: 'totalTiket(2, 17, 65, "Sabtu") → 75000', panggil: 'totalTiket(2, 17, 65, "Sabtu")', hasil: 75000 },
        { nama: 'totalTiket(30, 30, 70, "Kamis") → 87500', panggil: 'totalTiket(30, 30, 70, "Kamis")', hasil: 87500 },
        {
          nama: 'totalTiket() memanggil hargaTiket()',
          cek: function (ctx) {
            var k = ctx.kodeBersih;
            var dekl = /function\s+hargaTiket\s*\(/.test(k) ? 1 : 0;
            var n = (k.match(/hargaTiket\s*\(/g) || []).length - dekl;
            return n >= 1 ? true : 'Hitung total dengan memanggil hargaTiket(...) untuk tiap umur.';
          }
        }
      ]
    }
  ],

  /* Kuis (dinilai) — soal ber-kode dengan cekOutput diverifikasi otomatis */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Apa yang dimaksud dengan <strong>function</strong>?',
      opsi: [
        'Variabel yang menyimpan banyak angka',
        'Blok kode bernama untuk menyelesaikan satu tugas, yang bisa dipanggil berulang kali',
        'Perintah untuk mengulang kode sampai kondisi false',
        'Tipe data untuk teks'
      ],
      jawab: 1,
      bahas: 'Function adalah blok kode bernama berisi sekumpulan perintah untuk satu tugas tertentu. Dibuat sekali, dipanggil berkali-kali.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'function sapa() {\n  console.log("Halo!");\n}\n\nsapa();\nsapa();',
      opsi: ['Halo!', 'Halo!\nHalo!', 'sapa\nsapa', '(tidak ada output)'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Function dipanggil 2 kali, jadi isinya juga dijalankan 2 kali.'
    },
    {
      tipe: 'pg',
      tanya: 'Pada kode <code>function sapaNama(nama) {…}</code> lalu <code>sapaNama("Budi");</code>, manakah pernyataan yang benar?',
      opsi: [
        '`nama` adalah argument, `"Budi"` adalah parameter',
        '`nama` adalah parameter, `"Budi"` adalah argument',
        'Keduanya disebut parameter',
        'Keduanya disebut argument'
      ],
      jawab: 1,
      bahas: '<b>Parameter</b> = variabel penampung yang ditulis saat membuat function. <b>Argument</b> = nilai sebenarnya yang dikirim saat function dipanggil.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'function perkenalan(nama, kelas) {\n  console.log(`${nama} - ${kelas}`);\n}\n\nperkenalan("Ani");',
      opsi: ['Ani - ', 'Ani - undefined', 'Ani - null', 'Error'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Argument yang tidak diisi akan bernilai <code>undefined</code>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'function hitungLuas(panjang, lebar) {\n  return panjang * lebar;\n}\n\nconsole.log(hitungLuas(5, 4) + 10);',
      jawab: ['30'],
      cekOutput: true,
      bahas: '<code>hitungLuas(5, 4)</code> me-return <code>20</code>, lalu ditambah 10 menjadi <code>30</code>. Inilah kelebihan <code>return</code>: hasilnya bisa dihitung lagi.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'function tambah(a, b) {\n  a + b;\n}\n\nconsole.log(tambah(2, 3));',
      opsi: ['5', '23', 'undefined', 'null'],
      jawab: 2,
      cekOutput: true,
      bahas: 'Lupa <code>return</code>! Function menghitung <code>a + b</code> tapi tidak mengirim hasilnya keluar, sehingga hasilnya <code>undefined</code>.'
    },
    {
      tipe: 'bs',
      tanya: 'Kode yang ditulis setelah <code>return</code> di dalam function tetap dijalankan.',
      jawab: false,
      bahas: '<code>return</code> mengirim nilai keluar lalu <b>menghentikan</b> function. Kode setelahnya tidak pernah dijalankan.'
    },
    {
      tipe: 'pg',
      tanya: 'Manakah arrow function yang setara dengan <code>function kali(a, b) { return a * b; }</code>?',
      opsi: [
        '`const kali = (a, b) => { a * b };`',
        '`const kali = (a, b) => a * b;`',
        '`const kali = a, b => a * b;`',
        '`function kali => a * b;`'
      ],
      jawab: 1,
      bahas: 'Arrow function satu baris tanpa kurung kurawal langsung me-return. Opsi A memakai kurawal tapi tanpa <code>return</code>, jadi hasilnya <code>undefined</code>. Dua parameter wajib diberi kurung.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'function salam(nama = "Teman") {\n  return `Halo, ${nama}!`;\n}\n\nconsole.log(salam());',
      jawab: ['Halo, Teman!'],
      cekOutput: true,
      bahas: 'Karena tidak ada argument, parameter <code>nama</code> memakai nilai default <code>"Teman"</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa yang terjadi saat kode ini dijalankan?',
      kode: 'function tampilkan() {\n  const kelas = "XI RPL";\n}\n\ntampilkan();\nconsole.log(kelas);',
      opsi: ['XI RPL', 'undefined', '`ReferenceError: kelas is not defined`', '(tidak ada output)'],
      jawab: 2,
      cekOutput: true,
      bahas: '<code>kelas</code> adalah variabel <b>lokal</b>: hanya hidup di dalam function. Dari luar function, variabel itu tidak dikenal.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut? (Perhatikan: function dipanggil <em>sebelum</em> ditulis.)',
      kode: 'console.log(dobel(4));\n\nfunction dobel(x) {\n  return x * 2;\n}',
      opsi: ['8', 'undefined', '`ReferenceError: dobel is not defined`', 'NaN'],
      jawab: 0,
      cekOutput: true,
      bahas: 'Function yang dibuat dengan kata kunci <code>function</code> (deklarasi) "diangkat" ke atas oleh JavaScript (<em>hoisting</em>), jadi bisa dipanggil sebelum ditulis. Arrow function dengan <code>const</code> tidak bisa.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'function jalankan(fn) {\n  fn();\n  fn();\n}\n\njalankan(() => console.log("Hai"));',
      opsi: ['Hai', 'Hai\nHai', 'fn\nfn', '(tidak ada output)'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Function bisa dikirim sebagai argument (disebut <b>callback</b>). Di dalam <code>jalankan</code>, callback itu dipanggil dua kali.'
    },
    {
      tipe: 'susun',
      tanya: 'Susun baris kode agar membuat arrow function <code>kuadrat</code> lalu menampilkan <code>16</code>.',
      baris: ['const kuadrat = (x) => {', '  return x * x;', '};', 'console.log(kuadrat(4));'],
      cekOutput: true,
      bahas: 'Arrow function dengan <code>const</code> harus dibuat dulu sebelum dipanggil. Isinya diapit kurawal dan diakhiri <code>};</code>.'
    }
  ]
};

/* Helper pemeriksa (dipakai di atas lewat hoisting) */
function cekJumlah(n) {
  return function (ctx) {
    var l = ctx.hasilLogs || [];
    if (ctx.hasil === n || l.indexOf(String(n)) !== -1) return true;
    return 'Saat dipanggil, function harus menampilkan ' + n + '. Output kamu: ' + (l.length ? l.join(' | ') : '(kosong)') +
      (l.length ? '' : '\nSudah menulis console.log(...) di dalam function, dan memakai ketiga parameternya?');
  };
}

function cekIsi(daftar) {
  return function (ctx) {
    var teks = (ctx.hasilLogs || []).join('\n') + (typeof ctx.hasil === 'string' ? '\n' + ctx.hasil : '');
    for (var i = 0; i < daftar.length; i++) {
      if (teks.indexOf(daftar[i]) === -1) return 'Kalimat perkenalan belum memuat "' + daftar[i] + '". Output kamu: ' + (teks.trim() || '(kosong)');
    }
    return true;
  };
}
})();
