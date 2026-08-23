/* ============================================================
   PMT GUNNY MASTER — 21 Interactive Calculators Module
   Includes Real-Time Itemized Step-by-Step Level Breakdowns,
   1-Click Goal Adding, and Report Copying
   ============================================================ */

import { animateCount, showToast } from './utils.js';
import { playCyberClickSound } from './cyberEffects.js';

export function initCalculators() {
  // 1. Render all static/dynamic table views
  renderRefiningTable();
  renderPetEvoTable();
  renderMagicExpTable();
  renderJewelConvertList();
  renderMountUpTable();
  renderPhuMaTable();
  renderVatToTable();
  renderDucHonTable();
  renderChienHonTable();
  renderManhHoaTable();
  renderNgocThuCuoi();
  renderManhNgocLam();
  renderMieuThan();
  renderPetLinhHach();
  renderPetTaiNang();
  renderHoaThanTuLuyen();
  renderNgocVuKhi();
  renderThanHoMenh();
  renderTheBaiDotPha();
  renderTinhHachThuCuoi();
  renderPetCaTinh();

  // 2. Bind listeners for all 21 interactive calculators
  bindCalculator('refStartLevel', 'refTargetLevel', updateRefiningCalc);
  bindCalculator('petEvoStartLevel', 'petEvoTargetLevel', updatePetEvoCalc);
  bindCalculator('magicExpStartLevel', 'magicExpTargetLevel', updateMagicExpCalc, 'magicExpRarity');
  bindCalculator('jewelTargetSelect', 'jewelTargetQty', updateJewelConvertCalc);
  bindCalculator('phuMaStartTier', 'phuMaTargetTier', updatePhuMaCalc);
  bindCalculator('vatToStartLevel', 'vatToTargetLevel', updateVatToCalc);
  bindCalculator('ducHonStartLevel', 'ducHonTargetLevel', updateDucHonCalc, 'ducHonTierSelect');
  bindCalculator('chienHonStartLevel', 'chienHonTargetLevel', updateChienHonCalc, 'chienHonModeSelect');
  bindCalculator('manhHoaStartIdx', 'manhHoaTargetIdx', updateManhHoaCalc);
  bindCalculator('ngocLamStartLevel', 'ngocLamTargetLevel', updateNgocLamCalc);
  bindCalculator('mieuThanStartLevel', 'mieuThanTargetLevel', updateMieuThanCalc);
  bindCalculator('linhHachStartLevel', 'linhHachTargetLevel', updatePetLinhHachCalc);
  bindCalculator('taiNangStartLevel', 'taiNangTargetLevel', updatePetTaiNangCalc);
  bindCalculator('hoaThanStartTier', 'hoaThanTargetTier', updateHoaThanTuLuyenCalc);
  bindCalculator('ngocVuKhiStartLevel', 'ngocVuKhiTargetLevel', updateNgocVuKhiCalc);
  bindCalculator('thmStartLevel', 'thmTargetLevel', updateThanHoMenhCalc, 'thmStarType');
  bindCalculator('theBaiStartLevel', 'theBaiTargetLevel', updateTheBaiDotPhaCalc);
  bindCalculator('tinhHachStartLevel', 'tinhHachTargetLevel', updateTinhHachThuCuoiCalc);
  bindCalculator('caTinhStartLevel', 'caTinhTargetLevel', updatePetCaTinhCalc);

  // 3. Initial Calculations
  updateRefiningCalc();
  updatePetEvoCalc();
  updateMagicExpCalc();
  updateJewelConvertCalc();
  updatePhuMaCalc();
  updateVatToCalc();
  updateDucHonCalc();
  updateChienHonCalc();
  updateManhHoaCalc();
  updateNgocLamCalc();
  updateMieuThanCalc();
  updatePetLinhHachCalc();
  updatePetTaiNangCalc();
  updateHoaThanTuLuyenCalc();
  updateNgocVuKhiCalc();
  updateThanHoMenhCalc();
  updateTheBaiDotPhaCalc();
  updateTinhHachThuCuoiCalc();
  updatePetCaTinhCalc();
}

function bindCalculator(startId, targetId, updateFn, extraId = null) {
  [startId, targetId, extraId].forEach(id => {
    if (!id) return;
    const el = document.getElementById(id);
    el?.addEventListener('change', () => {
      playCyberClickSound();
      updateFn();
    });
    el?.addEventListener('input', () => {
      updateFn();
    });
  });
}

function animateVal(id, targetVal) {
  const el = document.getElementById(id);
  if (!el) return;
  const curr = parseInt(el.textContent.replace(/,/g, '')) || 0;
  animateCount(el, curr, targetVal);
}

/**
 * Universal Itemized Level Breakdown Renderer with 1-Click Goal Integration
 */
