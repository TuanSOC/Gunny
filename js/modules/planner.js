/* ============================================================
   GUNNY MASTER — Character Planner & Goal Tracker UI Module
   ============================================================ */

import { save, load, formatNumber, showToast } from './utils.js';
import { playCyberClickSound } from './cyberEffects.js';

const STORAGE_KEY_CHARS = 'gunny_characters_v1';
const STORAGE_KEY_ACTIVE_ID = 'gunny_active_char_id_v1';
const STORAGE_KEY_INVENTORY = 'gunny_inventory_v1';

let characters = [];
let activeChar = null;
let currentInventory = {};

// Resource label and unit mapping
const RESOURCE_LABELS = {
  da: 'Đá Gia Công',
  dong: 'Đồng Gia Công',
  bac: 'Bạc Gia Công',
  vang: 'Vàng Gia Công',
  ngoc: 'Ngọc Gia Công',
  coThienDiep: 'Cỏ Thiên Điệp (Pet)',
  thuocToaKy: 'Thuốc Tọa Kỵ',
  daPhuMa: 'Đá Phụ Ma',
  xuVatTo: 'Xu / Vé Vật Tổ (Cóc 7)',
  kimCuongDucHon: 'Kim Cương Đúc Hồn',
  chienHonDon: 'Chiến Hồn Đơn',
  diemManhHoa: 'Điểm Manh Hóa',
  manhNgocThuCuoi: 'Mảnh Ngọc Thú Cưỡi',
  manhNgocLam: 'Mảnh Ngọc Lam',
  vatTeMieuThan: 'Vật Tế Miếu Thần',
  linhNgoc: 'Linh Ngọc (Linh Hạch)',
  sachTriTue: 'Sách Trí Tuệ (Tài Năng)',
  daHoaThan: 'Đá Hóa Thần',
  daNgocVuKhi: 'Đá Ngọc Vũ Khí',
  expThanHoMenh: 'EXP Thần Hộ Mệnh',
  phaLe: 'Pha Lê (Linh Bảo THM)',
  linhNguyen: 'Linh Nguyên (Linh Bảo THM)',
  daDotPha: 'Đá Đột Phá Thẻ Bài',
  ketTinhThuanTuy: 'Kết Tinh Thuần Túy (Tinh Hạch)',
  thuocTuyetCanh: 'Thuốc Tuyệt Cảnh (Tinh Hạch)'
};

export function initCharacterPlanner() {
  if (typeof PlannerEngine === 'undefined' || typeof ResourceEngine === 'undefined') {
    console.warn('[Planner] PlannerEngine or ResourceEngine not loaded');
    return;
  }

  loadCharacters();
  loadInventory();
  renderCharacterSwitcher();
  renderPlannerGrids();
  bindPlannerEvents();
  recalculatePlanner();
}

function loadCharacters() {
  const saved = load(STORAGE_KEY_CHARS, null);
  if (Array.isArray(saved) && saved.length > 0) {
    characters = saved;
  } else {
    // Default character
    const defaultChar = PlannerEngine.createDefaultCharacter('Tuấn Main (Chiến Thần)');
    characters = [defaultChar];
    save(STORAGE_KEY_CHARS, characters);
  }

  const activeId = load(STORAGE_KEY_ACTIVE_ID, characters[0].id);
  activeChar = characters.find(c => c.id === activeId) || characters[0];
}

function saveCharacters() {
  save(STORAGE_KEY_CHARS, characters);
  if (activeChar) {
    save(STORAGE_KEY_ACTIVE_ID, activeChar.id);
  }
}

function loadInventory() {
  currentInventory = load(STORAGE_KEY_INVENTORY, {
    da: 500,
    dong: 100,
    bac: 50,
    vang: 20,
    ngoc: 10,
    coThienDiep: 2000,
    thuocToaKy: 50,
    daPhuMa: 1000,
    xuVatTo: 50000,
    kimCuongDucHon: 100,
    chienHonDon: 500,
    diemManhHoa: 100,
    manhNgocThuCuoi: 50,
    manhNgocLam: 50,
    vatTeMieuThan: 200,
    linhNgoc: 100,
    sachTriTue: 100,
    daHoaThan: 50,
    daNgocVuKhi: 50,
    expThanHoMenh: 50000,
    phaLe: 1000,
    linhNguyen: 10,
    daDotPha: 1000,
    ketTinhThuanTuy: 500,
    thuocTuyetCanh: 2000
  });
}

