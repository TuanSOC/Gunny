/* ============================================================
   GUNNY MASTER WEB APP — Fashion Wiki Module
   540+ Sets, Wings & Bubbles Catalog
   ============================================================ */

import { save, load } from './utils.js';
import { playCyberClickSound } from './cyberEffects.js';

let activeFashionMode = load('fashionMode', 'SETS'); // 'SETS' or 'ITEMS'

const slotAvatars = {
  'Nón': '👑', 'Tóc': '💇', 'Áo': '👕', 'Mắt': '👁️',
  'Kính': '👓', 'Mặt': '🎭', 'Set Trang Phục': '👗',
  'Cánh': '🪽', 'Bong Bóng': '💬'
};

const slotBadgeColors = {
  'Nón': '#ffd700', 'Tóc': '#00f2fe', 'Áo': '#a855f7',
  'Mắt': '#00e676', 'Kính': '#ff7675', 'Mặt': '#fd79a8',
  'Set Trang Phục': '#e17055', 'Cánh': '#74b9ff', 'Bong Bóng': '#fdcb6e'
};

let setDisplayLimit = 60;
let itemDisplayLimit = 90;

export function initFashionWiki() {
  const btnModeSets         = document.getElementById('btnModeSets');
  const btnModeItems        = document.getElementById('btnModeItems');
  const fashionSearchInput  = document.getElementById('fashionSearchInput');
  const btnClearSearch      = document.getElementById('btnClearFashionSearch');
  const fashionGenderFilter = document.getElementById('fashionGenderFilter');
  const fashionSlotFilter   = document.getElementById('fashionSlotFilter');

  const pillBtns            = document.querySelectorAll('.fashion-quick-pills .pill-btn');

  pillBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      playCyberClickSound();
      pillBtns.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const slot = pill.dataset.slot || 'ALL';
      const gender = pill.dataset.gender || 'ALL';

      if (fashionSlotFilter) fashionSlotFilter.value = slot;
      if (fashionGenderFilter) fashionGenderFilter.value = gender;

      setDisplayLimit = 60;
      itemDisplayLimit = 90;
      renderFashionWiki();
    });
  });

  function setFashionMode(mode) {
    playCyberClickSound();
    activeFashionMode = mode;
    save('fashionMode', mode);
    setDisplayLimit = 60;
    itemDisplayLimit = 90;
    btnModeSets?.classList.toggle('active', mode === 'SETS');
    btnModeItems?.classList.toggle('active', mode === 'ITEMS');
    renderFashionWiki();
  }

  btnModeSets?.addEventListener('click', () => setFashionMode('SETS'));
  btnModeItems?.addEventListener('click', () => setFashionMode('ITEMS'));

  fashionSearchInput?.addEventListener('input', () => {
    setDisplayLimit = 60;
    itemDisplayLimit = 90;
    renderFashionWiki();
  });

  btnClearSearch?.addEventListener('click', () => {
    playCyberClickSound();
    if (fashionSearchInput) fashionSearchInput.value = '';
    renderFashionWiki();
  });

  fashionGenderFilter?.addEventListener('change', () => {
    playCyberClickSound();
    setDisplayLimit = 60;
    itemDisplayLimit = 90;
    renderFashionWiki();
  });

  fashionSlotFilter?.addEventListener('change', () => {
    playCyberClickSound();
    setDisplayLimit = 60;
    itemDisplayLimit = 90;
    renderFashionWiki();
  });

  // Initial Render
  renderFashionWiki();
}

