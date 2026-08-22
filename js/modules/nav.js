/* ============================================================
   PMT GUNNY MASTER — Navigation & Command Palette Module
   ============================================================ */

import { save, load } from './utils.js';
import { playCyberClickSound } from './cyberEffects.js';

export function initNavigation() {
  const mainTabs  = document.querySelectorAll('.main-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function activateMainTab(tabId) {
    mainTabs.forEach(t => t.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    const tab = [...mainTabs].find(t => t.dataset.tab === tabId) || mainTabs[0];
    if (tab) tab.classList.add('active');

    const panel = document.getElementById(tab ? tab.dataset.tab : tabId);
    if (panel) panel.classList.add('active');
    if (tab) save('activeMainTab', tab.dataset.tab);
    playCyberClickSound();
  }

  activateMainTab(load('activeMainTab', 'tab-refining'));
  mainTabs.forEach(t => t.addEventListener('click', () => activateMainTab(t.dataset.tab)));

  // Master Dropdown & Hub Tiles Switcher
  const masterSel = document.getElementById('masterTableSelect');
  const subPanels = document.querySelectorAll('.sub-panel');
  const hubTiles  = document.querySelectorAll('.hub-tile');

  function showSubPanel(key, shouldScroll = false) {
    subPanels.forEach(sp => sp.classList.remove('active'));
    const target = document.getElementById(`sub-${key}`);
    if (target) {
      target.classList.add('active');
      if (shouldScroll) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (masterSel && masterSel.value !== key) {
      masterSel.value = key;
    }

    hubTiles.forEach(tile => {
      tile.classList.toggle('active', tile.dataset.target === key);
    });

    save('masterTableKey', key);
    playCyberClickSound();
  }

  const savedMasterTable = load('masterTableKey', 'refining');
  showSubPanel(savedMasterTable);

  masterSel?.addEventListener('change', () => {
    showSubPanel(masterSel.value, true);
  });

  hubTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const targetKey = tile.dataset.target;
      if (targetKey) {
        showSubPanel(targetKey, true);
      }
    });
  });

  // Init Smart Command Palette (Ctrl + K)
  initCommandPalette(activateMainTab, showSubPanel);
}

/* ════════════════════════════════════════════════════════════
   SMART COMMAND PALETTE (CTRL + K)
   ════════════════════════════════════════════════════════════ */
