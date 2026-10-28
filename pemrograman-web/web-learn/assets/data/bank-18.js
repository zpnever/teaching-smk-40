/* Bank soal Pertemuan 18 — Perulangan (Loop) */
window.BANK = window.BANK || {};
(function () {
  'use strict';

  // Pembuat output yang diharapkan
  function sapa(nama) {
    var out = [];
    for (var i = 1; i <= 15; i++) out.push('Halo, ' + nama + '. Ini adalah iterasi ke-' + i);
    return out;
  }
  function perkalian(angka) {
    var out = [];
    for (var k = 1; k <= 10; k++) out.push(angka + ' x ' + k + ' = ' + angka * k);
    return out;
  }
  function celengan(target, setoran) {
    var out = [], tabungan = 0, hari = 0;
    while (tabungan < target) {
      tabungan += setoran;
      hari++;
      out.push('Hari ke-' + hari + ': Rp' + tabungan);
    }
    out.push('Target tercapai dalam ' + hari + ' hari, tabungan Rp' + tabungan);
    return out;
  }
  function segitiga(tinggi) {
    var out = [];
    for (var i = 1; i <= tinggi; i++) out.push(new Array(i + 1).join('*'));
    return out;
  }
  function fizzbuzz(n) {
    var out = [];
    for (var i = 1; i <= n; i++) {
      out.push(i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : String(i));
    }
    return out;
  }

  var PAKAI_FOR = { nama: 'Memakai perulangan for', pola: /\bfor\s*\(/ };

  window.BANK['18'] = {
    judul: 'Perulangan',

    /* Praktik dari slide (tidak dinilai) */
    latihan: {
      p1a: {
        id: 'p1a',
        judul: 'Praktik 1a — Sapa 15 Kali',
        soal: '<p class="content-text">Tampilkan teks <code>Halo, {nama}. Ini adalah iterasi ke-{i}</code> sebanyak <strong>15 kali</strong>. Ambil <code>{nama}</code> dari Data Input, dan <code>{i}</code> dari 1 sampai 15.</p>' +
          '<pre class="snippet">Halo, Budi. Ini adalah iterasi ke-1\nHalo, Budi. Ini adalah iterasi ke-2\n...\nHalo, Budi. Ini adalah iterasi ke-15</pre>',
        input: { nama: 'Budi' },
        starter: '// Tulis perulangan for di sini\n',
        solusi: 'for (let i = 1; i <= 15; i++) {\n  console.log(`Halo, ${nama}. Ini adalah iterasi ke-${i}`);\n}',
        petunjuk: [
          'Mulai dari <code>let i = 1</code>, ulangi selama <code>i &lt;= 15</code>, lalu <code>i++</code>.',
          'Isi perulangan: <code>console.log(`Halo, ${nama}. Ini adalah iterasi ke-${i}`);</code>'
        ],
        syarat: [PAKAI_FOR],
        tes: [
          { nama: 'Data Budi: 15 baris sapaan', output: sapa('Budi') },
          { nama: 'Data Siti: 15 baris sapaan', input: { nama: 'Siti' }, output: sapa('Siti') }
        ]
      },
      p1b: {
        id: 'p1b',
        judul: 'Praktik 1b — Hitung Mundur',
        soal: '<p class="content-text">Hitung mundur dari <strong>10 sampai 1</strong> (satu angka per baris), lalu tampilkan <code>Selesai!</code> <strong>setelah</strong> loop selesai.</p>',
        starter: '// Hitung mundur 10 sampai 1\n',
        solusi: 'for (let i = 10; i >= 1; i--) {\n  console.log(i);\n}\n\nconsole.log("Selesai!");',
        petunjuk: [
          'Mulai dari 10: <code>let i = 10</code>. Kondisinya <code>i &gt;= 1</code>, update-nya <code>i--</code>.',
          '<code>console.log("Selesai!")</code> ditulis di luar kurung kurawal loop, supaya hanya muncul sekali.'
        ],
        syarat: [PAKAI_FOR],
        tes: [{ nama: 'Output 10, 9, …, 1 lalu Selesai!', output: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'Selesai!'] }]
      },
      p1c: {
        id: 'p1c',
        judul: 'Praktik 1c — Bilangan Ganjil',
        soal: '<p class="content-text">Tampilkan semua <strong>bilangan ganjil dari 1 sampai 25</strong>, satu angka per baris.</p>',
        starter: '// Tampilkan bilangan ganjil 1 sampai 25\n',
        solusi: 'for (let i = 1; i <= 25; i += 2) {\n  console.log(i);\n}',
        petunjuk: [
          'Cara 1: mulai dari 1 dan loncat 2 angka: <code>i += 2</code>.',
          'Cara 2: loop 1 sampai 25 biasa, lalu cek <code>if (i % 2 !== 0)</code> sebelum mencetak.'
        ],
        syarat: [PAKAI_FOR],
        tes: [{ nama: 'Output 1, 3, 5, …, 25', output: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25'] }]
      },
      p2: {
        id: 'p2',
        judul: 'Praktik 2 — Jumlah 1 sampai 100',
        soal: '<p class="content-text">Hitung <strong>jumlah semua bilangan dari 1 sampai 100</strong> memakai pola akumulator, lalu tampilkan hasilnya. Jangan menulis jawabannya langsung — biarkan loop yang menghitung!</p>',
        starter: 'let total = 0; // 1. siapkan penampung\n\n// 2. perbarui di dalam loop\n\n// 3. tampilkan hasilnya\n',
        solusi: 'let total = 0;\n\nfor (let i = 1; i <= 100; i++) {\n  total += i;\n}\n\nconsole.log(total);',
        petunjuk: [
          'Di dalam loop, tambahkan <code>i</code> ke penampung: <code>total += i;</code>',
          '<code>console.log(total)</code> diletakkan <strong>setelah</strong> loop selesai.'
        ],
        syarat: [
          PAKAI_FOR,
          { nama: 'Memperbarui akumulator di dalam loop', pola: /\+=|=\s*\w+\s*\+/ },
          { nama: 'Tidak menulis 5050 secara langsung', pola: /5050/, tidak: true }
        ],
        tes: [{ nama: 'Output memuat 5050', mengandung: ['5050'] }]
      },
      p3: {
        id: 'p3',
        judul: 'Praktik 3 — FizzBuzz',
        soal: '<p class="content-text">Tampilkan angka 1 sampai 15 dengan aturan:</p>' +
          '<ul class="task-list"><li>Kelipatan 3 tampil <code>Fizz</code></li><li>Kelipatan 5 tampil <code>Buzz</code></li>' +
          '<li>Kelipatan 3 dan 5 sekaligus tampil <code>FizzBuzz</code></li><li>Selain itu tampilkan angkanya</li></ul>',
        starter: 'for (let i = 1; i <= 15; i++) {\n  // cek kelipatan di sini\n}\n',
        solusi: 'for (let i = 1; i <= 15; i++) {\n  if (i % 3 === 0 && i % 5 === 0) {\n    console.log("FizzBuzz");\n  } else if (i % 3 === 0) {\n    console.log("Fizz");\n  } else if (i % 5 === 0) {\n    console.log("Buzz");\n  } else {\n    console.log(i);\n  }\n}',
        petunjuk: [
          'Bilangan kelipatan 3 artinya sisa baginya 0: <code>i % 3 === 0</code>.',
          'Urutan penting! Cek <code>FizzBuzz</code> (kelipatan 3 <strong>dan</strong> 5) paling dulu, baru Fizz dan Buzz.'
        ],
        syarat: [PAKAI_FOR, { nama: 'Memakai if di dalam loop', pola: /\bif\s*\(/ }],
        tes: [{ nama: 'Output FizzBuzz 1 sampai 15', output: fizzbuzz(15) }]
      },
      p4: {
        id: 'p4',
        judul: 'Praktik Tambahan — Hitung Huruf Vokal',
        soal: '<p class="content-text">Hitung berapa huruf vokal (<code>a i u e o</code>) di dalam variabel <code>kata</code> (Data Input, selalu huruf kecil). Tampilkan dengan format:</p>' +
          '<pre class="snippet">Jumlah huruf vokal: 3</pre>',
        input: { kata: 'javascript' },
        starter: 'let jumlah = 0;\n\n// telusuri setiap huruf di dalam kata\n',
        solusi: 'let jumlah = 0;\n\nfor (let i = 0; i < kata.length; i++) {\n  let huruf = kata[i];\n  if (huruf === "a" || huruf === "i" || huruf === "u" || huruf === "e" || huruf === "o") {\n    jumlah++;\n  }\n}\n\nconsole.log(`Jumlah huruf vokal: ${jumlah}`);',
        petunjuk: [
          'Loop dari indeks 0 sampai sebelum <code>kata.length</code>.',
          'Ambil satu huruf dengan <code>kata[i]</code>, lalu cek apakah huruf itu <code>"a"</code>, <code>"i"</code>, <code>"u"</code>, <code>"e"</code>, atau <code>"o"</code> memakai <code>||</code>.'
        ],
        syarat: [
          { nama: 'Memakai .length', pola: /\.length\b/ },
          { nama: 'Mengambil huruf dengan indeks [i]', pola: /\w\s*\[\s*\w+\s*\]/ }
        ],
        tes: [
          { nama: 'kata = "javascript" → 3', output: ['Jumlah huruf vokal: 3'] },
          { nama: 'kata = "pemrograman web" → 5', input: { kata: 'pemrograman web' }, output: ['Jumlah huruf vokal: 5'] },
          { nama: 'kata = "rpl" → 0', input: { kata: 'rpl' }, output: ['Jumlah huruf vokal: 0'] }
        ]
      }
    },

    /* Tantangan (dinilai) */
    tantangan: [
      {
        id: 't1',
        jenis: 'tantangan',
        judul: 'Tabel Perkalian Otomatis',
        soal: '<p class="content-text">Buat tabel perkalian untuk <code>angka</code> di Data Input, dari <strong>× 1 sampai × 10</strong>. Kodemu akan diuji dengan angka lain, jadi jangan tulis angkanya langsung!</p>' +
          '<pre class="snippet">7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70</pre>',
        input: { angka: 7 },
        starter: '// Buat tabel perkalian dengan for\n',
        solusi: 'for (let i = 1; i <= 10; i++) {\n  console.log(`${angka} x ${i} = ${angka * i}`);\n}',
        petunjuk: [
          'Loop <code>i</code> dari 1 sampai 10.',
          'Hasil kali ditulis di dalam template literal: <code>${angka * i}</code>. Perhatikan spasi di sekitar <code>x</code> dan <code>=</code>.'
        ],
        syarat: [PAKAI_FOR],
        tes: [
          { nama: 'Tabel 7', output: perkalian(7) },
          { nama: 'Tabel 3', input: { angka: 3 }, output: perkalian(3) },
          { nama: 'Tabel 12', input: { angka: 12 }, output: perkalian(12) }
        ]
      },
      {
        id: 't2',
        jenis: 'studi-kasus',
        judul: 'Celengan Menuju Target',
        soal: '<p class="content-text">Rani menabung <code>setoran</code> rupiah setiap hari sampai tabungannya <strong>mencapai atau melewati</strong> <code>target</code> (keduanya di Data Input). Karena jumlah harinya belum diketahui, pakai <code>while</code>. Tampilkan isi tabungan setiap hari, lalu ringkasannya:</p>' +
          '<pre class="snippet">Hari ke-1: Rp20000\nHari ke-2: Rp40000\n...\nHari ke-8: Rp160000\nTarget tercapai dalam 8 hari, tabungan Rp160000</pre>',
        input: { target: 150000, setoran: 20000 },
        starter: 'let tabungan = 0;\nlet hari = 0;\n\n// lanjutkan dengan while\n',
        solusi: 'let tabungan = 0;\nlet hari = 0;\n\nwhile (tabungan < target) {\n  tabungan += setoran;\n  hari++;\n  console.log(`Hari ke-${hari}: Rp${tabungan}`);\n}\n\nconsole.log(`Target tercapai dalam ${hari} hari, tabungan Rp${tabungan}`);',
        petunjuk: [
          'Kondisi while: selama <code>tabungan &lt; target</code>.',
          'Di dalam loop: tambah tabungan, tambah hari, lalu cetak. Ringkasan dicetak setelah loop.'
        ],
        syarat: [{ nama: 'Memakai perulangan while', pola: /\bwhile\s*\(/ }],
        tes: [
          { nama: 'Target 150.000, setoran 20.000 → 8 hari', output: celengan(150000, 20000) },
          { nama: 'Target 100.000, setoran 25.000 → 4 hari', input: { target: 100000, setoran: 25000 }, output: celengan(100000, 25000) },
          { nama: 'Target 50.000, setoran 60.000 → 1 hari', input: { target: 50000, setoran: 60000 }, output: celengan(50000, 60000) }
        ]
      },
      {
        id: 't3',
        jenis: 'tantangan',
        judul: 'Segitiga Bintang',
        soal: '<p class="content-text">Buat segitiga bintang setinggi <code>tinggi</code> (Data Input) memakai <strong>nested loop</strong>. Baris ke-1 berisi 1 bintang, baris ke-2 berisi 2 bintang, dan seterusnya.</p>' +
          '<pre class="snippet">*\n**\n***\n****</pre>',
        input: { tinggi: 4 },
        starter: 'for (let baris = 1; baris <= tinggi; baris++) {\n  let teks = "";\n  // loop dalam: tambahkan bintang ke teks\n\n  console.log(teks);\n}\n',
        solusi: 'for (let baris = 1; baris <= tinggi; baris++) {\n  let teks = "";\n  for (let kolom = 1; kolom <= baris; kolom++) {\n    teks += "*";\n  }\n  console.log(teks);\n}',
        petunjuk: [
          'Loop luar mengatur <strong>baris</strong>, loop dalam mengatur <strong>jumlah bintang</strong> di baris itu.',
          'Loop dalam berjalan dari 1 sampai <code>baris</code>, setiap putaran <code>teks += "*";</code>'
        ],
        syarat: [
          { nama: 'Memakai nested loop (for di dalam for)', pola: /\bfor\s*\([\s\S]*\bfor\s*\(/ },
          { nama: 'Tidak menulis deretan bintang secara langsung', pola: /["'`]\*\*/, tidak: true }
        ],
        tes: [
          { nama: 'Tinggi 4', output: segitiga(4) },
          { nama: 'Tinggi 1', input: { tinggi: 1 }, output: segitiga(1) },
          { nama: 'Tinggi 6', input: { tinggi: 6 }, output: segitiga(6) }
        ]
      }
    ],

    /* Kuis (dinilai) */
    kuis: [
      {
        tipe: 'pg',
        tanya: 'Pada <code>for (let i = 1; i &lt;= 5; i++)</code>, bagian mana yang dijalankan <strong>hanya sekali</strong> di awal?',
        opsi: ['`let i = 1` (inisialisasi)', '`i <= 5` (kondisi)', '`i++` (update)', 'Isi blok `{ }`'],
        jawab: 0,
        bahas: 'Inisialisasi hanya dijalankan sekali di awal. Kondisi diperiksa <em>sebelum</em> setiap iterasi, update dijalankan <em>setelah</em> setiap iterasi.'
      },
      {
        tipe: 'isian',
        tanya: 'Apa output kode berikut? (tulis angkanya dipisah spasi)',
        kode: 'for (let i = 5; i >= 1; i--) {\n  console.log(i);\n}',
        jawab: ['5\n4\n3\n2\n1', '5 4 3 2 1'],
        cekOutput: true,
        bahas: 'Mulai dari 5, selama <code>i &gt;= 1</code>, dan <code>i--</code> mengurangi 1 setiap putaran: 5 4 3 2 1.'
      },
      {
        tipe: 'pg',
        tanya: 'Apa output kode berikut?',
        kode: 'let total = 0;\n\nfor (let i = 1; i <= 4; i++) {\n  total += i;\n}\n\nconsole.log(total);',
        opsi: ['4', '10', '1234', '0'],
        jawab: 1,
        cekOutput: true,
        bahas: 'Pola akumulator: total = 1 + 2 + 3 + 4 = 10. <code>console.log</code> ada di luar loop, jadi hanya mencetak sekali.'
      },
      {
        tipe: 'pg',
        tanya: 'Berapa kali <code>"Halo"</code> tercetak?',
        kode: 'for (let i = 0; i < 5; i++) {\n  console.log("Halo");\n}',
        opsi: ['4 kali', '5 kali', '6 kali', 'Tidak berhenti'],
        jawab: 1,
        bahas: 'i bernilai 0, 1, 2, 3, 4 → 5 kali. Saat i = 5, kondisi <code>i &lt; 5</code> bernilai false dan loop berhenti.'
      },
      {
        tipe: 'pg',
        tanya: 'Kapan sebaiknya memakai <code>while</code>?',
        opsi: ['Saat jumlah pengulangan sudah pasti, misal 10 kali', 'Saat berulang sampai suatu kondisi tercapai dan jumlahnya tidak diketahui', 'Saat blok harus jalan minimal satu kali', 'Saat ingin menghentikan loop'],
        jawab: 1,
        bahas: '<code>for</code> untuk jumlah ulangan yang diketahui, <code>while</code> untuk jumlah ulangan yang belum diketahui, <code>do...while</code> untuk blok yang wajib jalan minimal sekali.'
      },
      {
        tipe: 'pg',
        tanya: 'Apa output kode berikut?',
        kode: 'let x = 10;\n\ndo {\n  console.log(x);\n  x++;\n} while (x < 5);',
        opsi: ['Tidak ada output', '10', '5', '10 11 12 13 14'],
        jawab: 1,
        cekOutput: true,
        bahas: '<code>do...while</code> menjalankan blok <strong>dulu</strong>, baru memeriksa kondisi. Jadi 10 tetap tercetak sekali, lalu <code>11 &lt; 5</code> false dan loop berhenti.'
      },
      {
        tipe: 'bs',
        tanya: '<code>break</code> melewati sisa iterasi saat ini, lalu lanjut ke iterasi berikutnya.',
        jawab: false,
        bahas: 'Itu tugas <code>continue</code>. <code>break</code> menghentikan <strong>seluruh</strong> loop seketika.'
      },
      {
        tipe: 'pg',
        tanya: 'Apa output kode berikut?',
        kode: 'for (let i = 1; i <= 5; i++) {\n  if (i === 3) {\n    continue;\n  }\n  console.log(i);\n}',
        opsi: ['1\n2\n3\n4\n5', '1\n2', '1\n2\n4\n5', '3'],
        opsiKode: true,
        jawab: 2,
        cekOutput: true,
        bahas: 'Saat i = 3, <code>continue</code> melompati <code>console.log</code> dan langsung ke iterasi berikutnya. Loop tetap jalan sampai 5.'
      },
      {
        tipe: 'isian',
        tanya: 'Apa output kode berikut? (tulis angkanya dipisah spasi)',
        kode: 'for (let a = 1; a <= 2; a++) {\n  for (let b = 1; b <= 3; b++) {\n    console.log(a * b);\n  }\n}',
        jawab: ['1\n2\n3\n2\n4\n6', '1 2 3 2 4 6'],
        cekOutput: true,
        bahas: 'Untuk setiap 1 putaran loop luar, loop dalam berjalan penuh 3 kali. a = 1 → 1 2 3, a = 2 → 2 4 6. Total 2 × 3 = 6 baris.'
      },
      {
        tipe: 'pg',
        tanya: 'Apa yang terjadi saat kode ini dijalankan?',
        kode: 'let i = 1;\n\nwhile (i <= 5) {\n  console.log(i);\n}',
        opsi: ['Mencetak 1 sampai 5', 'Mencetak 1 sekali saja', 'Infinite loop: angka 1 tercetak terus tanpa henti', 'Error karena i belum dibuat'],
        jawab: 2,
        bahas: 'Tidak ada <code>i++</code>, jadi i selalu 1 dan kondisi <code>i &lt;= 5</code> selalu true. Loop tidak pernah berhenti — inilah <em>infinite loop</em>.'
      },
      {
        tipe: 'pg',
        tanya: 'Apa output kode berikut?',
        kode: 'let kata = "RPL";\n\nfor (let i = 0; i < kata.length; i++) {\n  console.log(kata[i]);\n}',
        opsi: ['RPL', 'R\nP\nL', '0\n1\n2', 'P\nL'],
        opsiKode: true,
        jawab: 1,
        cekOutput: true,
        bahas: '<code>kata.length</code> bernilai 3, dan <code>kata[i]</code> mengambil huruf di indeks i: <code>kata[0]</code> = R, <code>kata[1]</code> = P, <code>kata[2]</code> = L.'
      },
      {
        tipe: 'pg',
        tanya: 'Di dalam loop, kondisi <code>if (i % 2 === 0)</code> dipakai untuk…',
        opsi: ['Mengecek apakah i bilangan genap', 'Membagi i menjadi dua', 'Mengecek apakah i lebih dari 2', 'Menghentikan loop'],
        jawab: 0,
        bahas: '<code>%</code> menghasilkan sisa bagi. Jika sisa bagi i dengan 2 adalah 0, berarti i bilangan genap.'
      },
      {
        tipe: 'susun',
        tanya: 'Susun baris kode agar menampilkan jumlah 1 + 2 + 3, yaitu <code>6</code>, <strong>satu kali saja</strong>.',
        baris: ['let total = 0;', 'for (let i = 1; i <= 3; i++) {', '  total += i;', '}', 'console.log(total);'],
        cekOutput: true,
        bahas: 'Pola akumulator: siapkan penampung sebelum loop, perbarui di dalam loop, pakai hasilnya setelah loop. Kalau <code>console.log</code> ada di dalam loop, hasilnya tercetak 3 kali.'
      }
    ]
  };
})();
