/* Bank soal Pertemuan 20 — Array & Object */
(function () {
'use strict';
window.BANK = window.BANK || {};

/* Data bersama */
var DAFTAR_SISWA = 'const daftarSiswa = [\n  { nama: "Budi", nilai: 85 },\n  { nama: "Ani", nilai: 90 },\n  { nama: "Citra", nilai: 78 }\n];';
var PROFIL = 'const profil = { nama: "Budi", kelas: "XI RPL", umur: 16, hobi: "ngoding" };';
var PRODUK = 'const produk = [\n  { nama: "Buku Tulis", harga: 5000 },\n  { nama: "Pulpen", harga: 3000 },\n  { nama: "Tas", harga: 150000 },\n  { nama: "Pensil", harga: 2500 },\n  { nama: "Kalkulator", harga: 45000 }\n];';

window.BANK['20'] = {
  judul: 'Array & Object',

  /* Praktik dari slide + tambahan (tidak dinilai) */
  latihan: {
    p1: {
      id: 'p1',
      judul: 'Praktik 1 — Array hobi',
      soal: '<ol class="task-list">' +
        '<li>Buat array <code>hobi</code> berisi <strong>4 hobimu</strong>. Tampilkan seluruh array, hobi pertama, dan hobi terakhir (pakai <code>length - 1</code>).</li>' +
        '<li>Tampilkan jumlah hobi dengan <code>length</code>.</li>' +
        '<li>Coba tampilkan <code>hobi[10]</code>. Apa hasilnya?</li></ol>',
      starter: '// 1. Buat array hobi berisi 4 hobimu\n\n// 2. Tampilkan seluruh array, hobi pertama, hobi terakhir\n\n// 3. Tampilkan jumlah hobi\n\n// 4. Tampilkan hobi[10]\n',
      solusi: 'const hobi = ["membaca", "ngoding", "gaming", "futsal"];\n\nconsole.log(hobi);\nconsole.log(hobi[0]);\nconsole.log(hobi[hobi.length - 1]);\nconsole.log(hobi.length);\nconsole.log(hobi[10]);   // undefined',
      petunjuk: [
        'Array ditulis dengan kurung siku: <code>const hobi = ["a", "b", "c", "d"];</code>',
        'Elemen pertama: <code>hobi[0]</code>. Elemen terakhir: <code>hobi[hobi.length - 1]</code>',
        'Index yang tidak ada hasilnya <code>undefined</code>.'
      ],
      syarat: [
        { nama: 'Memakai rumus elemen terakhir length - 1', pola: /\.length\s*-\s*1/ }
      ],
      tes: [
        {
          nama: 'Array hobi berisi 4 elemen',
          panggil: 'hobi',
          cek: function (ctx) {
            if (!Array.isArray(ctx.hasil)) return 'hobi harus berupa array (ditulis dengan [ ]).';
            return ctx.hasil.length === 4 ? true : 'hobi harus berisi 4 elemen, sekarang ' + ctx.hasil.length + '.';
          }
        },
        {
          nama: 'Menampilkan hobi pertama, terakhir, jumlah, dan hobi[10]',
          panggil: 'hobi',
          cek: function (ctx) {
            var h = ctx.hasil || [];
            var l = ctx.logs;
            if (l.indexOf(String(h[0])) === -1) return 'Hobi pertama (' + h[0] + ') belum ditampilkan sendiri.';
            if (l.indexOf(String(h[h.length - 1])) === -1) return 'Hobi terakhir (' + h[h.length - 1] + ') belum ditampilkan sendiri.';
            if (l.indexOf('4') === -1) return 'Jumlah hobi (4) belum ditampilkan. Pakai console.log(hobi.length);';
            if (l.indexOf('undefined') === -1) return 'Hasil hobi[10] (undefined) belum ditampilkan.';
            return true;
          }
        }
      ]
    },
    p2: {
      id: 'p2',
      judul: 'Praktik 2 — Menambah & menghapus makanan',
      soal: '<p class="content-text">Buat array <code>makanan</code> berisi 3 makanan. Lakukan berurutan dan <strong>tampilkan array setelah tiap langkah</strong>:</p>' +
        '<ol class="task-list"><li>Tambah satu makanan di akhir</li><li>Tambah satu makanan di awal</li><li>Hapus elemen terakhir</li><li>Hapus elemen pertama</li></ol>' +
        '<p class="content-text">Tulis di komentar: array akhirnya sama dengan array awal atau tidak? Kenapa?</p>',
      starter: 'const makanan = ["nasi goreng", "bakso", "sate"];\nconsole.log(makanan);\n\n// 1. tambah di akhir\n\n// 2. tambah di awal\n\n// 3. hapus terakhir\n\n// 4. hapus pertama\n\n// Penjelasan:\n',
      solusi: 'const makanan = ["nasi goreng", "bakso", "sate"];\nconsole.log(makanan);\n\nmakanan.push("soto");\nconsole.log(makanan);\n\nmakanan.unshift("gado-gado");\nconsole.log(makanan);\n\nmakanan.pop();\nconsole.log(makanan);\n\nmakanan.shift();\nconsole.log(makanan);\n\n// Penjelasan: array akhirnya SAMA dengan array awal, karena elemen yang\n// ditambah di akhir dihapus lagi oleh pop(), dan yang ditambah di awal\n// dihapus lagi oleh shift().',
      petunjuk: [
        'Akhir: <code>push(x)</code> dan <code>pop()</code>. Awal: <code>unshift(x)</code> dan <code>shift()</code>.',
        'Setelah tiap langkah tulis lagi <code>console.log(makanan);</code>'
      ],
      syarat: [
        { nama: 'Memakai push()', pola: /\.push\s*\(/ },
        { nama: 'Memakai unshift()', pola: /\.unshift\s*\(/ },
        { nama: 'Memakai pop()', pola: /\.pop\s*\(\s*\)/ },
        { nama: 'Memakai shift()', pola: /\.shift\s*\(\s*\)/ }
      ],
      tes: [
        { nama: 'Array ditampilkan minimal 5 kali (awal + 4 langkah)', minBaris: 5 },
        {
          nama: 'Array akhir sama dengan array awal',
          panggil: 'makanan',
          cek: function (ctx) {
            var awal = ctx.logs[0];
            var akhir = ctx.logs[ctx.logs.length - 1];
            if (!Array.isArray(ctx.hasil) || ctx.hasil.length !== 3) return 'Setelah 4 langkah, makanan harus kembali berisi 3 elemen.';
            return awal === akhir ? true : 'Baris pertama dan terakhir output seharusnya sama.\nAwal : ' + awal + '\nAkhir: ' + akhir;
          }
        }
      ]
    },
    p3: {
      id: 'p3',
      judul: 'Praktik 3 — Mencari & menggabungkan hobi',
      soal: '<p class="content-text">Dengan array <code>hobi</code> di bawah, tampilkan <strong>berurutan</strong>: apakah ada <code>"gaming"</code>, index dari <code>"membaca"</code>, hasil <code>indexOf("Gaming")</code> (huruf G besar), serta hasil <code>join(" | ")</code>.</p>',
      starter: 'const hobi = ["membaca", "ngoding", "gaming"];\n\n',
      solusi: 'const hobi = ["membaca", "ngoding", "gaming"];\n\nconsole.log(hobi.includes("gaming"));\nconsole.log(hobi.indexOf("membaca"));\nconsole.log(hobi.indexOf("Gaming"));\nconsole.log(hobi.join(" | "));',
      petunjuk: [
        '<code>includes(x)</code> → <code>true</code>/<code>false</code>; <code>indexOf(x)</code> → nomor index atau <code>-1</code>.',
        '<code>"Gaming"</code> ≠ <code>"gaming"</code> — huruf besar-kecil dibedakan.'
      ],
      syarat: [
        { nama: 'Memakai includes()', pola: /\.includes\s*\(/ },
        { nama: 'Memakai indexOf()', pola: /\.indexOf\s*\(/ },
        { nama: 'Memakai join()', pola: /\.join\s*\(/ }
      ],
      tes: [
        { nama: 'Output: true, 0, -1, lalu "membaca | ngoding | gaming"', output: ['true', '0', '-1', 'membaca | ngoding | gaming'] }
      ]
    },
    p4: {
      id: 'p4',
      judul: 'Praktik 4 — Object profil',
      soal: '<ol class="task-list">' +
        '<li>Buat object <code>profil</code> berisi <code>nama</code>, <code>kelas</code>, <code>umur</code>, dan <code>hobi</code> (isi dengan datamu).</li>' +
        '<li>Tampilkan <strong>semua property</strong> dengan dot notation, lalu tampilkan <code>kelas</code> dengan bracket notation.</li>' +
        '<li>Tampilkan satu kalimat perkenalan memakai <em>template literal</em>.</li>' +
        '<li>Coba tampilkan <code>profil.alamat</code>. Apa hasilnya?</li></ol>',
      starter: '// 1. Buat object profil\n\n// 2. Tampilkan semua property (dot), lalu kelas (bracket)\n\n// 3. Kalimat perkenalan (template literal)\n\n// 4. profil.alamat\n',
      solusi: 'const profil = {\n  nama: "Budi",\n  kelas: "XI RPL",\n  umur: 16,\n  hobi: "ngoding"\n};\n\nconsole.log(profil.nama);\nconsole.log(profil.kelas);\nconsole.log(profil.umur);\nconsole.log(profil.hobi);\nconsole.log(profil["kelas"]);\n\nconsole.log(`Halo, saya ${profil.nama} dari ${profil.kelas}, umur ${profil.umur} tahun, hobi ${profil.hobi}.`);\n\nconsole.log(profil.alamat);   // undefined',
      petunjuk: [
        'Object ditulis dengan kurawal: <code>const profil = { nama: "Budi", kelas: "XI RPL", ... };</code>',
        'Dot: <code>profil.nama</code>. Bracket: <code>profil["kelas"]</code> (nama property dalam tanda kutip).',
        'Template literal memakai backtick: <code>`Halo, saya ${profil.nama}`</code>'
      ],
      syarat: [
        { nama: 'Mengakses kelas dengan bracket notation', pola: /profil\s*\[\s*["'`]kelas["'`]\s*\]/ },
        { nama: 'Memakai template literal ${profil....}', pola: /`[^`]*\$\{\s*profil\.[^`]*`/ }
      ],
      tes: [
        {
          nama: 'Object profil punya nama, kelas, umur, hobi',
          panggil: 'profil',
          cek: function (ctx) {
            var p = ctx.hasil;
            if (!p || typeof p !== 'object' || Array.isArray(p)) return 'profil harus berupa object (ditulis dengan { }).';
            var kurang = ['nama', 'kelas', 'umur', 'hobi'].filter(function (k) { return !(k in p); });
            return kurang.length ? 'Property yang belum ada: ' + kurang.join(', ') : true;
          }
        },
        {
          nama: 'Semua property & kalimat perkenalan ditampilkan',
          panggil: 'profil',
          cek: function (ctx) {
            var p = ctx.hasil || {};
            var semua = ctx.logs.join('\n');
            var belum = ['nama', 'kelas', 'umur', 'hobi'].filter(function (k) { return semua.indexOf(String(p[k])) === -1; });
            if (belum.length) return 'Nilai property ini belum tampil di output: ' + belum.join(', ');
            var kalimat = ctx.logs.some(function (l) { return l.indexOf(String(p.nama)) !== -1 && l.indexOf(String(p.kelas)) !== -1 && l.length > String(p.nama).length + String(p.kelas).length; });
            return kalimat ? true : 'Belum ada satu kalimat perkenalan yang memuat nama dan kelas sekaligus.';
          }
        },
        { nama: 'profil.alamat ditampilkan → undefined', mengandung: ['undefined'] }
      ]
    },
    p5: {
      id: 'p5',
      judul: 'Praktik 5 — Mengubah, menambah, menghapus property',
      soal: '<p class="content-text">Dari object <code>profil</code> (sudah disediakan di Data): ubah <code>umur</code> menjadi <strong>lebih 1 tahun</strong>, tambahkan property <code>alamat</code>, lalu hapus property <code>kelas</code>. Terakhir tampilkan <code>profil</code>.</p>',
      input: PROFIL,
      starter: '// profil sudah ada di Data. Ubah umur +1, tambah alamat, hapus kelas\n\n\nconsole.log(profil);\n',
      solusi: 'profil.umur = profil.umur + 1;\nprofil.alamat = "Jakarta";\ndelete profil.kelas;\n\nconsole.log(profil);',
      petunjuk: [
        'Mengubah: <code>profil.umur = profil.umur + 1;</code> (atau <code>profil.umur++</code>)',
        'Menambah: cukup isi property baru, <code>profil.alamat = "Jakarta";</code>',
        'Menghapus: <code>delete profil.kelas;</code>'
      ],
      syarat: [
        { nama: 'Memakai delete', pola: /delete\s+profil\s*(\.\s*kelas|\[\s*["'`]kelas["'`]\s*\])/ }
      ],
      tes: [
        { nama: 'umur menjadi 17', panggil: 'profil.umur', hasil: 17 },
        {
          nama: 'Property alamat ditambahkan',
          panggil: 'profil.alamat',
          cek: function (ctx) { return typeof ctx.hasil === 'string' && ctx.hasil.trim() ? true : 'profil.alamat harus berisi teks, misalnya "Jakarta".'; }
        },
        { nama: 'Property kelas sudah terhapus', panggil: '"kelas" in profil', hasil: false },
        { nama: 'profil ditampilkan di console', mengandung: [/\{.*nama: 'Budi'/] }
      ]
    },
    p6: {
      id: 'p6',
      judul: 'Praktik 6 — Array of object',
      soal: '<p class="content-text">Pakai <code>daftarSiswa</code> (sudah disediakan di Data). Tampilkan <strong>berurutan</strong>: nama siswa pertama, nilai siswa ketiga, jumlah siswa. Lalu tambahkan satu siswa baru dengan <code>push</code> dan tampilkan jumlah barunya.</p>',
      input: DAFTAR_SISWA,
      starter: '// daftarSiswa sudah ada di Data\n\n',
      solusi: 'console.log(daftarSiswa[0].nama);\nconsole.log(daftarSiswa[2].nilai);\nconsole.log(daftarSiswa.length);\n\ndaftarSiswa.push({ nama: "Doni", nilai: 70 });\nconsole.log(daftarSiswa.length);',
      petunjuk: [
        'Index dulu, lalu property: <code>daftarSiswa[0].nama</code>',
        'Siswa ketiga ada di index <code>2</code>.',
        'Yang di-push adalah sebuah object: <code>daftarSiswa.push({ nama: "Doni", nilai: 70 });</code>'
      ],
      syarat: [
        { nama: 'Memakai push()', pola: /daftarSiswa\s*\.\s*push\s*\(\s*\{/ }
      ],
      tes: [
        { nama: 'Output: Budi, 78, 3, 4', output: ['Budi', '78', '3', '4'] },
        {
          nama: 'Siswa baru berupa object { nama, nilai }',
          panggil: 'daftarSiswa[3]',
          cek: function (ctx) {
            var s = ctx.hasil;
            if (!s || typeof s !== 'object') return 'Elemen ke-4 harus berupa object.';
            return ('nama' in s && 'nilai' in s) ? true : 'Object siswa baru harus punya property nama dan nilai.';
          }
        }
      ]
    },
    p7: {
      id: 'p7',
      judul: 'Praktik 7 — Looping array nilai',
      soal: '<p class="content-text">Array <code>nilai</code> sudah disediakan. Pakai <code>for...of</code> (atau <code>for</code> biasa) untuk:</p>' +
        '<ol class="task-list"><li>Menampilkan setiap nilai, satu per baris.</li><li>Menghitung total semua nilai, lalu tampilkan <code>Total: ...</code></li><li>Tampilkan <code>Rata-rata: ...</code> (total dibagi jumlah elemen).</li></ol>',
      input: 'const nilai = [80, 75, 90, 65, 88];',
      starter: 'let total = 0;\n\n// ulangi setiap nilai\n\n',
      solusi: 'let total = 0;\n\nfor (const n of nilai) {\n  console.log(n);\n  total += n;\n}\n\nconsole.log(`Total: ${total}`);\nconsole.log(`Rata-rata: ${total / nilai.length}`);',
      petunjuk: [
        '<code>for (const n of nilai) { ... }</code> — <code>n</code> berisi satu nilai per putaran.',
        'Akumulator: <code>total += n;</code> di dalam loop.',
        'Rata-rata = <code>total / nilai.length</code> — jangan menulis angka 5 langsung.'
      ],
      syarat: [
        { nama: 'Memakai perulangan', pola: /\bfor\s*\(|\.forEach\s*\(/ },
        { nama: 'Memakai nilai.length', pola: /nilai\s*\.\s*length/ }
      ],
      tes: [
        { nama: 'Output: 5 nilai, Total: 398, Rata-rata: 79.6', output: ['80', '75', '90', '65', '88', 'Total: 398', 'Rata-rata: 79.6'] },
        { nama: 'Tetap benar untuk data lain', input: 'const nilai = [100, 50];', output: ['100', '50', 'Total: 150', 'Rata-rata: 75'] }
      ]
    },
    p8: {
      id: 'p8',
      judul: 'Praktik 8 — Array sebagai argument function',
      soal: '<p class="content-text">Buat function <code>cariTerbesar(angka)</code> yang menerima <strong>sebuah array</strong> dan me-<strong>return</strong> angka terbesar di dalamnya. Jangan pakai <code>Math.max</code> — gunakan perulangan dan <code>if</code>.</p>' +
        '<pre class="snippet">cariTerbesar([3, 9, 2])      // 9\ncariTerbesar([-5, -1, -8])   // -1</pre>',
      starter: 'function cariTerbesar(angka) {\n  \n}\n\nconsole.log(cariTerbesar([3, 9, 2]));\n',
      solusi: 'function cariTerbesar(angka) {\n  let terbesar = angka[0];\n  for (const a of angka) {\n    if (a > terbesar) {\n      terbesar = a;\n    }\n  }\n  return terbesar;\n}\n\nconsole.log(cariTerbesar([3, 9, 2]));',
      petunjuk: [
        'Mulai dengan anggapan elemen pertama yang terbesar: <code>let terbesar = angka[0];</code>',
        'Ulangi setiap elemen; jika lebih besar dari <code>terbesar</code>, ganti nilainya.',
        'Jangan mulai dari 0 — coba pikirkan array yang isinya negatif semua.'
      ],
      syarat: [
        { nama: 'Tidak memakai Math.max', pola: /Math\s*\.\s*max/, tidak: true }
      ],
      tes: [
        { nama: 'cariTerbesar([3, 9, 2]) → 9', panggil: 'cariTerbesar([3, 9, 2])', hasil: 9 },
        { nama: 'cariTerbesar([10]) → 10', panggil: 'cariTerbesar([10])', hasil: 10 },
        { nama: 'cariTerbesar([-5, -1, -8]) → -1', panggil: 'cariTerbesar([-5, -1, -8])', hasil: -1 },
        { nama: 'cariTerbesar([7, 7, 3, 12, 1]) → 12', panggil: 'cariTerbesar([7, 7, 3, 12, 1])', hasil: 12 }
      ]
    },
    p9: {
      id: 'p9',
      judul: 'Praktik 9 — map, filter, find',
      soal: '<p class="content-text">Array <code>produk</code> sudah disediakan. Buat tiga variabel:</p>' +
        '<ol class="task-list"><li><code>namaProduk</code> → array berisi <strong>nama</strong> semua produk (pakai <code>map</code>).</li>' +
        '<li><code>murah</code> → produk yang harganya <strong>di bawah 10000</strong> (pakai <code>filter</code>).</li>' +
        '<li><code>pensil</code> → object produk yang namanya <code>"Pensil"</code> (pakai <code>find</code>).</li></ol>',
      input: PRODUK,
      starter: 'const namaProduk = \nconst murah = \nconst pensil = \n\nconsole.log(namaProduk);\nconsole.log(murah.length);\nconsole.log(pensil);\n',
      solusi: 'const namaProduk = produk.map((p) => p.nama);\nconst murah = produk.filter((p) => p.harga < 10000);\nconst pensil = produk.find((p) => p.nama === "Pensil");\n\nconsole.log(namaProduk);\nconsole.log(murah.length);\nconsole.log(pensil);',
      petunjuk: [
        '<code>map</code> mengubah setiap elemen: <code>produk.map((p) =&gt; p.nama)</code>',
        '<code>filter</code> menyaring dengan kondisi true/false: <code>produk.filter((p) =&gt; p.harga &lt; 10000)</code>',
        '<code>find</code> mengembalikan elemen <strong>pertama</strong> yang cocok (bukan array).'
      ],
      syarat: [
        { nama: 'Memakai map()', pola: /\.map\s*\(/ },
        { nama: 'Memakai filter()', pola: /\.filter\s*\(/ },
        { nama: 'Memakai find()', pola: /\.find\s*\(/ }
      ],
      tes: [
        { nama: 'namaProduk berisi 5 nama', panggil: 'namaProduk', hasil: ['Buku Tulis', 'Pulpen', 'Tas', 'Pensil', 'Kalkulator'] },
        { nama: 'murah berisi 3 produk', panggil: 'murah.map(function (p) { return p.nama; })', hasil: ['Buku Tulis', 'Pulpen', 'Pensil'] },
        { nama: 'pensil adalah object Pensil', panggil: 'pensil && pensil.harga', hasil: 2500 }
      ]
    }
  },

  /* Tantangan (dinilai) */
  tantangan: [
    {
      id: 't1',
      jenis: 'tantangan',
      judul: 'Statistik Nilai Ulangan',
      soal: '<p class="content-text">Buat function <code>statistik(nilai)</code> yang menerima <strong>array</strong> nilai dan me-<strong>return object</strong> berisi tiga property:</p>' +
        '<ul class="task-list"><li><code>total</code> — jumlah semua nilai</li><li><code>rata</code> — rata-rata (total ÷ jumlah elemen)</li><li><code>tertinggi</code> — nilai terbesar</li></ul>' +
        '<p class="content-text">Jika array-nya <strong>kosong</strong>, langsung return <code>null</code>.</p>' +
        '<pre class="snippet">statistik([80, 90, 70])\n// { total: 240, rata: 80, tertinggi: 90 }\nstatistik([])   // null</pre>',
      starter: 'function statistik(nilai) {\n  \n}\n\nconsole.log(statistik([80, 90, 70]));\n',
      solusi: 'function statistik(nilai) {\n  if (nilai.length === 0) {\n    return null;\n  }\n\n  let total = 0;\n  let tertinggi = nilai[0];\n  for (const n of nilai) {\n    total += n;\n    if (n > tertinggi) {\n      tertinggi = n;\n    }\n  }\n\n  return {\n    total: total,\n    rata: total / nilai.length,\n    tertinggi: tertinggi\n  };\n}\n\nconsole.log(statistik([80, 90, 70]));',
      petunjuk: [
        'Early return dulu: <code>if (nilai.length === 0) { return null; }</code>',
        'Satu loop cukup untuk menghitung <code>total</code> sekaligus mencari <code>tertinggi</code>.',
        'Return object: <code>return { total: total, rata: total / nilai.length, tertinggi: tertinggi };</code>'
      ],
      tes: [
        { nama: 'statistik([80, 90, 70])', panggil: 'statistik([80, 90, 70])', cek: cekStat(240, 80, 90) },
        { nama: 'statistik([75, 88, 92, 60])', panggil: 'statistik([75, 88, 92, 60])', cek: cekStat(315, 78.75, 92) },
        { nama: 'statistik([100]) — satu nilai', panggil: 'statistik([100])', cek: cekStat(100, 100, 100) },
        { nama: 'statistik([55, 65.5]) — nilai desimal', panggil: 'statistik([55, 65.5])', cek: cekStat(120.5, 60.25, 65.5) },
        { nama: 'statistik([]) → null', panggil: 'statistik([])', hasil: null }
      ]
    },
    {
      id: 't2',
      jenis: 'studi-kasus',
      judul: 'Keranjang Belanja Koperasi',
      soal: '<p class="content-text">Koperasi sekolah menyimpan keranjang belanja sebagai <strong>array of object</strong>:</p>' +
        '<pre class="snippet">[\n  { nama: "Buku", harga: 5000, jumlah: 4 },\n  { nama: "Pulpen", harga: 3000, jumlah: 2 }\n]</pre>' +
        '<p class="content-text">Buat tiga function yang masing-masing menerima <code>keranjang</code>:</p>' +
        '<ol class="task-list">' +
        '<li><code>totalBelanja(keranjang)</code> → return jumlah dari <code>harga × jumlah</code> semua barang.</li>' +
        '<li><code>daftarBarang(keranjang)</code> → return teks nama barang dipisah koma, contoh <code>"Buku, Pulpen"</code>.</li>' +
        '<li><code>totalBayar(keranjang)</code> → <strong>memanggil</strong> <code>totalBelanja</code>; jika totalnya ≥ 100000 dapat diskon 10%, lalu return harga yang harus dibayar.</li></ol>',
      starter: 'function totalBelanja(keranjang) {\n  \n}\n\nfunction daftarBarang(keranjang) {\n  \n}\n\nfunction totalBayar(keranjang) {\n  \n}\n\nconst contoh = [\n  { nama: "Buku", harga: 5000, jumlah: 4 },\n  { nama: "Pulpen", harga: 3000, jumlah: 2 }\n];\nconsole.log(totalBelanja(contoh));   // 26000\nconsole.log(daftarBarang(contoh));   // Buku, Pulpen\n',
      solusi: 'function totalBelanja(keranjang) {\n  let total = 0;\n  for (const barang of keranjang) {\n    total += barang.harga * barang.jumlah;\n  }\n  return total;\n}\n\nfunction daftarBarang(keranjang) {\n  const nama = [];\n  for (const barang of keranjang) {\n    nama.push(barang.nama);\n  }\n  return nama.join(", ");\n}\n\nfunction totalBayar(keranjang) {\n  const total = totalBelanja(keranjang);\n  if (total >= 100000) {\n    return total - total * 0.1;\n  }\n  return total;\n}\n\nconst contoh = [\n  { nama: "Buku", harga: 5000, jumlah: 4 },\n  { nama: "Pulpen", harga: 3000, jumlah: 2 }\n];\nconsole.log(totalBelanja(contoh));\nconsole.log(daftarBarang(contoh));',
      petunjuk: [
        'Ulangi setiap barang: <code>for (const barang of keranjang)</code>, lalu <code>total += barang.harga * barang.jumlah;</code>',
        'Kumpulkan nama ke array baru dengan <code>push</code>, lalu <code>join(", ")</code>. (Bisa juga <code>keranjang.map(b =&gt; b.nama).join(", ")</code>.)',
        'Di <code>totalBayar</code>: <code>const total = totalBelanja(keranjang);</code> lalu cek diskonnya.'
      ],
      tes: [
        { nama: 'totalBelanja(contoh) → 26000', panggil: 'totalBelanja([{ nama: "Buku", harga: 5000, jumlah: 4 }, { nama: "Pulpen", harga: 3000, jumlah: 2 }])', hasil: 26000 },
        { nama: 'totalBelanja 3 barang → 121500', panggil: 'totalBelanja([{ nama: "Tas", harga: 95000, jumlah: 1 }, { nama: "Buku", harga: 5000, jumlah: 5 }, { nama: "Penghapus", harga: 1500, jumlah: 1 }])', hasil: 121500 },
        { nama: 'totalBelanja([]) → 0', panggil: 'totalBelanja([])', hasil: 0 },
        { nama: 'daftarBarang(contoh) → "Buku, Pulpen"', panggil: 'daftarBarang([{ nama: "Buku", harga: 5000, jumlah: 4 }, { nama: "Pulpen", harga: 3000, jumlah: 2 }])', hasil: 'Buku, Pulpen' },
        { nama: 'daftarBarang 1 barang → "Tas"', panggil: 'daftarBarang([{ nama: "Tas", harga: 95000, jumlah: 1 }])', hasil: 'Tas' },
        { nama: 'totalBayar di bawah 100000 → tanpa diskon', panggil: 'totalBayar([{ nama: "Buku", harga: 5000, jumlah: 4 }, { nama: "Pulpen", harga: 3000, jumlah: 2 }])', hasil: 26000 },
        { nama: 'totalBayar 121500 → diskon 10% = 109350', panggil: 'totalBayar([{ nama: "Tas", harga: 95000, jumlah: 1 }, { nama: "Buku", harga: 5000, jumlah: 5 }, { nama: "Penghapus", harga: 1500, jumlah: 1 }])', hasil: 109350 },
        { nama: 'totalBayar tepat 100000 → 90000', panggil: 'totalBayar([{ nama: "Seragam", harga: 50000, jumlah: 2 }])', hasil: 90000 },
        {
          nama: 'totalBayar() memanggil totalBelanja()',
          cek: function (ctx) {
            var k = ctx.kodeBersih;
            var dekl = /function\s+totalBelanja\s*\(/.test(k) ? 1 : 0;
            var n = (k.match(/totalBelanja\s*\(/g) || []).length - dekl;
            return n >= 1 ? true : 'Hitung total di totalBayar dengan memanggil totalBelanja(keranjang), jangan menulis ulang loop-nya.';
          }
        }
      ]
    },
    {
      id: 't3',
      jenis: 'studi-kasus',
      judul: 'Buku Nilai Wali Kelas',
      soal: '<p class="content-text">Wali kelas menyimpan data siswa sebagai array of object <code>{ nama, nilai }</code>. Buat tiga function:</p>' +
        '<ol class="task-list">' +
        '<li><code>cariSiswa(daftar, nama)</code> → return <strong>object</strong> siswa yang namanya sama persis; jika tidak ada return <code>null</code>.</li>' +
        '<li><code>tambahSiswa(daftar, nama, nilai)</code> → tambahkan object <code>{ nama, nilai }</code> ke <strong>akhir</strong> array, lalu return <strong>jumlah siswa sekarang</strong>.</li>' +
        '<li><code>siswaLulus(daftar)</code> → return <strong>array nama</strong> siswa yang nilainya ≥ 75 (urutan tetap).</li></ol>',
      starter: 'function cariSiswa(daftar, nama) {\n  \n}\n\nfunction tambahSiswa(daftar, nama, nilai) {\n  \n}\n\nfunction siswaLulus(daftar) {\n  \n}\n\nconst kelas = [\n  { nama: "Budi", nilai: 85 },\n  { nama: "Ani", nilai: 70 }\n];\nconsole.log(cariSiswa(kelas, "Ani"));\nconsole.log(tambahSiswa(kelas, "Citra", 92));\nconsole.log(siswaLulus(kelas));\n',
      solusi: 'function cariSiswa(daftar, nama) {\n  for (const siswa of daftar) {\n    if (siswa.nama === nama) {\n      return siswa;\n    }\n  }\n  return null;\n}\n\nfunction tambahSiswa(daftar, nama, nilai) {\n  daftar.push({ nama: nama, nilai: nilai });\n  return daftar.length;\n}\n\nfunction siswaLulus(daftar) {\n  const lulus = [];\n  for (const siswa of daftar) {\n    if (siswa.nilai >= 75) {\n      lulus.push(siswa.nama);\n    }\n  }\n  return lulus;\n}\n\nconst kelas = [\n  { nama: "Budi", nilai: 85 },\n  { nama: "Ani", nilai: 70 }\n];\nconsole.log(cariSiswa(kelas, "Ani"));\nconsole.log(tambahSiswa(kelas, "Citra", 92));\nconsole.log(siswaLulus(kelas));',
      petunjuk: [
        'Di <code>cariSiswa</code>: ulangi tiap siswa, <code>return siswa;</code> begitu ketemu, dan <code>return null;</code> setelah loop selesai.',
        '<code>push</code> mengubah array asli, jadi <code>daftar.length</code> setelahnya sudah bertambah.',
        'Di <code>siswaLulus</code>: buat array kosong, push <code>siswa.nama</code> bila <code>siswa.nilai &gt;= 75</code>. (Bisa juga dengan <code>filter</code> + <code>map</code>.)'
      ],
      tes: [
        { nama: 'cariSiswa menemukan Ani', panggil: 'cariSiswa([{ nama: "Budi", nilai: 85 }, { nama: "Ani", nilai: 70 }], "Ani")', cek: cekObj({ nama: 'Ani', nilai: 70 }) },
        { nama: 'cariSiswa nama tidak ada → null', panggil: 'cariSiswa([{ nama: "Budi", nilai: 85 }], "Dodi")', hasil: null },
        { nama: 'cariSiswa peka huruf besar-kecil ("budi" ≠ "Budi")', panggil: 'cariSiswa([{ nama: "Budi", nilai: 85 }], "budi")', hasil: null },
        { nama: 'tambahSiswa return jumlah baru', panggil: 'tambahSiswa([{ nama: "Budi", nilai: 85 }, { nama: "Ani", nilai: 70 }], "Citra", 92)', hasil: 3 },
        {
          nama: 'tambahSiswa benar-benar menambah object di akhir',
          panggil: '(function () { var d = [{ nama: "Budi", nilai: 85 }]; tambahSiswa(d, "Eka", 77); return d[d.length - 1]; })()',
          cek: cekObj({ nama: 'Eka', nilai: 77 })
        },
        { nama: 'siswaLulus → ["Budi", "Citra"]', panggil: 'siswaLulus([{ nama: "Budi", nilai: 85 }, { nama: "Ani", nilai: 70 }, { nama: "Citra", nilai: 92 }])', hasil: ['Budi', 'Citra'] },
        { nama: 'siswaLulus nilai tepat 75 ikut lulus', panggil: 'siswaLulus([{ nama: "Fani", nilai: 75 }, { nama: "Gilang", nilai: 74.5 }])', hasil: ['Fani'] },
        { nama: 'siswaLulus tidak ada yang lulus → []', panggil: 'siswaLulus([{ nama: "Hadi", nilai: 40 }])', hasil: [] }
      ]
    }
  ],

  /* Kuis (dinilai) */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Kapan sebaiknya memakai <strong>array</strong>, dan kapan memakai <strong>object</strong>?',
      opsi: [
        'Array untuk satu benda dengan banyak sifat, object untuk daftar data sejenis',
        'Array untuk daftar data sejenis yang berurutan, object untuk satu benda dengan banyak sifat berlabel',
        'Keduanya sama saja, hanya beda tanda kurung',
        'Array hanya untuk angka, object hanya untuk teks'
      ],
      jawab: 1,
      bahas: 'Array = daftar <b>berurutan</b> (daftar nilai, daftar nama), diakses lewat index. Object = data <b>berlabel</b> <code>key: value</code> (profil siswa, produk), diakses lewat nama property.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const buah = ["apel", "jeruk", "mangga"];\nconsole.log(buah[1]);',
      opsi: ['apel', 'jeruk', 'mangga', 'undefined'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Index dimulai dari <b>0</b>. <code>buah[0]</code> = apel, <code>buah[1]</code> = jeruk.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'const kota = ["Bogor", "Depok", "Bekasi", "Tangerang"];\nconsole.log(kota[kota.length - 1]);',
      jawab: ['Tangerang'],
      cekOutput: true,
      bahas: '<code>kota.length</code> = 4, jadi <code>kota[4 - 1]</code> = <code>kota[3]</code> = elemen terakhir.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const angka = [10, 20, 30];\nconsole.log(angka[3]);',
      opsi: ['30', '0', 'undefined', '`Error`'],
      opsiKode: true,
      jawab: 2,
      cekOutput: true,
      bahas: 'Index terakhir adalah 2. Mengakses index yang tidak ada menghasilkan <code>undefined</code>, bukan error.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const a = [10, 20, 30];\na.unshift(5);\na.pop();\nconsole.log(a);',
      opsi: ['[10, 20, 30]', '[5, 10, 20]', '[5, 10, 20, 30]', '[10, 20]'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: '<code>unshift(5)</code> menambah di awal → [5, 10, 20, 30]. <code>pop()</code> menghapus elemen terakhir → [5, 10, 20].'
    },
    {
      tipe: 'pg',
      tanya: 'Method mana yang <strong>menghapus elemen pertama</strong> array?',
      opsi: ['`pop()`', '`push()`', '`shift()`', '`unshift()`'],
      jawab: 2,
      bahas: '<code>push</code>/<code>pop</code> bekerja di <b>akhir</b>, <code>unshift</code>/<code>shift</code> bekerja di <b>awal</b>. Yang menghapus di awal: <code>shift()</code>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'const hobi = ["membaca", "ngoding", "gaming"];\nconsole.log(hobi.indexOf("Gaming"));',
      jawab: ['-1'],
      cekOutput: true,
      bahas: '<code>indexOf</code> membedakan huruf besar-kecil. <code>"Gaming"</code> tidak ada di array, jadi hasilnya <code>-1</code>.'
    },
    {
      tipe: 'bs',
      tanya: 'Array yang dibuat dengan <code>const</code> tidak bisa diubah isinya, misalnya <code>buah[0] = "anggur"</code> akan error.',
      jawab: false,
      bahas: 'Isi array <code>const</code> <b>boleh</b> diubah (<code>buah[0] = "anggur"</code>, <code>push</code>, dll). Yang tidak boleh adalah mengganti variabelnya seluruhnya: <code>buah = ["durian"]</code> → TypeError.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'const huruf = ["a", "b", "c"];\nconsole.log(huruf.join("-"));',
      jawab: ['a-b-c'],
      cekOutput: true,
      bahas: '<code>join(pemisah)</code> menggabungkan semua elemen menjadi satu <b>string</b> dengan pemisah di antaranya.'
    },
    {
      tipe: 'pg',
      tanya: 'Diberikan <code>const siswa = { nama: "Budi", kelas: "XI RPL" };</code>. Manakah cara yang <strong>salah</strong> untuk mengambil kelas?',
      opsi: ['`siswa.kelas`', '`siswa["kelas"]`', '`siswa[kelas]`', 'Semua benar'],
      jawab: 2,
      bahas: 'Bracket notation butuh nama property sebagai <b>string</b>: <code>siswa["kelas"]</code>. Tanpa kutip, <code>kelas</code> dianggap variabel (yang belum ada) → ReferenceError.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const hp = { merk: "Andro", harga: 2000000, baru: true };\nhp.harga = 1800000;\nhp.warna = "hitam";\ndelete hp.baru;\nconsole.log(hp);',
      opsi: [
        "{merk: 'Andro', harga: 2000000, baru: true}",
        "{merk: 'Andro', harga: 1800000, warna: 'hitam'}",
        "{merk: 'Andro', harga: 1800000, baru: true, warna: 'hitam'}",
        "{merk: 'Andro', warna: 'hitam'}"
      ],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Mengisi property yang sudah ada = <b>mengubah</b>, mengisi property baru = <b>menambah</b>, <code>delete</code> = <b>menghapus</b>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'const sekolah = {\n  nama: "SMK Nusantara",\n  alamat: { kota: "Jakarta", provinsi: "DKI Jakarta" }\n};\nconsole.log(sekolah.alamat.kota);',
      jawab: ['Jakarta'],
      cekOutput: true,
      bahas: 'Object di dalam object diakses berantai: <code>sekolah.alamat</code> → object alamat, lalu <code>.kota</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const daftarSiswa = [\n  { nama: "Budi", nilai: 85 },\n  { nama: "Ani", nilai: 90 }\n];\nconsole.log(daftarSiswa[1].nama);',
      opsi: ['Budi', 'Ani', '90', 'undefined'],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: 'Array of object: <b>index dulu</b> (<code>[1]</code> → object kedua), <b>lalu property</b> (<code>.nama</code>).'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const obj = { nama: "Budi", umur: 16 };\nobj.kelas = "XI RPL";\ndelete obj.umur;\nconsole.log(Object.keys(obj));',
      opsi: ["['nama', 'umur']", "['nama', 'kelas']", "['Budi', 'XI RPL']", "['nama', 'umur', 'kelas']"],
      opsiKode: true,
      jawab: 1,
      cekOutput: true,
      bahas: '<code>Object.keys(obj)</code> menghasilkan array berisi <b>nama-nama property</b> yang ada saat itu.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'const nilai = [70, 80, 90];\nlet total = 0;\nfor (const n of nilai) {\n  total += n;\n}\nconsole.log(total / nilai.length);',
      jawab: ['80'],
      cekOutput: true,
      bahas: 'Loop menjumlahkan 70 + 80 + 90 = 240, lalu dibagi 3 elemen = 80.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'const angka = [4, 9, 12, 7];\nconst besar = angka.filter((a) => a > 8);\nconsole.log(besar);',
      opsi: ['[9, 12]', '[true, false]', '9', '[4, 7]'],
      opsiKode: true,
      jawab: 0,
      cekOutput: true,
      bahas: '<code>filter</code> menghasilkan <b>array baru</b> berisi elemen yang membuat kondisi bernilai <code>true</code>.'
    },
    {
      tipe: 'susun',
      tanya: 'Susun kode agar menambah siswa baru ke <code>daftar</code> lalu menampilkan jumlahnya (<code>3</code>).',
      baris: ['const daftar = [{ nama: "Budi" }, { nama: "Ani" }];', 'daftar.push({ nama: "Citra" });', 'console.log(daftar.length);'],
      cekOutput: true,
      bahas: 'Array dibuat dulu, lalu <code>push</code> sebuah object, baru <code>length</code>-nya ditampilkan.'
    }
  ]
};

/* Helper pemeriksa */
function cekStat(total, rata, tertinggi) {
  return function (ctx) {
    var h = ctx.hasil;
    if (h === undefined) return 'Function mengembalikan undefined — lupa menulis return?';
    if (!h || typeof h !== 'object' || Array.isArray(h)) return 'Hasilnya harus berupa object { total, rata, tertinggi }.';
    var harap = { total: total, rata: rata, tertinggi: tertinggi };
    for (var k in harap) {
      if (!(k in h)) return 'Object hasil belum punya property "' + k + '".';
      if (typeof h[k] !== 'number' || Math.abs(h[k] - harap[k]) > 1e-9) return k + ' seharusnya ' + harap[k] + ', hasil kamu ' + JSON.stringify(h[k]) + '.';
    }
    return true;
  };
}

function cekObj(harap) {
  return function (ctx) {
    var h = ctx.hasil;
    if (!h || typeof h !== 'object') return 'Diharapkan sebuah object ' + JSON.stringify(harap) + ', hasil kamu ' + JSON.stringify(h) + '.';
    for (var k in harap) if (h[k] !== harap[k]) return 'Property ' + k + ' seharusnya ' + JSON.stringify(harap[k]) + ', hasil kamu ' + JSON.stringify(h[k]) + '.';
    return true;
  };
}
})();
