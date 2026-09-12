/* ═══════════════════════════════════════════════════════════
   LIFE RPG — Complete Application Logic
   Router, State, Dashboard, Screen Time, Timetable, 
   Achievements, Workmate Companion, Particles, Audio
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── State ─── */
  const DEFAULT_STATE = {
    playerName: 'Adventurer',
    level: 14,
    xp: 2480,
    xpToNext: 3000,
    totalXp: 24480,
    health: 450,
    maxHealth: 500,
    gold: 1240,
    diamonds: 85,
    streak: 12,
    tasks: {
      pending: [
        { id: 1, name: 'Go to the Gym', xp: 20, gold: 5, difficulty: 'medium' },
        { id: 2, name: 'Write in Journal', xp: 10, gold: 2, difficulty: 'easy' },
        { id: 3, name: 'Cook a Healthy Meal', xp: 15, gold: 4, difficulty: 'medium' },
      ],
      upcoming: [
        { id: 4, name: 'Read 50 Pages', xp: 25, gold: 8, difficulty: 'hard' },
        { id: 5, name: 'Ship a Feature to Prod', xp: 80, gold: 20, difficulty: 'epic' },
      ],
      completed: [
        { id: 6, name: 'Morning Meditation', xp: 15, gold: 3, difficulty: 'easy' },
        { id: 7, name: 'Read 20 Pages', xp: 10, gold: 2, difficulty: 'easy' },
        { id: 8, name: 'Run 15km Total', xp: 50, gold: 15, difficulty: 'hard' },
        { id: 9, name: 'LeetCode Problem', xp: 30, gold: 10, difficulty: 'hard' },
        { id: 10, name: 'Drink 3L Water', xp: 10, gold: 2, difficulty: 'easy' },
      ]
    },
    routineStats: { sleep: 7, exercise: 6, work: 8, study: 7, social: 5, health: 7 },
    strengths: [
      { name: 'Coding', value: 88 },
      { name: 'Discipline', value: 82 },
      { name: 'Reading', value: 75 },
    ],
    weaknesses: [
      { name: 'Social', value: 35 },
      { name: 'Exercise', value: 42 },
      { name: 'Sleep', value: 48 },
    ],
    screenTime: [
      { name: 'VS Code', icon: '💻', hours: 3.5, category: 'productive', limit: 6 },
      { name: 'YouTube', icon: '📺', hours: 1.2, category: 'unproductive', limit: 1 },
      { name: 'Twitter', icon: '🐦', hours: 0.8, category: 'unproductive', limit: 0.5 },
      { name: 'Books', icon: '📚', hours: 0.5, category: 'productive', limit: 3 },
      { name: 'Music', icon: '🎵', hours: 0.3, category: 'neutral', limit: 2 },
      { name: 'Gaming', icon: '🎮', hours: 0.2, category: 'unproductive', limit: 1 },
    ],
    weeklyScreenTime: [
      { prod: 5.2, unprod: 2.1 },
      { prod: 6.0, unprod: 1.5 },
      { prod: 4.8, unprod: 3.0 },
      { prod: 5.5, unprod: 2.0 },
      { prod: 7.0, unprod: 1.0 },
      { prod: 3.5, unprod: 4.0 },
      { prod: 4.0, unprod: 2.5 },
    ],
    timetable: [
      { day: 0, start: '09:00', end: '12:00', name: 'Deep Work', color: 'green' },
      { day: 0, start: '14:00', end: '15:30', name: 'Study', color: 'blue' },
      { day: 0, start: '17:00', end: '18:00', name: 'Gym', color: 'red' },
      { day: 1, start: '10:00', end: '12:00', name: 'Meetings', color: 'purple' },
      { day: 1, start: '14:00', end: '17:00', name: 'Coding', color: 'green' },
      { day: 2, start: '09:00', end: '11:00', name: 'Deep Work', color: 'green' },
      { day: 2, start: '16:00', end: '17:00', name: 'Running', color: 'red' },
      { day: 3, start: '09:00', end: '13:00', name: 'Project', color: 'green' },
      { day: 3, start: '15:00', end: '16:30', name: 'Reading', color: 'gold' },
      { day: 4, start: '10:00', end: '12:00', name: 'Review', color: 'blue' },
      { day: 4, start: '14:00', end: '16:00', name: 'Side Project', color: 'green' },
    ],
    reminders: [],
    xpHistory: [],
    achievements: [
      { id: 'first-quest', name: 'First Quest', emoji: '⚔️', unlocked: true },
      { id: 'streak-7', name: '7-Day Streak', emoji: '🔥', unlocked: true },
      { id: 'lvl-10', name: 'Level 10', emoji: '⭐', unlocked: true },
      { id: 'early-bird', name: 'Early Bird', emoji: '🌅', unlocked: true },
      { id: 'code-warrior', name: 'Code Warrior', emoji: '⚡', unlocked: true },
      { id: 'bookworm', name: 'Bookworm', emoji: '📖', unlocked: true },
      { id: 'fitness-5', name: 'Fitness Fan', emoji: '💪', unlocked: true },
      { id: 'gold-100', name: 'Gold Hoarder', emoji: '🪙', unlocked: true },
      { id: 'diamond-50', name: 'Diamond Miner', emoji: '💎', unlocked: false },
      { id: 'streak-30', name: '30-Day Streak', emoji: '🏆', unlocked: false },
      { id: 'lvl-20', name: 'Level 20', emoji: '👑', unlocked: false },
      { id: 'all-daily', name: 'Daily Perfect', emoji: '✨', unlocked: false },
      { id: 'pomo-10', name: 'Focus Master', emoji: '🍅', unlocked: false },
      { id: 'marathon', name: 'Marathon Runner', emoji: '🏃', unlocked: false },
      { id: 'social-butterfly', name: 'Social Butterfly', emoji: '🦋', unlocked: false },
      { id: 'night-owl', name: 'Night Owl', emoji: '🦉', unlocked: false },
    ],
    goals: [
      { name: 'Create GitHub profile', desc: 'Set up portfolio', status: 'reached' },
      { name: 'Complete 100 LeetCode', desc: 'Algorithm mastery', status: 'reached' },
      { name: 'Build 3 Side Projects', desc: '2/3 completed', status: 'current' },
      { name: 'Get Level 20', desc: 'Currently Level 14', status: 'future' },
      { name: 'Run a Half Marathon', desc: '21.1 km', status: 'future' },
      { name: 'Launch a SaaS Product', desc: 'Dream big!', status: 'future' },
    ],
    activityLog: [
      { time: '2m ago', text: 'Gained <strong class="log-xp">+15 XP</strong> from Morning Meditation' },
      { time: '15m ago', text: 'Gained <strong class="log-xp">+10 XP</strong> from Read 20 Pages' },
      { time: '1h ago', text: 'Earned badge <strong class="log-badge">⚡ Code Warrior</strong>' },
      { time: '3h ago', text: 'Completed weekly quest <strong class="log-quest">Run 15km Total</strong>' },
    ],
    leaderboard: [
      { name: 'ShadowBlade99', xp: 32500, you: false },
      { name: 'NightCoder', xp: 28900, you: false },
      { name: 'Adventurer', xp: 24480, you: true },
      { name: 'PixelMaster', xp: 21300, you: false },
      { name: 'QuestHunter', xp: 18700, you: false },
    ],
    nextTaskId: 11,
  };

  // Generate XP history
  for (let i = 29; i >= 0; i--) {
    DEFAULT_STATE.xpHistory.push({
      day: i,
      xp: Math.floor(50 + Math.random() * 200),
    });
  }

  let state;
  try {
    const saved = localStorage.getItem('lifeRpgState');
    state = saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : { ...DEFAULT_STATE };
  } catch { state = { ...DEFAULT_STATE }; }

  function saveState() {
    try { localStorage.setItem('lifeRpgState', JSON.stringify(state)); } catch {}
  }

  /* ─── Router ─── */
  const pages = ['dashboard', 'screentime', 'timetable', 'achievements'];

  function navigateTo(page) {
    if (!pages.includes(page)) page = 'dashboard';
    pages.forEach(p => {
      const el = document.getElementById(`page-${p}`);
      const slot = document.getElementById(`slot-${p}`);
      if (el) { el.classList.toggle('active', p === page); }
      if (slot) { slot.classList.toggle('active', p === page); }
    });
    window.location.hash = page;
    playClickSound();
    updateCompanionMessage(page);
  }

  function initRouter() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    navigateTo(hash);
    window.addEventListener('hashchange', () => {
      navigateTo(window.location.hash.replace('#', ''));
    });
    document.querySelectorAll('.hotbar-slot').forEach(slot => {
      slot.addEventListener('click', () => navigateTo(slot.dataset.page));
    });
  }

  /* ─── Sounds ─── */
  function playClickSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }

  function playXPSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.15);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.15);
      });
    } catch {}
  }

  function playLevelUpSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [440, 554, 659, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.2);
      });
    } catch {}
  }

  function playQuestCompleteSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [523, 659, 784, 1046].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.18);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.18);
      });
    } catch {}
  }

  /* ─── Toast Notifications ─── */
  function showToast(icon, message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3500);
  }

  /* ─── Particles ─── */
  function spawnBurstAt(x, y, color = 'hsl(42,85%,58%)') {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'burst-particle';
      const angle = (Math.PI * 2 * i) / 12;
      const dist = 30 + Math.random() * 50;
      p.style.cssText = `left:${x}px;top:${y}px;width:${3+Math.random()*4}px;height:${3+Math.random()*4}px;background:${color};--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;`;
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  function spawnGoldCoins(x, y) {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'gold-coin-particle';
      p.textContent = '🪙';
      p.style.cssText = `left:${x}px;top:${y}px;font-size:${12+Math.random()*8}px;--dx:${(Math.random()-0.5)*80}px;--dy:${-30-Math.random()*50}px;`;
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  /* ─── Ambient Particles ─── */
  function initAmbientParticles() {
    const c = document.getElementById('ambient-particles');
    if (!c) return;
    const ctx = c.getContext('2d');
    const particles = [];
    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.3, vy: -0.1 - Math.random() * 0.3,
        size: 1 + Math.random() * 2, alpha: 0.2 + Math.random() * 0.4,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    (function animate() {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.y < -10) { p.y = c.height + 10; p.x = Math.random() * c.width; }
        if (p.x < -10) p.x = c.width + 10;
        if (p.x > c.width + 10) p.x = -10;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.fillStyle = `hsla(42,70%,65%,${a})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      requestAnimationFrame(animate);
    })();
  }

  /* ─── Profile Customizer & Pixel Avatar Engine ─── */
  function drawPixelAvatar(canvasId, size, customProf) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const px = Math.floor(size / 16);
    function p(x, y, col) { 
      ctx.fillStyle = col; 
      ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px)); 
    }
    ctx.clearRect(0, 0, c.width, c.height);

    const prof = customProf || (state && state.profile) || {
      archetype: 'adventurer',
      skin: '#C49A6C',
      hairStyle: 'spiky',
      hairColor: '#3B2213',
      outfit: 'hoodie',
      outfitColor: '#38B2AC'
    };

    const skin = prof.skin || '#C49A6C';
    const skinDark = adjustColorBrightness(skin, -25);
    const hair = prof.hairColor || '#3B2213';
    const hairDark = adjustColorBrightness(hair, -30);
    const outfit = prof.outfitColor || '#38B2AC';
    const outfitDark = adjustColorBrightness(outfit, -30);
    const pants = '#1E293B';
    const shoes = '#0F172A';

    // 1. Base Body / Torso
    for (let x = 5; x <= 10; x++) {
      for (let y = 8; y <= 12; y++) p(x, y, outfit);
    }
    // Outfit details & shadow
    for (let x = 5; x <= 10; x++) p(x, 12, outfitDark);
    p(5, 8, outfitDark); p(10, 8, outfitDark);

    // Archetype-specific outfit embellishments
    if (prof.outfit === 'armor' || prof.archetype === 'knight') {
      p(6, 9, '#F1F5F9'); p(9, 9, '#F1F5F9'); // Shoulder rivets
      p(7, 10, '#E2E8F0'); p(8, 10, '#E2E8F0'); // Chest plate
      p(7, 11, '#CBD5E1'); p(8, 11, '#CBD5E1');
    } else if (prof.outfit === 'robe' || prof.archetype === 'wizard') {
      for (let y = 13; y <= 14; y++) for (let x = 5; x <= 10; x++) p(x, y, outfit);
      p(7, 8, '#FACC15'); p(8, 8, '#FACC15'); // Gold trim
      p(7, 10, '#FACC15'); p(8, 10, '#FACC15');
    } else if (prof.outfit === 'cybersuit' || prof.archetype === 'robot') {
      p(7, 10, '#38BDF8'); p(8, 10, '#38BDF8'); // Glowing energy core
      p(6, 11, '#0284C7'); p(9, 11, '#0284C7');
    }

    // 2. Legs & Shoes (if not full robe)
    if (prof.outfit !== 'robe' && prof.archetype !== 'wizard') {
      for (let x = 5; x <= 7; x++) { p(x, 13, pants); p(x, 14, shoes); }
      for (let x = 8; x <= 10; x++) { p(x, 13, pants); p(x, 14, shoes); }
    } else {
      p(6, 15, shoes); p(9, 15, shoes);
    }

    // 3. Arms & Hands
    for (let y = 8; y <= 11; y++) { p(4, y, outfit); p(11, y, outfit); }
    p(4, 12, skin); p(11, 12, skin); // Hands

    // 4. Weapons / Accessories (Hands)
    if (prof.archetype === 'adventurer' || prof.archetype === 'knight') {
      // Diamond / Gold Sword in hand
      p(12, 10, '#94A3B8'); p(12, 9, '#38BDF8'); p(12, 8, '#38BDF8'); p(12, 7, '#E0F2FE');
      p(11, 11, '#F59E0B'); p(13, 11, '#F59E0B'); p(12, 12, '#78350F');
    } else if (prof.archetype === 'wizard') {
      // Magic Staff
      p(12, 7, '#C084FC'); p(13, 7, '#F472B6'); // Glowing crystal
      for (let y = 8; y <= 14; y++) p(12, y, '#78350F'); // Staff wood
    } else if (prof.archetype === 'ninja') {
      // Katana sheath on back
      p(3, 7, '#E2E8F0'); p(4, 8, '#334155'); p(5, 9, '#334155');
    }

    // 5. Head & Face (Skin)
    for (let x = 5; x <= 10; x++) {
      for (let y = 3; y <= 7; y++) p(x, y, skin);
    }
    p(4, 5, skin); p(11, 5, skin); // Ears
    for (let x = 5; x <= 10; x++) p(x, 7, skinDark); // Chin shadow

    // 6. Eyes
    if (prof.archetype === 'robot') {
      // Glowing Cyan Visor / LEDs
      p(6, 5, '#38BDF8'); p(7, 5, '#E0F2FE');
      p(8, 5, '#38BDF8'); p(9, 5, '#E0F2FE');
    } else if (prof.hairStyle === 'ninja' || prof.archetype === 'ninja') {
      p(6, 5, '#1E293B'); p(7, 5, '#F8FAFC');
      p(8, 5, '#1E293B'); p(9, 5, '#F8FAFC');
      // Ninja mask covering mouth
      for (let x = 5; x <= 10; x++) p(x, 6, '#0F172A');
      for (let x = 5; x <= 10; x++) p(x, 7, '#0F172A');
    } else {
      p(6, 5, '#FFFFFF'); p(7, 5, '#1E293B');
      p(9, 5, '#FFFFFF'); p(8, 5, '#1E293B');
      p(7, 6, '#9A6B43'); p(8, 6, '#9A6B43'); // Nose
    }

    // 7. Hair & Headgear
    const style = prof.hairStyle || 'spiky';

    if (style === 'spiky') {
      for (let x = 4; x <= 11; x++) p(x, 2, hair);
      for (let x = 5; x <= 10; x++) p(x, 1, hair);
      p(3, 1, hair); p(6, 0, hair); p(9, 0, hair); p(12, 1, hair); // Spikes
      p(4, 3, hair); p(11, 3, hair); // Sideburns
      p(5, 3, hairDark); p(10, 3, hairDark);
    } else if (style === 'long') {
      for (let x = 4; x <= 11; x++) p(x, 2, hair);
      for (let x = 5; x <= 10; x++) p(x, 1, hair);
      for (let y = 3; y <= 9; y++) { p(4, y, hair); p(11, y, hair); }
      p(5, 3, hair); p(10, 3, hair);
    } else if (style === 'helmet' || prof.archetype === 'knight') {
      // Knight Helmet
      for (let x = 4; x <= 11; x++) p(x, 2, '#94A3B8');
      for (let x = 5; x <= 10; x++) p(x, 1, '#94A3B8');
      p(7, 0, '#EF4444'); p(8, 0, '#EF4444'); // Red Plume Crest
      p(4, 3, '#64748B'); p(11, 3, '#64748B');
      p(4, 4, '#64748B'); p(11, 4, '#64748B');
      for (let x = 5; x <= 10; x++) p(x, 4, '#334155'); // Visor Slit
    } else if (style === 'wizard' || prof.archetype === 'wizard') {
      // Pointed Wizard Hat
      for (let x = 3; x <= 12; x++) p(x, 2, '#4C1D95'); // Brim
      for (let x = 5; x <= 10; x++) p(x, 1, '#5B21B6');
      p(6, 0, '#6D28D9'); p(7, 0, '#6D28D9'); p(8, 0, '#6D28D9');
      p(7, 0, '#FACC15'); // Star buckle
    } else if (style === 'cyber' || prof.archetype === 'robot') {
      // Cybernetic Visor & Antennas
      for (let x = 5; x <= 10; x++) p(x, 2, '#334155');
      p(3, 2, '#06B6D4'); p(12, 2, '#06B6D4'); // Headset lights
      for (let x = 5; x <= 10; x++) p(x, 4, '#06B6D4'); // Neon Visor
    } else if (style === 'ninja') {
      // Ninja Headband
      for (let x = 4; x <= 11; x++) p(x, 2, '#0F172A');
      p(7, 2, '#E2E8F0'); p(8, 2, '#E2E8F0'); // Metal Forehead Plate
      p(12, 3, '#0F172A'); p(13, 4, '#0F172A'); // Headband Tails
    }
  }

  function adjustColorBrightness(col, percent) {
    if (!col || !col.startsWith('#')) return col || '#C49A6C';
    let num = parseInt(col.slice(1), 16);
    if (isNaN(num)) return col;
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00FF) + percent;
    let b = (num & 0x0000FF) + percent;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  /* ─── Workmate Fox (Dashboard Card) ─── */
  function drawWorkmateFox(canvasId) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const px = 4;
    function p(x, y, col) { ctx.fillStyle = col; ctx.fillRect(x * px, y * px, px, px); }
    ctx.clearRect(0, 0, c.width, c.height);
    const orange = '#E8783A', dark = '#B5562A', cream = '#F5D0A9', nose = '#1A1A1A';
    // Ears
    p(2,0,orange); p(3,0,orange); p(8,0,orange); p(9,0,orange);
    p(2,1,orange); p(3,1,dark); p(8,1,dark); p(9,1,orange);
    // Head
    for (let x = 3; x <= 8; x++) { p(x,2,orange); p(x,3,orange); }
    p(2,2,orange); p(9,2,orange); p(2,3,orange); p(9,3,orange);
    // Face
    for (let x = 4; x <= 7; x++) p(x,4,cream);
    p(3,4,orange); p(8,4,orange);
    // Eyes & nose
    p(4,3,'#fff'); p(5,3,nose); p(6,3,'#fff'); p(7,3,nose);
    p(5,4,nose); p(6,4,nose);
    // Body
    for (let x = 3; x <= 8; x++) { p(x,5,orange); p(x,6,orange); p(x,7,cream); }
    // Paws
    for (let x = 3; x <= 5; x++) p(x,8,dark);
    for (let x = 6; x <= 8; x++) p(x,8,dark);
    // Tail
    p(9,6,orange); p(10,5,orange); p(10,6,dark); p(11,4,orange);
  }

  /* ═══════════════════════════════════════════════════════════════
     BIG CARTOON ROBOT COMPANION (Persistent, Bottom-Left)
     ═══════════════════════════════════════════════════════════════ */
  let robotFrame = 0;
  let robotBlinkTimer = 0;

  function drawCompanion() {
    const c = document.getElementById('companion-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const px = 7; // Large pixel scale for 112x112 canvas (16x16 grid)
    function p(x, y, col) { 
      ctx.fillStyle = col; 
      ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px)); 
    }
    ctx.clearRect(0, 0, c.width, c.height);

    robotFrame++;
    robotBlinkTimer++;
    const isBlinking = (robotBlinkTimer % 90 > 82); // Blinks every ~3 seconds
    const beaconPulse = Math.sin(robotFrame * 0.1) > 0;
    const thrusterFlameColor = robotFrame % 4 < 2 ? '#38BDF8' : '#67E8F9';

    // 1. Antenna Beacon & Radar Waves
    p(7, 2, '#64748B'); p(8, 2, '#64748B'); // Antenna pole
    p(7, 1, '#94A3B8'); p(8, 1, '#94A3B8');
    const beaconColor = beaconPulse ? '#EF4444' : '#F87171';
    p(7, 0, beaconColor); p(8, 0, beaconColor);
    if (beaconPulse) {
      p(5, 0, 'rgba(239, 68, 68, 0.4)'); p(10, 0, 'rgba(239, 68, 68, 0.4)'); // Signal waves
    }

    // 2. Ear Bolts
    p(2, 5, '#475569'); p(3, 5, '#94A3B8'); p(2, 6, '#475569'); p(3, 6, '#94A3B8');
    p(12, 5, '#94A3B8'); p(13, 5, '#475569'); p(12, 6, '#94A3B8'); p(13, 6, '#475569');
    p(2, 5, '#06B6D4'); p(13, 5, '#06B6D4'); // Glowing ear LEDs

    // 3. Head Chassis (Chrome Metallic)
    for (let x = 4; x <= 11; x++) {
      for (let y = 3; y <= 8; y++) p(x, y, '#94A3B8');
    }
    // Head highlights & shadows
    for (let x = 5; x <= 10; x++) p(x, 3, '#CBD5E1');
    p(4, 3, '#CBD5E1'); p(4, 4, '#CBD5E1');
    for (let x = 4; x <= 11; x++) p(x, 8, '#64748B');

    // 4. Dark Visor Screen (Faceplate)
    for (let x = 5; x <= 10; x++) {
      for (let y = 4; y <= 7; y++) p(x, y, '#0F172A');
    }

    // 5. Glowing Digital Cyan Eyes (Blinking Animation)
    if (!isBlinking) {
      // Big friendly LED eyes
      p(6, 5, '#22D3EE'); p(6, 6, '#06B6D4'); p(6, 4, '#A5F3FC');
      p(9, 5, '#22D3EE'); p(9, 6, '#06B6D4'); p(9, 4, '#A5F3FC');
      // Eye pupils
      p(7, 5, '#0891B2'); p(8, 5, '#0891B2');
      // Cute digital smile
      p(7, 7, '#22D3EE'); p(8, 7, '#22D3EE');
    } else {
      // Blinking horizontal squint line
      p(6, 5, '#22D3EE'); p(7, 5, '#22D3EE');
      p(8, 5, '#22D3EE'); p(9, 5, '#22D3EE');
    }

    // 6. Neck Joint
    p(7, 9, '#334155'); p(8, 9, '#334155');

    // 7. Torso Chassis
    for (let x = 4; x <= 11; x++) {
      for (let y = 10; y <= 13; y++) p(x, y, '#64748B');
    }
    for (let x = 5; x <= 10; x++) p(x, 10, '#94A3B8'); // Chest top highlight
    for (let x = 4; x <= 11; x++) p(x, 13, '#475569'); // Bottom shadow

    // 8. Chest Gauge / Battery Heart
    p(7, 11, '#22C55E'); p(8, 11, '#22C55E'); // Green power reactor
    p(7, 12, '#16A34A'); p(8, 12, '#16A34A');
    p(5, 11, '#F59E0B'); p(10, 11, '#3B82F6'); // Status LED buttons

    // 9. Mechanical Arms (Right arm waving!)
    // Left arm (resting)
    p(3, 10, '#94A3B8'); p(2, 11, '#64748B'); p(2, 12, '#CBD5E1');
    // Right arm (waving upwards)
    const waveUp = Math.sin(robotFrame * 0.15) > 0;
    if (waveUp) {
      p(12, 10, '#94A3B8'); p(13, 9, '#64748B'); p(13, 8, '#CBD5E1'); p(14, 7, '#38BDF8'); // Waving hand
    } else {
      p(12, 10, '#94A3B8'); p(13, 10, '#64748B'); p(13, 11, '#CBD5E1'); p(14, 11, '#38BDF8');
    }

    // 10. Plasma Hover Thruster Nozzle & Flame Jet
    p(6, 14, '#334155'); p(7, 14, '#475569'); p(8, 14, '#475569'); p(9, 14, '#334155');
    // Plasma Flame Jet
    p(6, 15, thrusterFlameColor); p(7, 15, '#F0FDFA'); p(8, 15, '#F0FDFA'); p(9, 15, thrusterFlameColor);
  }

  // Persistent Animation loop for Robot Companion
  setInterval(() => {
    drawCompanion();
  }, 100);

  const companionMessages = {
    dashboard: [
      "You have {pending} pending quests! Let's crush them! 💪",
      "Your streak is at {streak} days! Keep going! 🔥",
      "You earned {xp} XP today. Aim for more! ⚔️",
      "Tip: Complete your hardest quest first! 🎯",
      "I believe in you, {name}! Let's level up! 🌟",
    ],
    screentime: [
      "You've been coding for {coding}h today! Great focus! 💻",
      "Watch your YouTube time — it's at {youtube}h! 📺",
      "Productive hours: {prod}h vs Unproductive: {unprod}h",
      "Try a digital detox for 30 minutes! 🧘",
    ],
    timetable: [
      "Ready to start a focused work session? 🍅",
      "Don't forget to take breaks! Your brain needs rest. 🧠",
      "Use the stopwatch to track your deep work! ⏱️",
      "Set reminders so you never miss a task! 🔔",
    ],
    achievements: [
      "You've unlocked {unlocked} out of {total} achievements! 🏆",
      "{diamonds} diamonds collected! Keep mining! 💎",
      "Level {level} — you're making amazing progress! ⭐",
      "Next milestone: {nextGoal}! Almost there! 🗺️",
    ],
  };

  function updateCompanionMessage(page) {
    const bubble = document.getElementById('companion-bubble');
    const textEl = document.getElementById('companion-text');
    if (!bubble || !textEl) return;

    const messages = companionMessages[page] || companionMessages.dashboard;
    let msg = messages[Math.floor(Math.random() * messages.length)];

    // Replace placeholders
    const prodHours = state.screenTime.filter(a => a.category === 'productive').reduce((s, a) => s + a.hours, 0);
    const unprodHours = state.screenTime.filter(a => a.category === 'unproductive').reduce((s, a) => s + a.hours, 0);
    const codingEntry = state.screenTime.find(a => a.name === 'VS Code');
    const youtubeEntry = state.screenTime.find(a => a.name === 'YouTube');
    const unlockedCount = state.achievements.filter(a => a.unlocked).length;
    const currentGoal = state.goals.find(g => g.status === 'current');

    msg = msg
      .replace('{pending}', state.tasks.pending.length)
      .replace('{streak}', state.streak)
      .replace('{xp}', state.xp)
      .replace('{name}', state.playerName)
      .replace('{coding}', codingEntry ? codingEntry.hours : '0')
      .replace('{youtube}', youtubeEntry ? youtubeEntry.hours : '0')
      .replace('{prod}', prodHours.toFixed(1))
      .replace('{unprod}', unprodHours.toFixed(1))
      .replace('{unlocked}', unlockedCount)
      .replace('{total}', state.achievements.length)
      .replace('{diamonds}', state.diamonds)
      .replace('{level}', state.level)
      .replace('{nextGoal}', currentGoal ? currentGoal.name : 'Unknown');

    // Typing effect
    bubble.style.display = '';
    textEl.textContent = '';
    let i = 0;
    const cursor = document.getElementById('workmate-cursor');
    if (cursor) cursor.style.display = '';
    const interval = setInterval(() => {
      if (i < msg.length) {
        textEl.textContent += msg[i]; i++;
      } else {
        clearInterval(interval);
        if (cursor) setTimeout(() => { cursor.style.display = 'none'; }, 1000);
      }
    }, 30);
  }

  // Dashboard workmate also types
  function updateDashWorkmate(page) {
    const textEl = document.getElementById('workmate-text');
    const cursor = document.getElementById('workmate-cursor');
    if (!textEl) return;
    const messages = companionMessages[page || 'dashboard'];
    let msg = messages[Math.floor(Math.random() * messages.length)];
    msg = msg
      .replace('{pending}', state.tasks.pending.length)
      .replace('{streak}', state.streak)
      .replace('{xp}', state.xp)
      .replace('{name}', state.playerName);
    textEl.textContent = '';
    let i = 0;
    if (cursor) cursor.style.display = '';
    const interval = setInterval(() => {
      if (i < msg.length) { textEl.textContent += msg[i]; i++; }
      else { clearInterval(interval); if (cursor) setTimeout(() => { cursor.style.display = 'none'; }, 1000); }
    }, 35);
  }

  /* ─── Dashboard ─── */
  function renderDashboard() {
    // XP
    const xpFill = document.getElementById('xp-bar-fill');
    if (xpFill) xpFill.style.width = `${(state.xp / state.xpToNext) * 100}%`;
    const xpDisp = document.getElementById('xp-display');
    if (xpDisp) xpDisp.textContent = `${state.xp.toLocaleString()} / ${state.xpToNext.toLocaleString()} XP`;
    const healthDisp = document.getElementById('health-display');
    if (healthDisp) healthDisp.textContent = `${state.health}/${state.maxHealth}`;
    const goldDisp = document.getElementById('gold-display');
    if (goldDisp) goldDisp.textContent = state.gold.toLocaleString();
    const diamondDisp = document.getElementById('diamond-display');
    if (diamondDisp) diamondDisp.textContent = state.diamonds;
    const levelBadge = document.getElementById('level-badge');
    if (levelBadge) levelBadge.textContent = `LVL ${state.level}`;
    const avLevelBadge = document.getElementById('avatar-level-badge');
    if (avLevelBadge) avLevelBadge.textContent = state.level;
    const charName = document.getElementById('character-name');
    if (charName) charName.textContent = state.playerName;

    // Date
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      const now = new Date();
      dateEl.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // Tasks
    renderTasks('pending');
    renderTasks('upcoming');
    renderTasks('completed');
    updateTabCounts();

    // Radar
    drawRadarChart();
    // Strength/Weakness
    renderStrengthWeakness();
    // Activity Log
    renderActivityLog();
    // Workmate message
    updateDashWorkmate('dashboard');
  }

  function renderTasks(type) {
    const list = document.getElementById(`${type}-list`);
    if (!list) return;
    list.innerHTML = '';
    const tasks = state.tasks[type] || [];
    if (tasks.length === 0) {
      list.innerHTML = `<li style="text-align:center;color:var(--text-muted);padding:20px;font-size:.75rem;">No quests here</li>`;
      return;
    }
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `quest-item ${type === 'completed' ? 'completed' : ''}`;
      li.dataset.id = task.id;
      const isCompleted = type === 'completed';
      li.innerHTML = `
        <button class="quest-checkbox ${isCompleted ? 'checked' : ''}" ${isCompleted ? 'disabled' : ''}>✓</button>
        <div class="quest-content">
          <span class="quest-name">${task.name}</span>
          <div class="quest-rewards">
            <span class="reward xp-reward">+${task.xp} XP</span>
            <span class="reward gold-reward">+${task.gold} Gold</span>
          </div>
        </div>
        <span class="quest-difficulty ${task.difficulty}">${task.difficulty}</span>
      `;
      if (!isCompleted) {
        const cb = li.querySelector('.quest-checkbox');
        cb.addEventListener('click', (e) => completeTask(task.id, type, e));
      }
      list.appendChild(li);
    });
  }

  function completeTask(id, fromType, event) {
    const task = state.tasks[fromType].find(t => t.id === id);
    if (!task) return;
    // Remove from current list
    state.tasks[fromType] = state.tasks[fromType].filter(t => t.id !== id);
    // Add to completed
    state.tasks.completed.unshift(task);
    // Update XP
    state.xp += task.xp;
    state.totalXp += task.xp;
    state.gold += task.gold;
    if (state.xp >= state.xpToNext) {
      state.level++;
      state.xp -= state.xpToNext;
      state.xpToNext = Math.floor(state.xpToNext * 1.15);
      showToast('⭐', `Level Up! You are now Level ${state.level}!`);
    }
    // XP popup
    const popup = document.getElementById('xp-gain-popup');
    if (popup) {
      popup.textContent = `+${task.xp} XP`;
      popup.classList.add('visible');
      setTimeout(() => popup.classList.remove('visible'), 2000);
    }
    // Effects
    playXPSound();
    if (event) {
      const rect = event.target.getBoundingClientRect();
      spawnBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
      spawnGoldCoins(rect.left + rect.width / 2, rect.top);
    }
    // Add to activity log
    state.activityLog.unshift({
      time: 'Just now',
      text: `Gained <strong class="log-xp">+${task.xp} XP</strong> from ${task.name}`,
    });
    showToast('⚔️', `Quest Complete: ${task.name}`);
    saveState();
    renderDashboard();
  }

  function updateTabCounts() {
    const pc = document.getElementById('pending-count');
    const uc = document.getElementById('upcoming-count');
    const cc = document.getElementById('completed-count');
    if (pc) pc.textContent = state.tasks.pending.length;
    if (uc) uc.textContent = state.tasks.upcoming.length;
    if (cc) cc.textContent = state.tasks.completed.length;
  }

  function renderActivityLog() {
    const list = document.getElementById('activity-log');
    if (!list) return;
    list.innerHTML = '';
    state.activityLog.slice(0, 8).forEach(entry => {
      const li = document.createElement('li');
      li.className = 'log-entry';
      li.innerHTML = `<span class="log-time">${entry.time}</span><span class="log-text">${entry.text}</span>`;
      list.appendChild(li);
    });
  }

  /* ─── Radar Chart ─── */
  function drawRadarChart() {
    const c = document.getElementById('radar-chart');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    const cx = c.width / 2, cy = c.height / 2, r = 100;
    const labels = ['Sleep', 'Exercise', 'Work', 'Study', 'Social', 'Health'];
    const values = [state.routineStats.sleep, state.routineStats.exercise, state.routineStats.work,
                    state.routineStats.study, state.routineStats.social, state.routineStats.health];
    const n = labels.length;

    // Grid
    for (let ring = 1; ring <= 5; ring++) {
      const rr = (ring / 5) * r;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + Math.cos(angle) * rr;
        const y = cy + Math.sin(angle) * rr;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'hsla(225,15%,30%,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.strokeStyle = 'hsla(225,15%,30%,0.2)';
      ctx.stroke();
      // Label
      const lx = cx + Math.cos(angle) * (r + 18);
      const ly = cy + Math.sin(angle) * (r + 18);
      ctx.fillStyle = 'hsl(225,15%,65%)';
      ctx.font = '9px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], lx, ly);
    }

    // Data polygon
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
      const val = (values[idx] / 10) * r;
      const x = cx + Math.cos(angle) * val;
      const y = cy + Math.sin(angle) * val;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'hsla(42,85%,58%,0.15)';
    ctx.fill();
    ctx.strokeStyle = 'hsl(42,85%,58%)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data dots
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const val = (values[i] / 10) * r;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * val, cy + Math.sin(angle) * val, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(42,85%,58%)';
      ctx.fill();
    }
  }

  /* ─── Strength/Weakness ─── */
  function renderStrengthWeakness() {
    const strBars = document.getElementById('strength-bars');
    const weakBars = document.getElementById('weakness-bars');
    if (!strBars || !weakBars) return;
    strBars.innerHTML = '';
    weakBars.innerHTML = '';
    state.strengths.forEach(s => {
      strBars.innerHTML += `<div class="sw-bar-item"><span class="sw-bar-label">${s.name} (${s.value}%)</span><div class="sw-bar-track"><div class="sw-bar-fill str-fill" style="width:${s.value}%"></div></div></div>`;
    });
    state.weaknesses.forEach(w => {
      weakBars.innerHTML += `<div class="sw-bar-item"><span class="sw-bar-label">${w.name} (${w.value}%)</span><div class="sw-bar-track"><div class="sw-bar-fill weak-fill" style="width:${w.value}%"></div></div></div>`;
    });
  }

  /* ─── Screen Time Page ─── */
  function renderScreenTime() {
    // Today's bars
    const barsEl = document.getElementById('st-bars');
    if (barsEl) {
      const maxH = Math.max(...state.screenTime.map(a => a.hours));
      barsEl.innerHTML = '';
      state.screenTime.forEach(app => {
        const pct = maxH > 0 ? (app.hours / maxH) * 100 : 0;
        barsEl.innerHTML += `
          <div class="st-bar-item">
            <span class="st-bar-icon">${app.icon}</span>
            <div class="st-bar-info"><span class="st-bar-name">${app.name}</span><span class="st-bar-time">${app.hours}h</span></div>
            <div class="st-bar-track"><div class="st-bar-fill ${app.category}" style="width:${pct}%"></div></div>
          </div>`;
      });
    }

    // Total
    const totalEl = document.getElementById('st-total-hours');
    if (totalEl) {
      const total = state.screenTime.reduce((s, a) => s + a.hours, 0);
      totalEl.textContent = `${total.toFixed(1)}h`;
    }

    // Weekly chart
    drawWeeklyChart();

    // Categories
    const catGrid = document.getElementById('cat-grid');
    if (catGrid) {
      const cats = { productive: { icon: '🟢', hours: 0 }, neutral: { icon: '🔵', hours: 0 }, unproductive: { icon: '🔴', hours: 0 } };
      state.screenTime.forEach(a => { if (cats[a.category]) cats[a.category].hours += a.hours; });
      catGrid.innerHTML = '';
      Object.entries(cats).forEach(([key, val]) => {
        catGrid.innerHTML += `<div class="cat-card cat-${key}"><span class="cat-icon">${val.icon}</span><span class="cat-name">${key.charAt(0).toUpperCase() + key.slice(1)}</span><span class="cat-time">${val.hours.toFixed(1)}h</span></div>`;
      });
    }

    // Limits
    const limitEl = document.getElementById('limit-list');
    if (limitEl) {
      limitEl.innerHTML = '';
      state.screenTime.forEach(app => {
        const pct = Math.min((app.hours / app.limit) * 100, 100);
        const over = app.hours > app.limit;
        const cls = pct > 80 ? 'danger' : pct > 50 ? 'warning' : 'safe';
        limitEl.innerHTML += `
          <div class="limit-item ${over ? 'over-limit' : ''}">
            <span class="limit-icon">${app.icon}</span>
            <div class="limit-info"><span class="limit-name">${app.name}</span><span class="limit-progress">${app.hours}h / ${app.limit}h</span></div>
            <div class="limit-bar"><div class="limit-bar-fill ${cls}" style="width:${pct}%"></div></div>
            ${over ? '<span style="font-size:.7rem;">⚠️</span>' : ''}
          </div>`;
      });
    }
  }

  function drawWeeklyChart() {
    const c = document.getElementById('weekly-chart');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    const data = state.weeklyScreenTime;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const pad = { l: 40, r: 20, t: 20, b: 30 };
    const w = c.width - pad.l - pad.r;
    const h = c.height - pad.t - pad.b;
    const maxV = 10;

    // Grid
    for (let i = 0; i <= 5; i++) {
      const y = pad.t + (i / 5) * h;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(c.width - pad.r, y);
      ctx.strokeStyle = 'hsla(225,15%,25%,0.3)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = 'hsl(225,15%,50%)'; ctx.font = '8px "Press Start 2P"'; ctx.textAlign = 'right';
      ctx.fillText(`${maxV - (i / 5) * maxV}h`, pad.l - 6, y + 3);
    }

    // Day labels
    ctx.textAlign = 'center'; ctx.fillStyle = 'hsl(225,15%,55%)';
    days.forEach((d, i) => {
      ctx.fillText(d, pad.l + (i / (days.length - 1)) * w, c.height - 8);
    });

    // Lines
    function drawLine(key, color) {
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = pad.l + (i / (data.length - 1)) * w;
        const y = pad.t + (1 - d[key] / maxV) * h;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
      // Dots
      data.forEach((d, i) => {
        const x = pad.l + (i / (data.length - 1)) * w;
        const y = pad.t + (1 - d[key] / maxV) * h;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
      });
    }
    drawLine('prod', 'hsl(145,55%,48%)');
    drawLine('unprod', 'hsl(0,60%,55%)');
  }

  /* ─── Timetable Page ─── */
  function renderTimetable() {
    // Time labels
    const labels = document.getElementById('tt-time-labels');
    const grid = document.getElementById('tt-day-grid');
    if (!labels || !grid) return;

    labels.innerHTML = '';
    for (let h = 6; h <= 22; h++) {
      labels.innerHTML += `<div class="tt-time-label">${String(h).padStart(2, '0')}:00</div>`;
    }

    grid.innerHTML = '';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Headers
    days.forEach(d => {
      grid.innerHTML += `<div class="tt-day-header">${d}</div>`;
    });

    // Day columns
    days.forEach((_, di) => {
      const col = document.createElement('div');
      col.className = 'tt-day-col';
      for (let h = 6; h <= 22; h++) {
        col.innerHTML += `<div class="tt-hour-line"></div>`;
      }
      // Add blocks for this day
      const blocks = state.timetable.filter(b => b.day === di);
      blocks.forEach(block => {
        const startH = parseInt(block.start.split(':')[0]);
        const startM = parseInt(block.start.split(':')[1]) || 0;
        const endH = parseInt(block.end.split(':')[0]);
        const endM = parseInt(block.end.split(':')[1]) || 0;
        const topPx = ((startH - 6) + startM / 60) * 40;
        const heightPx = ((endH - startH) + (endM - startM) / 60) * 40;
        const blockEl = document.createElement('div');
        blockEl.className = `tt-block ${block.color}`;
        blockEl.style.top = `${28 + topPx}px`;
        blockEl.style.height = `${Math.max(heightPx, 20)}px`;
        blockEl.textContent = block.name;
        col.appendChild(blockEl);
      });
      grid.appendChild(col);
    });
  }

  /* ─── Stopwatch ─── */
  let swInterval = null, swStart = 0, swElapsed = 0, swRunning = false, swLaps = [];

  function initStopwatch() {
    const startBtn = document.getElementById('sw-start-btn');
    const lapBtn = document.getElementById('sw-lap-btn');
    const resetBtn = document.getElementById('sw-reset-btn');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
      if (!swRunning) {
        swRunning = true;
        swStart = Date.now() - swElapsed;
        swInterval = setInterval(updateSwDisplay, 10);
        startBtn.textContent = '⏸ Pause';
        startBtn.className = 'btn-pixel btn-yellow';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
      } else {
        swRunning = false;
        clearInterval(swInterval);
        swElapsed = Date.now() - swStart;
        startBtn.textContent = '▶ Start';
        startBtn.className = 'btn-pixel btn-green';
      }
      playClickSound();
    });

    lapBtn.addEventListener('click', () => {
      if (!swRunning) return;
      swLaps.push(swElapsed ? Date.now() - swStart : 0);
      renderLaps();
      playClickSound();
    });

    resetBtn.addEventListener('click', () => {
      swRunning = false;
      clearInterval(swInterval);
      swElapsed = 0;
      swLaps = [];
      updateSwDisplay();
      renderLaps();
      startBtn.textContent = '▶ Start';
      startBtn.className = 'btn-pixel btn-green';
      lapBtn.disabled = true;
      resetBtn.disabled = true;
      playClickSound();
    });
  }

  function updateSwDisplay() {
    const elapsed = swRunning ? Date.now() - swStart : swElapsed;
    const h = Math.floor(elapsed / 3600000);
    const m = Math.floor((elapsed % 3600000) / 60000);
    const s = Math.floor((elapsed % 60000) / 1000);
    const ms = Math.floor((elapsed % 1000) / 10);
    const timeEl = document.getElementById('sw-time');
    const msEl = document.getElementById('sw-ms');
    if (timeEl) timeEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (msEl) msEl.textContent = `.${String(ms).padStart(2, '0')}`;
  }

  function renderLaps() {
    const container = document.getElementById('sw-laps');
    if (!container) return;
    container.innerHTML = '';
    swLaps.forEach((t, i) => {
      const m = Math.floor(t / 60000);
      const s = Math.floor((t % 60000) / 1000);
      const ms = Math.floor((t % 1000) / 10);
      container.innerHTML += `<div class="sw-lap"><span class="sw-lap-num">Lap ${i + 1}</span><span class="sw-lap-time">${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms).padStart(2,'0')}</span></div>`;
    });
  }

  /* ─── Pomodoro Timer ─── */
  let pomoInterval = null, pomoEnd = 0, pomoRunning = false, pomoIsWork = true, pomoSession = 1;

  function initPomodoro() {
    const startBtn = document.getElementById('pomo-start-btn');
    const skipBtn = document.getElementById('pomo-skip-btn');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
      if (!pomoRunning) {
        const workMin = parseInt(document.getElementById('pomo-work-min')?.value) || 25;
        const breakMin = parseInt(document.getElementById('pomo-break-min')?.value) || 5;
        const duration = pomoIsWork ? workMin * 60000 : breakMin * 60000;
        pomoEnd = Date.now() + duration;
        pomoRunning = true;
        pomoInterval = setInterval(updatePomoDisplay, 100);
        startBtn.textContent = '⏸ Pause';
        startBtn.className = 'btn-pixel btn-yellow';
      } else {
        pomoRunning = false;
        clearInterval(pomoInterval);
        startBtn.textContent = '▶ Start';
        startBtn.className = 'btn-pixel btn-green';
      }
      playClickSound();
    });

    skipBtn.addEventListener('click', () => {
      switchPomoMode();
      playClickSound();
    });

    drawPomoRing(1);
    updatePomoModeDisplay();
  }

  function updatePomoDisplay() {
    const remaining = Math.max(0, pomoEnd - Date.now());
    if (remaining <= 0) {
      clearInterval(pomoInterval);
      pomoRunning = false;
      showToast(pomoIsWork ? '🍅' : '☕', pomoIsWork ? 'Work session complete! Take a break.' : 'Break over! Let\'s focus.');
      switchPomoMode();
      return;
    }
    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    const timeEl = document.getElementById('pomo-time');
    if (timeEl) timeEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    const workMin = parseInt(document.getElementById('pomo-work-min')?.value) || 25;
    const breakMin = parseInt(document.getElementById('pomo-break-min')?.value) || 5;
    const total = (pomoIsWork ? workMin : breakMin) * 60000;
    const progress = 1 - remaining / total;
    drawPomoRing(1 - progress);
  }

  function switchPomoMode() {
    clearInterval(pomoInterval);
    pomoRunning = false;
    if (pomoIsWork) {
      pomoIsWork = false;
    } else {
      pomoIsWork = true;
      pomoSession++;
      if (pomoSession > 4) pomoSession = 1;
    }
    updatePomoModeDisplay();
    const startBtn = document.getElementById('pomo-start-btn');
    if (startBtn) { startBtn.textContent = '▶ Start'; startBtn.className = 'btn-pixel btn-green'; }
    drawPomoRing(1);
  }

  function updatePomoModeDisplay() {
    const modeEl = document.getElementById('pomo-mode');
    const sessionEl = document.getElementById('pomo-session');
    const timeEl = document.getElementById('pomo-time');
    if (modeEl) {
      modeEl.textContent = pomoIsWork ? 'WORK' : 'BREAK';
      modeEl.className = `pomo-mode ${pomoIsWork ? '' : 'break-mode'}`;
    }
    if (sessionEl) sessionEl.textContent = `Session ${pomoSession}/4`;
    if (timeEl) {
      const min = pomoIsWork ? (parseInt(document.getElementById('pomo-work-min')?.value) || 25) : (parseInt(document.getElementById('pomo-break-min')?.value) || 5);
      timeEl.textContent = `${String(min).padStart(2, '0')}:00`;
    }
  }

  function drawPomoRing(progress) {
    const c = document.getElementById('pomo-ring');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    const cx = c.width / 2, cy = c.height / 2, r = 80, lw = 8;
    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsla(225,15%,22%,0.5)';
    ctx.lineWidth = lw;
    ctx.stroke();
    // Progress ring
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + progress * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = pomoIsWork ? 'hsl(145,55%,48%)' : 'hsl(210,55%,60%)';
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  /* ─── Reminders ─── */
  function initReminders() {
    const btn = document.getElementById('reminder-btn');
    const panel = document.getElementById('reminder-panel');
    const addBtn = document.getElementById('reminder-add-btn');
    const form = document.getElementById('reminder-form');
    const saveBtn = document.getElementById('reminder-save-btn');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? '' : 'none';
      playClickSound();
    });

    addBtn?.addEventListener('click', () => {
      form.style.display = form.style.display === 'none' ? '' : 'none';
    });

    saveBtn?.addEventListener('click', () => {
      const text = document.getElementById('reminder-text')?.value;
      const time = document.getElementById('reminder-time')?.value;
      if (!text || !time) return;
      state.reminders.push({ text, time, id: Date.now() });
      saveState();
      renderReminders();
      form.style.display = 'none';
      document.getElementById('reminder-text').value = '';
      showToast('🔔', `Reminder set for ${time}`);
      playClickSound();
    });

    // Close panel on outside click
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !btn.contains(e.target)) {
        panel.style.display = 'none';
      }
    });

    renderReminders();
    // Check reminders every minute
    setInterval(checkReminders, 30000);
  }

  function renderReminders() {
    const list = document.getElementById('reminder-list');
    const empty = document.getElementById('reminder-empty');
    const badge = document.getElementById('reminder-badge');
    if (!list) return;
    list.innerHTML = '';
    if (state.reminders.length === 0) {
      if (empty) empty.style.display = '';
      if (badge) badge.style.display = 'none';
      return;
    }
    if (empty) empty.style.display = 'none';
    if (badge) { badge.style.display = ''; badge.textContent = state.reminders.length; }
    state.reminders.forEach(r => {
      const li = document.createElement('li');
      li.className = 'reminder-item';
      li.innerHTML = `<span class="ri-time">${r.time}</span><span class="ri-text">${r.text}</span><button class="ri-del" data-id="${r.id}">✕</button>`;
      li.querySelector('.ri-del').addEventListener('click', () => {
        state.reminders = state.reminders.filter(rem => rem.id !== r.id);
        saveState();
        renderReminders();
        playClickSound();
      });
      list.appendChild(li);
    });
  }

  function checkReminders() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const toFire = state.reminders.filter(r => r.time === currentTime);
    toFire.forEach(r => {
      showToast('🔔', `Reminder: ${r.text}`);
      // Try browser notification
      if (Notification.permission === 'granted') {
        new Notification('Life RPG Reminder', { body: r.text, icon: '🔔' });
      }
    });
    if (toFire.length > 0) {
      state.reminders = state.reminders.filter(r => r.time !== currentTime);
      saveState();
      renderReminders();
    }
  }

  /* ─── Achievements Page ─── */
  function renderAchievements() {
    // Level ring
    const progress = state.xp / state.xpToNext;
    drawLevelRing(progress);
    const levelNum = document.getElementById('level-num');
    if (levelNum) levelNum.textContent = state.level;
    const totalXpEl = document.getElementById('total-xp');
    if (totalXpEl) totalXpEl.textContent = state.totalXp.toLocaleString();
    const xpToNextEl = document.getElementById('xp-to-next');
    if (xpToNextEl) xpToNextEl.textContent = (state.xpToNext - state.xp).toLocaleString();

    // Diamonds
    const dCount = document.getElementById('diamond-count');
    if (dCount) dCount.textContent = state.diamonds;

    // XP Timeline
    drawXPTimeline();

    // Achievements
    const badgeGrid = document.getElementById('badge-grid');
    if (badgeGrid) {
      badgeGrid.innerHTML = '';
      state.achievements.forEach(a => {
        badgeGrid.innerHTML += `
          <div class="badge-item ${a.unlocked ? 'unlocked' : 'locked'}" title="${a.name}">
            <span class="badge-emoji">${a.emoji}</span>
            <span class="badge-name">${a.name}</span>
          </div>`;
      });
    }
    const achText = document.getElementById('ach-progress-text');
    if (achText) achText.textContent = `${state.achievements.filter(a => a.unlocked).length} / ${state.achievements.length}`;

    // Goals
    renderGoals();

    // Leaderboard
    renderLeaderboard();
  }

  function drawLevelRing(progress) {
    const c = document.getElementById('level-ring');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    const cx = c.width / 2, cy = c.height / 2, r = 70, lw = 10;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsla(225,15%,22%,0.5)'; ctx.lineWidth = lw; ctx.stroke();
    const start = -Math.PI / 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, start, start + progress * Math.PI * 2);
    const grad = ctx.createLinearGradient(0, 0, c.width, c.height);
    grad.addColorStop(0, 'hsl(42,85%,50%)'); grad.addColorStop(1, 'hsl(42,90%,70%)');
    ctx.strokeStyle = grad; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.stroke();
  }

  function drawXPTimeline() {
    const c = document.getElementById('xp-timeline-chart');
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    const data = state.xpHistory;
    const pad = { l: 40, r: 20, t: 20, b: 30 };
    const w = c.width - pad.l - pad.r;
    const h = c.height - pad.t - pad.b;
    const maxXP = Math.max(...data.map(d => d.xp));

    // Grid
    ctx.strokeStyle = 'hsla(225,15%,25%,0.2)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * h;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(c.width - pad.r, y); ctx.stroke();
    }

    // Step graph
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t + h);
    data.forEach((d, i) => {
      const x = pad.l + (i / (data.length - 1)) * w;
      const y = pad.t + (1 - d.xp / maxXP) * h;
      ctx.lineTo(x, y);
      if (i < data.length - 1) {
        const nx = pad.l + ((i + 1) / (data.length - 1)) * w;
        ctx.lineTo(nx, y);
      }
    });
    // Fill
    const lastX = pad.l + w;
    const lastY = pad.t + (1 - data[data.length - 1].xp / maxXP) * h;
    ctx.lineTo(lastX, lastY);
    ctx.lineTo(lastX, pad.t + h);
    ctx.closePath();
    ctx.fillStyle = 'hsla(42,85%,58%,0.1)';
    ctx.fill();
    // Stroke
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = pad.l + (i / (data.length - 1)) * w;
      const y = pad.t + (1 - d.xp / maxXP) * h;
      if (i === 0) ctx.moveTo(x, y);
      else {
        const px = pad.l + ((i - 1) / (data.length - 1)) * w;
        ctx.lineTo(x, ctx.canvas.__prevY || y);
        ctx.lineTo(x, y);
      }
      ctx.canvas.__prevY = y;
    });
    ctx.strokeStyle = 'hsl(42,85%,58%)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Day labels
    ctx.fillStyle = 'hsl(225,15%,50%)';
    ctx.font = '7px "Press Start 2P"';
    ctx.textAlign = 'center';
    [0, 7, 14, 21, 29].forEach(i => {
      if (i < data.length) {
        ctx.fillText(`-${data[i].day}d`, pad.l + (i / (data.length - 1)) * w, c.height - 8);
      }
    });
  }

  function renderGoals() {
    const container = document.getElementById('goal-path');
    if (!container) return;
    container.innerHTML = '';
    state.goals.forEach(g => {
      container.innerHTML += `
        <div class="goal-stone ${g.status}">
          <div class="goal-dot"></div>
          <div class="goal-info">
            <span class="goal-name">${g.name}</span>
            <span class="goal-desc">${g.desc}</span>
          </div>
        </div>`;
    });
  }

  function renderLeaderboard() {
    const list = document.getElementById('lb-list');
    if (!list) return;
    // Update "you" entry with current XP
    state.leaderboard.forEach(e => { if (e.you) e.xp = state.totalXp; });
    state.leaderboard.sort((a, b) => b.xp - a.xp);
    list.innerHTML = '';
    state.leaderboard.forEach((entry, i) => {
      const rankCls = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
      list.innerHTML += `
        <div class="lb-item ${entry.you ? 'lb-you' : ''}">
          <span class="lb-rank ${rankCls}">#${i + 1}</span>
          <span class="lb-name">${entry.name}${entry.you ? ' (You)' : ''}</span>
          <span class="lb-xp">${entry.xp.toLocaleString()} XP</span>
        </div>`;
    });
  }

  /* ─── Modals ─── */
  function initModals() {
    // Add Task Modal
    const taskModal = document.getElementById('task-modal');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskSaveBtn = document.getElementById('task-save-btn');
    const taskCancelBtn = document.getElementById('task-cancel-btn');

    addTaskBtn?.addEventListener('click', () => { taskModal.style.display = ''; playClickSound(); });
    taskCancelBtn?.addEventListener('click', () => { taskModal.style.display = 'none'; playClickSound(); });
    taskSaveBtn?.addEventListener('click', () => {
      const name = document.getElementById('task-name-input')?.value.trim();
      if (!name) return;
      const category = document.getElementById('task-category')?.value || 'pending';
      const diff = document.getElementById('task-difficulty')?.value || 'easy';
      const xpMap = { easy: 10, medium: 20, hard: 40, epic: 80 };
      const goldMap = { easy: 2, medium: 5, hard: 12, epic: 25 };
      state.tasks[category].push({
        id: state.nextTaskId++,
        name, xp: xpMap[diff], gold: goldMap[diff], difficulty: diff,
      });
      saveState();
      renderDashboard();
      taskModal.style.display = 'none';
      document.getElementById('task-name-input').value = '';
      showToast('⚔️', `New quest added: ${name}`);
      playClickSound();
    });

    // Add Activity Modal
    const actModal = document.getElementById('activity-modal');
    const addActBtn = document.getElementById('add-activity-btn');
    const actSaveBtn = document.getElementById('activity-save-btn');
    const actCancelBtn = document.getElementById('activity-cancel-btn');

    addActBtn?.addEventListener('click', () => { actModal.style.display = ''; playClickSound(); });
    actCancelBtn?.addEventListener('click', () => { actModal.style.display = 'none'; playClickSound(); });
    actSaveBtn?.addEventListener('click', () => {
      const name = document.getElementById('activity-name-input')?.value.trim();
      const hours = parseFloat(document.getElementById('activity-hours')?.value) || 0;
      const category = document.getElementById('activity-category')?.value || 'neutral';
      if (!name || hours <= 0) return;
      const icons = { productive: '💼', neutral: '📋', unproductive: '📺' };
      state.screenTime.push({ name, icon: icons[category], hours, category, limit: 3 });
      saveState();
      renderScreenTime();
      actModal.style.display = 'none';
      document.getElementById('activity-name-input').value = '';
      showToast('📱', `Activity logged: ${name} (${hours}h)`);
      playClickSound();
    });

    // Add Block Modal
    const blockModal = document.getElementById('block-modal');
    const addBlockBtn = document.getElementById('add-block-btn');
    const blockSaveBtn = document.getElementById('block-save-btn');
    const blockCancelBtn = document.getElementById('block-cancel-btn');

    addBlockBtn?.addEventListener('click', () => { blockModal.style.display = ''; playClickSound(); });
    blockCancelBtn?.addEventListener('click', () => { blockModal.style.display = 'none'; playClickSound(); });
    blockSaveBtn?.addEventListener('click', () => {
      const name = document.getElementById('block-name-input')?.value.trim();
      const day = parseInt(document.getElementById('block-day')?.value);
      const color = document.getElementById('block-color')?.value || 'green';
      const start = document.getElementById('block-start')?.value;
      const end = document.getElementById('block-end')?.value;
      if (!name || !start || !end) return;
      state.timetable.push({ day, start, end, name, color });
      saveState();
      renderTimetable();
      blockModal.style.display = 'none';
      document.getElementById('block-name-input').value = '';
      showToast('📅', `Block added: ${name}`);
      playClickSound();
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.style.display = 'none';
          playClickSound();
        }
      });
    });
  }

  /* ─── Tab Switching ─── */
  function initTabs() {
    document.querySelectorAll('.todo-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.todo-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.todo-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById(`todo-${tab.dataset.tab}`);
        if (panel) panel.classList.add('active');
        playClickSound();
      });
    });
  }

  /* ─── Companion Click & Robot Interactions ─── */
  function initCompanion() {
    const sprite = document.getElementById('companion-sprite');
    const bubble = document.getElementById('companion-bubble');
    const textEl = document.getElementById('companion-text');
    const closeBtn = document.getElementById('companion-close-btn');
    const adviceBtn = document.getElementById('comp-advice-btn');
    const cheerBtn = document.getElementById('comp-cheer-btn');
    const jokeBtn = document.getElementById('comp-joke-btn');

    if (sprite) {
      sprite.addEventListener('click', () => {
        if (bubble) bubble.style.display = 'flex';
        const page = window.location.hash.replace('#', '') || 'dashboard';
        updateCompanionMessage(page);
        playClickSound();
      });
    }

    if (closeBtn && bubble) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bubble.style.display = 'none';
        playClickSound();
      });
    }

    const adviceList = [
      "💡 Pro Tip: Tackle your Epic quest first thing in the morning when your focus mana is at 100%!",
      "💡 Strategy: Use the 25-minute Pomodoro timer in the Timetable tab to eliminate distractions!",
      "💡 Health Buff: Drink a glass of water every 60 minutes for +10 Stamina!",
      "💡 Daily Quests: Consistency is key. Even 1 completed quest keeps your streak alive!"
    ];
    const cheerList = [
      "🎉 Let's go {name}! You have what it takes to conquer today's goals! 🔥",
      "⚡ Level {level} hero in the house! The realm is proud of your relentless progress!",
      "⭐ Keep forging ahead! Every completed task is another step toward greatness!"
    ];
    const jokeList = [
      "😄 Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "🤖 A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
      "😄 Why did the developer go broke? Because they used up all their cache! 💰"
    ];

    function setBubbleText(msg) {
      if (!bubble || !textEl) return;
      bubble.style.display = 'flex';
      const formatted = msg
        .replace('{name}', (state.profile && state.profile.name) || state.playerName || 'Adventurer')
        .replace('{level}', state.level);
      textEl.textContent = formatted;
      playClickSound();
    }

    if (adviceBtn) adviceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setBubbleText(adviceList[Math.floor(Math.random() * adviceList.length)]);
    });

    if (cheerBtn) cheerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setBubbleText(cheerList[Math.floor(Math.random() * cheerList.length)]);
      playLevelUpSound();
    });

    if (jokeBtn) jokeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setBubbleText(jokeList[Math.floor(Math.random() * jokeList.length)]);
    });

    const talkBtn = document.getElementById('workmate-talk-btn');
    if (talkBtn) {
      talkBtn.addEventListener('click', () => {
        updateDashWorkmate('dashboard');
        playClickSound();
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     HERO PROFILE & AVATAR STUDIO CONTROLLER
     ═══════════════════════════════════════════════════════════════ */
  function initProfileStudio() {
    const profileBtn = document.getElementById('profile-btn');
    const avatarContainer = document.getElementById('avatar-container');
    const modal = document.getElementById('profile-modal');
    const closeBtn = document.getElementById('profile-modal-close-btn');
    const cancelBtn = document.getElementById('profile-cancel-btn');
    const saveBtn = document.getElementById('profile-save-btn');
    const randomizeBtn = document.getElementById('avatar-randomize-btn');

    const nameInput = document.getElementById('profile-name-input');
    const titleInput = document.getElementById('profile-title-input');
    const mottoInput = document.getElementById('profile-motto-input');
    const prevName = document.getElementById('preview-hero-name');
    const prevTitle = document.getElementById('preview-hero-title');
    const prevLevel = document.getElementById('preview-level-badge');

    // Local clone for live preview
    let tempProf = {
      name: (state.profile && state.profile.name) || state.playerName || 'Adventurer',
      title: (state.profile && state.profile.title) || 'ADVENTURING DEVELOPER',
      archetype: (state.profile && state.profile.archetype) || 'adventurer',
      skin: (state.profile && state.profile.skin) || '#C49A6C',
      hairStyle: (state.profile && state.profile.hairStyle) || 'spiky',
      hairColor: (state.profile && state.profile.hairColor) || '#3B2213',
      outfit: (state.profile && state.profile.outfit) || 'hoodie',
      outfitColor: (state.profile && state.profile.outfitColor) || '#38B2AC',
      motto: (state.profile && state.profile.motto) || 'Leveling up real life, one quest at a time!'
    };

    function refreshPreview() {
      drawPixelAvatar('profile-preview-canvas', 128, tempProf);
      if (prevName) prevName.textContent = tempProf.name || 'Adventurer';
      if (prevTitle) prevTitle.textContent = tempProf.title || 'ADVENTURING DEVELOPER';
      if (prevLevel) prevLevel.textContent = `LVL ${state.level || 14}`;
    }

    function syncUIFromTemp() {
      if (nameInput) nameInput.value = tempProf.name;
      if (titleInput) titleInput.value = tempProf.title;
      if (mottoInput) mottoInput.value = tempProf.motto;

      // Archetype buttons
      document.querySelectorAll('.archetype-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.archetype === tempProf.archetype);
      });

      // Skin chips
      document.querySelectorAll('#skin-palette .color-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.color === tempProf.skin);
      });

      // Hair style
      document.querySelectorAll('#hair-styles .toggle-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.style === tempProf.hairStyle);
      });

      // Hair color
      document.querySelectorAll('#hair-palette .color-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.color === tempProf.hairColor);
      });

      // Outfit style
      document.querySelectorAll('#outfit-styles .toggle-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.style === tempProf.outfit);
      });

      // Outfit color
      document.querySelectorAll('#outfit-palette .color-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.color === tempProf.outfitColor);
      });

      refreshPreview();
    }

    function openModal() {
      if (!modal) return;
      tempProf = {
        name: (state.profile && state.profile.name) || state.playerName || 'Adventurer',
        title: (state.profile && state.profile.title) || 'ADVENTURING DEVELOPER',
        archetype: (state.profile && state.profile.archetype) || 'adventurer',
        skin: (state.profile && state.profile.skin) || '#C49A6C',
        hairStyle: (state.profile && state.profile.hairStyle) || 'spiky',
        hairColor: (state.profile && state.profile.hairColor) || '#3B2213',
        outfit: (state.profile && state.profile.outfit) || 'hoodie',
        outfitColor: (state.profile && state.profile.outfitColor) || '#38B2AC',
        motto: (state.profile && state.profile.motto) || 'Leveling up real life, one quest at a time!'
      };
      syncUIFromTemp();
      modal.style.display = 'flex';
      playClickSound();
    }

    function closeModal() {
      if (modal) modal.style.display = 'none';
      playClickSound();
    }

    if (profileBtn) profileBtn.addEventListener('click', openModal);
    if (avatarContainer) avatarContainer.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Archetype selection
    document.querySelectorAll('.archetype-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tempProf.archetype = btn.dataset.archetype;
        // Apply sensible theme presets per archetype
        if (btn.dataset.archetype === 'wizard') {
          tempProf.hairStyle = 'wizard';
          tempProf.outfit = 'robe';
          tempProf.outfitColor = '#8B5CF6';
        } else if (btn.dataset.archetype === 'knight') {
          tempProf.hairStyle = 'helmet';
          tempProf.outfit = 'armor';
          tempProf.outfitColor = '#3B82F6';
        } else if (btn.dataset.archetype === 'robot') {
          tempProf.skin = '#38BDF8';
          tempProf.hairStyle = 'cyber';
          tempProf.outfit = 'cybersuit';
        } else if (btn.dataset.archetype === 'ninja') {
          tempProf.hairStyle = 'ninja';
          tempProf.outfit = 'tunic';
          tempProf.outfitColor = '#1E293B';
        }
        syncUIFromTemp();
        playClickSound();
      });
    });

    // Skin selection
    document.querySelectorAll('#skin-palette .color-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        tempProf.skin = chip.dataset.color;
        syncUIFromTemp();
        playClickSound();
      });
    });

    // Hair Style selection
    document.querySelectorAll('#hair-styles .toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tempProf.hairStyle = btn.dataset.style;
        syncUIFromTemp();
        playClickSound();
      });
    });

    // Hair Color selection
    document.querySelectorAll('#hair-palette .color-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        tempProf.hairColor = chip.dataset.color;
        syncUIFromTemp();
        playClickSound();
      });
    });

    // Outfit Style selection
    document.querySelectorAll('#outfit-styles .toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tempProf.outfit = btn.dataset.style;
        syncUIFromTemp();
        playClickSound();
      });
    });

    // Outfit Color selection
    document.querySelectorAll('#outfit-palette .color-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        tempProf.outfitColor = chip.dataset.color;
        syncUIFromTemp();
        playClickSound();
      });
    });

    // Text inputs
    if (nameInput) nameInput.addEventListener('input', () => {
      tempProf.name = nameInput.value.trim() || 'Adventurer';
      refreshPreview();
    });
    if (titleInput) titleInput.addEventListener('change', () => {
      tempProf.title = titleInput.value;
      refreshPreview();
    });
    if (mottoInput) mottoInput.addEventListener('input', () => {
      tempProf.motto = mottoInput.value.trim();
    });

    // Randomize Hero
    if (randomizeBtn) {
      randomizeBtn.addEventListener('click', () => {
        const archetypes = ['adventurer', 'wizard', 'robot', 'ninja', 'knight', 'ranger'];
        const skins = ['#F5D0A9', '#C49A6C', '#8D5524', '#4A2E18', '#38BDF8', '#A855F7'];
        const hairStyles = ['spiky', 'long', 'ninja', 'helmet', 'wizard', 'cyber'];
        const hairColors = ['#3B2213', '#FACC15', '#E11D48', '#06B6D4', '#8B5CF6', '#E2E8F0'];
        const outfits = ['hoodie', 'armor', 'robe', 'cybersuit', 'tunic'];
        const outfitColors = ['#38B2AC', '#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#1E293B'];

        tempProf.archetype = archetypes[Math.floor(Math.random() * archetypes.length)];
        tempProf.skin = skins[Math.floor(Math.random() * skins.length)];
        tempProf.hairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
        tempProf.hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
        tempProf.outfit = outfits[Math.floor(Math.random() * outfits.length)];
        tempProf.outfitColor = outfitColors[Math.floor(Math.random() * outfitColors.length)];

        syncUIFromTemp();
        playLevelUpSound();
      });
    }

    // Save Profile
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        state.profile = { ...tempProf };
        state.playerName = tempProf.name;
        localStorage.setItem('life_rpg_player_name', tempProf.name);
        saveState();

        // Update all UI elements
        const headerName = document.getElementById('header-player-name');
        if (headerName) headerName.textContent = tempProf.name;
        const charName = document.getElementById('character-name');
        if (charName) charName.textContent = tempProf.name;
        const classNameEl = document.querySelector('.class-name');
        if (classNameEl) classNameEl.textContent = tempProf.title;

        // Redraw all avatar canvases
        drawPixelAvatar('pixel-avatar', 48, state.profile);
        drawPixelAvatar('pixel-avatar-large', 80, state.profile);

        closeModal();
        playLevelUpSound();
        spawnCelebrationParticles(window.innerWidth / 2, window.innerHeight / 2);
        showToast('🛡️', `Hero Profile for "${tempProf.name}" saved!`);

        // Companion dialogue reaction
        const bubble = document.getElementById('companion-bubble');
        const textEl = document.getElementById('companion-text');
        if (bubble && textEl) {
          bubble.style.display = 'flex';
          textEl.textContent = `Behold! ${tempProf.name}, the ${tempProf.title}! Your new avatar looks legendary! ⚡`;
        }
      });
    }
  }

  /* ─── Notification Permission ─── */
  function requestNotifPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     AI QUESTMASTER CONTROLLER & DATABASE INSERTION LOGIC
     ═══════════════════════════════════════════════════════════════ */
  let currentGeneratedQuests = [];
  let currentObjective = "";

  function initAIQuestmaster() {
    const textarea = document.getElementById('qm-objective-input');
    const summonBtn = document.getElementById('qm-summon-btn');
    const loadingEl = document.getElementById('qm-loading');
    const resultsEl = document.getElementById('qm-results');
    const summaryEl = document.getElementById('qm-results-summary');
    const cardsContainer = document.getElementById('qm-quest-cards');
    const acceptAllBtn = document.getElementById('qm-accept-all-btn');
    const statusText = document.getElementById('qm-loading-status');
    const fillBar = document.getElementById('qm-loading-fill');
    const settingsBtn = document.getElementById('qm-settings-btn');
    const keyModal = document.getElementById('qm-key-modal');
    const keyInput = document.getElementById('qm-api-key-input');
    const keySaveBtn = document.getElementById('qm-key-save-btn');
    const keyCancelBtn = document.getElementById('qm-key-cancel-btn');
    const openQmScrollBtn = document.getElementById('open-qm-scroll-btn');

    // Preset Prompt Chips
    document.querySelectorAll('.qm-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (textarea) {
          textarea.value = chip.dataset.prompt;
          textarea.focus();
          playClickSound();
        }
      });
    });

    // Scroll to QM button from Quest Board
    if (openQmScrollBtn) {
      openQmScrollBtn.addEventListener('click', () => {
        const qmCard = document.getElementById('dash-questmaster');
        if (qmCard) {
          qmCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (textarea) textarea.focus();
          playClickSound();
        }
      });
    }

    // Settings Modal
    if (settingsBtn && keyModal) {
      if (keyInput) keyInput.value = localStorage.getItem('life_rpg_gemini_key') || '';
      settingsBtn.addEventListener('click', () => {
        keyModal.style.display = 'flex';
        playClickSound();
      });
    }
    if (keySaveBtn && keyModal) {
      keySaveBtn.addEventListener('click', () => {
        if (keyInput) {
          const val = keyInput.value.trim();
          if (val) localStorage.setItem('life_rpg_gemini_key', val);
          else localStorage.removeItem('life_rpg_gemini_key');
        }
        keyModal.style.display = 'none';
        showToast('🔮', 'Gemini Oracle configuration saved!');
        playClickSound();
      });
    }
    if (keyCancelBtn && keyModal) {
      keyCancelBtn.addEventListener('click', () => {
        keyModal.style.display = 'none';
        playClickSound();
      });
    }

    // Sparkle particle animation on loading canvas
    let sparkleAnimId = null;
    function startSparkleCanvas() {
      const canvas = document.getElementById('qm-sparkle-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const particles = Array.from({ length: 25 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        color: ['#c084fc', '#f472b6', '#facc15', '#60a5fa'][Math.floor(Math.random() * 4)],
        alpha: Math.random()
      }));

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha += (Math.random() - 0.5) * 0.05;
          if (p.alpha < 0.1) p.alpha = 0.1;
          if (p.alpha > 1) p.alpha = 1;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        });
        sparkleAnimId = requestAnimationFrame(animate);
      }
      animate();
    }

    function stopSparkleCanvas() {
      if (sparkleAnimId) cancelAnimationFrame(sparkleAnimId);
    }

    // Summon Button Click
    if (summonBtn) {
      summonBtn.addEventListener('click', async () => {
        const objective = textarea ? textarea.value.trim() : '';
        if (!objective) {
          showToast('⚠️', 'Please speak your objective first!');
          if (textarea) textarea.focus();
          return;
        }

        currentObjective = objective;
        playLevelUpSound();

        // UI Loading State
        summonBtn.disabled = true;
        summonBtn.style.opacity = '0.6';
        if (resultsEl) resultsEl.style.display = 'none';
        if (loadingEl) loadingEl.style.display = 'flex';
        startSparkleCanvas();

        const stages = [
          { text: "🔮 Channeling the Gemini Oracle...", progress: 25 },
          { text: "📜 Decomposing objective into heroic milestones...", progress: 55 },
          { text: "⚡ Calculating XP & Gold rewards...", progress: 85 },
          { text: "✨ Forging quest scrolls...", progress: 100 }
        ];

        let stageIdx = 0;
        const progressInterval = setInterval(() => {
          if (stageIdx < stages.length) {
            if (statusText) statusText.textContent = stages[stageIdx].text;
            if (fillBar) fillBar.style.width = stages[stageIdx].progress + '%';
            stageIdx++;
          }
        }, 500);

        try {
          const userKey = localStorage.getItem('life_rpg_gemini_key') || '';
          const response = await fetch('/api/questmaster/summon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Gemini-Key': userKey
            },
            body: JSON.stringify({
              objective: objective,
              apiKey: userKey
            })
          });

          const data = await response.json();
          clearInterval(progressInterval);

          if (data.error) {
            throw new Error(data.error);
          }

          currentGeneratedQuests = data.quests || [];

          // Render Results
          renderGeneratedQuests(data);
          playQuestCompleteSound();
          showToast('✨', `Summoned ${currentGeneratedQuests.length} new quests from the Oracle!`);

          // Workmate commentary
          if (typeof setWorkmateMessage === 'function') {
            setWorkmateMessage(`By the ancient runes! The Questmaster crafted ${currentGeneratedQuests.length} heroic trials for "${objective.slice(0, 30)}..."!`);
          }

        } catch (err) {
          console.error('Questmaster error:', err);
          clearInterval(progressInterval);
          showToast('⚠️', 'Oracle connection lost. Please try again.');
        } finally {
          stopSparkleCanvas();
          summonBtn.disabled = false;
          summonBtn.style.opacity = '1';
          if (loadingEl) loadingEl.style.display = 'none';
        }
      });
    }

    // Render Generated Quests Preview
    function renderGeneratedQuests(data) {
      if (!resultsEl || !cardsContainer) return;
      resultsEl.style.display = 'block';

      if (summaryEl) {
        summaryEl.textContent = data.summary || `Objective: "${data.objective}"`;
      }

      cardsContainer.innerHTML = '';
      (data.quests || []).forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'qm-quest-card';
        card.innerHTML = `
          <div class="qm-quest-card-top">
            <div>
              <div class="qm-quest-title">${escapeHtml(q.title)}</div>
              <div class="qm-quest-desc">${escapeHtml(q.description)}</div>
            </div>
            <button class="btn-single-add" data-index="${idx}" title="Add this sub-quest only">+ Add</button>
          </div>
          <div class="qm-quest-meta">
            <span class="qm-pill qm-pill-diff-${(q.difficulty || 'medium').toLowerCase()}">${q.difficulty || 'Medium'}</span>
            <span class="qm-pill qm-pill-xp">✨ +${q.xp_reward || 20} XP</span>
            <span class="qm-pill qm-pill-gold">💰 +${q.gold_reward || 10} Gold</span>
            <span class="qm-pill qm-pill-cat">${q.category === 'upcoming' ? '📅 Upcoming' : '⏳ Pending'}</span>
          </div>
        `;

        // Single Add Button
        const singleBtn = card.querySelector('.btn-single-add');
        if (singleBtn) {
          singleBtn.addEventListener('click', () => {
            saveSingleQuestToDatabase(q, data.objective || currentObjective);
            card.style.opacity = '0.5';
            singleBtn.textContent = '✓ Added';
            singleBtn.disabled = true;
          });
        }

        cardsContainer.appendChild(card);
      });
    }

    // Accept All Quests Button (Runs Database Insertion Logic)
    if (acceptAllBtn) {
      acceptAllBtn.addEventListener('click', async () => {
        if (!currentGeneratedQuests.length) return;
        await saveAllGeneratedQuestsToDatabase(currentGeneratedQuests, currentObjective);
      });
    }
  }

  /* ─── Database Insertion Logic (Single & Batch) ─── */
  async function saveAllGeneratedQuestsToDatabase(quests, objective) {
    try {
      // 1. Send to Backend Database API (SQLite)
      const res = await fetch('/api/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective: objective,
          quests: quests,
          userId: 'player_1'
        })
      });

      const dbResult = await res.json();
      console.log('📦 Database insertion result:', dbResult);

      // 2. Synchronize with Client-Side State
      quests.forEach(q => {
        const newQuest = {
          id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          title: q.title,
          category: q.category || 'pending',
          difficulty: (q.difficulty || 'medium').toLowerCase(),
          xp: q.xp_reward || 20,
          gold: q.gold_reward || 10,
          completed: false,
          created: new Date().toISOString()
        };

        if (newQuest.category === 'upcoming') {
          STATE.quests.upcoming.push(newQuest);
        } else {
          STATE.quests.pending.push(newQuest);
        }
      });

      saveState();
      renderQuests();

      // 3. Log Activity & Celebration
      addActivity(`🧙‍♂️ AI Questmaster forged ${quests.length} sub-quests for "${objective.slice(0, 24)}..."`, 'xp');
      showToast('⚔️', `${quests.length} quests added to your Quest Log!`);
      spawnCelebrationParticles(window.innerWidth / 2, window.innerHeight / 2);
      playLevelUpSound();

      // 4. Reset AI results view
      const resultsEl = document.getElementById('qm-results');
      if (resultsEl) resultsEl.style.display = 'none';
      const textarea = document.getElementById('qm-objective-input');
      if (textarea) textarea.value = '';
      currentGeneratedQuests = [];

    } catch (err) {
      console.error('Database insertion error:', err);
      showToast('⚠️', 'Error saving quests to database.');
    }
  }

  async function saveSingleQuestToDatabase(q, objective) {
    try {
      await fetch('/api/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective: objective,
          quests: [q],
          userId: 'player_1'
        })
      });

      const newQuest = {
        id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        title: q.title,
        category: q.category || 'pending',
        difficulty: (q.difficulty || 'medium').toLowerCase(),
        xp: q.xp_reward || 20,
        gold: q.gold_reward || 10,
        completed: false,
        created: new Date().toISOString()
      };

      if (newQuest.category === 'upcoming') {
        STATE.quests.upcoming.push(newQuest);
      } else {
        STATE.quests.pending.push(newQuest);
      }

      saveState();
      renderQuests();
      addActivity(`⚔️ Quest added: "${q.title}"`, 'quest');
      showToast('⚔️', `"${q.title}" added to Quest Log!`);
      playClickSound();

    } catch (err) {
      console.error('Single quest DB save error:', err);
    }
  }

  function spawnCelebrationParticles(x, y) {
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 / 24) * i + (Math.random() * 0.2);
      const dist = Math.random() * 90 + 40;
      const dx = Math.cos(angle) * dist + 'px';
      const dy = Math.sin(angle) * dist + 'px';

      const p = document.createElement('div');
      p.className = 'burst-particle';
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);
      p.style.background = ['#c084fc', '#facc15', '#f472b6', '#38bdf8'][Math.floor(Math.random() * 4)];
      p.style.width = (Math.random() * 7 + 4) + 'px';
      p.style.height = p.style.width;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ─── Init Everything ─── */
  document.addEventListener('DOMContentLoaded', () => {
    // Ensure profile is loaded
    if (!state.profile) {
      state.profile = {
        name: localStorage.getItem('life_rpg_player_name') || state.playerName || 'Adventurer',
        title: 'ADVENTURING DEVELOPER',
        archetype: 'adventurer',
        skin: '#C49A6C',
        hairStyle: 'spiky',
        hairColor: '#3B2213',
        outfit: 'hoodie',
        outfitColor: '#38B2AC',
        motto: 'Leveling up real life, one quest at a time!'
      };
    }
    const headerName = document.getElementById('header-player-name');
    if (headerName) headerName.textContent = state.profile.name || state.playerName || 'Adventurer';

    // Draw avatars
    drawPixelAvatar('pixel-avatar', 48, state.profile);
    drawPixelAvatar('pixel-avatar-large', 80, state.profile);
    drawWorkmateFox('workmate-avatar');
    drawCompanion();

    // Init all systems
    initRouter();
    initTabs();
    initModals();
    initStopwatch();
    initPomodoro();
    initReminders();
    initCompanion();
    initProfileStudio();
    initAIQuestmaster();
    initAmbientParticles();
    requestNotifPermission();

    // Render all pages
    renderDashboard();
    renderScreenTime();
    renderTimetable();
    renderAchievements();
  });
})();

