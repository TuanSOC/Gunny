/* ============================================================
   PMT GUNNY MASTER — Navigation, Sidebar & Command Palette Module
   ============================================================ */

import { save, load, showToast } from './utils.js';
import { playCyberClickSound } from './cyberEffects.js';

export function initNavigation() {
  const appShell       = document.querySelector('.app-shell');
  const sidebarToggle  = document.getElementById('btnToggleSidebar');
  const mobileMenuBtn  = document.getElementById('btnMobileMenu');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const breadcrumbActive = document.getElementById('breadcrumbActive');

  const navItemBtns   = document.querySelectorAll('.nav-item-btn');
  const tabPanels     = document.querySelectorAll('.tab-panel');

  const tabTitles = {
    'tab-dashboard': 'Bảng Điều Khiển Tổng Quan',
    'tab-character': 'Hồ Sơ & Lực Chiến Nhân Vật',
    'tab-refining': '21 Bảng Tra Cứu Nguyên Liệu',
    'tab-ballistics': 'Thước Tính Góc & Quỹ Đạo AI',
    'tab-fashion': 'Kho Dữ Liệu Thời Trang 540+ Set',
    'tab-services': 'Dịch Vụ PMT Gaming & Liên Hệ'
  };

  // 1. Sidebar Collapse (Desktop)
  function updateSidebarState(collapsed) {
    if (!appShell) return;
    appShell.classList.toggle('sidebar-collapsed', collapsed);
    if (sidebarToggle) {
      sidebarToggle.innerHTML = collapsed ? '<span>▶</span>' : '<span>◀</span>';
      sidebarToggle.title = collapsed ? 'Mở rộng Sidebar' : 'Thu gọn Sidebar';
    }
    save('sidebar_collapsed', collapsed);
  }

  const isCollapsed = load('sidebar_collapsed', false);
  updateSidebarState(isCollapsed);

  sidebarToggle?.addEventListener('click', () => {
    playCyberClickSound();
    const willCollapse = !appShell.classList.contains('sidebar-collapsed');
    updateSidebarState(willCollapse);
  });

  // 2. Mobile Drawer Toggle
  function openMobileSidebar() {
    appShell?.classList.add('mobile-open');
    playCyberClickSound();
  }

  function closeMobileSidebar() {
    appShell?.classList.remove('mobile-open');
  }

  mobileMenuBtn?.addEventListener('click', openMobileSidebar);
  sidebarBackdrop?.addEventListener('click', closeMobileSidebar);

  // 3. Tab Switching
  function activateMainTab(tabId) {
    navItemBtns.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    const activeNavBtn = [...navItemBtns].find(btn => btn.dataset.tab === tabId) || navItemBtns[0];
    if (activeNavBtn) activeNavBtn.classList.add('active');

    const panel = document.getElementById(activeNavBtn ? activeNavBtn.dataset.tab : tabId);
    if (panel) panel.classList.add('active');

    if (breadcrumbActive && tabTitles[tabId]) {
      breadcrumbActive.textContent = tabTitles[tabId];
    }

    if (activeNavBtn) save('activeMainTab', activeNavBtn.dataset.tab);
    closeMobileSidebar();
    playCyberClickSound();
  }

  const savedTab = load('activeMainTab', 'tab-dashboard');
  activateMainTab(savedTab);

  navItemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      const targetSub = btn.dataset.target;
      if (tab) {
        activateMainTab(tab);
        if (targetSub) {
          showSubPanel(targetSub, true);
        }
      }
    });
  });

  // 4. Sub-panel Switching (Calculators)
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

  // Dynamic Navigation from Dashboard & Character Overview action cards
  document.querySelectorAll('[data-jump-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      const tab = el.dataset.jumpTab;
      const targetSub = el.dataset.jumpTarget;
      if (tab) {
        activateMainTab(tab);
        if (targetSub) {
          showSubPanel(targetSub, true);
        }
      }
    });
  });

  // 5. Global Search / Command Palette (Ctrl + K)
  initCommandPalette(activateMainTab, showSubPanel);

  // 6. PMT Service Promo Welcome Modal
  initServicePromoModal();
}

/* ════════════════════════════════════════════════════════════
   PMT SERVICE PROMO WELCOME MODAL
   ════════════════════════════════════════════════════════════ */
