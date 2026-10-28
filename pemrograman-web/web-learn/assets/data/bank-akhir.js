/* Bank soal Tantangan Akhir — gabungan materi #15–#19 (tanpa array) */
window.BANK = window.BANK || {};
window.BANK['akhir'] = {
  judul: 'Tantangan Akhir',
  kuisAcak: 15, // kuis diambil acak dari bank 15–19
  latihan: {},
  tantangan: [
    {
      id: 'l1',
      jenis: 'tantangan',
      judul: 'Level 1 — Konversi Suhu',
      soal: '<p class="content-text">Lengkapi function <code>konversiSuhu(celcius)</code> yang <strong>me-return</strong> suhu dalam Fahrenheit.</p>' +
        '<pre class="snippet">fahrenheit = celcius × 9 / 5 + 32</pre>' +
        '<p class="content-text">Contoh: <code>konversiSuhu(100)</code> → <code>212</code>, <code>konversiSuhu(0)</code> → <code>32</code>.</p>',
      starter: 'function konversiSuhu(celcius) {\n  // tulis rumusnya, lalu return hasilnya\n}\n\nconsole.log(konversiSuhu(100)); // harusnya 212\n',
      solusi: 'function konversiSuhu(celcius) {\n  return celcius * 9 / 5 + 32;\n}\n\nconsole.log(konversiSuhu(100)); // 212',
      petunjuk: ['Operator aritmatika: <code>*</code>, <code>/</code>, <code>+</code>. Perkalian & pembagian dikerjakan sebelum penjumlahan.', 'Jangan lupa <code>return</code> — <code>console.log</code> saja tidak cukup.'],
      tes: [
        { nama: 'konversiSuhu(0) → 32', panggil: 'konversiSuhu(0)', hasil: 32 },
        { nama: 'konversiSuhu(100) → 212', panggil: 'konversiSuhu(100)', hasil: 212 },
        { nama: 'konversiSuhu(37) → 98.6', panggil: 'konversiSuhu(37)', hasil: 98.6 },
        { nama: 'konversiSuhu(-40) → -40', panggil: 'konversiSuhu(-40)', hasil: -40 }
      ]
    },
    {
      id: 'l2',
      jenis: 'tantangan',
      judul: 'Level 2 — Predikat Nilai',
      soal: '<p class="content-text">Buat function <code>predikat(nilai)</code> yang me-return huruf predikat:</p>' +
        '<div class="table-wrap"><table class="tabel"><thead><tr><th>Nilai</th><th>Return</th></tr></thead><tbody>' +
        '<tr><td>90 – 100</td><td><code>"A"</code></td></tr><tr><td>80 – 89</td><td><code>"B"</code></td></tr>' +
        '<tr><td>70 – 79</td><td><code>"C"</code></td></tr><tr><td>60 – 69</td><td><code>"D"</code></td></tr>' +
        '<tr><td>0 – 59</td><td><code>"E"</code></td></tr><tr><td>di bawah 0 atau di atas 100</td><td><code>"Nilai tidak valid"</code></td></tr>' +
        '</tbody></table></div>',
      starter: 'function predikat(nilai) {\n  // cek nilai tidak valid dulu, lalu A, B, C, D, E\n}\n\nconsole.log(predikat(85)); // harusnya B\n',
      solusi: 'function predikat(nilai) {\n  if (nilai < 0 || nilai > 100) {\n    return "Nilai tidak valid";\n  } else if (nilai >= 90) {\n    return "A";\n  } else if (nilai >= 80) {\n    return "B";\n  } else if (nilai >= 70) {\n    return "C";\n  } else if (nilai >= 60) {\n    return "D";\n  } else {\n    return "E";\n  }\n}\n\nconsole.log(predikat(85)); // B',
      petunjuk: ['Pakai <code>if</code> – <code>else if</code> – <code>else</code>, urut dari nilai tertinggi.', 'Kondisi tidak valid memakai operator logika: <code>nilai &lt; 0 || nilai &gt; 100</code>.'],
      tes: [
        { nama: 'predikat(95) → "A"', panggil: 'predikat(95)', hasil: 'A' },
        { nama: 'predikat(90) → "A" (batas bawah)', panggil: 'predikat(90)', hasil: 'A' },
        { nama: 'predikat(89) → "B"', panggil: 'predikat(89)', hasil: 'B' },
        { nama: 'predikat(70) → "C"', panggil: 'predikat(70)', hasil: 'C' },
        { nama: 'predikat(65) → "D"', panggil: 'predikat(65)', hasil: 'D' },
        { nama: 'predikat(59) → "E"', panggil: 'predikat(59)', hasil: 'E' },
        { nama: 'predikat(0) → "E"', panggil: 'predikat(0)', hasil: 'E' },
        { nama: 'predikat(101) → "Nilai tidak valid"', panggil: 'predikat(101)', hasil: 'Nilai tidak valid' },
        { nama: 'predikat(-5) → "Nilai tidak valid"', panggil: 'predikat(-5)', hasil: 'Nilai tidak valid' }
      ]
    },
    {
      id: 'l3',
      jenis: 'tantangan',
      judul: 'Level 3 — Jumlah Bilangan Genap',
      soal: '<p class="content-text">Buat function <code>jumlahGenap(n)</code> yang me-return jumlah semua bilangan <strong>genap</strong> dari 1 sampai <code>n</code>.</p>' +
        '<p class="content-text">Contoh: <code>jumlahGenap(10)</code> → 2 + 4 + 6 + 8 + 10 = <code>30</code>.</p>',
      starter: 'function jumlahGenap(n) {\n  let total = 0;\n  // pakai perulangan + if\n\n  return total;\n}\n\nconsole.log(jumlahGenap(10)); // harusnya 30\n',
      solusi: 'function jumlahGenap(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    if (i % 2 === 0) {\n      total += i;\n    }\n  }\n  return total;\n}\n\nconsole.log(jumlahGenap(10)); // 30',
      petunjuk: ['Pola akumulator: siapkan <code>total = 0</code>, tambahkan di dalam loop, return setelah loop.', 'Bilangan genap: <code>i % 2 === 0</code>.'],
      syarat: [{ nama: 'Memakai perulangan (for / while)', pola: /\b(for|while)\s*\(/ }],
      tes: [
        { nama: 'jumlahGenap(10) → 30', panggil: 'jumlahGenap(10)', hasil: 30 },
        { nama: 'jumlahGenap(1) → 0', panggil: 'jumlahGenap(1)', hasil: 0 },
        { nama: 'jumlahGenap(2) → 2', panggil: 'jumlahGenap(2)', hasil: 2 },
        { nama: 'jumlahGenap(7) → 12', panggil: 'jumlahGenap(7)', hasil: 12 },
        { nama: 'jumlahGenap(100) → 2550', panggil: 'jumlahGenap(100)', hasil: 2550 }
      ]
    },
    {
      id: 'l4',
      jenis: 'studi-kasus',
      judul: 'Level 4 — Kasir Kantin Sekolah',
      soal: '<p class="content-text">Kantin sekolah memberi diskon. Buat function <code>kasirKantin(total, member)</code> yang me-return <strong>jumlah yang harus dibayar</strong>.</p>' +
        '<ul class="task-list"><li>Total belanja ≥ 100.000 → diskon <strong>15%</strong></li>' +
        '<li>Total belanja ≥ 50.000 (tapi &lt; 100.000) → diskon <strong>10%</strong></li>' +
        '<li>Di bawah 50.000 → tanpa diskon</li>' +
        '<li>Jika <code>member</code> bernilai <code>true</code>, diskon <strong>ditambah 5%</strong> (berlaku untuk semua total)</li></ul>' +
        '<p class="content-text">Contoh: <code>kasirKantin(60000, true)</code> → diskon 15% → <code>51000</code>.</p>',
      starter: 'function kasirKantin(total, member) {\n  let diskon = 0;\n  // tentukan diskon, lalu return total setelah diskon\n}\n\nconsole.log(kasirKantin(60000, true)); // harusnya 51000\n',
      solusi: 'function kasirKantin(total, member) {\n  let diskon = 0;\n  if (total >= 100000) {\n    diskon = 0.15;\n  } else if (total >= 50000) {\n    diskon = 0.1;\n  }\n  diskon += member ? 0.05 : 0;\n  return total - total * diskon;\n}\n\nconsole.log(kasirKantin(60000, true)); // 51000',
      petunjuk: ['Tentukan dulu besar diskon (0, 0.1, atau 0.15) dengan else if.', 'Tambahkan 0.05 kalau member — cocok pakai ternary: <code>diskon += member ? 0.05 : 0;</code>', 'Bayar = <code>total - total * diskon</code>.'],
      tes: [
        { nama: 'kasirKantin(40000, false) → 40000', panggil: 'kasirKantin(40000, false)', hasil: 40000 },
        { nama: 'kasirKantin(40000, true) → 38000', panggil: 'kasirKantin(40000, true)', hasil: 38000 },
        { nama: 'kasirKantin(50000, false) → 45000', panggil: 'kasirKantin(50000, false)', hasil: 45000 },
        { nama: 'kasirKantin(60000, true) → 51000', panggil: 'kasirKantin(60000, true)', hasil: 51000 },
        { nama: 'kasirKantin(100000, false) → 85000', panggil: 'kasirKantin(100000, false)', hasil: 85000 },
        { nama: 'kasirKantin(120000, true) → 96000', panggil: 'kasirKantin(120000, true)', hasil: 96000 }
      ]
    },
    {
      id: 'boss',
      jenis: 'tantangan',
      judul: 'Boss — Segitiga Bintang',
      soal: '<p class="content-text">Buat function <code>cetakSegitiga(n)</code> yang <strong>menampilkan</strong> (console.log) segitiga bintang setinggi <code>n</code> baris. Contoh <code>cetakSegitiga(4)</code>:</p>' +
        '<pre class="snippet">*\n**\n***\n****</pre>' +
        '<p class="content-text">Jika <code>n</code> bernilai 0, tidak ada yang ditampilkan.</p>',
      starter: 'function cetakSegitiga(n) {\n  // loop luar: baris ke-1 sampai n\n  // loop dalam: susun bintang untuk baris itu\n}\n\ncetakSegitiga(4);\n',
      solusi: 'function cetakSegitiga(n) {\n  for (let baris = 1; baris <= n; baris++) {\n    let bintang = "";\n    for (let k = 1; k <= baris; k++) {\n      bintang += "*";\n    }\n    console.log(bintang);\n  }\n}\n\ncetakSegitiga(4);',
      petunjuk: ['Nested loop: loop luar untuk baris, loop dalam untuk menambah bintang.', 'Siapkan <code>let bintang = "";</code> di awal setiap baris, lalu <code>bintang += "*"</code>.'],
      syarat: [{ nama: 'Memakai perulangan', pola: /\b(for|while)\s*\(/ }],
      tes: [
        { nama: 'cetakSegitiga(3)', panggil: 'cetakSegitiga(3)', hasilOutput: ['*', '**', '***'] },
        { nama: 'cetakSegitiga(5)', panggil: 'cetakSegitiga(5)', hasilOutput: ['*', '**', '***', '****', '*****'] },
        { nama: 'cetakSegitiga(1)', panggil: 'cetakSegitiga(1)', hasilOutput: ['*'] },
        { nama: 'cetakSegitiga(0) tidak menampilkan apa-apa', panggil: 'cetakSegitiga(0)', hasilOutput: [] }
      ]
    }
  ]
};
