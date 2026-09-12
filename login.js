/* ═══════════════════════════════════════════════════════════
   LIFE RPG — Minecraft Login Screen Logic
   Handles: Terrain generation, Falling blocks, XP orbs,
            Pixel characters (Steve/Creeper), Torch sparks,
            Stars, Login form → transition to main app
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Generate Terrain Cells ───
  function generateTerrain() {
    const cellsPerRow = Math.ceil(window.innerWidth / 32) + 2;

    // Grass row
    const grassRow = document.getElementById('mc-grass-row');
    if (grassRow && grassRow.children.length === 0) {
      for (let i = 0; i < cellsPerRow; i++) {
        const cell = document.createElement('div');
        cell.className = 'mc-terrain-cell mc-cell-grass';
        grassRow.appendChild(cell);
      }
    }

    // Dirt rows
    ['mc-dirt-row-1', 'mc-dirt-row-2'].forEach(id => {
      const row = document.getElementById(id);
      if (row && row.children.length === 0) {
        for (let i = 0; i < cellsPerRow; i++) {
          const cell = document.createElement('div');
          cell.className = 'mc-terrain-cell mc-cell-dirt';
          row.appendChild(cell);
        }
      }
    });

    // Stone row
    const stoneRow = document.getElementById('mc-stone-row');
    if (stoneRow && stoneRow.children.length === 0) {
      for (let i = 0; i < cellsPerRow; i++) {
        const cell = document.createElement('div');
        cell.className = 'mc-terrain-cell mc-cell-stone';
        stoneRow.appendChild(cell);
      }
    }
  }

  // ─── Generate Stars ───
  function generateStars() {
    const starsContainer = document.getElementById('mc-stars');
    if (!starsContainer) return;

    const count = 80;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'mc-star';
      const size = Math.random() > 0.7 ? 3 : 2;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 50}%;
        --star-opacity: ${0.2 + Math.random() * 0.5};
        --twinkle-dur: ${2 + Math.random() * 4}s;
        --twinkle-delay: ${Math.random() * 3}s;
      `;
      starsContainer.appendChild(star);
    }
  }

  // ─── Draw Steve (Pixel Art on the side) ───
  function drawSteve() {
    const steve = document.getElementById('mc-steve');
    if (!steve) return;

    // Create a small canvas for Steve
    const canvas = document.createElement('canvas');
    canvas.width = 48;
    canvas.height = 80;
    canvas.style.cssText = 'width: 48px; height: 80px; image-rendering: pixelated;';
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const px = 4; // 12x20 grid

    function p(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x * px, y * px, px, px);
    }

    const skin = '#C49A6C';
    const hair = '#3B2213';
    const shirt = '#38B2AC';
    const pants = '#2D3748';
    const shoes = '#4A3728';
    const eyes = '#FFFFFF';
    const pupils = '#1A1A2E';

    // Hair
    for (let x = 3; x <= 8; x++) p(x, 0, hair);
    for (let x = 2; x <= 9; x++) p(x, 1, hair);
    p(2, 2, hair); p(3, 2, hair); p(8, 2, hair); p(9, 2, hair);

    // Face
    for (let x = 4; x <= 7; x++) { p(x, 2, skin); p(x, 3, skin); p(x, 4, skin); }
    p(3, 3, skin); p(8, 3, skin);

    // Eyes
    p(4, 3, eyes); p(5, 3, pupils); p(6, 3, eyes); p(7, 3, pupils);

    // Mouth
    p(5, 4, '#A0785A'); p(6, 4, '#A0785A');

    // Body (shirt)
    for (let x = 3; x <= 8; x++) {
      for (let y = 5; y <= 9; y++) p(x, y, shirt);
    }
    // Shirt detail
    p(5, 6, '#2D9F93'); p(6, 6, '#2D9F93');
    p(5, 7, '#2D9F93'); p(6, 7, '#2D9F93');

    // Arms
    for (let y = 5; y <= 9; y++) { p(2, y, skin); p(9, y, skin); }

    // Pants
    for (let x = 3; x <= 5; x++) { p(x, 10, pants); p(x, 11, pants); p(x, 12, pants); }
    for (let x = 6; x <= 8; x++) { p(x, 10, pants); p(x, 11, pants); p(x, 12, pants); }

    // Gap between legs
    p(5, 12, '#2B2D42'); p(6, 12, '#2B2D42');

    // Shoes
    for (let x = 3; x <= 5; x++) { p(x, 13, shoes); }
    for (let x = 6; x <= 8; x++) { p(x, 13, shoes); }

    steve.appendChild(canvas);
  }

  // ─── Draw Creeper ───
  function drawCreeper() {
    const creeper = document.getElementById('mc-creeper');
    if (!creeper) return;

    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 64;
    canvas.style.cssText = 'width: 40px; height: 64px; image-rendering: pixelated;';
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const px = 4; // 10x16 grid

    function p(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x * px, y * px, px, px);
    }

    const green = '#4B8B3B';
    const greenDark = '#3A6E2E';
    const greenLight = '#5CA04A';
    const face = '#1A1A1A';

    // Head (full green block)
    for (let y = 0; y <= 7; y++) {
      for (let x = 1; x <= 8; x++) {
        const shade = Math.random() > 0.5 ? green : (Math.random() > 0.5 ? greenDark : greenLight);
        p(x, y, shade);
      }
    }

    // Face - Eyes (2x2 blocks)
    p(2, 3, face); p(3, 3, face);
    p(2, 4, face); p(3, 4, face);
    p(6, 3, face); p(7, 3, face);
    p(6, 4, face); p(7, 4, face);

    // Mouth
    p(4, 5, face); p(5, 5, face);
    p(3, 6, face); p(4, 6, face); p(5, 6, face); p(6, 6, face);
    p(3, 7, face); p(4, 7, face); p(5, 7, face); p(6, 7, face);

    // Body
    for (let y = 8; y <= 12; y++) {
      for (let x = 2; x <= 7; x++) {
        const shade = Math.random() > 0.5 ? green : greenDark;
        p(x, y, shade);
      }
    }

    // Front legs
    for (let y = 13; y <= 15; y++) {
      for (let x = 2; x <= 4; x++) p(x, y, greenDark);
      for (let x = 5; x <= 7; x++) p(x, y, greenDark);
    }

    creeper.appendChild(canvas);
  }

  // ─── Falling Blocks Canvas Animation ───
  function initFallingBlocks() {
    const canvas = document.getElementById('mc-falling-blocks');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const blockTypes = [
      { top: '#5CA04A', front: '#8B5E3C', side: '#7A5030' },      // Grass
      { top: '#8B5E3C', front: '#7A5030', side: '#6B4525' },      // Dirt
      { top: '#808080', front: '#6E6E6E', side: '#5A5A5A' },      // Stone
      { top: '#6BC5E8', front: '#5BA8CC', side: '#4A90B0' },      // Diamond ore
      { top: '#E8C64A', front: '#D4A832', side: '#BB9025' },      // Gold ore
      { top: '#5A8F3F', front: '#4E7B36', side: '#3F6A2C' },      // Oak leaves
    ];

    const blocks = [];
    const BLOCK_SIZE = 24;

    function spawnBlock() {
      const type = blockTypes[Math.floor(Math.random() * blockTypes.length)];
      blocks.push({
        x: Math.random() * (canvas.width - BLOCK_SIZE),
        y: -BLOCK_SIZE,
        vy: 0.5 + Math.random() * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        size: BLOCK_SIZE * (0.6 + Math.random() * 0.6),
        alpha: 0.3 + Math.random() * 0.4,
        type,
      });
    }

    let lastSpawn = 0;
    function animate(time) {
      if (!document.getElementById('mc-login-overlay')) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new blocks
      if (time - lastSpawn > 400 + Math.random() * 600) {
        spawnBlock();
        lastSpawn = time;
      }

      for (let i = blocks.length - 1; i >= 0; i--) {
        const b = blocks[i];
        b.y += b.vy;
        b.rotation += b.rotSpeed;

        if (b.y > canvas.height + 50) {
          blocks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(b.x + b.size / 2, b.y + b.size / 2);
        ctx.rotate(b.rotation);
        ctx.globalAlpha = b.alpha;

        // Top face
        ctx.fillStyle = b.type.top;
        ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 0.3);

        // Front face
        ctx.fillStyle = b.type.front;
        ctx.fillRect(-b.size / 2, -b.size / 2 + b.size * 0.3, b.size, b.size * 0.7);

        // Side highlight
        ctx.fillStyle = b.type.side;
        ctx.fillRect(-b.size / 2, -b.size / 2, b.size * 0.15, b.size);

        // Border
        ctx.strokeStyle = 'hsla(0, 0%, 0%, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-b.size / 2, -b.size / 2, b.size, b.size);

        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  // ─── Experience Orbs Canvas ───
  function initXPOrbs() {
    const canvas = document.getElementById('mc-xp-orbs');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const orbs = [];
    const ORB_COUNT = 15;

    for (let i = 0; i < ORB_COUNT; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.5 + Math.random() * canvas.height * 0.3,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.3 - Math.random() * 0.5,
        size: 4 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.04 + Math.random() * 0.03,
        hue: 80 + Math.random() * 40, // Green to yellow
      });
    }

    function animate() {
      if (!document.getElementById('mc-login-overlay')) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.pulse += orb.pulseSpeed;

        // Reset when off screen
        if (orb.y < -20 || orb.x < -20 || orb.x > canvas.width + 20) {
          orb.x = Math.random() * canvas.width;
          orb.y = canvas.height * 0.5 + Math.random() * canvas.height * 0.3;
        }

        const pulseFactor = 0.7 + Math.sin(orb.pulse) * 0.3;
        const size = orb.size * pulseFactor;

        // Outer glow
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, size * 3);
        gradient.addColorStop(0, `hsla(${orb.hue}, 100%, 65%, 0.3)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner orb
        ctx.fillStyle = `hsl(${orb.hue}, 100%, 65%)`;
        ctx.beginPath();
        // Pixelated square orb
        ctx.fillRect(orb.x - size / 2, orb.y - size / 2, size, size);

        // Bright center
        ctx.fillStyle = `hsl(${orb.hue}, 100%, 85%)`;
        ctx.fillRect(orb.x - size / 4, orb.y - size / 4, size / 2, size / 2);
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  // ─── Torch Spark Particles ───
  function initTorchSparks() {
    const torchLeft = document.getElementById('mc-torch-left');
    const torchRight = document.getElementById('mc-torch-right');

    function spawnSpark(torch) {
      if (!torch || !document.getElementById('mc-login-overlay')) return;

      const spark = document.createElement('div');
      spark.className = 'mc-spark';
      spark.style.setProperty('--sx', `${(Math.random() - 0.5) * 16}px`);
      spark.style.setProperty('--sy', `${-10 - Math.random() * 20}px`);
      spark.style.left = '50%';
      spark.style.top = '0';

      const flame = torch.querySelector('.mc-torch-flame');
      if (flame) {
        flame.appendChild(spark);
        spark.addEventListener('animationend', () => spark.remove());
      }
    }

    setInterval(() => {
      if (Math.random() > 0.4) spawnSpark(torchLeft);
      if (Math.random() > 0.4) spawnSpark(torchRight);
    }, 250);
  }

  // ─── Login Sound ───
  function playMCClickSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { /* Audio not available */ }
  }

  function playMCLevelUpSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.2);
      });
    } catch (e) { /* Audio not available */ }
  }

  // ─── Login Form Handler ───
  function initLoginForm() {
    const form = document.getElementById('mc-login-form');
    const overlay = document.getElementById('mc-login-overlay');
    const appShell = document.getElementById('app-shell');
    const ambientCanvas = document.getElementById('ambient-particles');
    const xpCanvas = document.getElementById('xp-particles');
    const usernameInput = document.getElementById('mc-username');

    if (!form || !overlay) return;

    // Focus username on load
    setTimeout(() => {
      if (usernameInput) usernameInput.focus();
    }, 1000);

    // Button click sounds
    document.querySelectorAll('.mc-button').forEach(btn => {
      btn.addEventListener('mousedown', playMCClickSound);
    });

    // Input focus animation
    document.querySelectorAll('.mc-input').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
      input.addEventListener('blur', () => {
        input.parentElement.style.transform = '';
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = usernameInput ? usernameInput.value.trim() : 'Adventurer';
      if (!username) return;

      // Play level-up sound
      playMCLevelUpSound();

      // Screen shake
      overlay.classList.add('screen-shake');

      // Update the character name in main app
      const charName = document.getElementById('character-name');
      if (charName) charName.textContent = username;

      // After shake, fade out
      setTimeout(() => {
        overlay.classList.remove('screen-shake');
        overlay.classList.add('fade-out');

        // Show main app
        if (appShell) {
          appShell.style.display = '';
          appShell.style.opacity = '0';
          appShell.style.transition = 'opacity 0.6s ease';
          requestAnimationFrame(() => {
            appShell.style.opacity = '1';
          });
        }

        // Show canvases
        if (ambientCanvas) ambientCanvas.style.opacity = '1';
        if (xpCanvas) xpCanvas.style.opacity = '1';

        // Remove overlay after transition
        setTimeout(() => {
          overlay.remove();
        }, 900);
      }, 500);
    });
  }

  // ─── Init All Login Screen Features ───
  document.addEventListener('DOMContentLoaded', () => {
    generateTerrain();
    generateStars();
    drawSteve();
    drawCreeper();
    initFallingBlocks();
    initXPOrbs();
    initTorchSparks();
    initLoginForm();
  });

  // Handle resize for terrain
  window.addEventListener('resize', () => {
    const grassRow = document.getElementById('mc-grass-row');
    if (grassRow) {
      // Clear and regenerate
      [grassRow,
        document.getElementById('mc-dirt-row-1'),
        document.getElementById('mc-dirt-row-2'),
        document.getElementById('mc-stone-row')
      ].forEach(row => { if (row) row.innerHTML = ''; });
      generateTerrain();
    }
  });
})();
