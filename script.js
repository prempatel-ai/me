/**
 * Prem Patel — Hybrid Developer Portfolio & Academic Résumé
 * Theme Toggle, Copy Tooltip, Project Filter, Print Handler
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Theme Switcher (Stored in LocalStorage, matching J Rosser setup)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {
      // LocalStorage might be restricted
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}

    if (themeIcon) {
      // Sun icon for dark mode (click to switch to light), Moon icon for light mode
      if (theme === 'dark') {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to light mode (T)');
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to dark mode (T)');
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  }

  // Initial theme initialization
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // -------------------------------------------------------------------------
  // 2. Toast Notification Helper
  // -------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // -------------------------------------------------------------------------
  // 3. One-Click Copy Email to Clipboard
  // -------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'prempatel7740@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 4. Print / Save CV to PDF Handler
  // -------------------------------------------------------------------------
  const printBtns = document.querySelectorAll('.print-cv-btn');
  printBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // -------------------------------------------------------------------------
  // 5. Interactive Project Filter Chips
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-categories') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'grid';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 6. Mobile Navigation Menu Toggle
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainHeader = document.getElementById('main-header');

  if (mobileToggle && mainHeader) {
    mobileToggle.addEventListener('click', () => {
      mainHeader.classList.toggle('mobile-menu-active');
      const expanded = mainHeader.classList.contains('mobile-menu-active');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking any nav link
    const navAnchors = mainHeader.querySelectorAll('.nav-links a');
    navAnchors.forEach((link) => {
      link.addEventListener('click', () => {
        mainHeader.classList.remove('mobile-menu-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 7. Keyboard Shortcuts (J Rosser style easter egg & developer touch)
  // -------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    // If not typing in an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 't' || e.key === 'T') {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      // Handled natively by browser print
    }
  });

})();