function initServicePromoModal() {
  const promoModal   = document.getElementById('pmtServicePromoModal');
  const btnOpenPromo = document.getElementById('btnOpenServiceModal');
  const btnClosePromo = document.getElementById('btnClosePromoModal');
  const btnExplore   = document.getElementById('btnPromoExplore');
  const btnCopyZalo  = document.getElementById('btnPromoCopyZalo');
  const chkDismiss   = document.getElementById('chkDismissPromoToday');

  if (!promoModal) return;

  function openPromo() {
    promoModal.classList.add('active');
    playCyberClickSound();
  }

  function closePromo() {
    promoModal.classList.remove('active');
    if (chkDismiss && chkDismiss.checked) {
      const today = new Date().toISOString().slice(0, 10);
      save('dismiss_service_promo_date', today);
    }
    playCyberClickSound();
  }

  btnOpenPromo?.addEventListener('click', openPromo);
  btnClosePromo?.addEventListener('click', closePromo);
  btnExplore?.addEventListener('click', closePromo);

  promoModal.addEventListener('click', (e) => {
    if (e.target === promoModal) closePromo();
  });

  btnCopyZalo?.addEventListener('click', () => {
    playCyberClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('0981052217').then(() => {
        showToast('📋 Đã sao chép SĐT Zalo PMT: 0981.052.217!');
      });
    }
  });

  // Auto show on first load if not dismissed today
  const today = new Date().toISOString().slice(0, 10);
  const dismissedDate = load('dismiss_service_promo_date', null);
  if (dismissedDate !== today) {
    setTimeout(() => {
      openPromo();
    }, 450);
  }
}

/* ════════════════════════════════════════════════════════════
   SMART COMMAND PALETTE (CTRL + K / CMD + K)
   ════════════════════════════════════════════════════════════ */