function renderSubBreakdown(subId, title, headers, rows, summaryText = '', goalItems = []) {
  const subPanel = document.getElementById(subId);
  if (!subPanel) return;

  let breakdownCard = subPanel.querySelector('.level-breakdown-card');
  if (!breakdownCard) {
    breakdownCard = document.createElement('div');
    breakdownCard.className = 'level-breakdown-card';
    const summaryGrid = subPanel.querySelector('.stat-summary-grid');
    if (summaryGrid && summaryGrid.nextSibling) {
      summaryGrid.parentNode.insertBefore(breakdownCard, summaryGrid.nextSibling);
    } else {
      subPanel.querySelector('.glass-card')?.appendChild(breakdownCard);
    }
  }

  if (!rows || rows.length === 0) {
    breakdownCard.style.display = 'none';
    return;
  }

  breakdownCard.style.display = 'block';
  const thHtml = headers.map(h => `<th>${h}</th>`).join('');
  const rowsHtml = rows.map((r, i) => `
    <tr>
      <td style="color:var(--text-muted);font-weight:700;">#${i + 1}</td>
      ${r.map((cell, idx) => `<td class="${idx === r.length - 1 ? 'cyan' : (idx === 1 ? 'gold' : '')}">${cell}</td>`).join('')}
    </tr>
  `).join('');

  breakdownCard.innerHTML = `
    <div class="breakdown-header-bar">
      <span class="breakdown-title">📋 ${title}</span>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <span class="breakdown-badge">${rows.length} Bước Nâng</span>
        <button class="btn-copy-report-sm" style="padding:4px 10px;font-size:12px;font-weight:700;border-radius:6px;background:rgba(255,215,0,0.15);border:1px solid var(--gold);color:#ffffff;cursor:pointer;">
          📋 Chép Báo Cáo
        </button>
      </div>
    </div>
    <div class="breakdown-body table-responsive">
      <table class="breakdown-table">
        <thead><tr><th>#</th>${thHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      ${summaryText ? `<div style="margin-top:10px;font-size:12.5px;color:var(--text-muted);">${summaryText}</div>` : ''}
    </div>
  `;

  // Bind Copy Report button
  breakdownCard.querySelector('.btn-copy-report-sm')?.addEventListener('click', () => {
    playCyberClickSound();
    let report = `📊 [BÁO CÁO PMT GUNNY MASTER - ${title.toUpperCase()}]\n\n`;
    report += `🎯 TỔNG KẾT NGUYÊN LIỆU:\n`;
    goalItems.forEach(it => {
      report += `• ${it.name}: ${it.qty}\n`;
    });
    report += `\n📋 CHI TIẾT TỪNG BƯỚC NÂNG:\n`;
    rows.forEach((r, i) => {
      report += `${i + 1}. ${r[0]} → ${r[1]} (${r[r.length - 1]})\n`;
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(report).then(() => {
        showToast(`📋 Đã sao chép chi tiết "${title}"!`);
      });
    }
  });
}

/* ────────────────────────────────────────────────────────────
   1. GIA CÔNG
   ──────────────────────────────────────────────────────────── */
function renderRefiningTable() {
  const tbody = document.getElementById('refTableBody');
  if (!tbody || typeof RefiningData === 'undefined') return;
  tbody.innerHTML = RefiningData.levels.map(r => `
    <tr data-level="${r.level}">
      <td><strong>Cấp ${r.level}</strong></td>
      <td class="gold">${(r.da || 0).toLocaleString()}</td>
      <td>${(r.dong || 0).toLocaleString()}</td>
      <td>${(r.bac || 0).toLocaleString()}</td>
      <td>${(r.vang || 0).toLocaleString()}</td>
      <td class="cyan">${(r.ngoc || 0).toLocaleString()}</td>
    </tr>`).join('');
}

function updateRefiningCalc() {
  const s = parseInt(document.getElementById('refStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('refTargetLevel')?.value || '14');
  if (typeof CalculatorEngine === 'undefined') return;

  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateRefining(s, validTarget);

  animateVal('resRefDa', res.totalDa);
  animateVal('resRefDong', res.totalDong);
  animateVal('resRefBac', res.totalBac);
  animateVal('resRefVang', res.totalVang);
  animateVal('resRefNgoc', res.totalNgoc);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.da.toLocaleString()} Đá`,
    `${b.dong.toLocaleString()} Đồng`,
    `${b.bac.toLocaleString()} Bạc`,
    `${b.vang.toLocaleString()} Vàng`,
    `${b.ngoc.toLocaleString()} Ngọc`,
    `Tổng: ${b.cumDa.toLocaleString()} Đá (${b.cumNgoc.toLocaleString()} Ngọc)`
  ]);
  const goalItems = [
    { name: 'Đá Gia Công', qty: res.totalDa.toLocaleString() },
    { name: 'Đồng', qty: res.totalDong.toLocaleString() },
    { name: 'Bạc', qty: res.totalBac.toLocaleString() },
    { name: 'Vàng', qty: res.totalVang.toLocaleString() },
    { name: 'Ngọc', qty: res.totalNgoc.toLocaleString() }
  ];
  renderSubBreakdown('sub-gia_cong', `Gia Công: Cấp ${s} → Cấp ${validTarget}`, ['Mốc Nâng', 'Đá Cần', 'Đồng', 'Bạc', 'Vàng', 'Ngọc', 'Lũy Kế Tích Lũy'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   2. TIẾN HÓA PET
   ──────────────────────────────────────────────────────────── */
function renderPetEvoTable() {
  const tbody = document.getElementById('petEvoTableBody');
  if (!tbody || typeof PetEvolutionData === 'undefined') return;
  const list = PetEvolutionData.levels;
  const chunkSize = Math.ceil(list.length / 3);
  const col1 = list.slice(0, chunkSize);
  const col2 = list.slice(chunkSize, chunkSize * 2);
  const col3 = list.slice(chunkSize * 2);

  let html = '';
  for (let i = 0; i < chunkSize; i++) {
    html += `<tr>
      <td><strong>Lv ${col1[i]?.level || ''}</strong></td><td class="gold">${col1[i] ? (col1[i].co || 0).toLocaleString() : ''}</td>
      <td><strong>Lv ${col2[i]?.level || ''}</strong></td><td class="gold">${col2[i] ? (col2[i].co || 0).toLocaleString() : ''}</td>
      <td><strong>Lv ${col3[i]?.level || ''}</strong></td><td class="gold">${col3[i] ? (col3[i].co || 0).toLocaleString() : ''}</td>
    </tr>`;
  }
  tbody.innerHTML = html;
}

function updatePetEvoCalc() {
  const s = parseInt(document.getElementById('petEvoStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('petEvoTargetLevel')?.value || '50');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculatePetEvolution(s, validTarget);
  animateVal('resPetEvoCo', res.totalCoThienDiep);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.co.toLocaleString()} Cỏ`,
    `Cộng dồn: ${b.cumCo.toLocaleString()} Cỏ (${((b.cumCo / res.totalCoThienDiep) * 100).toFixed(1)}%)`
  ]);
  const goalItems = [{ name: 'Cỏ Thiên Điệp', qty: res.totalCoThienDiep.toLocaleString() }];
  renderSubBreakdown('sub-tien_hoa_pet', `Tiến Hóa Pet: Lv ${s} → Lv ${validTarget}`, ['Khoảng Cấp', 'Cỏ Cần Cấp Này', 'Tiến Trình Tích Lũy'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   3. EXP MA THẠCH
   ──────────────────────────────────────────────────────────── */
function renderMagicExpTable() {
  const tbody = document.getElementById('magicExpTableBody');
  if (!tbody || typeof MagicStonesExpData === 'undefined') return;
  tbody.innerHTML = MagicStonesExpData.levels.map(r => `
    <tr>
      <td><strong>Lv ${r.level}</strong></td>
      <td class="cyan">${r.hoanMy ? r.hoanMy.toLocaleString() : '-'}</td>
      <td class="purple">${r.sieuViet ? r.sieuViet.toLocaleString() : '-'}</td>
      <td class="gold">${r.truyenThuyet ? r.truyenThuyet.toLocaleString() : '-'}</td>
    </tr>`).join('');
}

function updateMagicExpCalc() {
  const s = parseInt(document.getElementById('magicExpStartLevel')?.value || '1');
  const t = parseInt(document.getElementById('magicExpTargetLevel')?.value || '10');
  const r = document.getElementById('magicExpRarity')?.value || 'truyenThuyet';
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateMagicStoneExp(s, validTarget, r);
  animateVal('resMagicExp', res.totalExpNeeded);

  const rName = r === 'truyenThuyet' ? 'Truyền Thuyết' : (r === 'sieuViet' ? 'Siêu Việt' : 'Hoàn Mỹ');
  const rows = res.breakdown.map(b => [
    b.step,
    `${b.exp.toLocaleString()} EXP`,
    `Cộng dồn: ${b.cumExp.toLocaleString()} EXP`
  ]);
  const goalItems = [{ name: `EXP Ma Thạch (${rName})`, qty: res.totalExpNeeded.toLocaleString() }];
  renderSubBreakdown('sub-magic_exp', `EXP Ma Thạch (${rName}): Lv ${s} → Lv ${validTarget}`, ['Cấp Nâng', 'EXP Cần', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   4. QUY ĐỔI CHÂU BÁU
   ──────────────────────────────────────────────────────────── */
function renderJewelConvertList() {
  const container = document.getElementById('jewelConvertContainer');
  if (!container || typeof JewelConversionData === 'undefined') return;

  container.innerHTML = JewelConversionData.conversions.map((c, i) => {
    let rarityClass = 'epic';
    let rarityName = '💎 Cao Cấp';
    if (c.target.includes('2 Dòng')) {
      rarityClass = 'mythic';
      rarityName = '🔥 2 Dòng Hiếm';
    } else if (c.target.includes('Lv 21') || c.target.includes('Lv 19')) {
      rarityClass = 'legendary';
      rarityName = '👑 Thần Thoại';
    }

    const recipesHtml = c.equivalents.map(e => `
      <div class="jewel-recipe-row">
        <div class="jewel-recipe-src">
          <span>💎 ${e.item}</span>
        </div>
        <span class="jewel-recipe-arrow">➔ Cần:</span>
        <span class="jewel-recipe-qty">${e.qty.toLocaleString()} viên</span>
      </div>
    `).join('');

    return `
      <div class="jewel-vault-card">
        <div>
          <div class="jewel-vault-head">
            <span class="jewel-target-name">✨ ${c.target}</span>
            <span class="jewel-rarity-badge ${rarityClass}">${rarityName}</span>
          </div>
          <div class="jewel-recipes-list">
            ${recipesHtml}
          </div>
        </div>
        <div class="jewel-card-foot">
          <span style="font-size:11.5px;color:var(--text-muted);">Mốc ${i + 1}/7 · Chuẩn Game PC</span>
          <button class="btn-copy-jewel-recipe" data-target="${c.target.replace(/"/g, '&quot;')}">
            📋 Sao Chép Công Thức
          </button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-copy-jewel-recipe').forEach(btn => {
    btn.addEventListener('click', () => {
      playCyberClickSound();
      const targetName = btn.dataset.target;
      const item = JewelConversionData.conversions.find(c => c.target === targetName);
      if (!item) return;
      let text = `💎 [PMT GUNNY MASTER - CÔNG THỨC QUY ĐỔI ${item.target.toUpperCase()}]:\n`;
      item.equivalents.forEach(e => {
        text += `• 1 ${item.target} = ${e.qty.toLocaleString()} ${e.item}\n`;
      });
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`📋 Đã sao chép công thức "${item.target}"!`);
        });
      }
    });
  });
}

function updateJewelConvertCalc() {
  const targetName = document.getElementById('jewelTargetSelect')?.value || 'Châu Báu Lv 17';
  const qty = Math.max(1, parseInt(document.getElementById('jewelTargetQty')?.value || '1'));
  const lbl = document.getElementById('resJewelCalcLabel');
  const val = document.getElementById('resJewelCalcVal');

  if (typeof JewelConversionData === 'undefined' || !lbl || !val) return;
  const item = JewelConversionData.conversions.find(c => c.target === targetName);
  if (!item) return;

  lbl.textContent = `💎 Yêu Cầu Ghép: ${qty.toLocaleString()} Viên ${item.target}`;
  const formulaStrs = item.equivalents.map(e => `${(e.qty * qty).toLocaleString()} viên ${e.item}`);
  val.textContent = formulaStrs.join('  (hoặc)  ');

  const goalItems = item.equivalents.map(e => ({
    name: e.item,
    qty: (e.qty * qty).toLocaleString() + ' viên'
  }));

  const rows = item.equivalents.map((e, idx) => [
    `Cách ${idx + 1}`,
    `${(e.qty * qty).toLocaleString()} viên ${e.item}`,
    `Quy đổi từ ${item.target}`
  ]);

  renderSubBreakdown('sub-jewel_convert', `Quy Đổi ${qty} Viên ${item.target}`, ['Phương Án', 'Số Lượng Châu Báu Cần', 'Ghi Chú'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   5. UP THÚ CƯỠI
   ──────────────────────────────────────────────────────────── */
function renderMountUpTable() {
  const tbody = document.getElementById('mountUpTableBody');
  if (!tbody || typeof MountUpData === 'undefined') return;

  const rowsHtml = MountUpData.levels.map(r => {
    const cv = (r.caVang ?? r.ca_vang ?? '-');
    const c7 = (r.ca7Mau ?? r.ca_7_mau ?? '-');
    const tk = (r.thamKien ?? r.tham_kien ?? '-');
    const tg = (r.thamGa ?? r.tham_ga ?? '-');
    const cm = (r.coMayTG ?? r.co_may_tg ?? '-');
    return `
    <tr>
      <td><strong>Lv ${r.level}</strong></td>
      <td class="gold">${r.ngua ? r.ngua.toLocaleString() : '-'}</td>
      <td>${r.heo ? r.heo.toLocaleString() : '-'}</td>
      <td>${r.soi ? r.soi.toLocaleString() : '-'}</td>
      <td>${r.choi ? r.choi.toLocaleString() : '-'}</td>
      <td>${typeof cv === 'number' ? cv.toLocaleString() : cv}</td>
      <td>${typeof c7 === 'number' ? c7.toLocaleString() : c7}</td>
      <td>${typeof tk === 'number' ? tk.toLocaleString() : tk}</td>
      <td>${typeof tg === 'number' ? tg.toLocaleString() : tg}</td>
      <td class="cyan">${typeof cm === 'number' ? cm.toLocaleString() : cm}</td>
    </tr>`;
  }).join('');

  // Total summary footer row
  const totNgua = MountUpData.levels.reduce((acc, r) => acc + (r.ngua || 0), 0);
  const totHeo  = MountUpData.levels.reduce((acc, r) => acc + (r.heo || 0), 0);
  const totSoi  = MountUpData.levels.reduce((acc, r) => acc + (r.soi || 0), 0);
  const totChoi = MountUpData.levels.reduce((acc, r) => acc + (r.choi || 0), 0);
  const totCV   = MountUpData.levels.reduce((acc, r) => acc + (r.caVang || r.ca_vang || 0), 0);
  const totC7   = MountUpData.levels.reduce((acc, r) => acc + (r.ca7Mau || r.ca_7_mau || 0), 0);
  const totTK   = MountUpData.levels.reduce((acc, r) => acc + (r.thamKien || r.tham_kien || 0), 0);
  const totTG   = MountUpData.levels.reduce((acc, r) => acc + (r.thamGa || r.tham_ga || 0), 0);
  const totCM   = MountUpData.levels.reduce((acc, r) => acc + (r.coMayTG || r.co_may_tg || 0), 0);

  const totalRowHtml = `
    <tr style="background:rgba(255,215,0,0.12);border-top:2px solid var(--gold);font-weight:800;">
      <td style="color:var(--gold);">🔥 TỔNG</td>
      <td class="gold">${totNgua.toLocaleString()}</td>
      <td class="gold">${totHeo.toLocaleString()}</td>
      <td class="gold">${totSoi.toLocaleString()}</td>
      <td class="gold">${totChoi.toLocaleString()}</td>
      <td class="gold">${totCV.toLocaleString()}</td>
      <td class="gold">${totC7.toLocaleString()}</td>
      <td class="gold">${totTK.toLocaleString()}</td>
      <td class="gold">${totTG.toLocaleString()}</td>
      <td class="cyan">${totCM.toLocaleString()}</td>
    </tr>`;

  tbody.innerHTML = rowsHtml + totalRowHtml;

  // Bind 1-Click Copy Table Button
  const btnCopy = document.getElementById('btnCopyMountTable');
  btnCopy?.addEventListener('click', () => {
    playCyberClickSound();
    let text = `📊 [BÁO CÁO PMT GUNNY MASTER - BẢNG UP THÚ CƯỠI (9 LOẠI TỌA KỴ)]\n\n`;
    text += `Lv | Ngựa | Heo | Sói | Chổi | Cá Vàng | Cá 7 Màu | Thảm Kiến | Thảm Gà | Cỗ Máy TG\n`;
    text += `---|---|---|---|---|---|---|---|---|---\n`;
    MountUpData.levels.forEach(r => {
      text += `Lv ${r.level} | ${r.ngua} | ${r.heo} | ${r.soi} | ${r.choi} | ${r.caVang || r.ca_vang} | ${r.ca7Mau || r.ca_7_mau} | ${r.thamKien || r.tham_kien} | ${r.thamGa || r.tham_ga} | ${r.coMayTG || r.co_may_tg}\n`;
    });
    text += `\n🔥 TỔNG CỘNG CẤP 10:\n`;
    text += `• Ngựa: ${totNgua.toLocaleString()} viên\n`;
    text += `• Heo: ${totHeo.toLocaleString()} viên\n`;
    text += `• Sói: ${totSoi.toLocaleString()} viên\n`;
    text += `• Chổi: ${totChoi.toLocaleString()} viên\n`;
    text += `• Cá Vàng: ${totCV.toLocaleString()} viên\n`;
    text += `• Cá 7 Màu: ${totC7.toLocaleString()} viên\n`;
    text += `• Thảm Kiến: ${totTK.toLocaleString()} viên\n`;
    text += `• Thảm Gà: ${totTG.toLocaleString()} viên\n`;
    text += `• Cỗ Máy TG: ${totCM.toLocaleString()} viên\n`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Đã sao chép toàn bộ bảng Thú Cưỡi vào bộ nhớ tạm!');
      });
    }
  });
}

/* ────────────────────────────────────────────────────────────
   6. UP PHỤ MA
   ──────────────────────────────────────────────────────────── */
function renderPhuMaTable() {
  const tbody = document.getElementById('phuMaTableBody');
  if (!tbody || typeof PhuMaData === 'undefined') return;
  tbody.innerHTML = PhuMaData.matrix.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="${r.bac1 ? 'gold' : ''}">${r.bac1 ? r.bac1.toLocaleString() : '-'}</td>
      <td class="${r.bac2 ? 'gold' : ''}">${r.bac2 ? r.bac2.toLocaleString() : '-'}</td>
      <td class="${r.bac3 ? 'gold' : ''}">${r.bac3 ? r.bac3.toLocaleString() : '-'}</td>
      <td class="${r.bac4 ? 'gold' : ''}">${r.bac4 ? r.bac4.toLocaleString() : '-'}</td>
      <td class="${r.bac5 ? 'cyan' : ''}">${r.bac5 ? r.bac5.toLocaleString() : '-'}</td>
    </tr>`).join('');
}

function updatePhuMaCalc() {
  const s = parseInt(document.getElementById('phuMaStartTier')?.value || '0');
  const t = parseInt(document.getElementById('phuMaTargetTier')?.value || '5');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculatePhuMa(s, validTarget);
  animateVal('resPhuMaDa', res.totalDaPhuMa);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.da.toLocaleString()} Đá Phụ Ma`,
    `Tích lũy: ${b.cumDa.toLocaleString()} Đá (${((b.cumDa / res.totalDaPhuMa) * 100).toFixed(1)}%)`
  ]);
  const goalItems = [{ name: 'Đá Phụ Ma', qty: res.totalDaPhuMa.toLocaleString() }];
  renderSubBreakdown('sub-phu_ma', `Phụ Ma Trang Bị: Bậc ${s} → Bậc ${validTarget}`, ['Bậc Nâng', 'Đá Phụ Ma Cần', 'Tiến Trình'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   7. UP VẬT TỔ
   ──────────────────────────────────────────────────────────── */
function renderVatToTable() {
  const tbody = document.getElementById('vatToTableBody');
  if (!tbody || typeof VatToData === 'undefined') return;
  const list = VatToData.levels;
  const half = Math.ceil(list.length / 2);
  let html = '';
  for (let i = 0; i < half; i++) {
    const left = list[i];
    const right = list[i + half];
    html += `<tr>
      <td><strong>Lv ${left?.level || ''}</strong></td><td class="gold">${left ? (left.coc1 || 0).toLocaleString() : ''}</td><td class="cyan">${left ? (left.coc7 || 0).toLocaleString() : ''}</td>
      <td><strong>${right ? 'Lv ' + right.level : ''}</strong></td><td class="gold">${right ? (right.coc1 || 0).toLocaleString() : ''}</td><td class="cyan">${right ? (right.coc7 || 0).toLocaleString() : ''}</td>
    </tr>`;
  }
  tbody.innerHTML = html;
}

function updateVatToCalc() {
  const s = parseInt(document.getElementById('vatToStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('vatToTargetLevel')?.value || '50');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateVatTo(s, validTarget);
  animateVal('resVatTo1Coc', res.totalCost1);
  animateVal('resVatTo7Coc', res.totalCost7);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.coc1.toLocaleString()} Xu/Vé`,
    `${b.coc7.toLocaleString()} Xu/Vé`,
    `1 Cọc: ${b.cumCoc1.toLocaleString()} | 7 Cọc: ${b.cumCoc7.toLocaleString()}`
  ]);
  const goalItems = [
    { name: 'Vật Tổ 1 Cọc (Xu/Vé)', qty: res.totalCost1.toLocaleString() },
    { name: 'Vật Tổ 7 Cọc (Xu/Vé)', qty: res.totalCost7.toLocaleString() }
  ];
  renderSubBreakdown('sub-vat_to', `Vật Tổ: Cấp ${s} → Cấp ${validTarget}`, ['Level', '1 Cọc Cần', '7 Cọc Cần', 'Lũy Kế Tích Lũy'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   8. ĐÚC HỒN
   ──────────────────────────────────────────────────────────── */
function renderDucHonTable() {
  const tbody = document.getElementById('ducHonTableBody');
  if (!tbody || typeof DucHonData === 'undefined') return;
  tbody.innerHTML = DucHonData.levels.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="cyan">${(r.dong?.dlh || 0).toLocaleString()} Đá LH</td>
      <td><span class="gold">${(r.bac?.dlh || 0).toLocaleString()} Đá LH</span><br><span class="cyan">${(r.bac?.duc || 0).toLocaleString()} Đá Đúc</span></td>
      <td><span class="gold">${(r.vang?.dlh || 0).toLocaleString()} Đá LH</span><br><span class="cyan">${(r.vang?.duc || 0).toLocaleString()} Đá Đúc</span></td>
      <td><span class="gold">${(r.kimCuong?.dlh || 0).toLocaleString()} Đá LH</span><br><span class="cyan">${(r.kimCuong?.duc || 0).toLocaleString()} Đá Đúc</span></td>
    </tr>`).join('');
}

function updateDucHonCalc() {
  const tier = document.getElementById('ducHonTierSelect')?.value || 'kimCuong';
  const s = parseInt(document.getElementById('ducHonStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('ducHonTargetLevel')?.value || '5');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateDucHon(tier, s, validTarget);
  animateVal('resDucHonDlh', res.totalDlh);
  animateVal('resDucHonCost', res.totalDuc);

  const tierNames = { dong: '🪙 Đồng', bac: '🥈 Bạc', vang: '🥇 Vàng', kimCuong: '💎 Kim Cương' };
  const rows = res.breakdown.map(b => [
    b.step,
    `${b.dlh.toLocaleString()} Đá LH`,
    `${b.duc.toLocaleString()} Đá Đúc`,
    `LH: ${b.cumDlh.toLocaleString()} | Đúc: ${b.cumDuc.toLocaleString()}`
  ]);
  const goalItems = [
    { name: `Đá Luyện Hồn (${tierNames[tier]})`, qty: res.totalDlh.toLocaleString() },
    { name: `Đá Đúc Hồn (${tierNames[tier]})`, qty: res.totalDuc.toLocaleString() }
  ];
  renderSubBreakdown('sub-duc_hon', `Đúc Hồn (${tierNames[tier]}): Cấp ${s} → Cấp ${validTarget}`, ['Cấp Đúc', 'Đá Luyện Hồn', 'Đá Đúc Hồn', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   9. CHIẾN HỒN ĐƠN
   ──────────────────────────────────────────────────────────── */
function renderChienHonTable() {
  const tbody = document.getElementById('chienHonTableBody');
  if (!tbody || typeof ChienHonDonData === 'undefined') return;
  tbody.innerHTML = ChienHonDonData.levels.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="gold">${(r.tu1 || 0).toLocaleString()}</td>
      <td class="cyan">${(r.tu3 || 0).toLocaleString()}</td>
    </tr>`).join('');
}

function updateChienHonCalc() {
  const mode = document.getElementById('chienHonModeSelect')?.value || '1mon';
  const s = parseInt(document.getElementById('chienHonStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('chienHonTargetLevel')?.value || '5');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateChienHon(mode, s, validTarget);
  animateVal('resChienHonQty', res.totalQty);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.qty.toLocaleString()} Chiến Hồn Đơn`,
    `Tích lũy: ${b.cumQty.toLocaleString()} viên`
  ]);
  const goalItems = [{ name: `Chiến Hồn Đơn (${mode === '1mon' ? '1 Món' : '3 Món'})`, qty: res.totalQty.toLocaleString() }];
  renderSubBreakdown('sub-chien_hon', `Chiến Hồn Đơn (${mode === '1mon' ? '1 Món' : '3 Món'}): Cấp ${s} → Cấp ${validTarget}`, ['Cấp Nâng', 'Số Lượng Cần', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   10. MANH HÓA PET
   ──────────────────────────────────────────────────────────── */
function renderManhHoaTable() {
  const tbody = document.getElementById('manhHoaTableBody');
  if (!tbody || typeof ManhHoaPetData === 'undefined') return;
  tbody.innerHTML = ManhHoaPetData.levels.map(r => `
    <tr>
      <td><strong>${r.range}</strong></td>
      <td class="gold">${(r.qty || 0).toLocaleString()} Mảnh</td>
      <td class="cyan">${(r.congDon || 0).toLocaleString()} Mảnh</td>
    </tr>`).join('');
}

function updateManhHoaCalc() {
  const s = parseInt(document.getElementById('manhHoaStartIdx')?.value || '0');
  const t = parseInt(document.getElementById('manhHoaTargetIdx')?.value || '29');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateManhHoa(s, validTarget);
  animateVal('resManhHoaQty', res.totalQty);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.qty.toLocaleString()} Mảnh`,
    `Tích lũy: ${b.cumQty.toLocaleString()} Mảnh`
  ]);
  const goalItems = [{ name: 'Mảnh Manh Hóa Pet', qty: res.totalQty.toLocaleString() }];
  renderSubBreakdown('sub-manh_hoa_pet', `Manh Hóa Pet: Mốc ${s} → Mốc ${validTarget}`, ['Khoảng Mốc', 'Số Mảnh Cần', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   11. NGỌC THÚ CƯỠI
   ──────────────────────────────────────────────────────────── */
function renderNgocThuCuoi() {
  const container = document.getElementById('ngocThuCuoiContainer');
  const tbody = document.getElementById('ngocThuCuoiTableBody');
  const data = (typeof NgocThuCuoiData !== 'undefined') ? NgocThuCuoiData : null;
  if (!data) return;

  if (container) {
    container.innerHTML = data.types.map(n => `
      <div class="glass-card stat-card">
        <div class="stat-card-title">🐎 ${n.name || n.loai}</div>
        <div class="stat-card-body">
          <div class="stat-row">
            <span>Phạm Vi Áp Dụng</span>
            <strong class="gold">${n.levelRange}</strong>
          </div>
          <div class="stat-row">
            <span>Số Lượng Cần</span>
            <strong class="gold">${(n.qty || 0).toLocaleString()} viên</strong>
          </div>
          <div class="stat-row">
            <span>Quy đổi Ngọc 1</span>
            <strong class="cyan">${((n.quyDoiNgoc1 || n.qty) || 0).toLocaleString()} Ngọc 1</strong>
          </div>
        </div>
      </div>`).join('');
  }

  if (tbody) {
    tbody.innerHTML = data.types.map(n => `
      <tr>
        <td><strong>${n.name || n.loai}</strong></td>
        <td>${n.levelRange}</td>
        <td class="gold">${(n.qty || 0).toLocaleString()} viên</td>
        <td>${n.name?.includes('Ngọc 2') ? '1 viên = 2 Ngọc 1' : (n.name?.includes('Ngọc 3') ? '1 viên = 4 Ngọc 1' : '1 : 1')}</td>
        <td class="cyan">${((n.quyDoiNgoc1 || n.qty) || 0).toLocaleString()} Ngọc 1</td>
      </tr>`).join('');
  }
}

/* ────────────────────────────────────────────────────────────
   12. MẢNH NGỌC LAM
   ──────────────────────────────────────────────────────────── */
function renderManhNgocLam() {
  const tbody = document.getElementById('ngocLamTableBody');
  if (!tbody || typeof ManhNgocLamData === 'undefined') return;
  tbody.innerHTML = ManhNgocLamData.levels.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="gold">${(r.manhCan || 0).toLocaleString()}</td>
      <td class="cyan">${(r.congDon || 0).toLocaleString()}</td>
    </tr>`).join('');
}

function updateNgocLamCalc() {
  const s = parseInt(document.getElementById('ngocLamStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('ngocLamTargetLevel')?.value || '9');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateManhNgocLam(s, validTarget);
  animateVal('resNgocLamTotal', res.totalManh);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.manh.toLocaleString()} Mảnh`,
    `Tích lũy: ${b.cumManh.toLocaleString()} Mảnh`
  ]);
  const goalItems = [{ name: 'Mảnh Ngọc Lam', qty: res.totalManh.toLocaleString() }];
  renderSubBreakdown('sub-manh_ngoc_lam', `Mảnh Ngọc Lam: Cấp ${s} → Cấp ${validTarget}`, ['Cấp Ngọc', 'Mảnh Cần Nâng', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   13. MIẾU THẦN / HÓA THẦN
   ──────────────────────────────────────────────────────────── */
function renderMieuThan() {
  const tbody = document.getElementById('mieuThanTableBody');
  if (!tbody || typeof MieuThanData === 'undefined') return;
  tbody.innerHTML = MieuThanData.levels.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="gold">${(r.vatTe || 0).toLocaleString()}</td>
      <td class="cyan">${r.maKhang || '-'}</td>
      <td>${r.khangBao || '-'}</td>
      <td>${r.mienThuong || '-'}</td>
      <td>${r.tatKhang || '-'}</td>
      <td class="gold">${r.baoVe || '-'}</td>
    </tr>`).join('');
}

function updateMieuThanCalc() {
  const s = parseInt(document.getElementById('mieuThanStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('mieuThanTargetLevel')?.value || '10');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateMieuThan(s, validTarget);
  animateVal('resMieuThanVatTe', res.totalVatTe);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.vatTe} Vật tế`,
    b.maKhang || '-',
    b.tatKhang || '-',
    `Tích lũy: ${b.cumVatTe} Vật tế`
  ]);
  const goalItems = [{ name: 'Vật Tế Miếu Thần', qty: res.totalVatTe.toLocaleString() }];
  renderSubBreakdown('sub-mieu_than', `Miếu Thần / Hóa Thần: Cấp ${s} → Cấp ${validTarget}`, ['Cấp Chúc Phúc', 'Vật Tế Cần', 'Ma Kháng', 'Tất Kháng', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   14. PET LINH HẠCH
   ──────────────────────────────────────────────────────────── */
function renderPetLinhHach() {
  const tbody = document.getElementById('petLinhHachTableBody');
  if (!tbody || typeof PetLinhHachData === 'undefined') return;
  tbody.innerHTML = PetLinhHachData.levels.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="gold">${(r.manh || 0).toLocaleString()}</td>
      <td class="cyan">${(r.da || 0).toLocaleString()}</td>
      <td>${(r.vang || 0).toLocaleString()}</td>
    </tr>`).join('');
}

function updatePetLinhHachCalc() {
  const s = parseInt(document.getElementById('linhHachStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('linhHachTargetLevel')?.value || '17');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculatePetLinhHach(s, validTarget);
  animateVal('resLinhHachManh', res.totalManh);
  animateVal('resLinhHachDa', res.totalDa);
  animateVal('resLinhHachGold', res.totalVang);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.manh.toLocaleString()} Mảnh`,
    `${b.da.toLocaleString()} Đá LH`,
    `${b.vang.toLocaleString()} Vàng`,
    `Tích lũy: ${b.cumDa.toLocaleString()} Đá`
  ]);
  const goalItems = [
    { name: 'Mảnh Linh Hạch', qty: res.totalManh.toLocaleString() },
    { name: 'Đá Luyện Linh', qty: res.totalDa.toLocaleString() },
    { name: 'Vàng Linh Hạch', qty: res.totalVang.toLocaleString() }
  ];
  renderSubBreakdown('sub-pet_linh_hach', `Pet Linh Hạch: Cấp ${s} → Cấp ${validTarget}`, ['Cấp Linh Hạch', 'Mảnh Cần', 'Đá Luyện Linh', 'Vàng', 'Lũy Kế Đá'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   15. PET TÀI NĂNG
   ──────────────────────────────────────────────────────────── */
function renderPetTaiNang() {
  const tbody = document.getElementById('petTaiNangTableBody');
  if (!tbody || typeof PetTaiNangData === 'undefined') return;
  tbody.innerHTML = PetTaiNangData.levels.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="gold">${(r.sach || 0).toLocaleString()} Sách</td>
      <td class="cyan">${(r.congDon || 0).toLocaleString()} Sách</td>
    </tr>`).join('');
}

function updatePetTaiNangCalc() {
  const s = parseInt(document.getElementById('taiNangStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('taiNangTargetLevel')?.value || '10');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculatePetTaiNang(s, validTarget);
  animateVal('resTaiNangSach', res.totalSach);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.sach.toLocaleString()} Sách`,
    `Tích lũy: ${b.cumSach.toLocaleString()} Sách`
  ]);
  const goalItems = [{ name: 'Sách Trí Tuệ Pet', qty: res.totalSach.toLocaleString() }];
  renderSubBreakdown('sub-pet_tai_nang', `Sách Tài Năng: Cấp ${s} → Cấp ${validTarget}`, ['Cấp Sách', 'Sách Trí Tuệ Cần', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   16. HÓA THẦN TU LUYỆN
   ──────────────────────────────────────────────────────────── */
function renderHoaThanTuLuyen() {
  const tbody = document.getElementById('hoaThanTuLuyenTableBody');
  if (!tbody || typeof HoaThanTuLuyenData === 'undefined') return;
  tbody.innerHTML = HoaThanTuLuyenData.tiers.map(r => `
    <tr>
      <td><strong>${r.tier}</strong></td>
      <td class="gold">${(r.daHoaThan || 0).toLocaleString()}</td>
      <td>${r.tl3_lv1 || '-'}</td><td>${r.tl3_lv2 || '-'}</td><td>${r.tl3_lv3 || '-'}</td>
      <td>${r.tl3_lv4 || '-'}</td><td>${r.tl3_lv5 || '-'}</td>
    </tr>`).join('');
}

function updateHoaThanTuLuyenCalc() {
  const s = parseInt(document.getElementById('hoaThanStartTier')?.value || '0');
  const t = parseInt(document.getElementById('hoaThanTargetTier')?.value || '10');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateHoaThanTuLuyen(s, validTarget);
  animateVal('resHoaThanDa', res.totalDa);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.da.toLocaleString()} Đá Hóa Thần`,
    `Tích lũy: ${b.cumDa.toLocaleString()} Đá`
  ]);
  const goalItems = [{ name: 'Đá Hóa Thần', qty: res.totalDa.toLocaleString() }];
  renderSubBreakdown('sub-hoa_than_tu_luyen', `Hóa Thần Tu Luyện: Bậc ${s} → Bậc ${validTarget}`, ['Bậc Đột Phá', 'Đá Hóa Thần Cần', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   17. NGỌC VŨ KHÍ
   ──────────────────────────────────────────────────────────── */
function renderNgocVuKhi() {
  const tbody = document.getElementById('ngocVuKhiTableBody');
  if (!tbody || typeof NgocVuKhiData === 'undefined') return;
  tbody.innerHTML = NgocVuKhiData.levels.map(r => `
    <tr>
      <td><strong>${r.level}</strong></td>
      <td class="cyan">${(r.daCan || 0).toLocaleString()} Đá</td>
    </tr>`).join('');
}

function updateNgocVuKhiCalc() {
  const s = parseInt(document.getElementById('ngocVuKhiStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('ngocVuKhiTargetLevel')?.value || '20');
  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateNgocVuKhi(s, validTarget);
  animateVal('resNgocVuKhiDa', res.totalDa);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.da.toLocaleString()} Đá Nâng Cấp`,
    `Tích lũy: ${b.cumDa.toLocaleString()} Đá`
  ]);
  const goalItems = [{ name: 'Đá Nâng Cấp Ngọc Vũ Khí', qty: res.totalDa.toLocaleString() }];
  renderSubBreakdown('sub-ngoc_vu_khi', `Ngọc Vũ Khí: Cấp ${s} → Cấp ${validTarget}`, ['Cấp Độ Ngọc', 'Đá Cần Nâng', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   18. THẦN HỘ MỆNH (EXP 1 -> 70 & LINH BẢO PHA LÊ / LINH NGUYÊN)
   ──────────────────────────────────────────────────────────── */
function renderThanHoMenh() {
  const tbody = document.getElementById('thmTableBody');
  const selStart = document.getElementById('thmStartLevel');
  const selTarget = document.getElementById('thmTargetLevel');

  if (typeof ThanHoMenhData === 'undefined') return;

  // Populate dropdowns
  if (selStart && selTarget) {
    let startOpts = '<option value="1" selected>Cấp 1</option>';
    let targetOpts = '';
    for (let lv = 2; lv <= 70; lv++) {
      startOpts += `<option value="${lv}">Cấp ${lv}</option>`;
      targetOpts += `<option value="${lv}" ${lv === 70 ? 'selected' : ''}>Cấp ${lv}${lv === 70 ? ' (MAX)' : ''}</option>`;
    }
    selStart.innerHTML = startOpts;
    selTarget.innerHTML = targetOpts;
  }

  let totExp4 = 0, totExp5 = 0, totPhaLe = 0, totLinhNguyen = 0;

  if (tbody) {
    tbody.innerHTML = ThanHoMenhData.levels.map(r => {
      totExp4 += (r.exp4Star || 0);
      totExp5 += (r.exp5Star || 0);
      totPhaLe += (r.phaLe || 0);
      totLinhNguyen += (r.linhNguyen || 0);

      return `
        <tr>
          <td><strong>Lên Lv ${r.level}</strong></td>
          <td class="cyan">${(r.exp4Star || 0).toLocaleString()}</td>
          <td class="gold">${(r.exp5Star || 0).toLocaleString()}</td>
          <td class="purple">${r.phaLe > 0 ? r.phaLe.toLocaleString() : '-'}</td>
          <td style="color:${r.linhNguyen > 0 ? '#ff5252' : 'inherit'};font-weight:${r.linhNguyen > 0 ? '800' : 'normal'};">
            ${r.linhNguyen > 0 ? r.linhNguyen : '-'}
          </td>
        </tr>`;
    }).join('');
  }

  // Footer totals
  const footExp4 = document.getElementById('thmFootExp4');
  const footExp5 = document.getElementById('thmFootExp5');
  const footPhaLe = document.getElementById('thmFootPhaLe');
  const footLinhNguyen = document.getElementById('thmFootLinhNguyen');

  if (footExp4) footExp4.innerText = `${totExp4.toLocaleString()} EXP`;
  if (footExp5) footExp5.innerText = `${totExp5.toLocaleString()} EXP`;
  if (footPhaLe) footPhaLe.innerText = `${totPhaLe.toLocaleString()} Pha Lê`;
  if (footLinhNguyen) footLinhNguyen.innerText = `${totLinhNguyen.toLocaleString()} Linh Nguyên`;
}

function updateThanHoMenhCalc() {
  const starType = document.getElementById('thmStarType')?.value || '5Star';
  const s = parseInt(document.getElementById('thmStartLevel')?.value || '1');
  const t = parseInt(document.getElementById('thmTargetLevel')?.value || '70');

  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateThanHoMenh(s, validTarget, starType);

  animateVal('resThmExp', res.totalExpNeeded);
  animateVal('resThmPhaLe', res.totalPhaLe);
  animateVal('resThmLinhNguyen', res.totalLinhNguyen);

  const rows = res.breakdown.map(b => [
    b.step,
    `${(starType === '4Star' ? b.exp4Star : b.exp5Star).toLocaleString()} EXP`,
    b.phaLe > 0 ? `${b.phaLe.toLocaleString()} Pha Lê` : '-',
    b.linhNguyen > 0 ? `${b.linhNguyen} Linh Nguyên` : '-',
    `Lũy kế: ${b.cumExp.toLocaleString()} EXP`
  ]);

  const goalItems = [
    { name: `EXP Thần Hộ Mệnh (${starType === '4Star' ? '4 Sao' : '5 Sao'})`, qty: res.totalExpNeeded.toLocaleString() },
    { name: 'Pha Lê (Linh Bảo)', qty: res.totalPhaLe.toLocaleString() }
  ];
  if (res.totalLinhNguyen > 0) {
    goalItems.push({ name: 'Linh Nguyên (Linh Bảo)', qty: res.totalLinhNguyen.toLocaleString() });
  }

  renderSubBreakdown(
    'sub-than_ho_menh',
    `Thần Hộ Mệnh (${starType === '4Star' ? '4 Sao' : '5 Sao'}): Cấp ${s} → Cấp ${validTarget}`,
    ['Mốc Cấp Độ', 'EXP Cần Dùng', 'Pha Lê', 'Linh Nguyên', 'Tích Lũy EXP'],
    rows,
    '',
    goalItems
  );
}

/* ────────────────────────────────────────────────────────────
   19. ĐỘT PHÁ THẺ BÀI (LEVEL 1 -> 30)
   ──────────────────────────────────────────────────────────── */
function renderTheBaiDotPha() {
  const tbody = document.getElementById('theBaiTableBody');
  const selStart = document.getElementById('theBaiStartLevel');
  const selTarget = document.getElementById('theBaiTargetLevel');

  if (typeof TheBaiDotPhaData === 'undefined') return;

  if (selStart && selTarget) {
    let startOpts = '<option value="0" selected>Cấp 0 (Chưa ĐP)</option>';
    let targetOpts = '';
    for (let lv = 1; lv <= 30; lv++) {
      startOpts += `<option value="${lv}">Cấp ${lv}</option>`;
      targetOpts += `<option value="${lv}" ${lv === 30 ? 'selected' : ''}>Cấp ${lv}${lv === 30 ? ' (MAX)' : ''}</option>`;
    }
    selStart.innerHTML = startOpts;
    selTarget.innerHTML = targetOpts;
  }

  let totDiemHon = 0, totDa = 0;
  if (tbody) {
    tbody.innerHTML = TheBaiDotPhaData.levels.map(r => {
      totDiemHon += r.diemHon;
      totDa += r.daDotPha;
      return `
        <tr>
          <td><strong>Cấp ${r.level}</strong></td>
          <td class="purple">${r.diemHon.toLocaleString()}</td>
          <td class="cyan">${r.daDotPha.toLocaleString()} Đá</td>
        </tr>`;
    }).join('');
  }

  const footDiemHon = document.getElementById('theBaiFootDiemHon');
  const footDa = document.getElementById('theBaiFootDa');
  if (footDiemHon) footDiemHon.innerText = `${totDiemHon.toLocaleString()} Điểm Hồn`;
  if (footDa) footDa.innerText = `${totDa.toLocaleString()} Đá`;
}

function updateTheBaiDotPhaCalc() {
  const s = parseInt(document.getElementById('theBaiStartLevel')?.value || '0');
  const t = parseInt(document.getElementById('theBaiTargetLevel')?.value || '30');

  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateTheBaiDotPha(s, validTarget);

  animateVal('resTheBaiDa', res.totalDaDotPha);
  animateVal('resTheBaiDiemHon', res.totalDiemHon);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.daDotPha.toLocaleString()} Đá Đột Phá`,
    `${b.diemHon.toLocaleString()} Điểm Hồn`,
    `Tích lũy: ${b.cumDa.toLocaleString()} Đá`
  ]);

  const goalItems = [
    { name: 'Đá Đột Phá Thẻ Bài', qty: res.totalDaDotPha.toLocaleString() },
    { name: 'Điểm Hồn Thẻ Bài', qty: res.totalDiemHon.toLocaleString() }
  ];

  renderSubBreakdown('sub-the_bai_dot_pha', `Đột Phá Thẻ Bài: Cấp ${s} → Cấp ${validTarget}`, ['Cấp Đột Phá', 'Đá ĐP Cần', 'Điểm Hồn', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   20. Ô TINH HẠCH THÚ CƯỠI (LEVEL 1 -> 10)
   ──────────────────────────────────────────────────────────── */
function renderTinhHachThuCuoi() {
  const tbody = document.getElementById('tinhHachTableBody');
  const selStart = document.getElementById('tinhHachStartLevel');
  const selTarget = document.getElementById('tinhHachTargetLevel');

  if (typeof TinhHachThuCuoiData === 'undefined') return;

  if (selStart && selTarget) {
    let startOpts = '<option value="1" selected>Cấp 1</option>';
    let targetOpts = '';
    for (let lv = 2; lv <= 10; lv++) {
      startOpts += `<option value="${lv}">Cấp ${lv}</option>`;
      targetOpts += `<option value="${lv}" ${lv === 10 ? 'selected' : ''}>Cấp ${lv}${lv === 10 ? ' (MAX)' : ''}</option>`;
    }
    selStart.innerHTML = startOpts;
    selTarget.innerHTML = targetOpts;
  }

  if (tbody) {
    tbody.innerHTML = TinhHachThuCuoiData.levels.map(r => `
      <tr>
        <td><strong>Lên Lv ${r.level}</strong></td>
        <td class="cyan">${r.ketTinh.toLocaleString()}</td>
        <td class="gold">${r.thuocTuyetCanh.toLocaleString()}</td>
      </tr>
    `).join('');
  }
}

function updateTinhHachThuCuoiCalc() {
  const s = parseInt(document.getElementById('tinhHachStartLevel')?.value || '1');
  const t = parseInt(document.getElementById('tinhHachTargetLevel')?.value || '10');

  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculateTinhHachThuCuoi(s, validTarget);

  animateVal('resTinhHachKetTinh', res.totalKetTinh);
  animateVal('resTinhHachThuoc', res.totalThuocTuyetCanh);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.ketTinh.toLocaleString()} Kết Tinh`,
    `${b.thuocTuyetCanh.toLocaleString()} Thuốc Tuyệt Cảnh`,
    `Tích lũy: ${b.cumKetTinh.toLocaleString()} Kết Tinh`
  ]);

  const goalItems = [
    { name: 'Kết Tinh Thuần Túy', qty: res.totalKetTinh.toLocaleString() },
    { name: 'Thuốc Tuyệt Cảnh', qty: res.totalThuocTuyetCanh.toLocaleString() }
  ];

  renderSubBreakdown('sub-tinh_hach_thu_cuoi', `Ô Tinh Hạch: Cấp ${s} → Cấp ${validTarget}`, ['Mốc Cấp Độ', 'Kết Tinh Cần', 'Thuốc TC Cần', 'Lũy Kế'], rows, '', goalItems);
}

/* ────────────────────────────────────────────────────────────
   21. CÁ TÍNH PET (LEVEL 1 -> 60 & ĐÁ TÍN NHIỆM)
   ──────────────────────────────────────────────────────────── */
function renderPetCaTinh() {
  const tbody = document.getElementById('caTinhTableBody');
  const selStart = document.getElementById('caTinhStartLevel');
  const selTarget = document.getElementById('caTinhTargetLevel');

  if (typeof PetCaTinhData === 'undefined') return;

  if (selStart && selTarget) {
    let startOpts = '<option value="1" selected>Cấp 1</option>';
    let targetOpts = '';
    for (let lv = 2; lv <= 60; lv++) {
      startOpts += `<option value="${lv}">Cấp ${lv}</option>`;
      targetOpts += `<option value="${lv}" ${lv === 60 ? 'selected' : ''}>Cấp ${lv}${lv === 60 ? ' (MAX)' : ''}</option>`;
    }
    selStart.innerHTML = startOpts;
    selTarget.innerHTML = targetOpts;
  }

  let totDa = 0;
  if (tbody) {
    tbody.innerHTML = PetCaTinhData.levels.map(r => {
      totDa += r.daTinNhiem;
      return `
        <tr>
          <td><strong>Lên Lv ${r.level}</strong></td>
          <td class="cyan">${r.daTinNhiem.toLocaleString()} Đá Tín Nhiệm</td>
        </tr>`;
    }).join('');
  }

  const footDa = document.getElementById('caTinhFootDa');
  if (footDa) footDa.innerText = `${totDa.toLocaleString()} Đá Tín Nhiệm`;
}

function updatePetCaTinhCalc() {
  const s = parseInt(document.getElementById('caTinhStartLevel')?.value || '1');
  const t = parseInt(document.getElementById('caTinhTargetLevel')?.value || '60');

  if (typeof CalculatorEngine === 'undefined') return;
  const validTarget = Math.max(s + 1, t);
  const res = CalculatorEngine.calculatePetCaTinh(s, validTarget);

  animateVal('resCaTinhDa', res.totalDaTinNhiem);

  const rows = res.breakdown.map(b => [
    b.step,
    `${b.daTinNhiem.toLocaleString()} Đá Tín Nhiệm`,
    `Tích lũy: ${b.cumDa.toLocaleString()} Đá`
  ]);

  const goalItems = [
    { name: 'Đá Tín Nhiệm (Cá Tính Pet)', qty: res.totalDaTinNhiem.toLocaleString() }
  ];

  renderSubBreakdown('sub-pet_ca_tinh', `Cá Tính Pet: Cấp ${s} → Cấp ${validTarget}`, ['Mốc Cấp Độ', 'Đá Tín Nhiệm Cần', 'Lũy Kế'], rows, '', goalItems);
}
