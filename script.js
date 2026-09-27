/**
 * Prem Patel — Personal Website & Résumé
 * 1. Party Popper / Confetti Explosion Easter Egg on Logo Tap
 * 2. Light / Dark Theme Switcher with LocalStorage Persistence
 * 3. 1-Click Copy Email to Clipboard
 * 4. Print CV Handler
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Party Hat & Confetti Explosion on Logo Tap (J Rosser Easter Egg)
  // -------------------------------------------------------------------------
  const voxelLogoBtn = document.getElementById('voxel-logo-btn');

  function triggerPartyExplosion(e) {
    if (!voxelLogoBtn) return;

    // Trigger bounce animation on the logo
    voxelLogoBtn.classList.remove('party-bounce');
    void voxelLogoBtn.offsetWidth; // Force DOM reflow
    voxelLogoBtn.classList.add('party-bounce');

    const rect = voxelLogoBtn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = [
      '#5ff26b', // Neon Green
      '#af67ff', // Electric Purple
      '#38bdf8', // Sky Blue
      '#fbbf24', // Amber Gold
      '#f43f5e', // Coral Pink
      '#34d399', // Emerald
      '#c084fc', // Lavender
      '#fb923c'  // Tangerine
    ];

    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      const isHat = i % 3 === 0;
      const particle = document.createElement('div');
      particle.className = isHat ? 'party-particle' : 'party-particle party-dot';

      // Disperse in 360-degree radial burst
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const distance = 70 + Math.random() * 140;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 720;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      if (isHat) {
        // Striped Party Cone Hat (Matching Image 3)
        particle.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 40 40" style="overflow: visible;">
            <polygon points="20,2 6,36 34,36" fill="${color}" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
            <line x1="10" y1="26" x2="30" y2="26" stroke="#ffffff" stroke-width="2" opacity="0.8" />
            <line x1="14" y1="16" x2="26" y2="16" stroke="#ffffff" stroke-width="2" opacity="0.8" />
            <circle cx="20" cy="2" r="3.5" fill="#fef08a" />
          </svg>
        `;
      } else {
        const size = 6 + Math.random() * 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
      }

      document.body.appendChild(particle);

      // Clean up DOM after animation completes
      setTimeout(() => {
        particle.remove();
      }, 1250);
    }
  }

  if (voxelLogoBtn) {
    voxelLogoBtn.addEventListener('click', triggerPartyExplosion);
  }

  // -------------------------------------------------------------------------
  // 2. Theme Switcher (Stored in LocalStorage)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}

    if (themeIcon) {
      if (theme === 'dark') {
        // Sun icon
        themeIcon.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
      } else {
        // Moon icon
        themeIcon.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
      }
    }
  }

  // Initialize theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // -------------------------------------------------------------------------
  // 3. 1-Click Copy Email to Clipboard with Toast
  // -------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'prempatel7740@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email}`);
        }).catch(() => {
          showToast(email);
        });
      } else {
        showToast(email);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 4. Print / PDF Handler
  // -------------------------------------------------------------------------
  const printBtns = document.querySelectorAll('.print-btn');
  printBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // -------------------------------------------------------------------------
  // 5. Keyboard Shortcuts ('T' to toggle theme)
  // -------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 't' || e.key === 'T') {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    }
  });

  // -------------------------------------------------------------------------
  // 6. Typewriter Effect for "Hi I'm Prem!" on Page Load
  // -------------------------------------------------------------------------
  const typewriterText = document.getElementById('typewriter-text');
  if (typewriterText) {
    const textToType = "Hi I'm Prem!";
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      typewriterText.textContent = textToType;
    } else {
      typewriterText.textContent = '';
      let i = 0;
      const startDelay = 250;
      const typingSpeed = 75;

      setTimeout(() => {
        const timer = setInterval(() => {
          if (i < textToType.length) {
            typewriterText.textContent += textToType.charAt(i);
            i++;
          } else {
            clearInterval(timer);
          }
        }, typingSpeed);
      }, startDelay);
    }
  }

})();