function initCommandPalette(activateMainTab, showSubPanel) {
  const modal       = document.getElementById('commandPaletteModal');
  const btnOpen     = document.getElementById('btnOpenCommandPalette');
  const btnClose    = document.getElementById('btnClosePalette');
  const searchInput = document.getElementById('paletteSearchInput');
  const resultsList = document.getElementById('paletteResultsList');

  if (!modal || !searchInput || !resultsList) return;

  const searchableIndex = [
    { title: '📊 Dashboard (Trang Chủ Hub)', sub: 'Tổng quan hệ thống, quick actions và thống kê', tab: 'tab-dashboard', target: null },
    { title: '👤 Hồ Sơ & Lực Chiến Nhân Vật', sub: 'Xem tổng quan lực chiến và tiến độ các hệ thống', tab: 'tab-character', target: null },
    { title: '💎 Gia Công (Lv 0 → 14 MAX)', sub: 'Bảng tính nguyên liệu đá, đồng, bạc, vàng, ngọc', tab: 'tab-refining', target: 'refining' },
    { title: '🌿 Tiến Hóa Pet (Cỏ Thiên Điệp Lv 1 → 50)', sub: 'Bảng nguyên liệu cỏ tiến hóa pet', tab: 'tab-refining', target: 'pet_evo' },
    { title: '🔮 EXP Ma Thạch (Lv 2 → 10)', sub: 'Bảng exp ma thạch thường, ưu tú, truyền thuyết', tab: 'tab-refining', target: 'magic_exp' },
    { title: '💎 Quy Đổi Châu Báu (Cb 13 → 21)', sub: 'Tỷ lệ tương đương và số lượng đổi chuẩn', tab: 'tab-refining', target: 'jewel_convert' },
    { title: '🐴 Tọa Kỵ Đơn & Tăng Cấp Thú Cưỡi', sub: 'Bảng nâng cấp 9 loại thú cưỡi, đan thú cưỡi', tab: 'tab-refining', target: 'mount_up' },
    { title: '📜 Phụ Ma & Phụ Ma Đơn', sub: 'Bảng tiêu hao phụ ma đơn từng bậc (1 → 5)', tab: 'tab-refining', target: 'phu_ma' },
    { title: '🔥 Vật Tổ (Level 1 → 50 MAX)', sub: 'Bảng chi phí 1 cọc và 7 cọc vật tổ', tab: 'tab-refining', target: 'vat_to' },
    { title: '⚡ Đúc Hồn (Đồng, Bạc, Vàng, Kim Cương)', sub: 'Bảng đúc hồn vũ khí, nón, áo', tab: 'tab-refining', target: 'duc_hon' },
    { title: '⚔️ Chiến Hồn Đơn (Lv 1 → 5 & Kim Hồn)', sub: 'Bảng chiến hồn đơn từng cấp 1 món / 3 món', tab: 'tab-refining', target: 'chien_hon' },
    { title: '🐾 Manh Hóa Pet (Mốc 1 → 29 MAX)', sub: 'Bảng tích lũy điểm manh hóa pet', tab: 'tab-refining', target: 'manh_hoa' },
    { title: '✨ Ngọc Thú Cưỡi (Ngọc 1 / 2 / 3)', sub: 'Bảng ngọc nâng cấp exp thú cưỡi', tab: 'tab-refining', target: 'ngoc_thu_cuoi' },
    { title: '💎 Mảnh Ngọc Lam (Level 1 → 9 MAX)', sub: 'Bảng tích lũy mảnh ngọc lam nâng cấp', tab: 'tab-refining', target: 'manh_ngoc_lam' },
    { title: '🏛️ Miếu Thần / Hóa Thần (Level 0 → 10)', sub: 'Bảng vật tế miếu thần và mốc dâng hương', tab: 'tab-refining', target: 'mieu_than' },
    { title: '🔮 Linh Hạch Pet (Cấp 1 → 17 MAX)', sub: 'Bảng linh ngọc, mảnh linh hạch và vàng', tab: 'tab-refining', target: 'pet_linh_hach' },
    { title: '📚 Tài Năng Pet (Sách Trí Tuệ Lv 1 → 10)', sub: 'Bảng sách trí tuệ nâng tài năng pet', tab: 'tab-refining', target: 'pet_tai_nang' },
    { title: '☀️ Hóa Thần Tu Luyện (Bậc 1 → 10 MAX)', sub: 'Bảng đá hóa thần và điểm tu luyện', tab: 'tab-refining', target: 'hoa_than_tu_luyen' },
    { title: '🎯 Ngọc Vũ Khí (Level 1 → 20 MAX)', sub: 'Bảng đá nâng cấp ngọc vũ khí', tab: 'tab-refining', target: 'ngoc_vu_khi' },
    { title: '🛡️ Thần Hộ Mệnh (Level 1 → 70 & Linh Bảo)', sub: 'Bảng EXP THM 4 Sao / 5 Sao, Pha Lê và Linh Nguyên', tab: 'tab-refining', target: 'than_ho_menh' },
    { title: '🃏 Đột Phá Thẻ Bài (Level 1 → 30 MAX)', sub: 'Bảng đá đột phá và điểm hồn thẻ bài', tab: 'tab-refining', target: 'the_bai_dot_pha' },
    { title: '💎 Ô Tinh Hạch Thú Cưỡi (Level 1 → 10 MAX)', sub: 'Bảng kết tinh thuần túy và thuốc tuyệt cảnh', tab: 'tab-refining', target: 'tinh_hach_thu_cuoi' },
    { title: '🐾 Cá Tính Pet (Level 1 → 60 MAX)', sub: 'Bảng đá tín nhiệm nâng cá tính pet', tab: 'tab-refining', target: 'pet_ca_tinh' },
    { title: '🎯 Thước Tính Góc 65° Chuẩn Toàn Năng', sub: 'Công thức 65 kinh điển, tính theo cự ly và gió', tab: 'tab-ballistics', target: null, formula: '65' },
    { title: '🚀 Thước Tính Góc Siêu Cao 90°', sub: 'Công thức siêu cao (90 - khoảng cách +- gió)', tab: 'tab-ballistics', target: null, formula: '90' },
    { title: '🎯 Thước Tính Góc 70° Chiều Sâu', sub: 'Công thức 70 bắn lựu đạn và tivi', tab: 'tab-ballistics', target: null, formula: '70' },
    { title: '🎯 Thước Tính Góc 50° Tầm Trung', sub: 'Công thức 50 địa hình phẳng và dốc', tab: 'tab-ballistics', target: null, formula: '50' },
    { title: '🎯 Thước Tính Góc 30° Đường Thẳng', sub: 'Công thức 30 đào đất và đục chân', tab: 'tab-ballistics', target: null, formula: '30' },
    { title: '🎯 Thước Tính Góc 20° Siêu Thấp', sub: 'Công thức 20 kháng gió cực mạnh', tab: 'tab-ballistics', target: null, formula: '20' },
    { title: '👗 Kho Thời Trang 540+ Trọn Bộ', sub: 'Danh mục set trang phục, cánh bay, bong bóng chat', tab: 'tab-fashion', target: null },
    { title: '👑 Dịch Vụ Gunny Trọn Gói (PMT Gaming)', sub: 'Up acc thuê, tối ưu tiêu xu, cày phó bản hằng ngày, đua top LC', tab: 'tab-services', target: null },
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
        showToast('📋 Đã sao chép số điện thoại Zalo: 0981.052.217!');
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
      if (document.getElementById('pmtServicePromoModal')?.classList.contains('active')) {
        document.getElementById('pmtServicePromoModal')?.classList.remove('active');
      }
    } else if (!isTyping && !e.ctrlKey && !e.altKey && !e.metaKey) {
      if (e.key === '1') activateMainTab('tab-dashboard');
      else if (e.key === '2') activateMainTab('tab-character');
      else if (e.key === '3') activateMainTab('tab-refining');
      else if (e.key === '4') activateMainTab('tab-ballistics');
      else if (e.key === '5') activateMainTab('tab-fashion');
      else if (e.key === '6') activateMainTab('tab-services');
    }
  });
}
