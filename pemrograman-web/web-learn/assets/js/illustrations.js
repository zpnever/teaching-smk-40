/* ═══════════════════════════════════════════
   ILUSTRASI — definisi SVG bersama + maskot "Kurawal"
   ═══════════════════════════════════════════ */
(function (root) {
  'use strict';

  // Filter "goyang tangan" & pola arsir, disuntikkan sekali per halaman
  var DEFS =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">' +
    '<defs>' +
    '<filter id="goyang" x="-5%" y="-5%" width="110%" height="110%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>' +
    '</filter>' +
    '<pattern id="pola-arsir" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">' +
    '<line x1="0" y1="0" x2="0" y2="6" stroke="#1A1A1A" stroke-width="1.4"/>' +
    '</pattern>' +
    '<pattern id="pola-titik" width="8" height="8" patternUnits="userSpaceOnUse">' +
    '<circle cx="2" cy="2" r="1.1" fill="#1A1A1A"/>' +
    '</pattern>' +
    '</defs></svg>';

  var MULUT = {
    senang: '<path class="ink" d="M42 58 q8 8 16 0"/>',
    bangga: '<path class="paper" d="M41 56 q9 12 18 0 z"/>',
    mikir: '<path class="ink" d="M44 60 q5 -3 11 0"/>',
    kaget: '<ellipse cx="50" cy="60" rx="4" ry="5" class="paper"/>',
    sedih: '<path class="ink" d="M43 62 q7 -6 14 0"/>'
  };

  var MATA = {
    senang: '<circle cx="41" cy="46" r="3.3" class="solid"/><circle cx="59" cy="46" r="3.3" class="solid"/>',
    bangga: '<path class="ink" d="M37 47 q4 -5 8 0 M55 47 q4 -5 8 0"/>',
    mikir: '<circle cx="42" cy="44" r="3.1" class="solid"/><circle cx="60" cy="44" r="3.1" class="solid"/><path class="thin" d="M37 38 l8 -2 M56 36 l8 2"/>',
    kaget: '<circle cx="41" cy="45" r="5" class="paper"/><circle cx="59" cy="45" r="5" class="paper"/><circle cx="41" cy="45" r="2" class="solid"/><circle cx="59" cy="45" r="2" class="solid"/>',
    sedih: '<circle cx="41" cy="47" r="3" class="solid"/><circle cx="59" cy="47" r="3" class="solid"/><path class="thin" d="M36 39 l8 3 M64 39 l-8 3"/>'
  };

  var EKSTRA = {
    senang: '',
    bangga: '<path class="ink" d="M84 14 l2 5 5 1 -4 3 1 5 -4 -3 -4 3 1 -5 -4 -3 5 -1z"/><path class="thin" d="M12 18 l4 4 M16 18 l-4 4"/>',
    mikir: '<text x="82" y="22" font-size="18">?</text>',
    kaget: '<text x="80" y="22" font-size="20">!</text><path class="thin" d="M16 20 l6 4 M14 30 l7 1"/>',
    sedih: '<path class="thin" d="M66 50 q2 4 0 6 q-2 -2 0 -6z"/>'
  };

  /** SVG maskot Kurawal: badan kotak bundar, lengan berbentuk { dan } */
  function maskot(mood) {
    mood = MULUT[mood] ? mood : 'senang';
    return '<svg class="doodle mascot" viewBox="0 0 100 100" role="img" aria-label="Kurawal, maskot Coret.js">' +
      '<ellipse cx="50" cy="94" rx="23" ry="3.5" fill="#E8E8E4"/>' +
      '<g class="wobble">' +
      '<path class="ink" d="M41 82 v8 h-6 M59 82 v8 h6"/>' +
      '<path class="ink" d="M21 40 c-5 0 -5 4 -5 8 s0 7 -5 7 c5 0 5 3 5 7 s0 8 5 8"/>' +
      '<path class="ink" d="M79 40 c5 0 5 4 5 8 s0 7 5 7 c-5 0 -5 3 -5 7 s0 8 -5 8"/>' +
      '<rect x="25" y="24" width="50" height="60" rx="17" class="paper"/>' +
      '<path class="ink" d="M46 24 c-1 -6 2 -11 7 -13 M53 24 c2 -4 6 -6 10 -5"/>' +
      MATA[mood] +
      '<ellipse cx="34" cy="55" rx="4" ry="2.4" class="hatch"/><ellipse cx="66" cy="55" rx="4" ry="2.4" class="hatch"/>' +
      MULUT[mood] +
      '</g>' +
      '<text x="50" y="77" text-anchor="middle" font-size="9" class="mono">JS</text>' +
      EKSTRA[mood] +
      '</svg>';
  }

  function pasangDefs() {
    if (document.getElementById('goyang')) return;
    var wadah = document.createElement('div');
    wadah.innerHTML = DEFS;
    document.body.insertBefore(wadah.firstChild, document.body.firstChild);
  }

  function isiMaskot(ruang) {
    (ruang || document).querySelectorAll('[data-mascot]').forEach(function (el) {
      if (el.dataset.mascotSiap) return;
      el.innerHTML = maskot(el.getAttribute('data-mascot'));
      el.dataset.mascotSiap = '1';
    });
  }

  /** Ubah <div class="callout" data-kind="tips"> menjadi balon ucapan bermaskot */
  var MOOD_CALLOUT = { tips: 'senang', awas: 'kaget', fakta: 'bangga', mikir: 'mikir' };
  var LABEL_CALLOUT = { tips: 'Tips', awas: 'Awas!', fakta: 'Fakta Unik', mikir: 'Coba Pikirkan' };
  function siapkanCallout(ruang) {
    (ruang || document).querySelectorAll('.callout:not([data-siap])').forEach(function (el) {
      var jenis = el.getAttribute('data-kind') || 'tips';
      var isi = el.innerHTML;
      var label = el.getAttribute('data-label') || LABEL_CALLOUT[jenis] || 'Tips';
      el.innerHTML = '<div class="callout-mascot" aria-hidden="true">' + maskot(MOOD_CALLOUT[jenis] || 'senang') + '</div>' +
        '<div class="callout-body"><span class="callout-kind">' + label + '</span><div>' + isi + '</div></div>';
      el.setAttribute('data-siap', '1');
    });
  }

  root.Illus = { maskot: maskot, pasangDefs: pasangDefs, isiMaskot: isiMaskot, siapkanCallout: siapkanCallout };

  if (typeof document !== 'undefined') {
    var mulai = function () { pasangDefs(); siapkanCallout(); isiMaskot(); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mulai);
    else mulai();
  }
})(typeof window !== 'undefined' ? window : globalThis);
