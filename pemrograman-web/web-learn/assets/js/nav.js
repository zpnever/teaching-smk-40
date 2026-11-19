/* ═══════════════════════════════════════════
   NAV — dropdown Materi JavaScript di topbar
   Menggunakan Popover API + Anchor Positioning fallback
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  function posisiMenu(trigger, menu) {
    var tr = trigger.getBoundingClientRect();
    var mr = menu.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var gap = 8;

    var top = tr.bottom + gap;
    if (top + mr.height > vh - 8 && tr.top - gap - mr.height >= 8) {
      top = tr.top - gap - mr.height;
    }
    var left = tr.left;
    if (left + mr.width > vw - 8) left = vw - mr.width - 8;
    if (left < 8) left = 8;

    menu.style.top = Math.round(top) + 'px';
    menu.style.left = Math.round(left) + 'px';
  }

  function tandaiAktif(topnav) {
    var materiId = document.body.getAttribute('data-materi');
    if (!materiId) {
      if (/\/rapor\.html$/i.test(location.pathname)) materiId = 'rapor';
    }
    if (!materiId) return;

    var aktifLink = topnav.querySelector('a[data-nav="' + materiId + '"]');
    if (aktifLink && !aktifLink.hasAttribute('aria-current')) {
      aktifLink.setAttribute('aria-current', 'page');
    }

    var dropdown = topnav.querySelector('.nav-dropdown');
    if (dropdown && aktifLink && dropdown.contains(aktifLink)) {
      var trigger = dropdown.querySelector('.nav-trigger');
      if (trigger) {
        trigger.classList.add('is-current');
        if (!trigger.querySelector('.nav-cur')) {
          var badge = document.createElement('span');
          badge.className = 'nav-cur';
          badge.setAttribute('aria-hidden', 'true');
          badge.textContent = '#' + materiId;
          var caret = trigger.querySelector('.nav-caret');
          trigger.insertBefore(badge, caret);
        }
      }
    }
  }

  function initDropdown(dropdown) {
    var trigger = dropdown.querySelector('.nav-trigger');
    var menu = dropdown.querySelector('.nav-menu');
    if (!trigger || !menu) return;

    var adaPopover = 'popover' in HTMLElement.prototype;
    var adaAnchor = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('position-area', 'block-end');
    var hoverPreview = false;

    function bukaPopover() {
      try {
        menu.showPopover({ source: trigger });
      } catch (err) {
        menu.showPopover();
      }
    }

    if (adaPopover) {
      menu.addEventListener('toggle', function (e) {
        var terbuka = e.newState === 'open';
        trigger.setAttribute('aria-expanded', terbuka ? 'true' : 'false');
        if (terbuka && !adaAnchor) {
          posisiMenu(trigger, menu);
        }
        if (!terbuka) hoverPreview = false;
      });

      dropdown.addEventListener('pointerenter', function (e) {
        if (!window.matchMedia('(hover: hover)').matches || e.pointerType === 'touch') return;
        if (!menu.matches(':popover-open')) {
          hoverPreview = true;
          bukaPopover();
        }
      });

      dropdown.addEventListener('pointerleave', function () {
        if (hoverPreview && menu.matches(':popover-open')) {
          hoverPreview = false;
          menu.hidePopover();
        }
      });

      trigger.addEventListener('click', function (e) {
        if (hoverPreview && menu.matches(':popover-open')) {
          hoverPreview = false;
          e.preventDefault();
        }
      });

      dropdown.addEventListener('focusout', function (e) {
        if (e.relatedTarget && !dropdown.contains(e.relatedTarget) && menu.matches(':popover-open')) {
          menu.hidePopover();
        }
      });

      window.addEventListener('resize', function () {
        if (!adaAnchor && menu.matches(':popover-open')) posisiMenu(trigger, menu);
      }, { passive: true });
    } else {
      menu.removeAttribute('popover');
      menu.hidden = true;
      menu.style.position = 'fixed';
      menu.style.margin = '0';

      function setFallback(buka) {
        menu.hidden = !buka;
        menu.classList.toggle('is-open', buka);
        trigger.setAttribute('aria-expanded', buka ? 'true' : 'false');
        if (buka) posisiMenu(trigger, menu);
      }

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        setFallback(menu.hidden);
      });
      document.addEventListener('click', function (e) {
        if (!menu.hidden && !dropdown.contains(e.target)) setFallback(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !menu.hidden) {
          setFallback(false);
          trigger.focus();
        }
      });
      window.addEventListener('resize', function () {
        if (!menu.hidden) posisiMenu(trigger, menu);
      }, { passive: true });
    }
  }

  function init() {
    var topnav = document.querySelector('.topnav');
    if (!topnav) return;
    tandaiAktif(topnav);
    topnav.querySelectorAll('.nav-dropdown').forEach(initDropdown);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
