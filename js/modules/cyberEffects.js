/* ============================================================
   PMT GUNNY MASTER — Cyber Effects, Dynamic Particles, Theme & Audio
   ============================================================ */

import { save, load, showToast } from './utils.js';

let isSoundEnabled = load('pmt_sound_enabled', true);
let activeTheme = load('pmt_theme', 'cyan');

export function initCyberEffects() {
  initCyberParticles();
  initCardSpotlight();
  initThemeSwitcher();
  initSoundToggle();
}

/**
 * 1. Theme Switcher System
 */
function initThemeSwitcher() {
  const themeDots = document.querySelectorAll('.btn-theme-dot');

  function applyTheme(theme) {
    activeTheme = theme;
    save('pmt_theme', theme);
    if (theme === 'cyan') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = theme;
    }

    themeDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.theme === theme);
    });
  }

  applyTheme(activeTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      applyTheme(dot.dataset.theme);
      playCyberClickSound();
      showToast(`🎨 Đã chuyển giao diện: ${dot.title}`);
    });
  });
}

/**
 * 2. Sound Effects Toggle
 */
function initSoundToggle() {
  const btnToggle = document.getElementById('btnToggleSound');
  const soundIcon = document.getElementById('soundIcon');

  function updateSoundUI() {
    if (soundIcon) {
      soundIcon.textContent = isSoundEnabled ? '🔊' : '🔇';
    }
  }

  updateSoundUI();

  btnToggle?.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    save('pmt_sound_enabled', isSoundEnabled);
    updateSoundUI();
    if (isSoundEnabled) playCyberClickSound();
    showToast(isSoundEnabled ? '🔊 Đã bật âm thanh hiệu ứng' : '🔇 Đã tắt âm thanh');
  });
}

/**
 * 3. Subtle 60fps Cyberpunk Background Dust / Constellation Particles
 */
function initCyberParticles() {
  const canvas = document.getElementById('bgParticlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(45, Math.floor((width * height) / 30000));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 0.6,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(255, 215, 0, ',
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist / 110) * 0.12})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw and move particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/**
 * 4. Mouse Spotlight Card Border Glow
 */
function initCardSpotlight() {
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.glass-card, .fashion-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 5. Sci-Fi UI Click Sound Generator (Web Audio API)
 */
let audioCtx = null;
export function playCyberClickSound() {
  if (!isSoundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (_) {}
}
