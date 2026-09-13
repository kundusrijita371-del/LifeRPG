/* ═══════════════════════════════════════════════════════════
   LIFE RPG — Cyberpunk Login Screen Logic (Figma Design)
   Handles: Video playback ensure, Password toggle,
            Form validation, Futuristic Web Audio chime,
            Seamless portal transition into Life RPG Game
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Web Audio API Futuristic Login Sound Synthesizer ───
  function playCyberLoginSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Cyber chime 1 (High Crystal)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.6);

      // Cyber chord 2 (Synth shimmer)
      setTimeout(() => {
        try {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
          osc2.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.4); // E6
          gain2.gain.setValueAtTime(0.25, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.8);
        } catch (e) {}
      }, 80);

      // Power Bass Surge
      setTimeout(() => {
        try {
          const osc3 = ctx.createOscillator();
          const gain3 = ctx.createGain();
          osc3.type = 'sawtooth';
          osc3.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
          osc3.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.5); // C5
          gain3.gain.setValueAtTime(0.18, ctx.currentTime);
          gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
          osc3.connect(gain3);
          gain3.connect(ctx.destination);
          osc3.start();
          osc3.stop(ctx.currentTime + 0.7);
        } catch (e) {}
      }, 160);
    } catch (e) {
      console.warn('AudioContext not available or blocked', e);
    }
  }

  // ─── Initialize Login Interactions ───
  function initLogin() {
    const overlay = document.getElementById('lrpg-login-overlay');
    const form = document.getElementById('lrpg-login-form');
    const identifierInput = document.getElementById('lrpg-identifier');
    const passwordInput = document.getElementById('lrpg-password');
    const passToggleBtn = document.getElementById('lrpg-password-toggle');
    const googleBtn = document.getElementById('lrpg-google-btn');
    const mobileBtn = document.getElementById('lrpg-mobile-btn');
    const signupBtn = document.getElementById('lrpg-signup-btn');
    const forgotBtn = document.getElementById('lrpg-forgot-btn');
    const bgVideo = document.getElementById('lrpg-bg-video');
    const appShell = document.getElementById('app-shell');
    const ambientCanvas = document.getElementById('ambient-particles');
    const xpCanvas = document.getElementById('xp-particles');

    // Ensure video plays smoothly
    if (bgVideo) {
      bgVideo.play().catch(() => {
        // Autoplay policy fallback: click anywhere starts it
        const startVideoOnTouch = () => {
          bgVideo.play();
          document.removeEventListener('click', startVideoOnTouch);
          document.removeEventListener('touchstart', startVideoOnTouch);
        };
        document.addEventListener('click', startVideoOnTouch, { once: true });
        document.addEventListener('touchstart', startVideoOnTouch, { once: true });
      });
    }

    // Password visibility toggle
    if (passToggleBtn && passwordInput) {
      passToggleBtn.addEventListener('click', () => {
        const eyeOpen = passToggleBtn.querySelector('.eye-open');
        const eyeClosed = passToggleBtn.querySelector('.eye-closed');
        const isPassword = passwordInput.type === 'password';

        passwordInput.type = isPassword ? 'text' : 'password';
        if (eyeOpen) eyeOpen.style.display = isPassword ? 'none' : 'block';
        if (eyeClosed) eyeClosed.style.display = isPassword ? 'block' : 'none';
      });
    }

    // Core Transition Function
    function performLoginTransition(playerName) {
      playCyberLoginSound();

      // Derive clean adventurer name from input
      let formattedName = 'Adventurer';
      if (playerName && typeof playerName === 'string' && playerName.trim()) {
        const raw = playerName.trim();
        if (raw.includes('@')) {
          formattedName = raw.split('@')[0];
        } else {
          formattedName = raw;
        }
        // Capitalize first letter
        formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
      }

      // Update character name across the app
      const charNameEl = document.getElementById('character-name');
      if (charNameEl) {
        charNameEl.textContent = formattedName;
      }

      // Trigger animated exit
      if (overlay) {
        overlay.classList.add('fade-out');

        // Reveal the main app
        if (appShell) {
          appShell.style.display = '';
          appShell.style.opacity = '0';
          appShell.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          requestAnimationFrame(() => {
            appShell.style.opacity = '1';
          });
        }

        // Make canvases visible
        if (ambientCanvas) ambientCanvas.style.opacity = '1';
        if (xpCanvas) xpCanvas.style.opacity = '1';

        setTimeout(() => {
          overlay.remove();
        }, 800);
      }
    }

    // Form Submit Handler
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const identValue = identifierInput ? identifierInput.value : '';
        performLoginTransition(identValue);
      });
    }

    // Social / Quick Login Buttons
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        performLoginTransition('Cyber Hunter');
      });
    }

    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        performLoginTransition('Shadow Runner');
      });
    }

    if (signupBtn) {
      signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performLoginTransition('Neon Knight');
      });
    }

    if (forgotBtn) {
      forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (identifierInput) {
          identifierInput.focus();
          identifierInput.placeholder = 'Enter email to reset password...';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogin);
  } else {
    initLogin();
  }
})();
