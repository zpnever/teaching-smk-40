/* ═══════════════════════════════════════════
   APP — kerangka halaman: accordion, daftar isi,
   progress bar, back-to-top, drawer mobile, tab, toast
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var IKON = {
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    atas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>'
  };

  document.documentElement.classList.add('js');
  var materiId = document.body.getAttribute('data-materi');
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));

  /* ── Toast ───────────────────────────────── */
  var toastEl, toastTimer;
  function toast(pesan) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = pesan;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  /* ── Accordion ───────────────────────────── */
  function judulStep(step) {
    var h = step.querySelector('.step-header h2');
    if (!h) return '';
    var klon = h.cloneNode(true);
    klon.querySelectorAll('small').forEach(function (s) { s.remove(); });
    return klon.textContent.trim();
  }

  function setOpen(step, buka) {
    step.classList.toggle('open', buka);
    var header = step.querySelector('.step-header');
    if (header) header.setAttribute('aria-expanded', buka ? 'true' : 'false');
    if (buka) {
      step.dispatchEvent(new CustomEvent('step:open', { bubbles: true }));
      if (materiId && window.Progress) {
        Progress.tandaiBagian(materiId, step.id);
        tandaiToc(step.id);
      }
    }
  }

  steps.forEach(function (step) {
    var header = step.querySelector('.step-header');
    if (!header) return;
    if (!header.querySelector('.step-toggle')) {
      var tombol = document.createElement('span');
      tombol.className = 'step-toggle';
      tombol.setAttribute('aria-hidden', 'true');
      tombol.innerHTML = IKON.chevron;
      header.appendChild(tombol);
    }
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', step.classList.contains('open') ? 'true' : 'false');
    header.addEventListener('click', function () { setOpen(step, !step.classList.contains('open')); });
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(step, !step.classList.contains('open')); }
    });
  });

  document.querySelectorAll('[data-expand-all]').forEach(function (b) {
    b.addEventListener('click', function () { steps.forEach(function (s) { setOpen(s, true); }); });
  });
  document.querySelectorAll('[data-collapse-all]').forEach(function (b) {
    b.addEventListener('click', function () { steps.forEach(function (s) { setOpen(s, false); }); });
  });

  /* ── Daftar isi (dibangun dari .step) ───── */
  function buatToc() {
    var ol = document.createElement('ol');
    ol.className = 'toc';
    steps.forEach(function (step) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + step.id;
      a.setAttribute('data-target', step.id);
      a.textContent = judulStep(step);
      if (step.classList.contains('step--tes')) a.classList.add('toc-tes');
      var cek = document.createElement('span');
      cek.className = 'toc-check';
      cek.setAttribute('aria-hidden', 'true');
      a.appendChild(cek);
      li.appendChild(a);
      ol.appendChild(li);
    });
    return ol;
  }

  var sidebar = document.querySelector('.sidebar');
  var mobileSidebar, overlay;
  if (sidebar && steps.length) {
    sidebar.appendChild(buatToc());

    overlay = document.createElement('div');
    overlay.className = 'mobile-sidebar-overlay';
    mobileSidebar = document.createElement('nav');
    mobileSidebar.className = 'mobile-sidebar';
    mobileSidebar.setAttribute('aria-label', 'Daftar isi');
    mobileSidebar.innerHTML = '<div class="sidebar-title">Daftar Isi</div>';
    mobileSidebar.appendChild(buatToc());
    var tombolMenu = document.createElement('button');
    tombolMenu.className = 'mobile-nav-toggle';
    tombolMenu.setAttribute('aria-label', 'Buka daftar isi');
    tombolMenu.innerHTML = IKON.menu;
    document.body.appendChild(overlay);
    document.body.appendChild(mobileSidebar);
    document.body.appendChild(tombolMenu);
    var tutupDrawer = function () { mobileSidebar.classList.remove('open'); overlay.classList.remove('open'); };
    tombolMenu.addEventListener('click', function () { mobileSidebar.classList.add('open'); overlay.classList.add('open'); });
    overlay.addEventListener('click', tutupDrawer);
    mobileSidebar.addEventListener('click', function (e) { if (e.target.closest('a')) tutupDrawer(); });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    var step = target.classList.contains('step') ? target : target.closest('.step');
    if (step && !step.classList.contains('open')) setOpen(step, true);
  });

  function tandaiToc(id) {
    document.querySelectorAll('.toc a[data-target="' + id + '"]').forEach(function (a) { a.classList.add('done'); });
  }

  if (materiId && window.Progress) {
    Progress.setTotalBagian(materiId, steps.length);
    var dibuka = Progress.materi(materiId).bagian;
    Object.keys(dibuka).forEach(tandaiToc);
  }

  /* Buka step pertama, atau step yang dituju hash URL */
  var dariHash = location.hash && document.getElementById(location.hash.slice(1));
  var stepHash = dariHash && (dariHash.classList.contains('step') ? dariHash : dariHash.closest('.step'));
  if (stepHash) setOpen(stepHash, true);
  else if (steps[0] && !steps.some(function (s) { return s.classList.contains('open'); })) setOpen(steps[0], true);

  /* ── Animasi muncul ─────────────────────── */
  if ('IntersectionObserver' in window) {
    var muncul = new IntersectionObserver(function (entri) {
      entri.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); muncul.unobserve(en.target); }
      });
    }, { threshold: 0.02 });
    steps.forEach(function (s) { muncul.observe(s); });
  } else {
    steps.forEach(function (s) { s.classList.add('visible'); });
  }

  /* ── Progress bar, back-to-top, TOC aktif ─ */
  var bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);
  var keAtas = document.createElement('button');
  keAtas.className = 'back-to-top';
  keAtas.setAttribute('aria-label', 'Kembali ke atas');
  keAtas.innerHTML = IKON.atas;
  keAtas.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(keAtas);

  var tocLinks = document.querySelectorAll('.toc a');
  var jadwal = false;
  function onScroll() {
    jadwal = false;
    var tinggi = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (tinggi > 0 ? (window.scrollY / tinggi) * 100 : 0) + '%';
    keAtas.classList.toggle('visible', window.scrollY > 600);
    var aktif = null;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].getBoundingClientRect().top < 140) aktif = steps[i].id;
    }
    tocLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-target') === aktif); });
  }
  window.addEventListener('scroll', function () {
    if (!jadwal) { jadwal = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── Tab ─────────────────────────────────── */
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    var tombol = tabs.querySelectorAll('.tab-btn');
    tombol.forEach(function (b) {
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function () {
        tombol.forEach(function (x) {
          var aktif = x === b;
          x.setAttribute('aria-selected', aktif ? 'true' : 'false');
          var panel = document.getElementById(x.getAttribute('aria-controls'));
          if (panel) panel.hidden = !aktif;
        });
        tabs.dispatchEvent(new CustomEvent('step:open', { bubbles: true }));
      });
    });
  });

  /* ── Navigasi atas: tandai halaman aktif ── */
  if (materiId) {
    document.querySelectorAll('.topnav a[data-nav="' + materiId + '"]').forEach(function (a) {
      a.setAttribute('aria-current', 'page');
    });
  }

  window.App = { toast: toast, bukaStep: setOpen };
})();