function initCommandPalette(activateMainTab, showSubPanel) {
  const modal       = document.getElementById('commandPaletteModal');
  const btnOpen     = document.getElementById('btnOpenCommandPalette');
  const btnClose    = document.getElementById('btnClosePalette');
  const searchInput = document.getElementById('paletteSearchInput');
  const resultsList = document.getElementById('paletteResultsList');

  if (!modal || !searchInput || !resultsList) return;

  const searchableIndex = [
    { title: '💎 Gia Công (Lv 0 → 14 MAX)', sub: 'Bảng tính nguyên liệu đá, đồng, bạc, vàng, ngọc', tab: 'tab-refining', target: 'refining' },
    { title: '🌿 Tiến Hóa Pet (Cỏ Thiên Điệp Lv 1 → 50)', sub: 'Bảng nguyên liệu cỏ tiến hóa pet', tab: 'tab-refining', target: 'pet_evolution' },
    { title: '🔮 EXP Ma Thạch (Lv 2 → 10)', sub: 'Bảng exp ma thạch thường, ưu tú, truyền thuyết', tab: 'tab-refining', target: 'magic_stones_exp' },
    { title: '💎 Quy Đổi Châu Báu (Cb 13 → 21)', sub: 'Tỷ lệ tương đương và số lượng đổi chuẩn', tab: 'tab-refining', target: 'jewel_conversion' },
    { title: '🐴 Tọa Kỵ Đơn & Tăng Cấp Thú Cưỡi', sub: 'Bảng nâng cấp thú cưỡi, đan thú cưỡi', tab: 'tab-refining', target: 'mount_up' },
    { title: '📜 Phụ Ma & Phụ Ma Đơn', sub: 'Bảng tiêu hao phụ ma đơn từng bậc', tab: 'tab-refining', target: 'phu_ma' },
    { title: '🔥 Vật Tổ (Level 1 → 100 MAX)', sub: 'Bảng chi phí vàng và exp vật tổ', tab: 'tab-refining', target: 'vat_to' },
    { title: '⚡ Đúc Hồn (Lv 1 → 100 MAX)', sub: 'Bảng đúc hồn vũ khí, nón, áo', tab: 'tab-refining', target: 'duc_hon' },
    { title: '⚔️ Chiến Hồn Đơn (Lv 1 → 100 MAX)', sub: 'Bảng chiến hồn đơn từng cấp', tab: 'tab-refining', target: 'chien_hon' },
    { title: '🐾 Manh Hóa Pet (Mốc 1 → 50 MAX)', sub: 'Bảng tích lũy điểm manh hóa pet', tab: 'tab-refining', target: 'manh_hoa_pet' },
    { title: '✨ Ngọc Thú Cưới (Lv 1 → 25 MAX)', sub: 'Bảng mảnh nâng ngọc thú cưỡi', tab: 'tab-refining', target: 'ngoc_thu_cuoi' },
    { title: '💎 Mảnh Ngọc Lam (Level 1 → 25 MAX)', sub: 'Bảng tích lũy mảnh ngọc lam', tab: 'tab-refining', target: 'manh_ngoc_lam' },
    { title: '🏛️ Miếu Thần (Level 1 → 20 MAX)', sub: 'Bảng vật tế miếu thần và mốc dâng hương', tab: 'tab-refining', target: 'mieu_than' },
    { title: '🔮 Linh Hạch Pet (Bậc 1 → 10 MAX)', sub: 'Bảng linh ngọc và mảnh linh hạch', tab: 'tab-refining', target: 'pet_linh_hach' },
    { title: '📚 Tài Năng Pet (Level 1 → 100 MAX)', sub: 'Bảng sách trí tuệ và linh đan tài năng', tab: 'tab-refining', target: 'pet_tai_nang' },
    { title: '☀️ Hóa Thần Tu Luyện (Bậc 1 → 10 MAX)', sub: 'Bảng đá hóa thần và điểm tu luyện', tab: 'tab-refining', target: 'hoa_than' },
    { title: '⚔️ Ngọc Vũ Khí (Level 1 → 20 MAX)', sub: 'Bảng đá nâng cấp ngọc vũ khí', tab: 'tab-refining', target: 'ngoc_vu_khi' },
    { title: '👤 Kế Hoạch & Quản Lý Hồ Sơ Nhân Vật', sub: 'Tạo profile, thiết lập mục tiêu, kiểm tra kho và tài nguyên thiếu', tab: 'tab-planner', target: null },
    { title: '🎯 Thước Tính Góc 65° Chuẩn Toàn Năng', sub: 'Công thức 65 kinh điển, tính theo cự ly và gió', tab: 'tab-ballistics', target: null, formula: '65' },
    { title: '🚀 Thước Tính Góc Siêu Cao 90°', sub: 'Công thức siêu cao (90 - khoảng cách +- gió)', tab: 'tab-ballistics', target: null, formula: '90' },
    { title: '🎯 Thước Tính Góc 70° Chiều Sâu', sub: 'Công thức 70 bắn lựu đạn và tivi', tab: 'tab-ballistics', target: null, formula: '70' },
    { title: '🎯 Thước Tính Góc 50° Tầm Trung', sub: 'Công thức 50 địa hình phẳng và dốc', tab: 'tab-ballistics', target: null, formula: '50' },
    { title: '🎯 Thước Tính Góc 30° Đường Thẳng', sub: 'Công thức 30 đào đất và đục chân', tab: 'tab-ballistics', target: null, formula: '30' },
    { title: '🎯 Thước Tính Góc 20° Siêu Thấp', sub: 'Công thức 20 kháng gió cực mạnh', tab: 'tab-ballistics', target: null, formula: '20' },
    { title: '👗 Kho Thời Trang 540+ Trọn Bộ', sub: 'Danh mục set trang phục, cánh bay, bong bóng chat', tab: 'tab-fashion', target: null },
    { title: '👑 Dịch Vụ Gunny Trọn Gói (PMT Gaming)', sub: 'Up acc thuê, tối ưu tiêu xu, cày phó bản hằng ngày, đua top LC 8B+', tab: 'tab-services', target: null },
    { title: '📞 Liên Hệ PMT (Zalo & Facebook)', sub: 'Zalo: 0981.052.217 — Facebook: fb.com/tinyy139', tab: 'tab-services', target: null }
  ];

  function openPalette() {
    modal.classList.add('active');
    searchInput.value = '';
    renderResults('');
    setTimeout(() => searchInput.focus(), 50);
    playCyberClickSound();
  }

  function closePalette() {
    modal.classList.remove('active');
    playCyberClickSound();
  }

  function renderResults(q) {
    const query = q.trim().toLowerCase();
    const matches = searchableIndex.filter(item =>
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.sub.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsList.innerHTML = '<div class="palette-empty">Không tìm thấy tính năng nào phù hợp</div>';
      return;
    }

    resultsList.innerHTML = matches.map(item => `
      <div class="palette-item" data-tab="${item.tab}" data-target="${item.target || ''}" data-formula="${item.formula || ''}">
        <div class="palette-item-title">${item.title}</div>
        <div class="palette-item-sub">${item.sub}</div>
      </div>
    `).join('');

    resultsList.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const tab = el.dataset.tab;
        const target = el.dataset.target;
        const formula = el.dataset.formula;

        closePalette();
        activateMainTab(tab);

        if (target) {
          showSubPanel(target, true);
        }

        if (formula) {
          const btn = document.getElementById(`btn-f${formula}`);
          btn?.click();
        }
      });
    });
  }

  searchInput.addEventListener('input', (e) => renderResults(e.target.value));

  btnOpen?.addEventListener('click', openPalette);
  btnClose?.addEventListener('click', closePalette);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  // Bind Copy Zalo Phone button
  const btnCopyZalo = document.getElementById('btnCopyZaloPhone');
  btnCopyZalo?.addEventListener('click', () => {
    playCyberClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('0981052217').then(() => {
        const { showToast } = window;
        if (typeof showToast === 'function') {
          showToast('📋 Đã sao chép số điện thoại Zalo: 0981.052.217!');
        } else {
          alert('Đã sao chép SĐT: 0981052217');
        }
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('active') ? closePalette() : openPalette();
    } else if (e.key === 'Escape') {
      if (modal.classList.contains('active')) closePalette();
    } else if (!isTyping && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (e.key === '1') activateMainTab('tab-refining');
      else if (e.key === '2') activateMainTab('tab-planner');
      else if (e.key === '3') activateMainTab('tab-ballistics');
      else if (e.key === '4') activateMainTab('tab-fashion');
      else if (e.key === '5') activateMainTab('tab-services');
    }
  });
}