function renderFashionWiki() {
  const fashionGrid       = document.getElementById('fashionGrid');
  const fashionTotalCount = document.getElementById('fashionTotalCount');
  const fashionMatchCount = document.getElementById('fashionMatchCount');
  const fashionSearchInput  = document.getElementById('fashionSearchInput');
  const fashionGenderFilter = document.getElementById('fashionGenderFilter');
  const fashionSlotFilter   = document.getElementById('fashionSlotFilter');

  if (!fashionGrid || typeof FashionData === 'undefined') return;

  const query  = (fashionSearchInput?.value || '').trim().toLowerCase();
  const gender = fashionGenderFilter?.value || 'ALL';
  const slot   = fashionSlotFilter?.value || 'ALL';

  const allSets  = FashionData.sets || [];
  const allItems = FashionData.items || [];

  if (activeFashionMode === 'SETS') {
    // MODE 1: XEM THEO TRỌN BỘ
    if (fashionTotalCount) fashionTotalCount.textContent = allSets.length.toLocaleString() + ' bộ';

    const filteredSets = allSets.filter(s => {
      const matchQuery = !query ||
        s.setName.toLowerCase().includes(query) ||
        s.theme.toLowerCase().includes(query) ||
        s.items.some(i => i.name.toLowerCase().includes(query));

      const matchGender = gender === 'ALL' || s.gender === gender || s.gender === 'Cả Nam & Nữ';
      const matchSlot   = slot === 'ALL' || s.items.some(i => i.slot === slot);

      return matchQuery && matchGender && matchSlot;
    });

    if (fashionMatchCount) fashionMatchCount.textContent = filteredSets.length.toLocaleString() + ' bộ';

    if (filteredSets.length === 0) {
      fashionGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
          <div style="font-size: 16px; font-weight: 700; color: var(--text-main);">Không tìm thấy bộ thời trang phù hợp</div>
          <div style="font-size: 13px;">Hãy thử nhập từ khóa khác (ví dụ: Kỵ Sĩ Bóng Tối, Thần Gió, Hoàng Tử...).</div>
        </div>`;
      return;
    }

    const displayList = filteredSets.slice(0, setDisplayLimit);

    let html = displayList.map(s => {
      const genderBadge = s.gender === 'Nam' ? '👦 Nam' : (s.gender === 'Nữ' ? '👧 Nữ' : '👫 Nam & Nữ');
      const setCopyText = s.setName + ': ' + s.items.map(i => `${i.slot}: ${i.name}`).join(' | ');

      const imgWrapHtml = s.image ? `
        <div class="set-card-img-wrap">
          <img src="${s.image}" alt="${s.setName}" loading="lazy">
        </div>` : '';

      const cardClass = s.image ? 'fashion-set-card' : 'fashion-set-card no-image';

      return `
        <div class="${cardClass}" style="grid-column: 1 / -1;">
          ${imgWrapHtml}
          <div class="set-card-main">
            <div class="set-card-header">
              <div class="set-title-group">
                <div class="set-title">📦 ${s.setName}</div>
                <div class="set-theme-tag">🏷️ Danh Mục: ${s.theme}</div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <span class="badge" style="background:rgba(255,215,0,0.15);color:var(--gold);border:1px solid rgba(255,215,0,0.3);">
                  ${genderBadge} (${s.items.length} món)
                </span>
                <button class="btn-copy-set" data-copy="${setCopyText.replace(/"/g, '&quot;')}">
                  📋 Sao Chép
                </button>
              </div>
            </div>
            <div class="set-items-list">
              ${s.items.map(item => {
                const icon = slotAvatars[item.slot] || '✨';
                const badgeColor = slotBadgeColors[item.slot] || '#00f2fe';
                return `
                  <div class="set-item-chip">
                    <span class="set-item-slot" style="color:${badgeColor}">${icon} ${item.slot}</span>
                    <span class="set-item-name" title="${item.name}">${item.name}</span>
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>`;
    }).join('');

    if (filteredSets.length > setDisplayLimit) {
      html += `
        <div style="grid-column: 1 / -1; text-align: center; padding: 20px;">
          <button id="btnLoadMoreFashionSets" class="btn-gold" style="padding: 12px 28px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer;">
            ⚡ Xem Thêm Các Bộ Khác (${filteredSets.length - setDisplayLimit} bộ còn lại)
          </button>
        </div>`;
    }

    fashionGrid.innerHTML = html;

    const btnLoadMore = document.getElementById('btnLoadMoreFashionSets');
    btnLoadMore?.addEventListener('click', () => {
      setDisplayLimit += 60;
      renderFashionWiki();
    });

    fashionGrid.querySelectorAll('.btn-copy-set').forEach(btn => {
      btn.addEventListener('click', () => {
        playCyberClickSound();
        const text = btn.dataset.copy;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            const oldText = btn.textContent;
            btn.textContent = '✅ Đã Chép!';
            setTimeout(() => btn.textContent = oldText, 1500);
          });
        }
      });
    });

  } else {
    // MODE 2: XEM CHI TIẾT TỪNG MÓN
    if (fashionTotalCount) fashionTotalCount.textContent = allItems.length.toLocaleString() + ' món';

    const filteredItems = allItems.filter(item => {
      const matchQuery = !query ||
        item.itemName.toLowerCase().includes(query) ||
        item.setName.toLowerCase().includes(query) ||
        item.theme.toLowerCase().includes(query);

      const matchGender = gender === 'ALL' || item.gender === gender || item.gender === 'Cả Nam & Nữ';
      const matchSlot   = slot === 'ALL' || item.slotType === slot;

      return matchQuery && matchGender && matchSlot;
    });

    if (fashionMatchCount) fashionMatchCount.textContent = filteredItems.length.toLocaleString() + ' món';

    if (filteredItems.length === 0) {
      fashionGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
          <div style="font-size: 16px; font-weight: 700; color: var(--text-main);">Không tìm thấy vật phẩm thời trang phù hợp</div>
          <div style="font-size: 13px;">Hãy thử tìm tên khác hoặc thay đổi bộ lọc.</div>
        </div>`;
      return;
    }

    const displayList = filteredItems.slice(0, itemDisplayLimit);

    let html = displayList.map(item => {
      const icon = slotAvatars[item.slotType] || '✨';
      const badgeColor = slotBadgeColors[item.slotType] || '#00f2fe';
      const genderBadge = item.gender === 'Nam' ? '👦 Nam' : (item.gender === 'Nữ' ? '👧 Nữ' : '👫 Nam & Nữ');
      const avatarHtml = item.image
        ? `<div class="fashion-avatar" style="padding:2px;background:rgba(0,0,0,0.3);"><img src="${item.image}" alt="${item.itemName}" loading="lazy" style="width:100%;height:100%;object-fit:contain;border-radius:6px;"></div>`
        : `<div class="fashion-avatar">${icon}</div>`;

      return `
        <div class="fashion-card">
          <div class="fashion-card-top">
            ${avatarHtml}
            <div class="fashion-badges">
              <span class="badge" style="background:${badgeColor}22;color:${badgeColor};border:1px solid ${badgeColor}55;">
                ${item.slotType}
              </span>
              <span class="badge" style="background:rgba(255,255,255,0.06);color:var(--text-muted);">
                ${genderBadge}
              </span>
            </div>
          </div>
          <div class="fashion-item-name">${item.itemName}</div>
          <div class="fashion-set-name">📦 Bộ: ${item.setName}</div>
          <div class="fashion-meta-row">
            <span>🏷️ ${item.theme || 'Thời trang'}</span>
            <button class="btn-copy-item" data-copy="${item.itemName.replace(/"/g, '&quot;')}">
              📋 Sao chép
            </button>
          </div>
        </div>`;
    }).join('');

    if (filteredItems.length > itemDisplayLimit) {
      html += `
        <div style="grid-column: 1 / -1; text-align: center; padding: 20px;">
          <button id="btnLoadMoreFashionItems" class="btn-gold" style="padding: 12px 28px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer;">
            ⚡ Xem Thêm Vật Phẩm Khác (${filteredItems.length - itemDisplayLimit} món còn lại)
          </button>
        </div>`;
    }

    fashionGrid.innerHTML = html;

    const btnLoadMoreItems = document.getElementById('btnLoadMoreFashionItems');
    btnLoadMoreItems?.addEventListener('click', () => {
      itemDisplayLimit += 90;
      renderFashionWiki();
    });

    fashionGrid.querySelectorAll('.btn-copy-item').forEach(btn => {
      btn.addEventListener('click', () => {
        playCyberClickSound();
        const text = btn.dataset.copy;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            const oldText = btn.textContent;
            btn.textContent = '✅ Đã chép!';
            setTimeout(() => btn.textContent = oldText, 1500);
          });
        }
      });
    });
  }
}