function saveInventory() {
  save(STORAGE_KEY_INVENTORY, currentInventory);
}

function renderCharacterSwitcher() {
  const sel = document.getElementById('charSelect');
  if (!sel) return;

  sel.innerHTML = characters.map(c => `
    <option value="${c.id}" ${c.id === activeChar.id ? 'selected' : ''}>
      👤 ${c.name} (Lv ${c.level || 70} — LC: ${formatNumber(c.battlePower || 5000000)})
    </option>
  `).join('');

  const nameInput = document.getElementById('charNameInput');
  const levelInput = document.getElementById('charLevelInput');
  const powerInput = document.getElementById('charPowerInput');

  if (nameInput) nameInput.value = activeChar.name || '';
  if (levelInput) levelInput.value = activeChar.level || 70;
  if (powerInput) powerInput.value = activeChar.battlePower || 5000000;
}

function renderPlannerGrids() {
  const curContainer = document.getElementById('currentSystemsContainer');
  const tgtContainer = document.getElementById('targetGoalsContainer');
  if (!curContainer || !tgtContainer || !activeChar) return;

  const metadata = PlannerEngine.SYSTEM_METADATA;

  // Render Current State inputs
  curContainer.innerHTML = Object.keys(metadata).map(key => {
    const meta = metadata[key];
    const curVal = activeChar.systems[key] ?? meta.min;

    let optionsHtml = '';
    for (let lv = meta.min; lv <= meta.max; lv++) {
      optionsHtml += `<option value="${lv}" ${lv === curVal ? 'selected' : ''}>${meta.unit} ${lv}${lv === meta.max ? ' (MAX)' : ''}</option>`;
    }

    return `
      <div class="system-row-item">
        <div class="system-label">
          <span>⚙️</span> ${meta.name}
        </div>
        <div class="system-input-wrap">
          <select class="input-select cur-sys-select" data-key="${key}">
            ${optionsHtml}
          </select>
        </div>
      </div>
    `;
  }).join('');

  // Render Target Goals inputs
  renderTargetGoalOptions();
}

function renderTargetGoalOptions() {
  const tgtContainer = document.getElementById('targetGoalsContainer');
  if (!tgtContainer || !activeChar) return;

  const metadata = PlannerEngine.SYSTEM_METADATA;

  tgtContainer.innerHTML = Object.keys(metadata).map(key => {
    const meta = metadata[key];
    const curVal = activeChar.systems[key] ?? meta.min;
    const tgtVal = activeChar.targets?.[key] ?? Math.min(meta.max, curVal + 2);

    let optionsHtml = '';
    for (let lv = curVal; lv <= meta.max; lv++) {
      optionsHtml += `<option value="${lv}" ${lv === tgtVal ? 'selected' : ''}>${meta.unit} ${lv}${lv === meta.max ? ' (MAX)' : ''}</option>`;
    }

    return `
      <div class="system-row-item">
        <div class="system-label">
          <span>🎯</span> ${meta.name}
        </div>
        <div class="system-input-wrap">
          <select class="input-select tgt-sys-select" data-key="${key}">
            ${optionsHtml}
          </select>
        </div>
      </div>
    `;
  }).join('');

  // Bind change events on target selects
  tgtContainer.querySelectorAll('.tgt-sys-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const key = e.target.dataset.key;
      if (!activeChar.targets) activeChar.targets = {};
      activeChar.targets[key] = parseInt(e.target.value);
      saveCharacters();
      recalculatePlanner();
    });
  });
}

