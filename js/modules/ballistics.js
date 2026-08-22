/* ============================================================
   PMT GUNNY MASTER — Ballistics Module (Interactive & Super Smart)
   Includes Real-Time Radar Simulator, Multi-Formula Comparison,
   Height Differentials, Quick Presets & Visual Force Meter
   ============================================================ */

import { playCyberClickSound } from './cyberEffects.js';

export function initBallistics() {
  const distSlider    = document.getElementById('balDistance');
  const windSlider    = document.getElementById('balWind');
  const btnDirXuoi    = document.getElementById('btnDirXuoi');
  const btnDirNguoc   = document.getElementById('btnDirNguoc');
  const formulaBtns   = document.querySelectorAll('.btn-formula');
  const presetChips   = document.querySelectorAll('.preset-chip');
  const heightBtns    = document.querySelectorAll('[data-height]');

  const valDistance   = document.getElementById('valDistance');
  const valWind       = document.getElementById('valWind');
  const balResAngle   = document.getElementById('balResAngle');
  const balResPower   = document.getElementById('balResPower');
  const balResNote    = document.getElementById('balResNote');
  const trajPath      = document.getElementById('trajectoryPath');
  const cannonBarrel  = document.getElementById('cannonBarrel');
  const targetOuter   = document.getElementById('targetOuterGlow');
  const targetCenter  = document.getElementById('targetCenterPoint');
  const svgWindLbl    = document.getElementById('svgWindLabel');
  const svgEleLbl     = document.getElementById('svgElevationLabel');
  const powerFill     = document.getElementById('powerGaugeFill');
  const powerVal      = document.getElementById('powerGaugeVal');
  const compareTbody  = document.getElementById('formulaCompareTableBody');

  let activeFormula = '65';
  let activeWindDir = 'xuoi'; // 'xuoi' or 'nguoc'
  let activeHeight  = 0;      // 0, 1, -1

  // 1. Formula Selector Buttons
  formulaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playCyberClickSound();
      formulaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFormula = btn.dataset.formula || '65';
      updateBallistics();
    });
  });

  // 2. Wind Direction Buttons
  btnDirXuoi?.addEventListener('click', () => {
    playCyberClickSound();
    activeWindDir = 'xuoi';
    btnDirXuoi.classList.add('active');
    btnDirNguoc?.classList.remove('active');
    if (parseFloat(windSlider?.value || '0') < 0) {
      if (windSlider) windSlider.value = Math.abs(parseFloat(windSlider.value)).toString();
    }
    updateBallistics();
  });

  btnDirNguoc?.addEventListener('click', () => {
    playCyberClickSound();
    activeWindDir = 'nguoc';
    btnDirNguoc.classList.add('active');
    btnDirXuoi?.classList.remove('active');
    if (parseFloat(windSlider?.value || '0') > 0) {
      if (windSlider) windSlider.value = (-Math.abs(parseFloat(windSlider.value))).toString();
    }
    updateBallistics();
  });

  // 3. Height / Elevation Differential Buttons
  heightBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playCyberClickSound();
      heightBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeHeight = parseInt(btn.dataset.height || '0');
      updateBallistics();
    });
  });

  // 4. Quick Preset Chips
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      playCyberClickSound();
      if (chip.dataset.dist && distSlider) {
        distSlider.value = chip.dataset.dist;
      }
      if (chip.dataset.wind !== undefined && windSlider) {
        windSlider.value = chip.dataset.wind;
      }
      updateBallistics();
    });
  });

  // 5. Slider Inputs
  [distSlider, windSlider].forEach(el => {
    el?.addEventListener('input', updateBallistics);
    el?.addEventListener('change', updateBallistics);
  });

  function updateBallistics() {
    if (typeof BallisticsEngine === 'undefined') return;

    const distance = parseInt(distSlider?.value || '10');
    const windRaw = parseFloat(windSlider?.value || '0.0');
    const windSpeed = Math.abs(windRaw);

    // Sync direction if slider is dragged into positive/negative
    if (windRaw < 0 && activeWindDir !== 'nguoc') {
      activeWindDir = 'nguoc';
      btnDirNguoc?.classList.add('active');
      btnDirXuoi?.classList.remove('active');
    } else if (windRaw > 0 && activeWindDir !== 'xuoi') {
      activeWindDir = 'xuoi';
      btnDirXuoi?.classList.add('active');
      btnDirNguoc?.classList.remove('active');
    }

    // Update labels
    if (valDistance) {
      const screens = (distance / 10).toFixed(1);
      valDistance.textContent = `${distance} Đoạn (${screens} Màn)`;
    }
    if (valWind) {
      valWind.textContent = activeWindDir === 'xuoi'
        ? `+${windSpeed.toFixed(1)} (Xuôi)`
        : `-${windSpeed.toFixed(1)} (Ngược)`;
    }

    const windDirParam = activeWindDir === 'nguoc' ? 'NGUOC' : 'THUAN';
    const res = BallisticsEngine.calculateAngle(distance, windSpeed, windDirParam, activeFormula, activeHeight);

    // Update big results
    if (balResAngle) balResAngle.textContent = `${res.recommendedAngle}°`;
    if (balResPower) balResPower.textContent = res.recommendedPower;
    if (balResNote)  balResNote.textContent  = `${res.formulaName} · ${res.windNote} (${res.features})`;

    // Update Force Meter Power Gauge
    if (powerFill) {
      powerFill.style.width = `${Math.min(100, Math.max(0, res.recommendedPower))}%`;
    }
    if (powerVal) {
      powerVal.textContent = `${res.recommendedPower} / 100 Lực Bắn`;
    }

    // Dynamic Visual Trajectory Parabola SVG
    const startX = 30;
    const startY = 160;
    const targetX = startX + ((distance - 1) / 19) * 330;
    const targetY = startY - (activeHeight * 22);

    if (targetOuter)  { targetOuter.setAttribute('cx', targetX);  targetOuter.setAttribute('cy', targetY); }
    if (targetCenter) { targetCenter.setAttribute('cx', targetX); targetCenter.setAttribute('cy', targetY); }

    // Aim cannon barrel towards recommended angle
    if (cannonBarrel) {
      const rad = (res.recommendedAngle * Math.PI) / 180;
      const barrelLen = 22;
      const barrelEndX = startX + Math.cos(rad) * barrelLen;
      const barrelEndY = startY - Math.sin(rad) * barrelLen;
      cannonBarrel.setAttribute('x2', barrelEndX);
      cannonBarrel.setAttribute('y2', barrelEndY);
    }

    if (trajPath) {
      const heightFactor = (res.recommendedAngle / 90) * 115;
      const windDrift = (activeWindDir === 'xuoi' ? 1 : -1) * (windSpeed * 10);
      const apexX = ((startX + targetX) / 2) + windDrift;
      const apexY = Math.max(15, 160 - heightFactor);
      trajPath.setAttribute('d', `M ${startX} ${startY} Q ${apexX} ${apexY} ${targetX} ${targetY}`);
    }

    if (svgWindLbl) {
      svgWindLbl.textContent = `💨 GIÓ: ${activeWindDir === 'xuoi' ? '+' : '-'}${windSpeed.toFixed(1)} (${activeWindDir === 'xuoi' ? 'XUÔI' : 'NGƯỢC'})`;
    }
    if (svgEleLbl) {
      const eleName = activeHeight === 0 ? 'BẰNG PHẲNG' : (activeHeight > 0 ? 'ĐỊCH TRÊN CAO (+H)' : 'ĐỊCH DƯỚI THẤP (-H)');
      svgEleLbl.textContent = `⛰️ ĐỘ CAO: ${eleName}`;
    }

    // Render Multi-Formula Comparison Live Table
    if (compareTbody) {
      const allComp = BallisticsEngine.compareAllFormulas(distance, windSpeed, windDirParam, activeHeight);
      compareTbody.innerHTML = allComp.map(c => `
        <tr class="${c.formulaCode === activeFormula ? 'active' : ''}" data-formula="${c.formulaCode}">
          <td><strong>${c.formulaName}</strong></td>
          <td class="cyan">${c.recommendedAngle}°</td>
          <td class="gold">${c.recommendedPower} Lực</td>
          <td style="font-size:12px;color:var(--text-muted);">${c.features}</td>
        </tr>
      `).join('');

      compareTbody.querySelectorAll('tr').forEach(tr => {
        tr.addEventListener('click', () => {
          playCyberClickSound();
          const fCode = tr.dataset.formula;
          if (fCode) {
            activeFormula = fCode;
            formulaBtns.forEach(b => b.classList.toggle('active', b.dataset.formula === fCode));
            updateBallistics();
          }
        });
      });
    }
  }

  // Initial Calculation
  updateBallistics();
}
