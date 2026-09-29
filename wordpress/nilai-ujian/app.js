/* =================================================================
   HASIL PTS CMS WORDPRESS — VANILLA JS APP LOGIC
   SMK NEGERI 40 JAKARTA — KELAS XI RPL
   ================================================================= */

(function () {
  'use strict';

  // ── DOM Elements ───────────────────────────────────────────────
  const viewSearch = document.getElementById('view-search');
  const viewResult = document.getElementById('view-result');
  const searchForm = document.getElementById('search-form');
  const studentInput = document.getElementById('student-name-input');
  const btnClear = document.getElementById('btn-clear-input');
  const alertError = document.getElementById('alert-error');
  const alertErrorText = document.getElementById('alert-error-text');

  // Result Elements
  const btnBack = document.getElementById('btn-back');
  const btnBackBottom = document.getElementById('btn-back-bottom');
  const btnPrint = document.getElementById('btn-print');

  const resStudentName = document.getElementById('res-student-name');
  const resKelas = document.getElementById('res-kelas');
  const resMapel = document.getElementById('res-mapel');
  const resWaktu = document.getElementById('res-waktu');

  const resScoreCard = document.getElementById('res-score-card');
  const resScoreValue = document.getElementById('res-score-value');
  const resStatusPill = document.getElementById('res-status-pill');
  const resPredikat = document.getElementById('res-predikat');

  const resMessageCard = document.getElementById('res-message-card');
  const resMessageIcon = document.getElementById('res-message-icon');
  const resMessageTitle = document.getElementById('res-message-title');
  const resMessageBody = document.getElementById('res-message-body');
  const resEvaluator = document.getElementById('res-evaluator');

  const questionsContainer = document.getElementById('questions-list-container');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentStudent = null;
  let activeFilter = 'all';

  // ── Lookup Function (Strict Exact Match) ────────────────────────
  function lookupStudent(query) {
    if (!query || typeof query !== 'string') return null;
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return null;

    // Strict exact slug: only lowercase letters and numbers
    const cleanKey = trimmed.replace(/[^a-z0-9]/g, '');
    const rawKey = trimmed.replace(/\s+/g, '');

    if (typeof STUDENTS_DATA === 'undefined' || !Array.isArray(STUDENTS_DATA)) {
      console.error('STUDENTS_DATA tidak ditemukan.');
      return null;
    }

    return STUDENTS_DATA.find(function (student) {
      if (student.key === cleanKey) return true;
      if (student.aliases && (student.aliases.includes(cleanKey) || student.aliases.includes(rawKey))) {
        return true;
      }
      return false;
    }) || null;
  }

  // ── View Switching ─────────────────────────────────────────────
  function switchView(viewName) {
    if (viewName === 'result') {
      viewSearch.classList.remove('active');
      viewResult.classList.add('active');
    } else {
      viewResult.classList.remove('active');
      viewSearch.classList.add('active');
      if (studentInput) {
        studentInput.value = '';
        studentInput.focus();
      }
      hideError();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Error Helpers ──────────────────────────────────────────────
  function showError(msg) {
    if (alertError && alertErrorText) {
      alertErrorText.textContent = msg;
      alertError.style.display = 'flex';
    }
    if (studentInput) {
      studentInput.classList.add('input-error');
    }
  }

  function hideError() {
    if (alertError) {
      alertError.style.display = 'none';
    }
    if (studentInput) {
      studentInput.classList.remove('input-error');
    }
  }

  // ── Render Student Result ──────────────────────────────────────
  function renderResult(student) {
    currentStudent = student;
    const isLulus = student.nilai >= 78;

    // Profile
    resStudentName.textContent = student.nama;
    resKelas.textContent = student.kelas || 'XI-RPL';
    resMapel.textContent = student.mata_pelajaran || 'Mata Pelajaran Pilihan (CMS WordPress)';
    resWaktu.textContent = student.waktu_ujian || '24 September 2026';
    resEvaluator.textContent = student.penilai || 'Nuraini Azizah, M.Pd.';

    // Score Card
    resScoreValue.textContent = student.nilai;
    resPredikat.textContent = student.predikat || (isLulus ? 'Sangat Baik' : 'Cukup');

    if (isLulus) {
      resScoreCard.className = 'score-card score-lulus';
      resStatusPill.className = 'status-pill pill-success';
      resStatusPill.textContent = 'LULUS (TUNTAS)';

      resMessageCard.className = 'message-card message-card-lulus';
      resMessageIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      `;
      resMessageTitle.textContent = 'Selamat atas Pencapaian Anda!';
      resMessageBody.innerHTML = `
        <p>Selamat kepada <strong>${escapeHtml(student.nama)}</strong>! Anda telah berhasil mencapai dan melampaui Kriteria Ketuntasan Minimal (KKM: 78) pada Penilaian Tengah Semester ini dengan capaian nilai yang sangat memuaskan.</p>
        <p class="message-sub">Pemahaman konsep dan teknis WordPress yang Anda tunjukkan sudah sangat baik. Pertahankan dedikasi belajar ini dan terus tingkatkan kompetensi keahlian Anda di Rekayasa Perangkat Lunak.</p>
      `;
    } else {
      resScoreCard.className = 'score-card score-remedial';
      resStatusPill.className = 'status-pill pill-warning';
      resStatusPill.textContent = 'BELUM TUNTAS';

      resMessageCard.className = 'message-card message-card-remedial';
      resMessageIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `;
      resMessageTitle.textContent = 'Tetap Semangat & Jangan Berkecil Hati!';
      resMessageBody.innerHTML = `
        <p>Kepada <strong>${escapeHtml(student.nama)}</strong>, perolehan nilai Anda saat ini adalah <strong>${student.nilai}</strong> dan belum mencapai batas KKM (78).</p>
        <p class="message-sub">Jangan berkecil hati. Setiap tahapan belajar adalah kesempatan untuk bertumbuh. Silakan pelajari kembali catatan koreksi guru pada rincian soal di bawah ini dan persiapkan diri dengan baik untuk sesi remedial/pengayaan berikutnya.</p>
      `;
    }

    // Update filter counts
    const countTepat = student.jawaban.filter(j => j.skor >= 9 || (j.status && j.status.toLowerCase() === 'tepat')).length;
    const countPerluPerbaikan = student.jawaban.length - countTepat;

    document.getElementById('filter-count-all').textContent = `(${student.jawaban.length})`;
    document.getElementById('filter-count-tepat').textContent = `(${countTepat})`;
    document.getElementById('filter-count-perbaikan').textContent = `(${countPerluPerbaikan})`;

    // Reset filter to all
    setFilter('all');
  }

  // ── Render Questions List ──────────────────────────────────────
  function renderQuestions() {
    if (!currentStudent || !questionsContainer) return;

    const filtered = currentStudent.jawaban.filter(item => {
      if (activeFilter === 'all') return true;
      const isTepat = item.skor >= 9 || (item.status && item.status.toLowerCase() === 'tepat');
      if (activeFilter === 'tepat') return isTepat;
      if (activeFilter === 'perlu-perbaikan') return !isTepat;
      return true;
    });

    questionsContainer.innerHTML = '';

    filtered.forEach(item => {
      const isTepat = item.skor >= 9 || (item.status && item.status.toLowerCase() === 'tepat');
      const isSebagian = item.skor >= 6 && item.skor < 9;

      let badgeClass = 'badge-kurang';
      let badgeLabel = 'Kurang Tepat';
      if (isTepat) {
        badgeClass = 'badge-tepat';
        badgeLabel = 'Tepat / Sempurna';
      } else if (isSebagian) {
        badgeClass = 'badge-sebagian';
        badgeLabel = 'Sebagian Tepat';
      }

      const card = document.createElement('div');
      card.className = 'question-card';
      card.innerHTML = `
        <div class="question-card-header" role="button" tabindex="0" aria-expanded="true">
          <div class="header-left">
            <span class="question-number-pill">Soal #${item.no}</span>
            <span class="answer-status-badge ${badgeClass}">${badgeLabel}</span>
          </div>
          <div class="header-right">
            <div class="score-pill">
              <span class="score-current">${item.skor}</span>
              <span class="score-max">/ 10</span>
            </div>
            <span class="toggle-icon no-print">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </span>
          </div>
        </div>

        <div class="question-body is-open">
          <div class="question-text-box">
            <h4 class="box-label">Pertanyaan Ujian:</h4>
            <p class="question-content">${escapeHtml(item.soal)}</p>
          </div>

          <div class="student-answer-box">
            <h4 class="box-label">Jawaban Anda:</h4>
            <p class="student-answer-text">${escapeHtml(item.jawaban_siswa || '(Tidak ada jawaban)')}</p>
          </div>

          ${item.alasan_penilaian ? `
            <div class="feedback-box">
              <h4 class="feedback-label">Catatan & Evaluasi Penilai:</h4>
              <p class="feedback-text">${escapeHtml(item.alasan_penilaian)}</p>
            </div>
          ` : ''}

          ${item.kunci_jawaban ? `
            <details class="key-reference-box">
              <summary class="key-reference-summary">Kunci Jawaban / Konsep Standar</summary>
              <p class="key-reference-content">${escapeHtml(item.kunci_jawaban)}</p>
            </details>
          ` : ''}
        </div>
      `;

      // Accordion toggle
      const headerEl = card.querySelector('.question-card-header');
      const bodyEl = card.querySelector('.question-body');
      const iconEl = card.querySelector('.toggle-icon');

      function toggleAccordion() {
        const isOpen = !bodyEl.classList.contains('is-closed');
        if (isOpen) {
          bodyEl.classList.add('is-closed');
          headerEl.setAttribute('aria-expanded', 'false');
          iconEl.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          `;
        } else {
          bodyEl.classList.remove('is-closed');
          headerEl.setAttribute('aria-expanded', 'true');
          iconEl.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          `;
        }
      }

      headerEl.addEventListener('click', toggleAccordion);
      headerEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAccordion();
        }
      });

      questionsContainer.appendChild(card);
    });
  }

  function setFilter(filter) {
    activeFilter = filter;
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    renderQuestions();
  }

  // ── Helper: Escape HTML ────────────────────────────────────────
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ── Event Listeners ────────────────────────────────────────────
  if (studentInput) {
    studentInput.addEventListener('input', function (e) {
      // Auto lowercase & remove spaces as user types
      this.value = this.value.toLowerCase().replace(/\s+/g, '');
      hideError();
      if (btnClear) {
        btnClear.style.display = this.value ? 'block' : 'none';
      }
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', function () {
      if (studentInput) {
        studentInput.value = '';
        studentInput.focus();
      }
      this.style.display = 'none';
      hideError();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = (studentInput ? studentInput.value : '').trim();

      if (!query) {
        showError('Silakan masukkan nama lengkap Anda terlebih dahulu.');
        return;
      }

      const student = lookupStudent(query);

      if (student) {
        hideError();
        renderResult(student);
        switchView('result');
      } else {
        showError(
          'Data siswa tidak ditemukan. Pastikan format nama lengkap sudah benar (huruf kecil semua tanpa spasi, contoh: danusukohandiyanto). Perbedaan satu huruf saja menyebabkan data tidak muncul.'
        );
      }
    });
  }

  if (btnBack) {
    btnBack.addEventListener('click', () => switchView('search'));
  }
  if (btnBackBottom) {
    btnBackBottom.addEventListener('click', () => switchView('search'));
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      setFilter(this.getAttribute('data-filter'));
    });
  });

})();