function bindPlannerEvents() {
  // Switch Character
  const charSel = document.getElementById('charSelect');
  charSel?.addEventListener('change', (e) => {
    playCyberClickSound();
    const id = e.target.value;
    activeChar = characters.find(c => c.id === id) || characters[0];
    save(STORAGE_KEY_ACTIVE_ID, activeChar.id);
    renderCharacterSwitcher();
    renderPlannerGrids();
    recalculatePlanner();
  });

  // Create New Character
  document.getElementById('btnNewChar')?.addEventListener('click', () => {
    playCyberClickSound();
    const name = prompt('Nhập tên nhân vật mới:', `Gunner ${characters.length + 1}`);
    if (name && name.trim()) {
      const newChar = PlannerEngine.createDefaultCharacter(name.trim());
      characters.push(newChar);
      activeChar = newChar;
      saveCharacters();
      renderCharacterSwitcher();
      renderPlannerGrids();
      recalculatePlanner();
      showToast(`✨ Đã tạo nhân vật "${newChar.name}" thành công!`);
    }
  });

  // Duplicate Character
  document.getElementById('btnDuplicateChar')?.addEventListener('click', () => {
    playCyberClickSound();
    if (!activeChar) return;
    const cloned = JSON.parse(JSON.stringify(activeChar));
    cloned.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    cloned.name = activeChar.name + ' (Bản sao)';
    cloned.createdAt = new Date().toISOString();
    characters.push(cloned);
    activeChar = cloned;
    saveCharacters();
    renderCharacterSwitcher();
    renderPlannerGrids();
    recalculatePlanner();
    showToast(`📋 Đã nhân bản nhân vật "${cloned.name}"!`);
  });

  // Delete Character
  document.getElementById('btnDeleteChar')?.addEventListener('click', () => {
    playCyberClickSound();
    if (characters.length <= 1) {
      alert('Không thể xóa nhân vật duy nhất. Hãy tạo nhân vật mới trước khi xóa!');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa nhân vật "${activeChar.name}" không?`)) {
      characters = characters.filter(c => c.id !== activeChar.id);
      activeChar = characters[0];
      saveCharacters();
      renderCharacterSwitcher();
      renderPlannerGrids();
      recalculatePlanner();
      showToast('🗑️ Đã xóa nhân vật thành công!');
    }
  });

  // Edit Char info (Name, Level, Power)
  const saveInfo = () => {
    if (!activeChar) return;
    activeChar.name = document.getElementById('charNameInput')?.value || activeChar.name;
    activeChar.level = parseInt(document.getElementById('charLevelInput')?.value || '70');
    activeChar.battlePower = parseInt(document.getElementById('charPowerInput')?.value || '5000000');
    saveCharacters();
    renderCharacterSwitcher();
  };

  document.getElementById('charNameInput')?.addEventListener('change', saveInfo);
  document.getElementById('charLevelInput')?.addEventListener('change', saveInfo);
  document.getElementById('charPowerInput')?.addEventListener('change', saveInfo);

  // Current system selects change
  document.getElementById('currentSystemsContainer')?.addEventListener('change', (e) => {
    if (e.target.classList.contains('cur-sys-select')) {
      const key = e.target.dataset.key;
      const val = parseInt(e.target.value);
      activeChar.systems[key] = val;

      // Adjust target if needed
      if (!activeChar.targets) activeChar.targets = {};
      if ((activeChar.targets[key] || 0) < val) {
        activeChar.targets[key] = val;
      }

      saveCharacters();
      renderTargetGoalOptions();
      recalculatePlanner();
    }
  });

  // Copy Plan Report
  document.getElementById('btnCopyPlanReport')?.addEventListener('click', () => {
    playCyberClickSound();
    copyPlanToClipboard();
  });
}

function recalculatePlanner() {
  if (!activeChar || typeof PlannerEngine === 'undefined' || typeof ResourceEngine === 'undefined') return;

  const currentSystems = activeChar.systems || {};
  const targetGoals = activeChar.targets || {};

  const plan = PlannerEngine.planMultiGoals(currentSystems, targetGoals);

  // Update Progress Bar
  const progressFill = document.getElementById('planProgressFill');
  const progressText = document.getElementById('planProgressText');
  const progressVal = plan.overallProgress || 0;

  if (progressFill) progressFill.style.width = `${progressVal}%`;
  if (progressText) progressText.innerText = `${progressVal}%`;

  // Deficit Calculation
  const deficitResult = ResourceEngine.calculateDeficit(plan.aggregatedResources, currentInventory);

  renderDeficitTable(deficitResult);
  renderPlanBreakdown(plan);
}

function renderDeficitTable(deficitResult) {
  const tbody = document.getElementById('plannerDeficitTableBody');
  if (!tbody) return;

  const items = deficitResult.summary || [];
  if (items.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;color:var(--text-muted);padding:20px;">
          🎉 Nhân vật đã đạt mục tiêu hoặc chưa thiết lập mục tiêu nâng cấp nào!
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = items.map(item => {
    const label = RESOURCE_LABELS[item.resource] || item.resource;
    const isMet = item.isMet;
    const missingAmount = item.missing || 0;
    const avail = item.available || 0;

    return `
      <tr>
        <td><strong>${label}</strong></td>
        <td class="gold">${item.required.toLocaleString()}</td>
        <td>
          <input type="number" class="inventory-input-pill" data-res="${item.resource}" value="${avail}" min="0">
        </td>
        <td style="color:${missingAmount > 0 ? '#ff5252' : '#00e676'};font-weight:700;">
          ${missingAmount > 0 ? `-${missingAmount.toLocaleString()}` : '0 (Đủ)'}
        </td>
        <td>
          <span class="status-tag ${isMet ? 'met' : 'missing'}">
            ${isMet ? '✅ Đủ Tài Nguyên' : '❌ Còn Thiếu'}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  // Bind inventory input live change
  tbody.querySelectorAll('.inventory-input-pill').forEach(input => {
    input.addEventListener('change', (e) => {
      const resKey = e.target.dataset.res;
      currentInventory[resKey] = Math.max(0, parseInt(e.target.value) || 0);
      saveInventory();
      recalculatePlanner();
    });
  });
}

function renderPlanBreakdown(plan) {
  const container = document.getElementById('plannerBreakdownList');
  if (!container) return;

  const systemKeys = Object.keys(plan.systemPlans || {});
  if (systemKeys.length === 0) {
    container.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:14px;">Chưa có mục tiêu nâng cấp nào cần thực hiện.</div>`;
    return;
  }

  container.innerHTML = systemKeys.map(key => {
    const p = plan.systemPlans[key];
    const resEntries = Object.entries(p.requiredResources || {})
      .map(([rk, val]) => `${val.toLocaleString()} ${RESOURCE_LABELS[rk] || rk}`)
      .join(' • ');

    return `
      <div class="level-breakdown-card" style="margin-bottom:12px;padding:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
          <h4 style="margin:0;font-size:14px;color:var(--cyan);font-weight:800;">
            🚀 ${p.systemName}: Cấp ${p.currentLevel} → Cấp ${p.targetLevel} (${p.steps} Bước nâng)
          </h4>
          <span class="badge gold">${resEntries}</span>
        </div>
      </div>
    `;
  }).join('');
}

function copyPlanToClipboard() {
  if (!activeChar) return;
  const plan = PlannerEngine.planMultiGoals(activeChar.systems || {}, activeChar.targets || {});
  const deficit = ResourceEngine.calculateDeficit(plan.aggregatedResources, currentInventory);

  let text = `📋 [BÁO CÁO KẾ HOẠCH NHÂN VẬT GUNNY - PMT MASTER]\n`;
  text += `👤 Nhân vật: ${activeChar.name} (Lv ${activeChar.level || 70} | LC: ${formatNumber(activeChar.battlePower || 5000000)})\n`;
  text += `📊 Tiến độ hoàn thành mục tiêu: ${plan.overallProgress}%\n\n`;

  text += `🎯 CÁC MỤC TIÊU NÂNG CẤP:\n`;
  Object.keys(plan.systemPlans || {}).forEach(k => {
    const p = plan.systemPlans[k];
    text += `• ${p.systemName}: Cấp ${p.currentLevel} → Cấp ${p.targetLevel} (${p.steps} bước)\n`;
  });

  text += `\n📦 TỔNG NGUYÊN LIỆU CẦN THIẾT & THÂM HỤT:\n`;
  (deficit.summary || []).forEach(item => {
    const label = RESOURCE_LABELS[item.resource] || item.resource;
    text += `• ${label}: Cần ${item.required.toLocaleString()} | Có ${item.available.toLocaleString()} | ${item.missing > 0 ? `Thiếu ${item.missing.toLocaleString()}` : 'Đủ'}\n`;
  });

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Đã sao chép toàn bộ kế hoạch nhân vật vào bộ nhớ tạm!');
    });
  }
}
