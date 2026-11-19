/* Bank soal Pertemuan 23 — localStorage */
(function () {
'use strict';
window.BANK = window.BANK || {};
window.HALAMAN_DOM = window.HALAMAN_DOM || {};

function dokumen(judul, isi) {
  return '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' + judul + '</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n' + isi + '\n\n  <script src="script.js"></script>\n</body>\n</html>';
}

/* ── Halaman pertemuan 23 (sama dengan starter pertemuan-23-localstorage) ── */
window.HALAMAN_DOM.storage = {
  html: dokumen('Belajar localStorage', [
    '  <h1 id="judul">Belajar localStorage</h1>',
    '',
    '  <section>',
    '    <h3>Tema (Praktik 4)</h3>',
    '    <button id="btnTema">🌙 Mode Gelap</button>',
    '  </section>',
    '',
    '  <section>',
    '    <h3>Nama (B1)</h3>',
    '    <input id="nama" type="text" placeholder="Ketik namamu...">',
    '    <button id="btnSimpanNama">Simpan</button>',
    '    <p id="sapaan"></p>',
    '  </section>',
    '',
    '  <section>',
    '    <h3>Penghitung (B2, B7)</h3>',
    '    <button id="btnTambah">+1</button>',
    '    <span id="angka">0</span>',
    '    <button id="btnResetHitung">Reset</button>',
    '    <p>Rekor: <span id="rekor">0</span></p>',
    '  </section>',
    '',
    '  <section>',
    '    <h3>Kunjungan (B3)</h3>',
    '    <p id="kunjungan"></p>',
    '  </section>',
    '',
    '  <section>',
    '    <h3>Catatan (B4, B5)</h3>',
    '    <input id="inputCatatan" type="text" placeholder="Tulis catatan...">',
    '    <button id="btnCatat">Tambah</button>',
    '    <button id="btnHapusCatatan">Hapus Semua</button>',
    '    <ul id="daftarCatatan"></ul>',
    '  </section>',
    '',
    '  <section>',
    '    <h3>Profil (B6)</h3>',
    '    <input id="inputProfilNama" type="text" placeholder="Nama">',
    '    <input id="inputProfilKelas" type="text" placeholder="Kelas">',
    '    <button id="btnSimpanProfil">Simpan Profil</button>',
    '    <p id="tampilProfil"></p>',
    '  </section>'
  ].join('\n')),
  css: [
    'body {',
    '  font-family: Arial, sans-serif;',
    '  padding: 20px;',
    '  transition: background-color 0.3s ease, color 0.3s ease;',
    '}',
    'section { margin-bottom: 16px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; }',
    'h3 { margin: 0 0 8px; }',
    'button { padding: 6px 12px; cursor: pointer; }',
    'input { padding: 6px; }',
    '#angka { font-size: 1.6rem; font-weight: bold; margin: 0 10px; }',
    '',
    'body.dark-mode { background-color: #1a1a1a; color: #f0f0f0; }',
    'body.dark-mode section { border-color: #555; }'
  ].join('\n')
};

/* ── Halaman Studi Kasus: Daftar Tugas Tersimpan ── */
window.HALAMAN_DOM.todoStorage = {
  html: dokumen('Daftar Tugas Tersimpan', [
    '  <h1>Daftar Tugas</h1>',
    '  <input id="inputTugas" type="text" placeholder="Tulis tugas, lalu Enter...">',
    '  <button id="btnTambah">Tambah</button>',
    '  <ul id="daftarTugas"></ul>',
    '  <p>Jumlah tugas: <b id="jumlahTugas">0</b></p>'
  ].join('\n')),
  css: [
    'body { font-family: Arial, sans-serif; padding: 20px; }',
    'input { padding: 8px; font-size: 15px; width: 220px; }',
    'button { padding: 8px 12px; font-size: 14px; cursor: pointer; }',
    'li { margin: 6px 0; cursor: pointer; }',
    'li.selesai span { text-decoration: line-through; color: #999; }',
    'li .hapus { margin-left: 8px; padding: 2px 8px; font-size: 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; }'
  ].join('\n')
};

/* ── Halaman Studi Kasus: Catatan Belanja ── */
window.HALAMAN_DOM.belanja = {
  html: dokumen('Catatan Belanja', [
    '  <h1>Catatan Belanja</h1>',
    '  <div class="baris">',
    '    <input id="namaBarang" type="text" placeholder="Nama barang...">',
    '    <input id="hargaBarang" type="number" placeholder="Harga (Rp)">',
    '    <button id="btnTambahBelanja">Tambah</button>',
    '    <button id="btnKosongkan">Kosongkan</button>',
    '  </div>',
    '  <ul id="daftarBelanja"></ul>',
    '  <p>Total: Rp <b id="totalBelanja">0</b></p>'
  ].join('\n')),
  css: [
    'body { font-family: Arial, sans-serif; padding: 20px; }',
    '.baris { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }',
    'input { padding: 7px; font-size: 14px; }',
    'button { padding: 7px 12px; font-size: 14px; cursor: pointer; }',
    'li { margin: 6px 0; }',
    'li .hapus { margin-left: 8px; padding: 2px 8px; font-size: 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; }'
  ].join('\n')
};

function cocok(pola, pesan) {
  return function (ctx) { return typeof ctx.hasil === 'string' && pola.test(ctx.hasil) ? true : (pesan || 'Belum sesuai.') + ' Di halaman: "' + ctx.hasil + '".'; };
}

function punyaKeyRpl(ctx) {
  var st = (ctx.run && ctx.run.storage) || {};
  var keys = Object.keys(st);
  if (!keys.length) return 'Belum ada data yang tersimpan di localStorage.';
  return keys.some(function (k) { return k.indexOf('rpl_') === 0; })
    ? true
    : 'Gunakan key berawalan rpl_ (misal rpl_nama). Key saat ini: ' + keys.join(', ');
}

function jsonArrayValid(key, harapArr) {
  return function (ctx) {
    var st = (ctx.run && ctx.run.storage) || {};
    if (!Object.prototype.hasOwnProperty.call(st, key)) return 'Key "' + key + '" belum ada di localStorage.';
    var parsed;
    try { parsed = JSON.parse(st[key]); } catch (e) { return 'Isi "' + key + '" bukan JSON valid (lupa JSON.stringify?): ' + st[key]; }
    return JSON.stringify(parsed) === JSON.stringify(harapArr) ? true : 'Isi "' + key + '" diharapkan ' + JSON.stringify(harapArr) + ', sekarang ' + JSON.stringify(parsed) + '.';
  };
}

window.BANK['23'] = {
  judul: 'localStorage',

  latihan: {
    /* ── Praktik dari slide ── */
    p1: {
      id: 'p1', mode: 'dom', preset: 'storage',
      judul: 'Praktik 1 — Simpan, baca, cek null, dan hapus',
      soal: '<ol class="task-list"><li>Simpan <code>"Budi"</code> dengan key <code>"rpl_nama"</code> menggunakan <code>setItem</code>.</li>' +
        '<li>Baca kembali <code>"rpl_nama"</code> dengan <code>getItem</code> dan tampilkan di Console.</li>' +
        '<li>Baca key <code>"rpl_hobi"</code> (yang belum pernah disimpan) dan tampilkan di Console.</li>' +
        '<li>Hapus <code>"rpl_nama"</code> dengan <code>removeItem</code>, lalu baca dan tampilkan lagi di Console.</li></ol>',
      starter: '',
      solusi: 'localStorage.setItem("rpl_nama", "Budi");\nconsole.log(localStorage.getItem("rpl_nama"));\n\nconsole.log(localStorage.getItem("rpl_hobi"));\n\nlocalStorage.removeItem("rpl_nama");\nconsole.log(localStorage.getItem("rpl_nama"));',
      petunjuk: [
        '<code>localStorage.setItem("rpl_nama", "Budi");</code>',
        'Key yang belum disimpan atau sudah dihapus dengan <code>removeItem</code> menghasilkan <code>null</code>.'
      ],
      syarat: [
        { nama: 'Memakai setItem', pola: /localStorage\.setItem\s*\(/ },
        { nama: 'Memakai getItem', pola: /localStorage\.getItem\s*\(/ },
        { nama: 'Memakai removeItem', pola: /localStorage\.removeItem\s*\(/ }
      ],
      tes: [
        { nama: 'Console berurutan: Budi, null, null', output: ['Budi', 'null', 'null'] },
        { nama: 'rpl_nama sudah terhapus dari localStorage', panggil: 'localStorage.getItem("rpl_nama")', hasil: null }
      ]
    },
    p2: {
      id: 'p2', mode: 'dom', preset: 'storage',
      judul: 'Praktik 2 — Semua nilai berupa string',
      soal: '<ol class="task-list"><li>Simpan angka <code>16</code> dengan key <code>"rpl_umur"</code>.</li>' +
        '<li>Baca kembali ke variabel <code>umur</code>, lalu tampilkan <code>typeof umur</code> di Console.</li>' +
        '<li>Tampilkan hasil <code>umur + 1</code> <strong>sebelum</strong> dan <strong>sesudah</strong> memakai <code>Number()</code> di Console.</li></ol>',
      starter: '',
      solusi: 'localStorage.setItem("rpl_umur", 16);\nconst umur = localStorage.getItem("rpl_umur");\n\nconsole.log(typeof umur);        // string\nconsole.log(umur + 1);           // "161"\nconsole.log(Number(umur) + 1);   // 17',
      petunjuk: [
        'Walaupun disimpan angka <code>16</code>, hasil <code>getItem</code> tetap <code>"16"</code> (string).',
        'Konversi ke angka sebelum dihitung: <code>Number(umur) + 1</code>.'
      ],
      syarat: [{ nama: 'Memakai Number()', pola: /Number\s*\(/ }],
      tes: [
        { nama: 'Console berurutan: string, 161, 17', output: ['string', '161', '17'] },
        { nama: 'rpl_umur tersimpan sebagai "16"', panggil: 'localStorage.getItem("rpl_umur")', hasil: '16' }
      ]
    },
    p3: {
      id: 'p3', mode: 'dom', preset: 'storage',
      judul: 'Praktik 3 — Menyimpan array dengan JSON',
      soal: '<ol class="task-list"><li>Simpan array <code>["Ani", "Budi"]</code> ke key <code>"rpl_teman"</code> memakai <code>JSON.stringify</code>.</li>' +
        '<li>Baca kembali dengan <code>JSON.parse</code>, lalu tampilkan elemen kedua (<code>[1]</code>) dan <code>length</code> di Console.</li>' +
        '<li>Tambahkan <code>"Citra"</code> dengan <code>push</code>, lalu <strong>simpan lagi</strong> ke <code>"rpl_teman"</code>.</li></ol>',
      starter: '',
      solusi: 'const awal = ["Ani", "Budi"];\nlocalStorage.setItem("rpl_teman", JSON.stringify(awal));\n\nconst teman = JSON.parse(localStorage.getItem("rpl_teman"));\nconsole.log(teman[1]);\nconsole.log(teman.length);\n\nteman.push("Citra");\nlocalStorage.setItem("rpl_teman", JSON.stringify(teman));',
      petunjuk: [
        'Simpan: <code>localStorage.setItem("rpl_teman", JSON.stringify(awal));</code>',
        'Baca: <code>const teman = JSON.parse(localStorage.getItem("rpl_teman"));</code>',
        'Setelah <code>teman.push("Citra")</code>, panggil <code>setItem</code> lagi!'
      ],
      syarat: [
        { nama: 'Memakai JSON.stringify', pola: /JSON\.stringify\s*\(/ },
        { nama: 'Memakai JSON.parse', pola: /JSON\.parse\s*\(/ },
        { nama: 'Memakai .push()', pola: /\.push\s*\(/ }
      ],
      tes: [
        { nama: 'Console menampilkan Budi lalu 2', output: ['Budi', '2'] },
        { nama: 'rpl_teman di localStorage berisi ["Ani", "Budi", "Citra"]', cek: jsonArrayValid('rpl_teman', ['Ani', 'Budi', 'Citra']) }
      ]
    },
    p4: {
      id: 'p4', mode: 'dom', preset: 'storage',
      judul: 'Praktik 4 — Dark Mode yang diingat',
      soal: '<p class="content-text">Gunakan pola inti <em>baca saat halaman dibuka, simpan saat data berubah</em> pada tombol <code>#btnTema</code> dan key <code>"rpl_tema"</code>:</p>' +
        '<ul class="task-list"><li>Saat halaman dibuka, baca <code>"rpl_tema"</code>. Jika nilainya <code>"gelap"</code>, tambahkan class <code>dark-mode</code> pada <code>document.body</code> dan ubah teks tombol menjadi <code>☀️ Mode Terang</code>.</li>' +
        '<li>Jika belum ada (<code>null</code>) atau <code>"terang"</code>, hapus class <code>dark-mode</code> dan teks tombol menjadi <code>🌙 Mode Gelap</code>.</li>' +
        '<li>Saat tombol diklik, ganti tema dan simpan <code>"gelap"</code> atau <code>"terang"</code> ke <code>localStorage</code>.</li></ul>',
      starter: 'const btnTema = document.querySelector("#btnTema");\n\n// 1. Saat halaman dibuka → baca tema\n\n// 2. Saat tombol diklik → ganti tema & simpan\n',
      solusi: 'const btnTema = document.querySelector("#btnTema");\n\nfunction terapkanTema(tema) {\n  if (tema === "gelap") {\n    document.body.classList.add("dark-mode");\n    btnTema.textContent = "☀️ Mode Terang";\n  } else {\n    document.body.classList.remove("dark-mode");\n    btnTema.textContent = "🌙 Mode Gelap";\n  }\n}\n\n// 1. Saat halaman dibuka\nterapkanTema(localStorage.getItem("rpl_tema"));\n\n// 2. Saat tombol diklik\nbtnTema.addEventListener("click", () => {\n  if (document.body.classList.contains("dark-mode")) {\n    terapkanTema("terang");\n    localStorage.setItem("rpl_tema", "terang");\n  } else {\n    terapkanTema("gelap");\n    localStorage.setItem("rpl_tema", "gelap");\n  }\n});',
      petunjuk: [
        'Buat function <code>terapkanTema(tema)</code> agar tidak mengulang kode di dua tempat.',
        'Panggil <code>terapkanTema(localStorage.getItem("rpl_tema"));</code> saat halaman dibuka.'
      ],
      tes: [
        { nama: 'Awal → terang, tombol "🌙 Mode Gelap"', panggil: 'document.body.classList.contains("dark-mode") + "|" + __teks("#btnTema")', hasil: 'false|🌙 Mode Gelap' },
        { nama: 'Klik #btnTema → mode gelap aktif & tersimpan dengan key rpl_', panggil: '(__klik("#btnTema"), document.body.classList.contains("dark-mode") + "|" + __teks("#btnTema"))', hasil: 'true|☀️ Mode Terang', cek: punyaKeyRpl },
        { nama: 'Refresh setelah gelap → mode gelap TETAP aktif', pesan: 'Baca localStorage saat halaman dibuka, bukan hanya saat tombol diklik.', langkah: ['__klik("#btnTema")', 'document.body.classList.contains("dark-mode") + "|" + __teks("#btnTema")'], hasil: 'true|☀️ Mode Terang' },
        { nama: 'Klik lagi lalu refresh → kembali terang', langkah: ['__klik("#btnTema")', '__klik("#btnTema")', 'document.body.classList.contains("dark-mode") + "|" + __teks("#btnTema")'], hasil: 'false|🌙 Mode Gelap' }
      ]
    },

    /* ── Latihan B (Slide 11) ── */
    b1: {
      id: 'b1', mode: 'dom', preset: 'storage', jenis: 'latihan',
      judul: 'B1 — Ingat Namaku',
      soal: '<p class="content-text">Pada <code>#nama</code>, <code>#btnSimpanNama</code>, dan <code>#sapaan</code>:</p>' +
        '<ul class="task-list"><li>Saat halaman dibuka dan belum ada nama tersimpan (<code>null</code>), <code>#sapaan</code> menampilkan <code>Halo, tamu!</code>.</li>' +
        '<li>Klik <strong>Simpan</strong> → nama dari input disimpan di <code>localStorage</code> (key berawalan <code>rpl_</code>), dan <code>#sapaan</code> menampilkan <code>Halo, [nama]!</code>.</li>' +
        '<li>Setelah halaman di-<strong>refresh</strong>, sapaan nama tetap tampil.</li></ul>',
      starter: 'const nama = document.querySelector("#nama");\nconst btnSimpanNama = document.querySelector("#btnSimpanNama");\nconst sapaan = document.querySelector("#sapaan");\n\n',
      solusi: 'const nama = document.querySelector("#nama");\nconst btnSimpanNama = document.querySelector("#btnSimpanNama");\nconst sapaan = document.querySelector("#sapaan");\n\nfunction tampilkanSapaan() {\n  const tersimpan = localStorage.getItem("rpl_nama");\n  if (tersimpan === null) {\n    sapaan.textContent = "Halo, tamu!";\n  } else {\n    sapaan.textContent = `Halo, ${tersimpan}!`;\n  }\n}\n\ntampilkanSapaan();\n\nbtnSimpanNama.addEventListener("click", () => {\n  localStorage.setItem("rpl_nama", nama.value);\n  tampilkanSapaan();\n});',
      petunjuk: [
        'Cek <code>if (tersimpan === null)</code> agar tidak tampil <code>Halo, null!</code>.',
        'Panggil function penampil sapaan saat halaman dibuka dan di dalam handler klik.'
      ],
      tes: [
        { nama: 'Belum ada data → "Halo, tamu!"', panggil: '__teks("#sapaan")', hasil: 'Halo, tamu!' },
        { nama: 'Ketik "Sari" & klik Simpan → "Halo, Sari!" + key rpl_', panggil: '(__ketik("#nama", "Sari"), __klik("#btnSimpanNama"), __teks("#sapaan"))', hasil: 'Halo, Sari!', cek: punyaKeyRpl },
        { nama: 'Setelah refresh → tetap "Halo, Sari!"', langkah: ['(__ketik("#nama", "Sari"), __klik("#btnSimpanNama"))', '__teks("#sapaan")'], hasil: 'Halo, Sari!' }
      ]
    },
    b2: {
      id: 'b2', mode: 'dom', preset: 'storage', jenis: 'latihan',
      judul: 'B2 — Penghitung yang Tidak Hilang',
      soal: '<p class="content-text">Pada <code>#btnTambah</code>, <code>#angka</code>, dan <code>#btnResetHitung</code>:</p>' +
        '<ul class="task-list"><li>Klik <code>+1</code> → angka bertambah dan <strong>tersimpan</strong> di <code>localStorage</code> (key awalan <code>rpl_</code>).</li>' +
        '<li>Saat halaman dibuka, <code>#angka</code> kembali ke nilai terakhir (jika belum ada, mulai dari <code>0</code>).</li>' +
        '<li>Klik <strong>Reset</strong> → angka kembali <code>0</code> dan data <strong>dihapus</strong> memakai <code>removeItem</code>.</li></ul>',
      starter: 'const angka = document.querySelector("#angka");\nconst btnTambah = document.querySelector("#btnTambah");\nconst btnResetHitung = document.querySelector("#btnResetHitung");\n\n',
      solusi: 'const angka = document.querySelector("#angka");\nconst btnTambah = document.querySelector("#btnTambah");\nconst btnResetHitung = document.querySelector("#btnResetHitung");\n\nlet hitung = 0;\nconst tersimpan = localStorage.getItem("rpl_hitung");\nif (tersimpan !== null) {\n  hitung = Number(tersimpan);\n}\nangka.textContent = hitung;\n\nbtnTambah.addEventListener("click", () => {\n  hitung++;\n  angka.textContent = hitung;\n  localStorage.setItem("rpl_hitung", hitung);\n});\n\nbtnResetHitung.addEventListener("click", () => {\n  hitung = 0;\n  angka.textContent = hitung;\n  localStorage.removeItem("rpl_hitung");\n});',
      petunjuk: [
        'Jangan lupa ubah hasil <code>getItem</code> dengan <code>Number(...)</code> sebelum menambah <code>hitung++</code>.',
        'Saat Reset, pakai <code>localStorage.removeItem(...)</code> (jangan <code>clear()</code> agar tidak menghapus data lain).'
      ],
      syarat: [{ nama: 'Memakai removeItem untuk Reset', pola: /\.removeItem\s*\(/ }],
      tes: [
        { nama: 'Awal → "0"', panggil: '__teks("#angka")', hasil: '0' },
        { nama: 'Klik +1 tiga kali → "3" & key rpl_', panggil: '(__klik("#btnTambah", 3), __teks("#angka"))', hasil: '3', cek: punyaKeyRpl },
        { nama: 'Refresh lalu klik +1 lagi → "4" (bukan "31" atau "1")', langkah: ['__klik("#btnTambah", 3)', '(__klik("#btnTambah"), __teks("#angka"))'], hasil: '4' },
        { nama: 'Klik Reset → "0", dan tetap "0" setelah refresh', langkah: ['__klik("#btnTambah", 3)', '__klik("#btnResetHitung")', '__teks("#angka")'], hasil: '0', cek: function (ctx) { return Object.keys((ctx.run && ctx.run.storage) || {}).length === 0 ? true : 'Data penghitung harus dihapus dari localStorage saat Reset.'; } }
      ]
    },
    b3: {
      id: 'b3', mode: 'dom', preset: 'storage', jenis: 'latihan',
      judul: 'B3 — Pengunjung Setia',
      soal: '<p class="content-text">Pada <code>#kunjungan</code>: setiap kali halaman <strong>dibuka atau di-refresh</strong>, jumlah kunjungan bertambah <code>1</code>, disimpan di <code>localStorage</code> (key awalan <code>rpl_</code>), lalu ditampilkan dengan format: <code>Kamu sudah membuka halaman ini N kali.</code></p>',
      starter: 'const kunjungan = document.querySelector("#kunjungan");\n\n',
      solusi: 'const kunjungan = document.querySelector("#kunjungan");\n\nlet jumlah = 0;\nconst tersimpan = localStorage.getItem("rpl_kunjungan");\nif (tersimpan !== null) {\n  jumlah = Number(tersimpan);\n}\n\njumlah++;\nlocalStorage.setItem("rpl_kunjungan", jumlah);\nkunjungan.textContent = `Kamu sudah membuka halaman ini ${jumlah} kali.`;',
      petunjuk: [
        'Urutan saat halaman dibuka: baca → cek <code>!== null</code> → konversi <code>Number()</code> → tambah <code>1</code> → simpan lagi → tampilkan.'
      ],
      tes: [
        { nama: 'Kunjungan ke-1 → "... 1 kali." & key rpl_', panggil: '__teks("#kunjungan")', hasil: 'Kamu sudah membuka halaman ini 1 kali.', cek: punyaKeyRpl },
        { nama: 'Setelah 2 kali refresh (total 3 buka) → "... 3 kali."', langkah: [null, null, '__teks("#kunjungan")'], hasil: 'Kamu sudah membuka halaman ini 3 kali.' }
      ]
    },
    b4: {
      id: 'b4', mode: 'dom', preset: 'storage', jenis: 'latihan',
      judul: 'B4 — Buku Catatan',
      soal: '<p class="content-text">Pada <code>#inputCatatan</code>, <code>#btnCatat</code>, dan <code>#daftarCatatan</code>:</p>' +
        '<ul class="task-list"><li>Klik <strong>Tambah</strong> → masukkan isi input ke dalam <strong>array</strong>, simpan array ke <code>localStorage</code> sebagai JSON (key awalan <code>rpl_</code>), perbarui daftar <code>&lt;li&gt;</code> di layar, lalu kosongkan input. Input kosong diabaikan.</li>' +
        '<li>Saat halaman dibuka / di-refresh, catatan yang tersimpan tampil kembali.</li></ul>' +
        '<p class="content-text"><em>Petunjuk menampilkan tanpa perulangan:</em> jika array kosong, kosongkan <code>innerHTML</code>; jika ada isi, pakai <code>"&lt;li&gt;" + catatan.join("&lt;/li&gt;&lt;li&gt;") + "&lt;/li&gt;"</code>.</p>',
      starter: 'const inputCatatan = document.querySelector("#inputCatatan");\nconst btnCatat = document.querySelector("#btnCatat");\nconst daftarCatatan = document.querySelector("#daftarCatatan");\n\n',
      solusi: 'const inputCatatan = document.querySelector("#inputCatatan");\nconst btnCatat = document.querySelector("#btnCatat");\nconst daftarCatatan = document.querySelector("#daftarCatatan");\n\nlet catatan = [];\nconst tersimpan = localStorage.getItem("rpl_catatan");\nif (tersimpan !== null) {\n  catatan = JSON.parse(tersimpan);\n}\n\nfunction tampilkanCatatan() {\n  if (catatan.length === 0) {\n    daftarCatatan.innerHTML = "";\n  } else {\n    daftarCatatan.innerHTML = "<li>" + catatan.join("</li><li>") + "</li>";\n  }\n}\n\ntampilkanCatatan();\n\nbtnCatat.addEventListener("click", () => {\n  if (inputCatatan.value === "") return;\n  catatan.push(inputCatatan.value);\n  localStorage.setItem("rpl_catatan", JSON.stringify(catatan));\n  tampilkanCatatan();\n  inputCatatan.value = "";\n});',
      petunjuk: [
        'Pastikan memeriksa <code>if (tersimpan !== null)</code> sebelum <code>JSON.parse</code>.',
        'Setiap kali <code>catatan.push(...)</code>, simpan ulang dengan <code>JSON.stringify(catatan)</code>.'
      ],
      tes: [
        { nama: 'Awal kosong → 0 item', panggil: '__hitung("#daftarCatatan li")', hasil: 0 },
        { nama: 'Input kosong diabaikan', panggil: '(__ketik("#inputCatatan", ""), __klik("#btnCatat"), __hitung("#daftarCatatan li"))', hasil: 0 },
        { nama: 'Tambah 2 catatan → tampil, input kosong, tersimpan JSON berawalan rpl_', panggil: '(__ketik("#inputCatatan", "Belajar JS"), __klik("#btnCatat"), __ketik("#inputCatatan", "Kerjakan tugas"), __klik("#btnCatat"), __semua("#daftarCatatan li").join(",") + "|" + document.querySelector("#inputCatatan").value)', hasil: 'Belajar JS,Kerjakan tugas|', cek: punyaKeyRpl },
        { nama: 'Refresh lalu tambah 1 lagi → semua 3 catatan tampil', langkah: ['(__ketik("#inputCatatan", "Satu"), __klik("#btnCatat"), __ketik("#inputCatatan", "Dua"), __klik("#btnCatat"))', '(__ketik("#inputCatatan", "Tiga"), __klik("#btnCatat"), __semua("#daftarCatatan li"))'], hasil: ['Satu', 'Dua', 'Tiga'] }
      ]
    },
    b5: {
      id: 'b5', mode: 'dom', preset: 'storage', jenis: 'latihan',
      judul: 'B5 — Hapus Semua Catatan',
      soal: '<p class="content-text">Kode B4 sudah disiapkan di editor. Lanjutkan dengan memasang listener pada <code>#btnHapusCatatan</code>: saat diklik, kosongkan array <code>catatan</code>, <strong>hapus</strong> data dari <code>localStorage</code> memakai <code>removeItem</code>, dan kosongkan daftar di layar.</p>',
      starter: 'const inputCatatan = document.querySelector("#inputCatatan");\nconst btnCatat = document.querySelector("#btnCatat");\nconst btnHapusCatatan = document.querySelector("#btnHapusCatatan");\nconst daftarCatatan = document.querySelector("#daftarCatatan");\n\nlet catatan = [];\nconst tersimpan = localStorage.getItem("rpl_catatan");\nif (tersimpan !== null) {\n  catatan = JSON.parse(tersimpan);\n}\n\nfunction tampilkanCatatan() {\n  if (catatan.length === 0) {\n    daftarCatatan.innerHTML = "";\n  } else {\n    daftarCatatan.innerHTML = "<li>" + catatan.join("</li><li>") + "</li>";\n  }\n}\n\ntampilkanCatatan();\n\nbtnCatat.addEventListener("click", () => {\n  if (inputCatatan.value === "") return;\n  catatan.push(inputCatatan.value);\n  localStorage.setItem("rpl_catatan", JSON.stringify(catatan));\n  tampilkanCatatan();\n  inputCatatan.value = "";\n});\n\n// Tulis handler #btnHapusCatatan di sini\n',
      solusi: 'const inputCatatan = document.querySelector("#inputCatatan");\nconst btnCatat = document.querySelector("#btnCatat");\nconst btnHapusCatatan = document.querySelector("#btnHapusCatatan");\nconst daftarCatatan = document.querySelector("#daftarCatatan");\n\nlet catatan = [];\nconst tersimpan = localStorage.getItem("rpl_catatan");\nif (tersimpan !== null) {\n  catatan = JSON.parse(tersimpan);\n}\n\nfunction tampilkanCatatan() {\n  if (catatan.length === 0) {\n    daftarCatatan.innerHTML = "";\n  } else {\n    daftarCatatan.innerHTML = "<li>" + catatan.join("</li><li>") + "</li>";\n  }\n}\n\ntampilkanCatatan();\n\nbtnCatat.addEventListener("click", () => {\n  if (inputCatatan.value === "") return;\n  catatan.push(inputCatatan.value);\n  localStorage.setItem("rpl_catatan", JSON.stringify(catatan));\n  tampilkanCatatan();\n  inputCatatan.value = "";\n});\n\nbtnHapusCatatan.addEventListener("click", () => {\n  catatan = [];\n  localStorage.removeItem("rpl_catatan");\n  tampilkanCatatan();\n});',
      petunjuk: [
        'Tiga langkah di dalam klik <code>btnHapusCatatan</code>: <code>catatan = [];</code> → <code>localStorage.removeItem("rpl_catatan");</code> → <code>tampilkanCatatan();</code>.'
      ],
      syarat: [{ nama: 'Memakai removeItem', pola: /\.removeItem\s*\(/ }],
      tes: [
        { nama: 'Klik Hapus Semua → daftar kosong & rpl_catatan terhapus', panggil: '(__ketik("#inputCatatan", "A"), __klik("#btnCatat"), __klik("#btnHapusCatatan"), __hitung("#daftarCatatan li"))', hasil: 0, cek: function (ctx) { return (ctx.run && ctx.run.storage && Object.keys(ctx.run.storage).length === 0) ? true : 'rpl_catatan masih ada di localStorage.'; } },
        { nama: 'Setelah refresh → tetap kosong, lalu bisa tambah catatan baru', langkah: ['(__ketik("#inputCatatan", "A"), __klik("#btnCatat"), __klik("#btnHapusCatatan"))', '(__hitung("#daftarCatatan li") + "|" + (__ketik("#inputCatatan", "Baru"), __klik("#btnCatat"), __semua("#daftarCatatan li").join()))'], hasil: '0|Baru' },
        { nama: 'Tambah setelah hapus tanpa refresh → tidak membawa catatan lama', panggil: '(__ketik("#inputCatatan", "Lama"), __klik("#btnCatat"), __klik("#btnHapusCatatan"), __ketik("#inputCatatan", "Baru"), __klik("#btnCatat"), __semua("#daftarCatatan li"))', hasil: ['Baru'] }
      ]
    },
    b6: {
      id: 'b6', mode: 'dom', preset: 'storage', jenis: 'latihan',
      judul: 'B6 — Profil Tersimpan',
      soal: '<p class="content-text">Pada <code>#inputProfilNama</code>, <code>#inputProfilKelas</code>, <code>#btnSimpanProfil</code>, dan <code>#tampilProfil</code>:</p>' +
        '<ul class="task-list"><li>Saat halaman dibuka dan belum ada profil tersimpan, tampilkan <code>Profil belum disimpan.</code> di <code>#tampilProfil</code>.</li>' +
        '<li>Klik <strong>Simpan Profil</strong> → simpan sebagai <strong>satu object</strong> <code>{ nama, kelas }</code> memakai <code>JSON.stringify</code> (key awalan <code>rpl_</code>), dan tampilkan <code>Nama: [nama], Kelas: [kelas]</code>.</li>' +
        '<li>Saat halaman di-refresh, profil tetap tampil.</li></ul>',
      starter: 'const inputProfilNama = document.querySelector("#inputProfilNama");\nconst inputProfilKelas = document.querySelector("#inputProfilKelas");\nconst btnSimpanProfil = document.querySelector("#btnSimpanProfil");\nconst tampilProfil = document.querySelector("#tampilProfil");\n\n',
      solusi: 'const inputProfilNama = document.querySelector("#inputProfilNama");\nconst inputProfilKelas = document.querySelector("#inputProfilKelas");\nconst btnSimpanProfil = document.querySelector("#btnSimpanProfil");\nconst tampilProfil = document.querySelector("#tampilProfil");\n\nfunction tampilkanProfil() {\n  const tersimpan = localStorage.getItem("rpl_profil");\n  if (tersimpan === null) {\n    tampilProfil.textContent = "Profil belum disimpan.";\n  } else {\n    const profil = JSON.parse(tersimpan);\n    tampilProfil.textContent = `Nama: ${profil.nama}, Kelas: ${profil.kelas}`;\n  }\n}\n\ntampilkanProfil();\n\nbtnSimpanProfil.addEventListener("click", () => {\n  const profil = {\n    nama: inputProfilNama.value,\n    kelas: inputProfilKelas.value\n  };\n  localStorage.setItem("rpl_profil", JSON.stringify(profil));\n  tampilkanProfil();\n});',
      petunjuk: [
        'Buat object <code>const profil = { nama: inputProfilNama.value, kelas: inputProfilKelas.value };</code> lalu simpan dengan <code>JSON.stringify(profil)</code>.'
      ],
      syarat: [
        { nama: 'Memakai JSON.stringify', pola: /JSON\.stringify\s*\(/ },
        { nama: 'Memakai JSON.parse', pola: /JSON\.parse\s*\(/ }
      ],
      tes: [
        { nama: 'Belum ada profil → "Profil belum disimpan."', panggil: '__teks("#tampilProfil")', hasil: 'Profil belum disimpan.' },
        { nama: 'Simpan profil → "Nama: Ani, Kelas: XI RPL 2" & tersimpan 1 object JSON', panggil: '(__ketik("#inputProfilNama", "Ani"), __ketik("#inputProfilKelas", "XI RPL 2"), __klik("#btnSimpanProfil"), __teks("#tampilProfil"))', hasil: 'Nama: Ani, Kelas: XI RPL 2', cek: function (ctx) { var st = (ctx.run && ctx.run.storage) || {}; var keys = Object.keys(st).filter(function (k) { return k.indexOf('rpl_') === 0; }); if (keys.length !== 1) return 'Simpan sebagai SATU key object berawalan rpl_ (ditemukan ' + keys.length + ' key).'; try { var o = JSON.parse(st[keys[0]]); return o && o.nama === 'Ani' && o.kelas === 'XI RPL 2' ? true : 'Isi JSON harus object { nama, kelas }.'; } catch (e) { return 'Nilai tersimpan bukan JSON valid.'; } } },
        { nama: 'Setelah refresh → profil tetap tampil', langkah: ['(__ketik("#inputProfilNama", "Budi"), __ketik("#inputProfilKelas", "XI RPL 1"), __klik("#btnSimpanProfil"))', '__teks("#tampilProfil")'], hasil: 'Nama: Budi, Kelas: XI RPL 1' }
      ]
    },

    /* ── Latihan C: cari & perbaiki (Slide 12) ── */
    c1: {
      id: 'c1', jenis: 'perbaiki',
      judul: 'C1 — Object tanpa JSON',
      soal: '<p class="content-text">Kode ini ingin menyimpan object siswa lalu menampilkan <code>"Budi"</code> di Console. Jalankan, amati output-nya, tulis kesalahannya di komentar, lalu perbaiki.</p>',
      starter: 'localStorage.setItem("rpl_siswa", { nama: "Budi" });\nconsole.log(localStorage.getItem("rpl_siswa").nama);   // ingin menampilkan "Budi"\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: object disimpan tanpa JSON.stringify (tersimpan "[object Object]") dan dibaca tanpa JSON.parse.\nlocalStorage.setItem("rpl_siswa", JSON.stringify({ nama: "Budi" }));\nconsole.log(JSON.parse(localStorage.getItem("rpl_siswa")).nama);',
      petunjuk: ['Ubah object menjadi string dengan <code>JSON.stringify(...)</code> saat menyimpan, lalu ubah kembali dengan <code>JSON.parse(...)</code> saat membaca.'],
      tes: [{ nama: 'Console menampilkan "Budi"', output: ['Budi'] }]
    },
    c2: {
      id: 'c2', jenis: 'perbaiki',
      judul: 'C2 — String ditambah angka',
      soal: '<p class="content-text">Kode ini seharusnya menampilkan angka <code>6</code>, tetapi yang muncul <code>51</code>. Tulis kesalahannya di komentar lalu perbaiki.</p>',
      starter: 'localStorage.setItem("rpl_hitung", 5);\nconst hitung = localStorage.getItem("rpl_hitung");\nconsole.log(hitung + 1);                               // seharusnya 6\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: localStorage selalu mengembalikan string ("5"), sehingga "5" + 1 digabung menjadi "51".\nlocalStorage.setItem("rpl_hitung", 5);\nconst hitung = Number(localStorage.getItem("rpl_hitung"));\nconsole.log(hitung + 1);',
      petunjuk: ['Konversi hasil <code>getItem</code> ke angka dengan <code>Number(...)</code> sebelum dijumlah.'],
      tes: [{ nama: 'Console menampilkan 6', output: ['6'] }]
    },
    c3: {
      id: 'c3', mode: 'dom', preset: 'storage', jenis: 'perbaiki',
      judul: 'C3 — Tampil "Halo, null!"',
      soal: '<p class="content-text">Jika <code>"rpl_nama_baru"</code> belum pernah disimpan, <code>#sapaan</code> malah tampil <code>Halo, null!</code>. Perbaiki agar jika belum ada data tampil <code>Halo, tamu!</code>, dan jika sudah ada tampil <code>Halo, [nama]!</code>.</p>',
      starter: 'const sapaan = document.querySelector("#sapaan");\nconst nama = localStorage.getItem("rpl_nama_baru");    // key belum pernah disimpan\nsapaan.textContent = `Halo, ${nama}!`;                 // tampil "Halo, null!"\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: tidak memeriksa null ketika key belum pernah disimpan.\nconst sapaan = document.querySelector("#sapaan");\nconst nama = localStorage.getItem("rpl_nama_baru");\n\nif (nama === null) {\n  sapaan.textContent = "Halo, tamu!";\n} else {\n  sapaan.textContent = `Halo, ${nama}!`;\n}',
      petunjuk: ['Periksa <code>if (nama === null)</code> sebelum menampilkan ke <code>sapaan.textContent</code>.'],
      tes: [
        { nama: 'Belum ada data (null) → "Halo, tamu!"', panggil: '__teks("#sapaan")', hasil: 'Halo, tamu!' },
        { nama: 'Sudah ada "Ani" → "Halo, Ani!"', storage: { rpl_nama_baru: 'Ani' }, panggil: '__teks("#sapaan")', hasil: 'Halo, Ani!' }
      ]
    },
    c4: {
      id: 'c4', jenis: 'perbaiki',
      judul: 'C4 — Key berbeda huruf besar-kecil',
      soal: '<p class="content-text">Kode ini ingin menampilkan <code>"Budi"</code>, tetapi tampil <code>null</code>. Temukan kesalahannya dan perbaiki.</p>',
      starter: 'localStorage.setItem("rpl_nama", "Budi");\nconsole.log(localStorage.getItem("Rpl_Nama"));         // ingin menampilkan "Budi"\n\n// Kesalahan: \n',
      solusi: '// Kesalahan: nama key bersifat case-sensitive ("rpl_nama" berbeda dengan "Rpl_Nama").\nlocalStorage.setItem("rpl_nama", "Budi");\nconsole.log(localStorage.getItem("rpl_nama"));',
      petunjuk: ['Samakan persis huruf besar-kecil key saat <code>setItem</code> dan <code>getItem</code>.'],
      tes: [{ nama: 'Console menampilkan "Budi"', output: ['Budi'] }]
    },
    c5: {
      id: 'c5', mode: 'dom', preset: 'storage', jenis: 'perbaiki',
      judul: 'C5 — Dua kesalahan pada array JSON',
      soal: '<p class="content-text">Kode ini memiliki <strong>dua masalah</strong> jika <code>"rpl_catatan"</code> belum pernah disimpan dan halaman di-refresh. Jalankan, baca error-nya, tulis kedua kesalahan di komentar, lalu perbaiki.</p>',
      starter: 'let catatan = JSON.parse(localStorage.getItem("rpl_catatan"));\ncatatan.push("Belajar JavaScript");                    // lalu refresh: catatan baru hilang\nconsole.log(catatan);\n\n// Kesalahan 1: \n// Kesalahan 2: \n',
      solusi: '// Kesalahan 1: JSON.parse(null) menghasilkan null sehingga catatan.push() error.\n// Kesalahan 2: setelah push, array tidak disimpan lagi dengan setItem + JSON.stringify.\nlet catatan = [];\nconst tersimpan = localStorage.getItem("rpl_catatan");\nif (tersimpan !== null) {\n  catatan = JSON.parse(tersimpan);\n}\ncatatan.push("Belajar JavaScript");\nlocalStorage.setItem("rpl_catatan", JSON.stringify(catatan));\nconsole.log(catatan);',
      petunjuk: [
        'Masalah 1: siapkan <code>let catatan = [];</code> dan hanya panggil <code>JSON.parse</code> bila <code>tersimpan !== null</code>.',
        'Masalah 2: panggil <code>localStorage.setItem("rpl_catatan", JSON.stringify(catatan));</code> setelah <code>push</code>.'
      ],
      tes: [
        { nama: 'Belum ada data → tidak error & tersimpan ["Belajar JavaScript"]', cek: jsonArrayValid('rpl_catatan', ['Belajar JavaScript']) },
        { nama: 'Sudah ada data → bertambah & tersimpan ulang setelah refresh', storage: { rpl_catatan: '["HTML"]' }, langkah: [null, 'JSON.parse(localStorage.getItem("rpl_catatan"))'], hasil: ['HTML', 'Belajar JavaScript', 'Belajar JavaScript'] }
      ]
    }
  },

  /* ── Tantangan (dinilai) ── */
  tantangan: [
    {
      id: 't1', mode: 'dom', preset: 'storage', jenis: 'tantangan',
      judul: 'Rekor Tertinggi (B2 + B7)',
      soal: '<p class="content-text">Lanjutkan fungsi penghitung B2 pada <code>#btnTambah</code>, <code>#angka</code>, <code>#btnResetHitung</code>, dan tambahkan fitur rekor di <code>#rekor</code>:</p>' +
        '<ol class="task-list"><li>Klik <code>+1</code> menambah <code>#angka</code> dan menyimpannya ke <code>localStorage</code>.</li>' +
        '<li>Simpan juga <strong>rekor</strong> (angka tertinggi yang pernah dicapai) di key lain dan tampilkan di <code>#rekor</code>.</li>' +
        '<li>Klik <strong>Reset</strong> mengembalikan <code>#angka</code> ke <code>0</code> dan menghapus data penghitung, namun <strong>rekor tetap tersimpan</strong>.</li>' +
        '<li>Gunakan key berawalan <code>rpl_</code> dan pastikan angka serta rekor bertahan setelah refresh.</li></ol>',
      starter: 'const angka = document.querySelector("#angka");\nconst rekor = document.querySelector("#rekor");\nconst btnTambah = document.querySelector("#btnTambah");\nconst btnResetHitung = document.querySelector("#btnResetHitung");\n\n',
      solusi: 'const angka = document.querySelector("#angka");\nconst rekor = document.querySelector("#rekor");\nconst btnTambah = document.querySelector("#btnTambah");\nconst btnResetHitung = document.querySelector("#btnResetHitung");\n\nlet hitung = 0;\nlet nilaiRekor = 0;\n\nconst hitungTersimpan = localStorage.getItem("rpl_hitung");\nif (hitungTersimpan !== null) {\n  hitung = Number(hitungTersimpan);\n}\n\nconst rekorTersimpan = localStorage.getItem("rpl_rekor");\nif (rekorTersimpan !== null) {\n  nilaiRekor = Number(rekorTersimpan);\n}\n\nangka.textContent = hitung;\nrekor.textContent = nilaiRekor;\n\nbtnTambah.addEventListener("click", () => {\n  hitung++;\n  angka.textContent = hitung;\n  localStorage.setItem("rpl_hitung", hitung);\n\n  if (hitung > nilaiRekor) {\n    nilaiRekor = hitung;\n    rekor.textContent = nilaiRekor;\n    localStorage.setItem("rpl_rekor", nilaiRekor);\n  }\n});\n\nbtnResetHitung.addEventListener("click", () => {\n  hitung = 0;\n  angka.textContent = hitung;\n  localStorage.removeItem("rpl_hitung");\n});',
      petunjuk: [
        'Gunakan dua key terpisah, misal <code>"rpl_hitung"</code> dan <code>"rpl_rekor"</code>.',
        'Perbarui rekor hanya jika <code>hitung &gt; nilaiRekor</code>.',
        'Pada tombol Reset, hapus hanya key penghitung dengan <code>removeItem</code> — jangan pakai <code>clear()</code> agar rekor tidak ikut terhapus.'
      ],
      tes: [
        { nama: 'Awal → angka 0, rekor 0', panggil: '__teks("#angka") + "|" + __teks("#rekor")', hasil: '0|0' },
        { nama: 'Klik +1 empat kali & refresh → angka 4, rekor 4 (key rpl_)', langkah: ['__klik("#btnTambah", 4)', '__teks("#angka") + "|" + __teks("#rekor")'], hasil: '4|4', cek: punyaKeyRpl },
        { nama: 'Reset lalu refresh → angka 0, rekor TETAP 4', pesan: 'Jangan panggil clear() saat Reset — gunakan removeItem hanya untuk key penghitung.', langkah: ['__klik("#btnTambah", 4)', '__klik("#btnResetHitung")', '__teks("#angka") + "|" + __teks("#rekor")'], hasil: '0|4' },
        { nama: 'Setelah Reset, klik +1 dua kali → angka 2, rekor masih 4', langkah: ['__klik("#btnTambah", 4)', '__klik("#btnResetHitung")', '(__klik("#btnTambah", 2), __teks("#angka") + "|" + __teks("#rekor"))'], hasil: '2|4' },
        { nama: 'Melewati rekor lama (klik +1 lima kali) & refresh → rekor naik jadi 5', langkah: ['__klik("#btnTambah", 4)', '__klik("#btnResetHitung")', '__klik("#btnTambah", 5)', '__teks("#angka") + "|" + __teks("#rekor")'], hasil: '5|5' }
      ]
    },
    {
      id: 't2', mode: 'dom', preset: 'todoStorage', jenis: 'studi-kasus',
      judul: 'Studi Kasus: Daftar Tugas Tersimpan',
      soal: '<p class="content-text">Lihat tab <code>index.html</code>: bangun daftar tugas dari materi Event, kali ini <strong>disimpan di <code>localStorage</code></strong> (array of object <code>[{ teks, selesai }]</code> dengan key awalan <code>rpl_</code>):</p>' +
        '<ol class="task-list"><li>Klik <code>#btnTambah</code> atau tekan <kbd>Enter</kbd> di <code>#inputTugas</code> → tambah tugas (di-<code>trim</code>), abaikan input kosong, kosongkan input, simpan ke <code>localStorage</code>.</li>' +
        '<li>Setiap item berupa <code>&lt;li&gt;&lt;span&gt;teks&lt;/span&gt;&lt;button class="hapus"&gt;Hapus&lt;/button&gt;&lt;/li&gt;</code>. Jika status <code>selesai</code> bernilai <code>true</code>, <code>&lt;li&gt;</code> memiliki class <code>selesai</code>.</li>' +
        '<li>Klik <code>&lt;span&gt;</code> → <em>toggle</em> status <code>selesai</code> dan simpan ulang. Klik <strong>Hapus</strong> → hapus item dari array &amp; <code>localStorage</code>.</li>' +
        '<li><code>#jumlahTugas</code> selalu akurat, dan seluruh daftar + status selesai tetap ada setelah refresh.</li></ol>',
      starter: 'const input = document.querySelector("#inputTugas");\nconst daftar = document.querySelector("#daftarTugas");\nconst jumlah = document.querySelector("#jumlahTugas");\n\n',
      solusi: 'const input = document.querySelector("#inputTugas");\nconst daftar = document.querySelector("#daftarTugas");\nconst jumlah = document.querySelector("#jumlahTugas");\n\nlet tugas = [];\nconst tersimpan = localStorage.getItem("rpl_tugas");\nif (tersimpan !== null) {\n  tugas = JSON.parse(tersimpan);\n}\n\nfunction simpanTugas() {\n  localStorage.setItem("rpl_tugas", JSON.stringify(tugas));\n}\n\nfunction tampilkanTugas() {\n  daftar.innerHTML = "";\n  tugas.forEach((item, index) => {\n    const li = document.createElement("li");\n    if (item.selesai) li.classList.add("selesai");\n\n    const span = document.createElement("span");\n    span.textContent = item.teks;\n    span.addEventListener("click", () => {\n      tugas[index].selesai = !tugas[index].selesai;\n      simpanTugas();\n      tampilkanTugas();\n    });\n\n    const btnHapus = document.createElement("button");\n    btnHapus.className = "hapus";\n    btnHapus.textContent = "Hapus";\n    btnHapus.addEventListener("click", () => {\n      tugas.splice(index, 1);\n      simpanTugas();\n      tampilkanTugas();\n    });\n\n    li.append(span, btnHapus);\n    daftar.append(li);\n  });\n  jumlah.textContent = tugas.length;\n}\n\ntampilkanTugas();\n\nfunction tambahTugas() {\n  const teks = input.value.trim();\n  if (teks === "") return;\n  tugas.push({ teks: teks, selesai: false });\n  simpanTugas();\n  tampilkanTugas();\n  input.value = "";\n}\n\ndocument.querySelector("#btnTambah").addEventListener("click", tambahTugas);\ninput.addEventListener("keydown", (e) => {\n  if (e.key === "Enter") tambahTugas();\n});',
      petunjuk: [
        'Simpan array berisi object: <code>{ teks: teks, selesai: false }</code> dengan <code>JSON.stringify</code>.',
        'Buat function <code>tampilkanTugas()</code> yang merender ulang <code>#daftarTugas</code> dari array <code>tugas</code> setiap kali halaman dibuka, ditambah, ditandai selesai, atau dihapus.',
        'Gunakan <code>tugas.splice(index, 1)</code> untuk menghapus item tertentu dari array lalu panggil <code>simpanTugas()</code>.'
      ],
      syarat: [
        { nama: 'Memakai JSON.stringify & JSON.parse', pola: /JSON\.stringify\s*\([\s\S]*JSON\.parse\s*\(|JSON\.parse\s*\([\s\S]*JSON\.stringify\s*\(/ }
      ],
      tes: [
        { nama: 'Tambah via tombol & Enter, kosong diabaikan, jumlah akurat', panggil: '(__ketik("#inputTugas", "   "), __klik("#btnTambah"), __ketik("#inputTugas", " PR Web "), __klik("#btnTambah"), __ketik("#inputTugas", "Latihan JS"), __tekan("#inputTugas", "Enter"), __semua("#daftarTugas li span").join(",") + "|" + document.querySelector("#inputTugas").value + "|" + __teks("#jumlahTugas"))', hasil: 'PR Web,Latihan JS||2', cek: punyaKeyRpl },
        { nama: 'Setelah refresh → kedua tugas & jumlah tetap tampil', langkah: ['(__ketik("#inputTugas", "PR Web"), __klik("#btnTambah"), __ketik("#inputTugas", "Latihan JS"), __tekan("#inputTugas", "Enter"))', '__semua("#daftarTugas li span").join(",") + "|" + __teks("#jumlahTugas")'], hasil: 'PR Web,Latihan JS|2' },
        { nama: 'Tandai tugas pertama selesai & refresh → status selesai bertahan', langkah: ['(__ketik("#inputTugas", "A"), __klik("#btnTambah"), __ketik("#inputTugas", "B"), __klik("#btnTambah"), __klik("#daftarTugas li:first-child span"))', 'document.querySelector("#daftarTugas li:first-child").classList.contains("selesai") + "|" + document.querySelector("#daftarTugas li:last-child").classList.contains("selesai")'], hasil: 'true|false' },
        { nama: 'Hapus tugas pertama & refresh → tersisa tugas kedua & jumlah 1', langkah: ['(__ketik("#inputTugas", "A"), __klik("#btnTambah"), __ketik("#inputTugas", "B"), __klik("#btnTambah"), __klik("#daftarTugas li:first-child .hapus"))', '__semua("#daftarTugas li span").join(",") + "|" + __teks("#jumlahTugas")'], hasil: 'B|1' }
      ]
    },
    {
      id: 't3', mode: 'dom', preset: 'belanja', jenis: 'studi-kasus',
      judul: 'Studi Kasus: Catatan Belanja & Total',
      soal: '<p class="content-text">Lihat tab <code>index.html</code>: buat pencatat belanja sederhana dengan array of object <code>[{ nama, harga }]</code> yang disimpan ke <code>localStorage</code> (key awalan <code>rpl_</code>):</p>' +
        '<ol class="task-list"><li>Klik <code>#btnTambahBelanja</code>: baca <code>#namaBarang</code> (<code>trim</code>) dan <code>#hargaBarang</code> (<code>Number</code>). Abaikan jika nama kosong atau harga kosong / <code>&lt;= 0</code>.</li>' +
        '<li>Tambahkan ke array, simpan sebagai JSON, kosongkan kedua input, lalu tampilkan tiap barang sebagai <code>&lt;li&gt;</code> berisi teks nama &amp; harga serta tombol <code>&lt;button class="hapus"&gt;Hapus&lt;/button&gt;</code>.</li>' +
        '<li>Hitung total seluruh harga dan tampilkan angkanya di <code>#totalBelanja</code> (contoh: <code>15000</code>).</li>' +
        '<li>Tombol <code>.hapus</code> menghapus satu barang; <code>#btnKosongkan</code> menghapus semua barang dari layar dan <code>localStorage</code> (<code>removeItem</code>). Semua tetap tersimpan setelah refresh.</li></ol>',
      starter: 'const namaBarang = document.querySelector("#namaBarang");\nconst hargaBarang = document.querySelector("#hargaBarang");\nconst btnTambah = document.querySelector("#btnTambahBelanja");\nconst btnKosongkan = document.querySelector("#btnKosongkan");\nconst daftar = document.querySelector("#daftarBelanja");\nconst totalEl = document.querySelector("#totalBelanja");\n\n',
      solusi: 'const namaBarang = document.querySelector("#namaBarang");\nconst hargaBarang = document.querySelector("#hargaBarang");\nconst btnTambah = document.querySelector("#btnTambahBelanja");\nconst btnKosongkan = document.querySelector("#btnKosongkan");\nconst daftar = document.querySelector("#daftarBelanja");\nconst totalEl = document.querySelector("#totalBelanja");\n\nlet belanja = [];\nconst tersimpan = localStorage.getItem("rpl_belanja");\nif (tersimpan !== null) {\n  belanja = JSON.parse(tersimpan);\n}\n\nfunction tampilkanBelanja() {\n  daftar.innerHTML = "";\n  let total = 0;\n  belanja.forEach((item, index) => {\n    total += item.harga;\n    const li = document.createElement("li");\n    const span = document.createElement("span");\n    span.textContent = `${item.nama} — Rp ${item.harga}`;\n    const btnHapus = document.createElement("button");\n    btnHapus.className = "hapus";\n    btnHapus.textContent = "Hapus";\n    btnHapus.addEventListener("click", () => {\n      belanja.splice(index, 1);\n      localStorage.setItem("rpl_belanja", JSON.stringify(belanja));\n      tampilkanBelanja();\n    });\n    li.append(span, btnHapus);\n    daftar.append(li);\n  });\n  totalEl.textContent = total;\n}\n\ntampilkanBelanja();\n\nbtnTambah.addEventListener("click", () => {\n  const nama = namaBarang.value.trim();\n  const harga = Number(hargaBarang.value);\n  if (nama === "" || hargaBarang.value === "" || isNaN(harga) || harga <= 0) return;\n\n  belanja.push({ nama: nama, harga: harga });\n  localStorage.setItem("rpl_belanja", JSON.stringify(belanja));\n  tampilkanBelanja();\n  namaBarang.value = "";\n  hargaBarang.value = "";\n});\n\nbtnKosongkan.addEventListener("click", () => {\n  belanja = [];\n  localStorage.removeItem("rpl_belanja");\n  tampilkanBelanja();\n});',
      petunjuk: [
        'Ubah harga dari input dengan <code>Number(hargaBarang.value)</code> dan cek <code>harga &lt;= 0</code>.',
        'Hitung total di dalam <code>tampilkanBelanja()</code> dengan menjumlah <code>item.harga</code> setiap item.'
      ],
      syarat: [
        { nama: 'Memakai Number() untuk harga', pola: /Number\s*\(/ },
        { nama: 'Memakai removeItem saat mengosongkan', pola: /\.removeItem\s*\(/ }
      ],
      tes: [
        { nama: 'Awal kosong → 0 barang & total 0', panggil: '__hitung("#daftarBelanja li") + "|" + __teks("#totalBelanja")', hasil: '0|0' },
        { nama: 'Input kosong atau harga <= 0 diabaikan', panggil: '(__ketik("#namaBarang", ""), __ketik("#hargaBarang", "5000"), __klik("#btnTambahBelanja"), __ketik("#namaBarang", "Roti"), __ketik("#hargaBarang", "0"), __klik("#btnTambahBelanja"), __hitung("#daftarBelanja li") + "|" + __teks("#totalBelanja"))', hasil: '0|0' },
        { nama: 'Tambah 2 barang & refresh → daftar tetap ada & total 15000', langkah: ['(__ketik("#namaBarang", "Buku"), __ketik("#hargaBarang", "12000"), __klik("#btnTambahBelanja"), __ketik("#namaBarang", "Pulpen"), __ketik("#hargaBarang", "3000"), __klik("#btnTambahBelanja"))', '__hitung("#daftarBelanja li") + "|" + __teks("#totalBelanja")'], hasil: '2|15000', cek: punyaKeyRpl },
        { nama: 'Hapus barang pertama & refresh → sisa 1 barang & total 3000', langkah: ['(__ketik("#namaBarang", "Buku"), __ketik("#hargaBarang", "12000"), __klik("#btnTambahBelanja"), __ketik("#namaBarang", "Pulpen"), __ketik("#hargaBarang", "3000"), __klik("#btnTambahBelanja"), __klik("#daftarBelanja li:first-child .hapus"))', '__hitung("#daftarBelanja li") + "|" + __teks("#totalBelanja")'], hasil: '1|3000' },
        { nama: 'Kosongkan semua & refresh → 0 barang, total 0, storage kosong', langkah: ['(__ketik("#namaBarang", "Buku"), __ketik("#hargaBarang", "12000"), __klik("#btnTambahBelanja"), __klik("#btnKosongkan"))', '__hitung("#daftarBelanja li") + "|" + __teks("#totalBelanja")'], hasil: '0|0', cek: function (ctx) { return Object.keys((ctx.run && ctx.run.storage) || {}).length === 0 ? true : 'Data belanja di localStorage harus dihapus saat dikosongkan.'; } }
      ]
    }
  ],

  /* ── Kuis (dinilai) ── */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Apa perbedaan utama antara variabel biasa dan <code>localStorage</code>?',
      opsi: [
        'Variabel biasa lebih lambat daripada localStorage',
        'Data di variabel biasa hilang saat halaman di-refresh, sedangkan data di localStorage tetap tersimpan di browser',
        'localStorage bisa langsung dibaca oleh pengguna lain di HP yang berbeda',
        'Variabel biasa hanya bisa menyimpan string'
      ],
      jawab: 1,
      bahas: 'Variabel disimpan di memori sementara, sehingga hilang saat <i>refresh</i>. <code>localStorage</code> menyimpan pasangan <code>key: value</code> di browser sehingga bertahan saat refresh maupun tab ditutup.'
    },
    {
      tipe: 'pg',
      tanya: 'Method mana yang digunakan untuk <strong>membaca</strong> data dari <code>localStorage</code>?',
      opsi: ['`localStorage.setItem("kunci")`', '`localStorage.getItem("kunci")`', '`localStorage.readItem("kunci")`', '`localStorage.removeItem("kunci")`'],
      jawab: 1,
      bahas: '<code>setItem(key, value)</code> menyimpan, <code>getItem(key)</code> membaca, <code>removeItem(key)</code> menghapus satu data, dan <code>clear()</code> menghapus semua data.'
    },
    {
      tipe: 'isian',
      tanya: 'Jika key <code>"rpl_hobi"</code> belum pernah disimpan, apa nilai yang dikembalikan oleh <code>localStorage.getItem("rpl_hobi")</code>?',
      jawab: ['null'],
      bahas: '<code>getItem</code> mengembalikan <code>null</code> ketika key tidak ditemukan (belum pernah disimpan atau sudah dihapus).'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'localStorage.setItem("rpl_umur", 16);\nconsole.log(typeof localStorage.getItem("rpl_umur"));',
      opsi: ['"number"', '"string"', '"boolean"', '"undefined"'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: '<code>localStorage</code> <b>hanya menyimpan string</b>. Angka <code>16</code> otomatis diubah menjadi <code>"16"</code>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'localStorage.setItem("a", 5);\nlocalStorage.setItem("b", 3);\nconsole.log(localStorage.getItem("a") + localStorage.getItem("b"));',
      jawab: ['53', '"53"'],
      cekOutput: true,
      bahas: 'Karena keduanya berupa string (<code>"5"</code> dan <code>"3"</code>), operator <code>+</code> menggabungkannya menjadi <code>"53"</code>. Gunakan <code>Number()</code> sebelum menjumlah.'
    },
    {
      tipe: 'pg',
      tanya: 'Bagaimana cara memeriksa apakah flag boolean <code>"rpl_aktif"</code> di <code>localStorage</code> bernilai benar?',
      opsi: [
        '`localStorage.getItem("rpl_aktif") === true`',
        '`localStorage.getItem("rpl_aktif") === "true"`',
        '`Number(localStorage.getItem("rpl_aktif"))`',
        '`Boolean(localStorage.getItem("rpl_aktif"))`'
      ],
      jawab: 1,
      bahas: 'Boolean <code>true</code> disimpan menjadi string <code>"true"</code>, jadi harus dibandingkan dengan string <code>"true"</code>. Hati-hati: <code>Boolean("false")</code> juga bernilai <code>true</code> karena string tidak kosong!'
    },
    {
      tipe: 'pg',
      tanya: 'Apa yang tampil di Console jika object disimpan langsung ke <code>localStorage</code> tanpa <code>JSON.stringify</code>?',
      kode: 'const siswa = { nama: "Budi" };\nlocalStorage.setItem("rpl_siswa", siswa);\nconsole.log(localStorage.getItem("rpl_siswa"));',
      opsi: ['`{ nama: "Budi" }`', '`"[object Object]"`', '`null`', '`undefined`'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Mengubah object biasa langsung menjadi string menghasilkan <code>"[object Object]"</code>. Gunakan <code>JSON.stringify(siswa)</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa fungsi <code>JSON.parse(teks)</code>?',
      opsi: [
        'Mengubah array/object menjadi string JSON untuk disimpan',
        'Mengubah string JSON kembali menjadi array/object asli JavaScript',
        'Menghapus seluruh isi localStorage',
        'Mengubah string angka menjadi huruf besar'
      ],
      jawab: 1,
      bahas: '<code>JSON.stringify(data)</code> dipakai saat <b>menyimpan</b> (array/object → string), sedangkan <code>JSON.parse(teks)</code> dipakai saat <b>membaca</b> (string → array/object).'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output baris kedua kode berikut?',
      kode: 'const buah = ["apel", "jeruk"];\nlocalStorage.setItem("rpl_buah", JSON.stringify(buah));\nconst hasil = JSON.parse(localStorage.getItem("rpl_buah"));\nconsole.log(hasil[1]);',
      jawab: ['jeruk', '"jeruk"'],
      cekOutput: true,
      bahas: '<code>JSON.parse</code> mengembalikan array asli sehingga index <code>[1]</code> bernilai <code>"jeruk"</code>.'
    },
    {
      tipe: 'bs',
      tanya: 'Jika kita membaca array dari <code>localStorage</code> dengan <code>JSON.parse</code> lalu melakukan <code>arr.push("baru")</code>, isi di <code>localStorage</code> ikut bertambah otomatis tanpa perlu memanggil <code>setItem</code> lagi.',
      jawab: false,
      bahas: 'Salah! <code>JSON.parse</code> membuat array baru di memori. Setiap kali datanya diubah, kita <b>wajib memanggil <code>localStorage.setItem</code> lagi</b>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa yang terjadi pada kode berikut jika <code>"rpl_nama"</code> disimpan memakai huruf kecil, lalu dibaca dengan <code>"Rpl_Nama"</code>?',
      kode: 'localStorage.setItem("rpl_nama", "Budi");\nconsole.log(localStorage.getItem("Rpl_Nama"));',
      opsi: ['Menampilkan `"Budi"`', 'Menampilkan `null`', 'Menampilkan `""`', 'Muncul SyntaxError'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Key pada <code>localStorage</code> bersifat <b>case-sensitive</b> (huruf besar dan kecil dianggap berbeda), sehingga hasilnya <code>null</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Mengapa kita sebaiknya memeriksa <code>if (tersimpan !== null)</code> sebelum memakai hasil <code>localStorage.getItem</code>?',
      opsi: [
        'Supaya tampilan tidak menampilkan kata "null" atau error saat memanggil method pada data yang belum ada',
        'Supaya ukuran file HTML menjadi lebih kecil',
        'Karena getItem selalu mengembalikan error jika tidak dicek',
        'Agar data otomatis tersinkron ke perangkat lain'
      ],
      jawab: 0,
      bahas: 'Ketika key belum pernah disimpan, <code>getItem</code> menghasilkan <code>null</code>. Jika tidak dicek, halaman bisa menampilkan <code>Halo, null!</code> atau memicu <code>TypeError</code>.'
    },
    {
      tipe: 'bs',
      tanya: '<code>localStorage</code> cocok digunakan untuk menyimpan password atau token rahasia pengguna karena hanya browser itu yang bisa membukanya.',
      jawab: false,
      bahas: '<b>Jangan pernah</b> menyimpan data rahasia di <code>localStorage</code>! Siapa pun bisa melihat dan mengubah isinya lewat DevTools atau skrip JavaScript yang berjalan di halaman.'
    },
    {
      tipe: 'pg',
      tanya: 'Budi menyimpan namanya di <code>localStorage</code> pada laptopnya. Jika Ani membuka alamat website yang sama lewat HP-nya, apa yang terlihat Ani?',
      opsi: [
        'Nama Budi langsung muncul di HP Ani',
        'Nama Budi tidak ada, karena localStorage hanya tersimpan di browser dan perangkat masing-masing',
        'Muncul pesan error',
        'Nama Ani otomatis menggantikan nama Budi di laptop Budi'
      ],
      jawab: 1,
      bahas: '<code>localStorage</code> bersifat lokal pada browser dan perangkat tempat ia disimpan — tidak otomatis tersinkron ke perangkat atau browser lain.'
    },
    {
      tipe: 'susun',
      tanya: 'Susun langkah menambahkan <code>"mangga"</code> ke array <code>"rpl_buah"</code> yang sudah tersimpan di <code>localStorage</code> agar perubahannya bertahan saat refresh.',
      baris: [
        'const teks = localStorage.getItem("rpl_buah");',
        'const buah = teks !== null ? JSON.parse(teks) : [];',
        'buah.push("mangga");',
        'localStorage.setItem("rpl_buah", JSON.stringify(buah));'
      ],
      bahas: 'Pola lengkap: <b>baca</b> → <b>cek null &amp; parse</b> → <b>ubah array</b> → <b>stringify &amp; simpan lagi</b>.'
    }
  ]
};
})();
