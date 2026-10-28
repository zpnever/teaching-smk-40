/* Bank soal Pertemuan 16 — Operator */
window.BANK = window.BANK || {};
window.BANK['16'] = {
  judul: 'Operator',

  /* Praktik dari slide (tidak dinilai) */
  latihan: {
    p1: {
      id: 'p1',
      judul: 'Praktik 1 — Semua Operator Aritmatika',
      soal: '<p class="content-text">Buat variabel <code>a = 17</code> dan <code>b = 5</code>. Tampilkan hasil dari <strong>semua</strong> operator aritmatika (<code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> <code>**</code>) di Console. Boleh diberi keterangan, misalnya <code>console.log("a + b =", a + b);</code></p>',
      starter: 'let a = 17;\nlet b = 5;\n\n// Tampilkan hasil + - * / % ** di bawah ini\n',
      solusi: 'let a = 17;\nlet b = 5;\n\nconsole.log("a + b =", a + b);\nconsole.log("a - b =", a - b);\nconsole.log("a * b =", a * b);\nconsole.log("a / b =", a / b);\nconsole.log("a % b =", a % b);\nconsole.log("a ** b =", a ** b);',
      petunjuk: [
        'Satu operator satu baris, contoh: <code>console.log(a % b);</code>',
        'Pangkat ditulis dengan dua bintang: <code>a ** b</code>.'
      ],
      syarat: [
        { nama: 'Memakai a + b', pola: /\ba\s*\+\s*b\b/ },
        { nama: 'Memakai a - b', pola: /\ba\s*-\s*b\b/ },
        { nama: 'Memakai a * b', pola: /\ba\s*\*\s*b\b/ },
        { nama: 'Memakai a / b', pola: /\ba\s*\/\s*b\b/ },
        { nama: 'Memakai a % b', pola: /\ba\s*%\s*b\b/ },
        { nama: 'Memakai a ** b', pola: /\ba\s*\*\*\s*b\b/ }
      ],
      tes: [
        {
          nama: 'Output memuat 22, 12, 85, 3.4, 2, dan 1419857',
          cek: function (ctx) {
            var teks = ctx.logs.join('\n');
            var harap = ['22', '12', '85', '3.4', '2', '1419857'];
            for (var i = 0; i < harap.length; i++) {
              var pola = new RegExp('(^|[^\\d.])' + harap[i].replace('.', '\\.') + '([^\\d.]|$)', 'm');
              if (!pola.test(teks)) return 'Hasil ' + harap[i] + ' belum muncul di output. Pastikan a = 17 dan b = 5.';
            }
            return true;
          }
        }
      ]
    },
    p2: {
      id: 'p2',
      judul: 'Praktik 2 — Syarat Lulus & Penghargaan',
      soal: '<p class="content-text">Variabel <code>nilai</code> dan <code>hadir</code> sudah tersedia di Data Input (contoh: <code>nilai = 80</code>, <code>hadir = 90</code>). Tampilkan <strong>3 baris</strong> hasil boolean (<code>true</code>/<code>false</code>) dari:</p>' +
        '<ol class="task-list"><li>Apakah <code>nilai &gt;= 75</code> <strong>dan</strong> <code>hadir &gt;= 80</code>? (syarat lulus)</li>' +
        '<li>Apakah <code>nilai &gt;= 90</code> <strong>atau</strong> <code>hadir &gt;= 95</code>? (syarat penghargaan)</li>' +
        '<li>Kebalikan dari hasil nomor 1</li></ol>' +
        '<p class="content-text">Tampilkan langsung nilai boolean-nya, tanpa teks tambahan. Kodemu akan diuji dengan nilai lain juga.</p>',
      input: { nilai: 80, hadir: 90 },
      starter: '// 1. syarat lulus\n\n// 2. syarat penghargaan\n\n// 3. kebalikan nomor 1\n',
      solusi: 'console.log(nilai >= 75 && hadir >= 80);\nconsole.log(nilai >= 90 || hadir >= 95);\nconsole.log(!(nilai >= 75 && hadir >= 80));',
      petunjuk: [
        'Gabungkan dua perbandingan: <code>nilai &gt;= 75 &amp;&amp; hadir &gt;= 80</code>',
        'Untuk membalik, bungkus seluruh kondisi dengan kurung: <code>!( ... )</code>'
      ],
      syarat: [
        { nama: 'Memakai operator &&', pola: /&&/ },
        { nama: 'Memakai operator ||', pola: /\|\|/ },
        { nama: 'Memakai operator !', pola: /!\s*\(|!\s*[A-Za-z_$]/ }
      ],
      tes: [
        { nama: 'nilai 80, hadir 90', output: ['true', 'false', 'false'] },
        { nama: 'nilai 95, hadir 70', input: { nilai: 95, hadir: 70 }, output: ['false', 'true', 'true'] },
        { nama: 'nilai 75, hadir 96', input: { nilai: 75, hadir: 96 }, output: ['true', 'true', 'false'] },
        { nama: 'nilai 60, hadir 60', input: { nilai: 60, hadir: 60 }, output: ['false', 'false', 'true'] }
      ]
    },
    p3: {
      id: 'p3',
      judul: 'Praktik 3 — Ternary Lulus/Remedial',
      soal: '<p class="content-text">Buat variabel <code>status</code> yang berisi <code>"Lulus"</code> jika <code>nilai &gt;= 75</code>, selain itu <code>"Remedial"</code>, memakai <strong>operator ternary</strong>. Lalu tampilkan <code>status</code>.</p>',
      input: { nilai: 82 },
      starter: '// let status = kondisi ? ... : ...;\n',
      solusi: 'let status = nilai >= 75 ? "Lulus" : "Remedial";\nconsole.log(status);',
      petunjuk: ['Bentuk umum: <code>kondisi ? nilaiJikaBenar : nilaiJikaSalah</code>'],
      syarat: [{ nama: 'Memakai operator ternary ( ? : )', pola: /\?[^?:]*:/ }],
      tes: [
        { nama: 'nilai 82 → Lulus', output: ['Lulus'] },
        { nama: 'nilai 75 → Lulus (batas)', input: { nilai: 75 }, output: ['Lulus'] },
        { nama: 'nilai 74 → Remedial', input: { nilai: 74 }, output: ['Remedial'] }
      ]
    }
  },

  /* Tantangan (dinilai) */
  tantangan: [
    {
      id: 't1',
      jenis: 'studi-kasus',
      judul: 'Kalkulator Nilai Rapor',
      soal: '<p class="content-text">Input dari form HTML <strong>selalu berbentuk string</strong>. Data Input berisi <code>inputTugas</code>, <code>inputUts</code>, <code>inputUas</code>, dan <code>inputKehadiran</code> (semuanya string). Kerjakan:</p>' +
        '<ol class="task-list">' +
        '<li>Konversi keempat input menjadi number dengan <code>Number()</code>, simpan di variabel <code>tugas</code>, <code>uts</code>, <code>uas</code>, <code>kehadiran</code>.</li>' +
        '<li>Hitung <code>nilaiAkhir</code> dengan bobot: Tugas 30%, UTS 30%, UAS 40%.</li>' +
        '<li>Buat <code>statusKehadiran</code> memakai ternary: jika <code>kehadiran &gt;= 80</code> maka <code>"Memenuhi Syarat"</code>, jika tidak <code>"Tidak Memenuhi Syarat"</code>.</li>' +
        '<li>Buat <code>lulus</code> (boolean) memakai operator logika: lulus jika <code>nilaiAkhir &gt;= 75</code> <strong>DAN</strong> <code>kehadiran &gt;= 80</code>.</li>' +
        '<li>Tampilkan seluruh hasil dengan <code>console.log()</code> dan template literal.</li></ol>',
      input: { inputTugas: '85', inputUts: '78', inputUas: '90', inputKehadiran: '92' },
      starter: '// 1. Konversi ke number\n\n// 2. Hitung nilaiAkhir\n\n// 3. statusKehadiran (ternary)\n\n// 4. lulus (operator logika)\n\n// 5. Tampilkan hasil\n',
      solusi: 'let tugas = Number(inputTugas);\nlet uts = Number(inputUts);\nlet uas = Number(inputUas);\nlet kehadiran = Number(inputKehadiran);\n\nlet nilaiAkhir = tugas * 0.3 + uts * 0.3 + uas * 0.4;\nlet statusKehadiran = kehadiran >= 80 ? "Memenuhi Syarat" : "Tidak Memenuhi Syarat";\nlet lulus = nilaiAkhir >= 75 && kehadiran >= 80;\n\nconsole.log(`Nilai akhir: ${nilaiAkhir}`);\nconsole.log(`Kehadiran: ${kehadiran}% (${statusKehadiran})`);\nconsole.log(`Lulus: ${lulus}`);',
      petunjuk: [
        '30% bisa ditulis <code>0.3</code>, jadi <code>tugas * 0.3</code>.',
        'Kalau lupa <code>Number()</code>, <code>"85" + ...</code> akan digabung seperti teks, bukan dijumlah.',
        'Ternary: <code>kehadiran &gt;= 80 ? "Memenuhi Syarat" : "Tidak Memenuhi Syarat"</code>'
      ],
      syarat: [
        { nama: 'Memakai Number() untuk konversi', pola: /Number\s*\(/ },
        { nama: 'Memakai operator ternary', pola: /\?[^?:]*:/ },
        { nama: 'Memakai operator &&', pola: /&&/ },
        { nama: 'Memakai template literal', pola: /`[^`]*\$\{[^`]*`/ }
      ],
      tes: [
        { nama: 'Keempat input sudah jadi number', panggil: 'typeof tugas + typeof uts + typeof uas + typeof kehadiran', hasil: 'numbernumbernumbernumber' },
        { nama: 'Data 85/78/90, hadir 92 → nilaiAkhir 84.9', panggil: 'nilaiAkhir', hasil: 84.9 },
        { nama: 'Data 85/78/90, hadir 92 → Memenuhi Syarat', panggil: 'statusKehadiran', hasil: 'Memenuhi Syarat' },
        { nama: 'Data 85/78/90, hadir 92 → lulus true', panggil: 'lulus', hasil: true },
        { nama: 'Output minimal 3 baris & memuat status kehadiran', minBaris: 3, mengandung: ['Memenuhi Syarat'] },
        { nama: 'Data 70/60/80, hadir 75 → nilaiAkhir 71', input: { inputTugas: '70', inputUts: '60', inputUas: '80', inputKehadiran: '75' }, panggil: 'nilaiAkhir', hasil: 71 },
        { nama: 'Data 70/60/80, hadir 75 → Tidak Memenuhi Syarat', input: { inputTugas: '70', inputUts: '60', inputUas: '80', inputKehadiran: '75' }, panggil: 'statusKehadiran', hasil: 'Tidak Memenuhi Syarat' },
        { nama: 'Data 90/88/70, hadir 79 → nilai bagus tapi tidak lulus', input: { inputTugas: '90', inputUts: '88', inputUas: '70', inputKehadiran: '79' }, panggil: 'lulus', hasil: false },
        { nama: 'Data 75/75/75, hadir 80 → tepat di batas, lulus', input: { inputTugas: '75', inputUts: '75', inputUas: '75', inputKehadiran: '80' }, panggil: 'lulus', hasil: true }
      ]
    },
    {
      id: 't2',
      jenis: 'tantangan',
      judul: 'Konversi Detik ke Jam',
      soal: '<p class="content-text">Variabel <code>totalDetik</code> (number) ada di Data Input. Ubah menjadi jam, menit, dan detik, lalu tampilkan <strong>tepat satu baris</strong> dengan format:</p>' +
        '<pre class="snippet">1 jam 2 menit 5 detik</pre>' +
        '<p class="content-text">(untuk <code>totalDetik = 3725</code>). Kodemu diuji dengan angka lain juga.</p>',
      input: { totalDetik: 3725 },
      starter: '// 1 jam = 3600 detik, 1 menit = 60 detik\n',
      solusi: 'let jam = Math.floor(totalDetik / 3600);\nlet menit = Math.floor((totalDetik % 3600) / 60);\nlet detik = totalDetik % 60;\n\nconsole.log(`${jam} jam ${menit} menit ${detik} detik`);',
      petunjuk: [
        'Jumlah jam = <code>Math.floor(totalDetik / 3600)</code> — <code>Math.floor</code> membulatkan ke bawah.',
        'Sisa detik setelah diambil jamnya: <code>totalDetik % 3600</code>. Dari sisa itu, hitung menitnya.',
        'Detik terakhir = <code>totalDetik % 60</code>.'
      ],
      syarat: [{ nama: 'Memakai operator modulus %', pola: /%/ }],
      tes: [
        { nama: '3725 detik', output: ['1 jam 2 menit 5 detik'] },
        { nama: '59 detik', input: { totalDetik: 59 }, output: ['0 jam 0 menit 59 detik'] },
        { nama: '7200 detik', input: { totalDetik: 7200 }, output: ['2 jam 0 menit 0 detik'] },
        { nama: '86399 detik', input: { totalDetik: 86399 }, output: ['23 jam 59 menit 59 detik'] }
      ]
    },
    {
      id: 't3',
      jenis: 'tantangan',
      judul: 'Penjaga Pintu Bioskop',
      soal: '<p class="content-text">Data Input: <code>inputUmur</code> (string dari form), <code>punyaTiket</code> (boolean), dan <code>batasUmur</code> (number, rating film). Tanpa <code>if</code>, kerjakan:</p>' +
        '<ol class="task-list">' +
        '<li>Ubah <code>inputUmur</code> menjadi number, simpan di variabel <code>umur</code>.</li>' +
        '<li>Buat <code>bolehMasuk</code>: <code>true</code> jika umur minimal <code>batasUmur</code> <strong>dan</strong> punya tiket.</li>' +
        '<li>Baris 1: tampilkan <code>Boleh masuk: true</code> atau <code>Boleh masuk: false</code>.</li>' +
        '<li>Baris 2: pakai ternary untuk menampilkan <code>Silakan masuk!</code> atau <code>Maaf, tidak bisa masuk.</code></li></ol>',
      input: { inputUmur: '17', punyaTiket: true, batasUmur: 13 },
      starter: '// Ingat: input dari form selalu string!\n',
      solusi: 'let umur = Number(inputUmur);\nlet bolehMasuk = umur >= batasUmur && punyaTiket;\n\nconsole.log(`Boleh masuk: ${bolehMasuk}`);\nconsole.log(bolehMasuk ? "Silakan masuk!" : "Maaf, tidak bisa masuk.");',
      petunjuk: [
        '<code>let umur = Number(inputUmur);</code>',
        'Gabungkan dua syarat dengan <code>&amp;&amp;</code>: <code>umur &gt;= batasUmur &amp;&amp; punyaTiket</code>'
      ],
      syarat: [
        { nama: 'Memakai operator &&', pola: /&&/ },
        { nama: 'Memakai operator ternary', pola: /\?[^?:]*:/ },
        { nama: 'Tidak memakai if (belum dipelajari)', pola: /\bif\s*\(/, tidak: true }
      ],
      tes: [
        { nama: 'umur sudah jadi number', panggil: 'typeof umur', hasil: 'number' },
        { nama: 'Umur 17, punya tiket, film 13+', output: ['Boleh masuk: true', 'Silakan masuk!'] },
        { nama: 'Umur 12, punya tiket, film 13+', input: { inputUmur: '12', punyaTiket: true, batasUmur: 13 }, output: ['Boleh masuk: false', 'Maaf, tidak bisa masuk.'] },
        { nama: 'Umur 20, tidak punya tiket', input: { inputUmur: '20', punyaTiket: false, batasUmur: 17 }, output: ['Boleh masuk: false', 'Maaf, tidak bisa masuk.'] },
        { nama: 'Umur 13, punya tiket, film 13+ (tepat batas)', input: { inputUmur: '13', punyaTiket: true, batasUmur: 13 }, output: ['Boleh masuk: true', 'Silakan masuk!'] }
      ]
    }
  ],

  /* Kuis (dinilai) */
  kuis: [
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(10 % 3);',
      opsi: ['3', '1', '3.333', '0'],
      jawab: 1,
      cekOutput: true,
      bahas: '<code>%</code> adalah modulus (sisa bagi). 10 dibagi 3 = 3 sisa <strong>1</strong>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(2 ** 3);',
      jawab: ['8'],
      cekOutput: true,
      bahas: '<code>**</code> adalah pangkat: 2 × 2 × 2 = 8.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(10 + 5 * 2);',
      opsi: ['30', '20', '25', '17'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Perkalian dikerjakan lebih dulu: 5 * 2 = 10, lalu 10 + 10 = <strong>20</strong>. Untuk menjumlah dulu, pakai kurung: <code>(10 + 5) * 2</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log("5" + 3);',
      opsi: ['8', '53', 'NaN', 'Error'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Jika salah satu sisi <code>+</code> adalah string, JavaScript <strong>menggabungkan</strong> teks: <code>"5" + 3</code> → <code>"53"</code>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log("10" - 5);',
      opsi: ['105', '5', 'NaN', '"5"'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Operator <code>-</code> tidak bisa menggabung teks, jadi <code>"10"</code> dipaksa (<em>coercion</em>) menjadi number: 10 - 5 = 5.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(5 === "5");',
      opsi: ['true', 'false', 'undefined', 'Error'],
      jawab: 1,
      cekOutput: true,
      bahas: '<code>===</code> membandingkan nilai <strong>dan</strong> tipe. 5 bertipe number, "5" bertipe string, jadi hasilnya <code>false</code>.'
    },
    {
      tipe: 'bs',
      tanya: '<code>x += 3</code> sama artinya dengan <code>x = x + 3</code>.',
      jawab: true,
      bahas: 'Operator penugasan gabungan hanyalah cara singkat: <code>x += 3</code> → <code>x = x + 3</code>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'let skor = 10;\nskor += 5;\nskor *= 2;\nconsole.log(skor);',
      jawab: ['30'],
      cekOutput: true,
      bahas: '10 + 5 = 15, lalu 15 × 2 = <strong>30</strong>.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'let i = 5;\nconsole.log(i++);',
      opsi: ['5', '6', '4', 'undefined'],
      jawab: 0,
      cekOutput: true,
      bahas: '<code>i++</code> (postfix) <strong>memakai nilai lama dulu</strong>, baru menambah. Jadi yang ditampilkan 5, setelah itu <code>i</code> menjadi 6. Kalau <code>++i</code>, yang tampil 6.'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'console.log(true && false || true);',
      opsi: ['true', 'false', 'undefined', 'Error'],
      jawab: 0,
      cekOutput: true,
      bahas: '<code>&amp;&amp;</code> dikerjakan sebelum <code>||</code>: <code>true &amp;&amp; false</code> = false, lalu <code>false || true</code> = <strong>true</strong>.'
    },
    {
      tipe: 'pg',
      tanya: 'Manakah nilai yang termasuk <strong>falsy</strong> (dianggap <code>false</code> oleh <code>Boolean()</code>)?',
      opsi: ['`"0"`', '`0`', '`"halo"`', '`-1`'],
      jawab: 1,
      bahas: 'Nilai falsy: <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code> (dan <code>false</code>). <code>"0"</code> adalah string yang tidak kosong, jadi truthy!'
    },
    {
      tipe: 'pg',
      tanya: 'Apa output kode berikut?',
      kode: 'let umur = 15;\nconsole.log(umur >= 17 ? "Dewasa" : "Remaja");',
      opsi: ['Dewasa', 'Remaja', 'true', 'false'],
      jawab: 1,
      cekOutput: true,
      bahas: 'Kondisi <code>15 &gt;= 17</code> bernilai false, jadi ternary mengambil nilai setelah titik dua: <strong>"Remaja"</strong>.'
    },
    {
      tipe: 'isian',
      tanya: 'Apa output kode berikut?',
      kode: 'let inputNilai = "88";\nconsole.log(Number(inputNilai) + 10);',
      jawab: ['98'],
      cekOutput: true,
      bahas: '<code>Number("88")</code> mengubah string menjadi number 88, lalu dijumlah 10 = <strong>98</strong>. Tanpa <code>Number()</code> hasilnya "8810".'
    },
    {
      tipe: 'susun',
      tanya: 'Susun baris kode agar output-nya <code>20</code> (bukan <code>"173"</code>).',
      baris: ['let inputUsia = "17";', 'let usia = Number(inputUsia);', 'usia += 3;', 'console.log(usia);'],
      cekOutput: true,
      bahas: 'Input string harus dikonversi dulu dengan <code>Number()</code>, baru dijumlah. Variabel juga harus dibuat sebelum diubah dan ditampilkan.'
    }
  ]
};
