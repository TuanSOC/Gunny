const fs = require('fs');
const path = require('path');

console.log('Starting Smart UI Generation...');

// 1. Build Updated index.html with Interactive Calculators for All 17 Systems + Command Palette + Goal Bag
const indexHtmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PMT Gunny Master — Trợ Lý Tra Cứu 17 Tính Năng &amp; Bắn Góc 2026</title>
  <meta name="description" content="Trang web tĩnh toàn diện PMT Gunny Master: Tra cứu 17 bảng nguyên liệu chuẩn xác, thước tính góc và lực bắn trực quan, kho wiki thời trang 540+ bộ.">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="alternate icon" href="icons/icon48.png">
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

<div class="web-app">

  <!-- ════════════════ HEADER ════════════════ -->
  <header class="navbar">
    <div class="nav-container">
      <div class="brand">
        <div class="logo-icon">
          <img src="favicon.svg" alt="PMT Logo" style="width:34px;height:34px;border-radius:8px;box-shadow:0 0 12px rgba(0,242,254,0.4);">
        </div>
        <div class="brand-text">
          <h1>PMT GUNNY MASTER</h1>
          <p>Trợ Lý Bắn Gunny &amp; Tra Cứu Nguyên Liệu PC · By PMT</p>
        </div>
      </div>
      <div class="nav-actions">
        <button id="btnOpenCommandPalette" class="btn-nav-action" title="Tìm kiếm nhanh toàn trang (Ctrl+K)">
          <span class="action-icon">🔍</span>
          <span class="action-text">Tìm nhanh</span>
          <kbd class="shortcut-kbd">Ctrl K</kbd>
        </button>
        <button id="btnOpenGoalBag" class="btn-nav-action gold" title="Túi dự tính nguyên liệu mục tiêu">
          <span class="action-icon">🎒</span>
          <span class="action-text">Túi Mục Tiêu</span>
          <span id="goalCountBadge" class="badge-count">0</span>
        </button>
        <div class="nav-status">
          <span class="status-badge pulse">
            <span class="dot"></span> Online Static Web
          </span>
        </div>
      </div>
    </div>
  </header>

  <!-- ════════════════ NAVIGATION TABS ════════════════ -->
  <nav class="main-tabs-bar">
    <div class="tabs-container">
      <button class="main-tab active" data-tab="tab-refining" id="tab-btn-refining">
        <span class="tab-icon">🧮</span>
        <span class="tab-text">17 Bảng Tra Cứu &amp; Hóa Thần</span>
      </button>
      <button class="main-tab" data-tab="tab-ballistics" id="tab-btn-ballistics">
        <span class="tab-icon">🎯</span>
        <span class="tab-text">Thước Bắn Góc</span>
      </button>
      <button class="main-tab" data-tab="tab-fashion" id="tab-btn-fashion">
        <span class="tab-icon">👗</span>
        <span class="tab-text">Kho Thời Trang (540+ Bộ, Cánh &amp; Bong Bóng)</span>
      </button>
    </div>
  </nav>

  <!-- ════════════════ MAIN CONTENT ════════════════ -->
  <main class="main-content">
    <div class="content-container">

      <!-- ════════ TAB 1: 17 BẢNG TRA CỨU ════════ -->
      <section id="tab-refining" class="tab-panel active">

        <!-- Cyberpunk Visual Category Hub -->
        <div class="category-hub-card glass-card">
          <div class="hub-header">
            <div class="hub-title-group">
              <span class="hub-badge"><span class="pulse-dot"></span> SYSTEM MASTER HUB</span>
              <h3 class="hub-title">Trung Tâm Tra Cứu 17 Tính Năng Gunny</h3>
            </div>
            <div class="hub-quick-select-wrap">
              <span class="quick-icon">⚡ Chọn Nhanh:</span>
              <select id="masterTableSelect" class="glow-select-sm">
                <option value="refining" selected>💎 1. Gia Công (Lv 0 → 14 MAX)</option>
                <option value="pet_evo">🌿 2. Tiến Hóa Pet (Cỏ Thiên Điệp Lv 1 → 50)</option>
                <option value="magic_exp">🔮 3. EXP Nâng Ma Thạch (Lv 2 → 10)</option>
                <option value="jewel_convert">💎 4. Quy Đổi Châu Báu (Cb 13 → 21)</option>
                <option value="mount_up">🐴 5. Up Thú Cưỡi (Ngựa → Cỗ Máy TG)</option>
                <option value="phu_ma">✨ 6. Up Phụ Ma (Bậc 1 → 5)</option>
                <option value="vat_to">🗿 7. Up Vật Tổ (Lv 1 → 50)</option>
                <option value="duc_hon">🔮 8. Đúc Hồn (Đồng · Bạc · Vàng · Kim Cương)</option>
                <option value="chien_hon">⚔️ 9. Chiến Hồn Đơn (Lv 1 → 5 &amp; Kim Hồn)</option>
                <option value="manh_hoa">🐣 10. Manh Hóa Pet (Lv 1 → 29)</option>
                <option value="ngoc_thu_cuoi">🐎 11. Ngọc Lên EXP Thú Cưỡi (Ngọc 1 / 2 / 3)</option>
                <option value="manh_ngoc_lam">💠 12. Mảnh Ngọc Lam Nâng Cấp (Cấp 1 → 9)</option>
                <option value="mieu_than">⛩️ 13. Miếu Thần / Hóa Thần (Cấp 0 → 10 &amp; Chỉ số)</option>
                <option value="pet_linh_hach">💠 14. Pet Linh Hạch (Cấp 1 → 17 &amp; Đá Luyện Linh)</option>
                <option value="pet_tai_nang">📖 15. Pet Tài Năng (Sách Trí Tuệ Lv 1 → 10)</option>
                <option value="hoa_than_tu_luyen">🔥 16. Hóa Thần Tu Luyện (Đột Phá Bậc 1 → 10 &amp; Đá Hóa Thần)</option>
                <option value="ngoc_vu_khi">🎯 17. Ngọc Vũ Khí (Lv 1 → 20 &amp; Đá Cần)</option>
              </select>
            </div>
          </div>

          <!-- Visual Category Groups -->
          <div class="hub-categories-grid">
            <!-- Group 1: Trang Bị & Gia Công -->
            <div class="hub-group">
              <div class="hub-group-header">
                <span class="group-icon">⚔️</span>
                <span class="group-label">Trang Bị &amp; Cường Hóa</span>
              </div>
              <div class="hub-tiles-row">
                <button class="hub-tile active" data-target="refining">
                  <span class="tile-icon">💎</span>
                  <span class="tile-info">
                    <strong class="tile-name">Gia Công</strong>
                    <small class="tile-sub">Lv 0 → 14</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="jewel_convert">
                  <span class="tile-icon">💠</span>
                  <span class="tile-info">
                    <strong class="tile-name">Châu Báu</strong>
                    <small class="tile-sub">Cb 13 → 21</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="phu_ma">
                  <span class="tile-icon">✨</span>
                  <span class="tile-info">
                    <strong class="tile-name">Phụ Ma</strong>
                    <small class="tile-sub">Bậc 1 → 5</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="duc_hon">
                  <span class="tile-icon">🔮</span>
                  <span class="tile-info">
                    <strong class="tile-name">Đúc Hồn</strong>
                    <small class="tile-sub">Đồng → KC</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="ngoc_vu_khi">
                  <span class="tile-icon">🎯</span>
                  <span class="tile-info">
                    <strong class="tile-name">Ngọc Vũ Khí</strong>
                    <small class="tile-sub">Lv 1 → 20</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="manh_ngoc_lam">
                  <span class="tile-icon">🔷</span>
                  <span class="tile-info">
                    <strong class="tile-name">Ngọc Lam</strong>
                    <small class="tile-sub">Cấp 1 → 9</small>
                  </span>
                </button>
              </div>
            </div>

            <!-- Group 2: Pet & Thú Cưỡi -->
            <div class="hub-group">
              <div class="hub-group-header">
                <span class="group-icon">🐾</span>
                <span class="group-label">Pet &amp; Thú Cưỡi</span>
              </div>
              <div class="hub-tiles-row">
                <button class="hub-tile" data-target="pet_evo">
                  <span class="tile-icon">🌿</span>
                  <span class="tile-info">
                    <strong class="tile-name">Tiến Hóa Pet</strong>
                    <small class="tile-sub">Cỏ Lv 1 → 50</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="manh_hoa">
                  <span class="tile-icon">🐣</span>
                  <span class="tile-info">
                    <strong class="tile-name">Manh Hóa</strong>
                    <small class="tile-sub">Mốc 1 → 29</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="pet_linh_hach">
                  <span class="tile-icon">💠</span>
                  <span class="tile-info">
                    <strong class="tile-name">Linh Hạch</strong>
                    <small class="tile-sub">Lv 1 → 17</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="pet_tai_nang">
                  <span class="tile-icon">📖</span>
                  <span class="tile-info">
                    <strong class="tile-name">Tài Năng Pet</strong>
                    <small class="tile-sub">Sách Lv 1 → 10</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="mount_up">
                  <span class="tile-icon">🐴</span>
                  <span class="tile-info">
                    <strong class="tile-name">Thú Cưỡi</strong>
                    <small class="tile-sub">9 Loại Thú</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="ngoc_thu_cuoi">
                  <span class="tile-icon">🐎</span>
                  <span class="tile-info">
                    <strong class="tile-name">Ngọc Tọa Kỵ</strong>
                    <small class="tile-sub">Ngọc 1 / 2 / 3</small>
                  </span>
                </button>
              </div>
            </div>

            <!-- Group 3: Hóa Thần & Tu Luyện -->
            <div class="hub-group">
              <div class="hub-group-header">
                <span class="group-icon">🔥</span>
                <span class="group-label">Hóa Thần &amp; Thần Khí</span>
              </div>
              <div class="hub-tiles-row">
                <button class="hub-tile" data-target="mieu_than">
                  <span class="tile-icon">⛩️</span>
                  <span class="tile-info">
                    <strong class="tile-name">Miếu Thần</strong>
                    <small class="tile-sub">Cấp 0 → 10</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="hoa_than_tu_luyen">
                  <span class="tile-icon">🔥</span>
                  <span class="tile-info">
                    <strong class="tile-name">Hóa Thần TL</strong>
                    <small class="tile-sub">Bậc 1 → 10</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="magic_exp">
                  <span class="tile-icon">🔮</span>
                  <span class="tile-info">
                    <strong class="tile-name">Ma Thạch EXP</strong>
                    <small class="tile-sub">Lv 2 → 10</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="vat_to">
                  <span class="tile-icon">🗿</span>
                  <span class="tile-info">
                    <strong class="tile-name">Vật Tổ</strong>
                    <small class="tile-sub">Lv 1 → 50</small>
                  </span>
                </button>
                <button class="hub-tile" data-target="chien_hon">
                  <span class="tile-icon">⚔️</span>
                  <span class="tile-info">
                    <strong class="tile-name">Chiến Hồn</strong>
                    <small class="tile-sub">Lv 1 → 5</small>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ─── 1. GIA CÔNG ─── -->
        <div id="sub-refining" class="sub-panel active">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>💎 Bảng Tra Nguyên Liệu Gia Công (Vòng Tẩy Nạp)</h2>
              <span class="badge gold">Cấp 0 → 14 MAX</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="refStartLevel">Cấp Hiện Tại:</label>
                <select id="refStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Mới)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option><option value="10">Cấp 10</option>
                  <option value="11">Cấp 11</option><option value="12">Cấp 12</option>
                  <option value="13">Cấp 13</option>
                </select>
              </div>
              <div class="form-group">
                <label for="refTargetLevel">Cấp Mục Tiêu:</label>
                <select id="refTargetLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option><option value="10">Cấp 10</option>
                  <option value="11">Cấp 11</option><option value="12">Cấp 12</option>
                  <option value="13">Cấp 13</option><option value="14" selected>Cấp 14 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid">
              <div class="stat-box"><span class="s-label">⛏️ Đá Gia Công</span><span class="s-val gold" id="resRefDa">4,091</span></div>
              <div class="stat-box"><span class="s-label">🪙 Đồng</span><span class="s-val" id="resRefDong">6,142</span></div>
              <div class="stat-box"><span class="s-label">🥈 Bạc</span><span class="s-val" id="resRefBac">7,468</span></div>
              <div class="stat-box"><span class="s-label">🥇 Vàng</span><span class="s-val" id="resRefVang">8,195</span></div>
              <div class="stat-box"><span class="s-label">💠 Ngọc</span><span class="s-val cyan" id="resRefNgoc">8,690</span></div>
            </div>

            <div id="refLevelBreakdownContainer" class="level-breakdown-card" style="margin-top:16px;"></div>

            <div class="table-responsive" style="margin-top:20px;">
              <div style="font-family:var(--font-heading);font-weight:700;color:var(--gold);margin-bottom:8px;">📋 BẢNG TOÀN BỘ CẤP ĐỘ GIA CÔNG (CẤP 1 → 14):</div>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Cấp Độ</th><th>⛏️ Đá Gia Công</th><th>🪙 Đồng</th><th>🥈 Bạc</th><th>🥇 Vàng</th><th>💠 Ngọc</th>
                  </tr>
                </thead>
                <tbody id="refTableBody"></tbody>
                <tfoot>
                  <tr><td>TỔNG (MAX Lv 14)</td><td class="gold">4,091</td><td>6,142</td><td>7,468</td><td>8,195</td><td class="cyan">8,690</td></tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 2. TIẾN HÓA PET ─── -->
        <div id="sub-pet_evo" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🌿 Bảng Tiến Hóa Pet — Cỏ Thiên Điệp (Lv 1 → 50)</h2>
              <span class="badge green">Tổng Lv 1-50: 80,903 Cỏ</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="petEvoStartLevel">Cấp Hiện Tại:</label>
                <select id="petEvoStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Mới)</option>
                  <option value="5">Cấp 5</option><option value="10">Cấp 10</option>
                  <option value="15">Cấp 15</option><option value="20">Cấp 20</option>
                  <option value="25">Cấp 25</option><option value="30">Cấp 30</option>
                  <option value="35">Cấp 35</option><option value="40">Cấp 40</option>
                  <option value="45">Cấp 45</option>
                </select>
              </div>
              <div class="form-group">
                <label for="petEvoTargetLevel">Cấp Mục Tiêu:</label>
                <select id="petEvoTargetLevel" class="input-select">
                  <option value="10">Cấp 10</option><option value="20">Cấp 20</option>
                  <option value="30">Cấp 30</option><option value="40">Cấp 40</option>
                  <option value="50" selected>Cấp 50 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">🌿 Tổng Cỏ Thiên Điệp Cần</span><span class="s-val gold" id="resPetEvoCo">80,903</span></div>
            </div>

            <div id="petEvoLevelBreakdownContainer" class="level-breakdown-card" style="margin-top:16px;"></div>

            <div class="table-responsive" style="margin-top:20px;">
              <div style="font-family:var(--font-heading);font-weight:700;color:var(--gold);margin-bottom:8px;">📋 BẢNG TOÀN BỘ CẤP ĐỘ CỎ THIÊN ĐIỆP (LV 1 → 50):</div>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Cấp</th><th>🌿 Cỏ Thiên Điệp</th>
                    <th>Cấp</th><th>🌿 Cỏ Thiên Điệp</th>
                    <th>Cấp</th><th>🌿 Cỏ Thiên Điệp</th>
                  </tr>
                </thead>
                <tbody id="petEvoTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 3. EXP MA THẠCH ─── -->
        <div id="sub-magic_exp" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🔮 Bảng EXP Nâng Cấp Ma Thạch (Level 2 → 10)</h2>
              <span class="badge purple">Hoàn Mỹ · Siêu Việt · Truyền Thuyết</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="magicExpRarity">Phẩm Chất Ma Thạch:</label>
                <select id="magicExpRarity" class="input-select">
                  <option value="hoanMy">⭐ Hoàn Mỹ (Lam)</option>
                  <option value="sieuViet">🌟 Siêu Việt (Tím)</option>
                  <option value="truyenThuyet" selected>💫 Truyền Thuyết (Cam)</option>
                </select>
              </div>
              <div class="form-group">
                <label for="magicExpStartLevel">Cấp Hiện Tại:</label>
                <select id="magicExpStartLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option>
                </select>
              </div>
              <div class="form-group">
                <label for="magicExpTargetLevel">Cấp Mục Tiêu:</label>
                <select id="magicExpTargetLevel" class="input-select">
                  <option value="2">Cấp 2</option><option value="3">Cấp 3</option>
                  <option value="4">Cấp 4</option><option value="5">Cấp 5</option>
                  <option value="6">Cấp 6</option><option value="7">Cấp 7</option>
                  <option value="8">Cấp 8</option><option value="9">Cấp 9</option>
                  <option value="10" selected>Cấp 10 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">🔮 Tổng EXP Ma Thạch Cần</span><span class="s-val cyan" id="resMagicExp">1,134,350</span></div>
            </div>

            <div id="magicExpLevelBreakdownContainer" class="level-breakdown-card" style="margin-top:16px;"></div>

            <div class="table-responsive" style="margin-top:20px;">
              <div style="font-family:var(--font-heading);font-weight:700;color:var(--gold);margin-bottom:8px;">📋 BẢNG EXP MA THẠCH TOÀN BỘ CẤP (LV 2 → 10):</div>
              <table class="data-table">
                <thead>
                  <tr><th>Level</th><th>⭐ Hoàn Mỹ</th><th>🌟 Siêu Việt</th><th>💫 Truyền Thuyết</th></tr>
                </thead>
                <tbody id="magicExpTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 4. QUY ĐỔI CHÂU BÁU ─── -->
        <div id="sub-jewel_convert" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>💎 Bảng Tỷ Lệ Quy Đổi Châu Báu (Cb 13 → 21)</h2>
            </div>
            <div id="jewelConvertContainer" class="cards-grid"></div>
          </div>
        </div>

        <!-- ─── 5. UP THÚ CƯỠI ─── -->
        <div id="sub-mount_up" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🐴 Bảng Up Thú Cưỡi (Level 1 → 10)</h2>
              <span class="badge gold">9 Loại Tọa Kỵ</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="mountTypeSelect">Loại Thú Cưỡi:</label>
                <select id="mountTypeSelect" class="input-select">
                  <option value="ngua" selected>🐴 Ngựa</option>
                  <option value="heo">🐷 Heo</option>
                  <option value="soi">🐺 Sói</option>
                  <option value="choi">🧹 Chổi</option>
                  <option value="caVang">🐟 Cá Vàng</option>
                  <option value="ca7Mau">🐠 Cá 7 Màu</option>
                  <option value="thamKien">🐜 Thảm Kiến</option>
                  <option value="thamGa">🐔 Thảm Gà</option>
                  <option value="coMayTG">⚙️ Cỗ Máy TG</option>
                </select>
              </div>
              <div class="form-group">
                <label for="mountStartLevel">Cấp Hiện Tại:</label>
                <select id="mountStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Mới)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option>
                </select>
              </div>
              <div class="form-group">
                <label for="mountTargetLevel">Cấp Mục Tiêu:</label>
                <select id="mountTargetLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option><option value="10" selected>Cấp 10 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">💊 Tổng Thuốc Tăng Cấp Thú Cưỡi Cần</span><span class="s-val gold" id="resMountPills">116</span></div>
            </div>

            <div id="mountLevelBreakdownContainer" class="level-breakdown-card" style="margin-top:16px;"></div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table min-w-800">
                <thead>
                  <tr>
                    <th>Lv Thú</th><th>🐴 Ngựa</th><th>🐷 Heo</th><th>🐺 Sói</th>
                    <th>🧹 Chổi</th><th>🐟 Cá Vàng</th><th>🐠 Cá 7 Màu</th>
                    <th>🐜 Thảm Kiến</th><th>🐔 Thảm Gà</th><th>⚙️ Cỗ Máy TG</th>
                  </tr>
                </thead>
                <tbody id="mountUpTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 6. UP PHỤ MA ─── -->
        <div id="sub-phu_ma" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>✨ Bảng Up Phụ Ma Trang Bị (Bậc 1 → 5)</h2>
              <span class="badge purple">Max Lv 5(0): 29,810 Đá</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="phuMaStartTier">Bậc Hiện Tại:</label>
                <select id="phuMaStartTier" class="input-select">
                  <option value="0">Bậc 0 (Chưa Phụ Ma)</option>
                  <option value="1">Bậc 1</option><option value="2">Bậc 2</option>
                  <option value="3">Bậc 3</option><option value="4">Bậc 4</option>
                </select>
              </div>
              <div class="form-group">
                <label for="phuMaTargetTier">Bậc Mục Tiêu:</label>
                <select id="phuMaTargetTier" class="input-select">
                  <option value="1">Bậc 1</option><option value="2">Bậc 2</option>
                  <option value="3">Bậc 3</option><option value="4">Bậc 4</option>
                  <option value="5" selected>Bậc 5 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">✨ Tổng Đá Phụ Ma Cần</span><span class="s-val cyan" id="resPhuMaDa">29,810</span></div>
            </div>

            <div id="phuMaContainer" class="phu-ma-grid" style="margin-top:20px;"></div>
          </div>
        </div>

        <!-- ─── 7. UP VẬT TỔ ─── -->
        <div id="sub-vat_to" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🗿 Bảng Up Vật Tổ (Level 1 → 50)</h2>
              <span class="badge gold">TỔNG: 1,496,690 Xu / Vé</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="vatToStartLevel">Cấp Hiện Tại:</label>
                <select id="vatToStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Mới)</option>
                  <option value="10">Cấp 10</option><option value="20">Cấp 20</option>
                  <option value="30">Cấp 30</option><option value="40">Cấp 40</option>
                </select>
              </div>
              <div class="form-group">
                <label for="vatToTargetLevel">Cấp Mục Tiêu:</label>
                <select id="vatToTargetLevel" class="input-select">
                  <option value="10">Cấp 10</option><option value="20">Cấp 20</option>
                  <option value="30">Cấp 30</option><option value="40">Cấp 40</option>
                  <option value="50" selected>Cấp 50 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr 1fr;">
              <div class="stat-box"><span class="s-label">🗿 Chi Phí 1 Cọc (Xu / Vé)</span><span class="s-val gold" id="resVatTo1Coc">1,496,690</span></div>
              <div class="stat-box"><span class="s-label">🏛️ Tổng 7 Cọc (Xu / Vé)</span><span class="s-val cyan" id="resVatTo7Coc">10,476,830</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr><th>Level</th><th>1 Cọc</th><th>7 Cọc</th><th>Level</th><th>1 Cọc</th><th>7 Cọc</th></tr>
                </thead>
                <tbody id="vatToTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 8. ĐÚC HỒN ─── -->
        <div id="sub-duc_hon" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🔮 Bảng Đúc Hồn (Cấp 1 → 5)</h2>
              <span class="badge cyan">Đồng · Bạc · Vàng · Kim Cương</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="ducHonTierSelect">Bậc Đúc Hồn:</label>
                <select id="ducHonTierSelect" class="input-select">
                  <option value="dong">🪙 Đúc Hồn Đồng</option>
                  <option value="bac">🥈 Đúc Hồn Bạc</option>
                  <option value="vang">🥇 Đúc Hồn Vàng</option>
                  <option value="kimCuong" selected>💎 Đúc Hồn Kim Cương</option>
                </select>
              </div>
              <div class="form-group">
                <label for="ducHonStartLevel">Cấp Hiện Tại:</label>
                <select id="ducHonStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Chưa Đúc)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                </select>
              </div>
              <div class="form-group">
                <label for="ducHonTargetLevel">Cấp Mục Tiêu:</label>
                <select id="ducHonTargetLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5" selected>Cấp 5 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr 1fr;">
              <div class="stat-box"><span class="s-label">🔮 Đá Luyện Hồn (dlh)</span><span class="s-val gold" id="resDucHonDlh">1,680</span></div>
              <div class="stat-box"><span class="s-label">💎 Đá Đúc Hồn Cần</span><span class="s-val cyan" id="resDucHonCost">4,890</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th rowspan="2">Lv</th>
                    <th colspan="2">🪙 Đồng</th><th colspan="2">🥈 Bạc</th>
                    <th colspan="2">🥇 Vàng</th><th colspan="2">💎 Kim Cương</th>
                  </tr>
                  <tr>
                    <th>dlh</th><th>đúc</th><th>dlh</th><th>đúc</th>
                    <th>dlh</th><th>đúc</th><th>dlh</th><th>đúc</th>
                  </tr>
                </thead>
                <tbody id="ducHonTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 9. CHIẾN HỒN ĐƠN ─── -->
        <div id="sub-chien_hon" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>⚔️ Bảng Chiến Hồn Đơn (Lv 1 → 5 &amp; Kim Hồn)</h2>
              <span class="badge gold">1 Tụ vs 3 Tụ</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="chienHonModeSelect">Số Món / Tụ:</label>
                <select id="chienHonModeSelect" class="input-select">
                  <option value="1mon" selected>⚔️ 1 Món Trang Bị</option>
                  <option value="3mon">🛡️ 3 Món Trang Bị</option>
                </select>
              </div>
              <div class="form-group">
                <label for="chienHonStartLevel">Cấp Hiện Tại:</label>
                <select id="chienHonStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Chưa Up)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                </select>
              </div>
              <div class="form-group">
                <label for="chienHonTargetLevel">Cấp Mục Tiêu:</label>
                <select id="chienHonTargetLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5" selected>Cấp 5 (Kim Hồn)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">⚔️ Tổng Chiến Hồn Đơn Cần</span><span class="s-val gold" id="resChienHonQty">96,258</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr><th>Cấp Chiến Hồn</th><th>⚔️ 1 Món</th><th>🛡️ 3 Món</th></tr>
                </thead>
                <tbody id="chienHonTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 10. MANH HÓA PET ─── -->
        <div id="sub-manh_hoa" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🐣 Bảng Manh Hóa Pet (Mốc 1 → 29)</h2>
              <span class="badge green">29 Mốc Nâng Cấp</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="manhHoaStartIdx">Mốc Hiện Tại:</label>
                <select id="manhHoaStartIdx" class="input-select">
                  <option value="0">Mốc 0 (Mới)</option>
                  <option value="5">Mốc 5</option><option value="10">Mốc 10</option>
                  <option value="15">Mốc 15</option><option value="20">Mốc 20</option>
                  <option value="25">Mốc 25</option>
                </select>
              </div>
              <div class="form-group">
                <label for="manhHoaTargetIdx">Mốc Mục Tiêu:</label>
                <select id="manhHoaTargetIdx" class="input-select">
                  <option value="5">Mốc 5</option><option value="10">Mốc 10</option>
                  <option value="15">Mốc 15</option><option value="20">Mốc 20</option>
                  <option value="25">Mốc 25</option><option value="29" selected>Mốc 29 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">🐣 Tổng Mảnh Manh Hóa Cần</span><span class="s-val gold" id="resManhHoaQty">14,250</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr><th>Mốc Nâng Cấp</th><th>Số Lượng Mảnh</th></tr>
                </thead>
                <tbody id="manhHoaTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 11. NGỌC LÊN EXP THÚ CƯỠI ─── -->
        <div id="sub-ngoc_thu_cuoi" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🐎 Bảng Quy Đổi Ngọc Lên EXP Thú Cưỡi</h2>
            </div>
            <div id="ngocThuCuoiContainer" class="cards-grid"></div>
          </div>
        </div>

        <!-- ─── 12. MẢNH NGỌC LAM ─── -->
        <div id="sub-manh_ngoc_lam" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>💠 Bảng Mảnh Ngọc Lam Nâng Cấp (Cấp 1 → 9)</h2>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="ngocLamStartLevel">Cấp Hiện Tại:</label>
                <select id="ngocLamStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Mới)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                </select>
              </div>
              <div class="form-group">
                <label for="ngocLamTargetLevel">Cấp Mục Tiêu:</label>
                <select id="ngocLamTargetLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9" selected>Cấp 9 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">💠 Tổng Mảnh Ngọc Lam Cần</span><span class="s-val cyan" id="resNgocLamTotal">18,600</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr><th>Cấp Ngọc</th><th>Mảnh Cần Nâng</th><th>Cộng Dồn</th></tr>
                </thead>
                <tbody id="ngocLamTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 13. MIẾU THẦN / HÓA THẦN ─── -->
        <div id="sub-mieu_than" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>⛩️ Bảng Tra Miếu Thần / Hóa Thần (Chúc Phúc &amp; Thăng Hoa)</h2>
              <span class="badge gold">Cấp 0 → 10 MAX</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="mieuThanStartLevel">Cấp Hiện Tại:</label>
                <select id="mieuThanStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Mới)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option>
                </select>
              </div>
              <div class="form-group">
                <label for="mieuThanTargetLevel">Cấp Mục Tiêu:</label>
                <select id="mieuThanTargetLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option><option value="10" selected>Cấp 10 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid">
              <div class="stat-box"><span class="s-label">🕯️ Vật Tế / Chúc Phúc</span><span class="s-val gold" id="resMieuDiem">1,338</span></div>
              <div class="stat-box"><span class="s-label">⚔️ Công Tăng</span><span class="s-val" id="resMieuCong">+1,500</span></div>
              <div class="stat-box"><span class="s-label">🛡️ Thủ Tăng</span><span class="s-val" id="resMieuThu">+1,500</span></div>
              <div class="stat-box"><span class="s-label">⚡ Nhanh Tăng</span><span class="s-val" id="resMieuNhanh">+1,500</span></div>
              <div class="stat-box"><span class="s-label">🍀 May Tăng</span><span class="s-val cyan" id="resMieuMay">+1,500</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Lên Cấp</th>
                    <th>Vật Tế / Nến</th>
                    <th>Ma Kháng</th>
                    <th>Kháng Bạo</th>
                    <th>Miễn Thương</th>
                    <th>Tất Kháng</th>
                    <th>Bảo Vệ</th>
                  </tr>
                </thead>
                <tbody id="mieuThanTableBody"></tbody>
                <tfoot>
                  <tr><td>TỔNG (Cấp 0 → 10)</td><td class="gold">1,338</td><td colspan="5">Chỉ số tăng trưởng cộng dồn cực bá đạo</td></tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 14. PET LINH HẠCH ─── -->
        <div id="sub-pet_linh_hach" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>💠 Bảng Tra Pet Linh Hạch (Đá Luyện Linh &amp; Vàng)</h2>
              <span class="badge cyan">Cấp 1 → 17 MAX</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="linhHachStartLevel">Cấp Hiện Tại:</label>
                <select id="linhHachStartLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option><option value="10">Cấp 10</option>
                  <option value="11">Cấp 11</option><option value="12">Cấp 12</option>
                  <option value="13">Cấp 13</option><option value="14">Cấp 14</option>
                  <option value="15">Cấp 15</option><option value="16">Cấp 16</option>
                </select>
              </div>
              <div class="form-group">
                <label for="linhHachTargetLevel">Cấp Mục Tiêu:</label>
                <select id="linhHachTargetLevel" class="input-select">
                  <option value="2">Cấp 2</option><option value="3">Cấp 3</option>
                  <option value="4">Cấp 4</option><option value="5">Cấp 5</option>
                  <option value="6">Cấp 6</option><option value="7">Cấp 7</option>
                  <option value="8">Cấp 8</option><option value="9">Cấp 9</option>
                  <option value="10">Cấp 10</option><option value="11">Cấp 11</option>
                  <option value="12">Cấp 12</option><option value="13">Cấp 13</option>
                  <option value="14">Cấp 14</option><option value="15">Cấp 15</option>
                  <option value="16">Cấp 16</option><option value="17" selected>Cấp 17 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr 1fr;">
              <div class="stat-box"><span class="s-label">💠 Đá Luyện Linh Cần</span><span class="s-val cyan" id="resLinhHachDa">76,953</span></div>
              <div class="stat-box"><span class="s-label">🪙 Vàng Cần</span><span class="s-val gold" id="resLinhHachGold">15,390,600</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr><th>Cấp Linh Hạch</th><th>Mảnh Linh Hạch</th><th>Đá Luyện Linh</th></tr>
                </thead>
                <tbody id="petLinhHachTableBody"></tbody>
                <tfoot>
                  <tr><td>TỔNG (Lv 1 → 17)</td><td class="gold">3,079 Mảnh</td><td class="cyan">76,953 Đá</td></tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 15. PET TÀI NĂNG ─── -->
        <div id="sub-pet_tai_nang" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>📖 Bảng Tra Pet Tài Năng (Sách Trí Tuệ Lv 1 → 10)</h2>
              <span class="badge gold">10 Cấp Kỹ Năng</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="taiNangStartLevel">Cấp Hiện Tại:</label>
                <select id="taiNangStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Mới)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option>
                </select>
              </div>
              <div class="form-group">
                <label for="taiNangTargetLevel">Cấp Mục Tiêu:</label>
                <select id="taiNangTargetLevel" class="input-select">
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="6">Cấp 6</option>
                  <option value="7">Cấp 7</option><option value="8">Cấp 8</option>
                  <option value="9">Cấp 9</option><option value="10" selected>Cấp 10 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">📖 Tổng Sách Trí Tuệ Cần</span><span class="s-val gold" id="resTaiNangSach">1,650</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr><th>Cấp Tài Năng</th><th>Sách Trí Tuệ</th><th>Tổng Cộng Dồn</th></tr>
                </thead>
                <tbody id="petTaiNangTableBody"></tbody>
                <tfoot>
                  <tr><td>TỔNG (Lv 1 → 10)</td><td class="gold">1,650 Sách</td><td>Hoàn thành max tài năng pet</td></tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 16. HÓA THẦN TU LUYỆN ─── -->
        <div id="sub-hoa_than_tu_luyen" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🔥 Bảng Tra Hóa Thần Tu Luyện (Đột Phá Bậc 1 → 10)</h2>
              <span class="badge red">13,950 Đá Hóa Thần</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="hoaThanStartTier">Bậc Hiện Tại:</label>
                <select id="hoaThanStartTier" class="input-select">
                  <option value="0">Bậc 0 (Chưa Đột Phá)</option>
                  <option value="1">Bậc 1</option><option value="2">Bậc 2</option>
                  <option value="3">Bậc 3</option><option value="4">Bậc 4</option>
                  <option value="5">Bậc 5</option><option value="6">Bậc 6</option>
                  <option value="7">Bậc 7</option><option value="8">Bậc 8</option>
                  <option value="9">Bậc 9</option>
                </select>
              </div>
              <div class="form-group">
                <label for="hoaThanTargetTier">Bậc Mục Tiêu:</label>
                <select id="hoaThanTargetTier" class="input-select">
                  <option value="1">Bậc 1</option><option value="2">Bậc 2</option>
                  <option value="3">Bậc 3</option><option value="4">Bậc 4</option>
                  <option value="5">Bậc 5</option><option value="6">Bậc 6</option>
                  <option value="7">Bậc 7</option><option value="8">Bậc 8</option>
                  <option value="9">Bậc 9</option><option value="10" selected>Bậc 10 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">🔥 Tổng Đá Hóa Thần Cần</span><span class="s-val gold" id="resHoaThanDa">13,950</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Đột Phá Bậc</th>
                    <th>Đá Hóa Thần Cần</th>
                    <th>TL 3 Cấp 20</th>
                    <th>TL 3 Cấp 40</th>
                    <th>TL 3 Cấp 60</th>
                    <th>TL 3 Cấp 80</th>
                    <th>TL 3 Cấp 100</th>
                  </tr>
                </thead>
                <tbody id="hoaThanTuLuyenTableBody"></tbody>
                <tfoot>
                  <tr><td>TỔNG (Bậc 1 → 10)</td><td class="gold">13,950 Đá Hóa Thần</td><td colspan="5">Chi tiết các mốc Tu Luyện 3 yêu cầu</td></tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- ─── 17. NGỌC VŨ KHÍ ─── -->
        <div id="sub-ngoc_vu_khi" class="sub-panel">
          <div class="glass-card">
            <div class="card-header-bar">
              <h2>🎯 Bảng Tra Ngọc Vũ Khí (Đá Cần Nâng Cấp Lv 1 → 20)</h2>
              <span class="badge cyan">Lv 1 → 20 MAX</span>
            </div>

            <div class="grid-form">
              <div class="form-group">
                <label for="ngocVuKhiStartLevel">Cấp Hiện Tại:</label>
                <select id="ngocVuKhiStartLevel" class="input-select">
                  <option value="0">Cấp 0 (Chưa Lên)</option>
                  <option value="1">Cấp 1</option><option value="2">Cấp 2</option>
                  <option value="3">Cấp 3</option><option value="4">Cấp 4</option>
                  <option value="5">Cấp 5</option><option value="10">Cấp 10</option>
                  <option value="15">Cấp 15</option>
                </select>
              </div>
              <div class="form-group">
                <label for="ngocVuKhiTargetLevel">Cấp Mục Tiêu:</label>
                <select id="ngocVuKhiTargetLevel" class="input-select">
                  <option value="5">Cấp 5</option><option value="10">Cấp 10</option>
                  <option value="15">Cấp 15</option><option value="20" selected>Cấp 20 (MAX)</option>
                </select>
              </div>
            </div>

            <div class="stat-summary-grid" style="grid-template-columns: 1fr;">
              <div class="stat-box"><span class="s-label">🎯 Tổng Đá Nâng Cấp Ngọc Vũ Khí</span><span class="s-val cyan" id="resNgocVuKhiDa">10,800</span></div>
            </div>

            <div class="table-responsive" style="margin-top:20px;">
              <table class="data-table">
                <thead>
                  <tr><th>Cấp Độ Ngọc</th><th>Đá Cần Nâng Cấp</th></tr>
                </thead>
                <tbody id="ngocVuKhiTableBody"></tbody>
                <tfoot>
                  <tr><td>TỔNG (Lv 1 → 20)</td><td class="cyan">10,800 Đá</td></tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

      </section>

      <!-- ════════ TAB 2: THƯỚC BẮN GÓC ════════ -->
      <section id="tab-ballistics" class="tab-panel">
        <div class="glass-card">
          <div class="card-header-bar">
            <h2>🎯 Thước Tính Góc &amp; Lực Bắn Trực Quan Gunny</h2>
            <p>Chọn công thức · Kéo thanh gió &amp; khoảng cách · Mô phỏng đường đạn realtime</p>
          </div>

          <div class="formula-selector-group">
            <button class="btn-formula active" data-formula="65" id="btn-f65">🎯 Góc 65° Chuẩn</button>
            <button class="btn-formula"        data-formula="70" id="btn-f70">🎯 Góc 70° Chiều Sâu</button>
            <button class="btn-formula"        data-formula="30" id="btn-f30">🎯 Góc 30° Đường Thẳng</button>
            <button class="btn-formula"        data-formula="90" id="btn-f90">🚀 Siêu Cao (Góc 90°)</button>
            <button class="btn-formula"        data-formula="50" id="btn-f50">🎯 Góc 50° Tầm Trung</button>
          </div>

          <div class="ballistics-layout">
            <!-- Controls -->
            <div class="controls-card">
              <div class="control-group">
                <div class="label-row">
                  <label for="balDistance">Khoảng Cách (Đoạn màn hình):</label>
                  <span class="pill-badge gold" id="valDistance">10</span>
                </div>
                <input type="range" id="balDistance" min="1" max="20" value="10" step="1" class="slider-neon">
              </div>

              <div class="control-group">
                <div class="label-row">
                  <label for="balWind">Gió (Xuôi dương / Ngược âm):</label>
                  <span class="pill-badge cyan" id="valWind">0.0</span>
                </div>
                <input type="range" id="balWind" min="-5.0" max="5.0" value="0.0" step="0.1" class="slider-neon">
              </div>

              <div class="control-group">
                <div class="label-row">
                  <label>Hướng Bắn:</label>
                </div>
                <div class="radio-toggle-group">
                  <button class="btn-toggle active" data-dir="xuoi" id="btnDirXuoi">Gió Xuôi ➡️</button>
                  <button class="btn-toggle"        data-dir="nguoc" id="btnDirNguoc">Gió Ngược ⬅️</button>
                </div>
              </div>
            </div>

            <!-- Visual Display Area -->
            <div class="result-display-card">
              <div class="trajectory-canvas-wrap">
                <svg id="trajectorySvg" viewBox="0 0 400 180" class="trajectory-svg">
                  <defs>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#00f2fe" />
                      <stop offset="50%" stop-color="#ffd700" />
                      <stop offset="100%" stop-color="#ff007f" />
                    </linearGradient>
                  </defs>
                  <line x1="20" y1="160" x2="380" y2="160" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="4 4" />
                  <path id="trajectoryPath" d="M 30 160 Q 190 30 350 160" fill="none" stroke="url(#arcGrad)" stroke-width="4" />
                  <circle cx="30" cy="160" r="8" fill="#00f2fe" class="glow-point" />
                  <circle cx="350" cy="160" r="8" fill="#ffd700" class="glow-point" />
                </svg>
              </div>

              <div class="big-result-row">
                <div class="big-res-box">
                  <span class="r-label">Góc Bắn Chuẩn</span>
                  <span class="r-num cyan-glow" id="balResAngle">65°</span>
                </div>
                <div class="big-res-box">
                  <span class="r-label">Lực Bắn Chuẩn</span>
                  <span class="r-num gold-glow" id="balResPower">60</span>
                </div>
              </div>

              <div class="note-banner" id="balResNote">
                Công thức Góc 65: Gió xuôi 1.0 → Cộng 2 góc. Lực kéo 60.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ════════ TAB 3: KHO THỜI TRANG GUNNY ════════ -->
      <section id="tab-fashion" class="tab-panel">
        <div class="glass-card">
          <div class="card-header-bar">
            <h2>👗 Kho Dữ Liệu Thời Trang Gunny (Set, Cánh &amp; Bong Bóng)</h2>
            <p>540+ Bộ Thời Trang &amp; Set Đặc Biệt · 1,139+ Vật Phẩm (Nón, Tóc, Áo, Mắt, Cánh, Bong Bóng)</p>
          </div>

          <!-- Mode Switcher -->
          <div class="fashion-mode-toggle">
            <button class="btn-mode active" data-mode="SETS" id="btnModeSets">📦 Xem Theo Trọn Bộ (540+ Bộ &amp; Set)</button>
            <button class="btn-mode"        data-mode="ITEMS" id="btnModeItems">🔍 Xem Chi Tiết Từng Món (1,130+ Món)</button>
          </div>

          <!-- Search & Filter Controls -->
          <div class="fashion-filter-card">
            <div class="fashion-search-row">
              <div class="search-input-wrap">
                <span class="search-icon">🔍</span>
                <input type="text" id="fashionSearchInput" placeholder="Nhập tên bộ (Ví dụ: Kỵ Sĩ Bóng Tối, Phi Long, Cánh Thần Gió...) hoặc tên vật phẩm..." class="search-input">
                <button id="btnClearFashionSearch" class="btn-clear-search">✕</button>
              </div>
            </div>

            <!-- Quick Filter Pills -->
            <div class="fashion-quick-pills">
              <span class="pills-label">⚡ Lọc Nhanh:</span>
              <button class="pill-btn active" data-slot="ALL" data-gender="ALL">✨ Tất Cả</button>
              <button class="pill-btn" data-slot="Cánh" data-gender="ALL">🪽 Cánh Bay</button>
              <button class="pill-btn" data-slot="Bong Bóng" data-gender="ALL">💬 Bong Bóng Chat</button>
              <button class="pill-btn" data-slot="Set Trang Phục" data-gender="ALL">👗 Set Đặc Biệt</button>
              <button class="pill-btn" data-slot="ALL" data-gender="Nam">👦 Trang Phục Nam</button>
              <button class="pill-btn" data-slot="ALL" data-gender="Nữ">👧 Trang Phục Nữ</button>
            </div>

            <div class="fashion-tags-row">
              <div class="filter-group">
                <label for="fashionGenderFilter">👤 Giới Tính:</label>
                <select id="fashionGenderFilter" class="input-select-sm">
                  <option value="ALL">Tất cả giới tính</option>
                  <option value="Nam">👦 Nam</option>
                  <option value="Nữ">👧 Nữ</option>
                  <option value="Cả Nam & Nữ">👫 Cả Nam &amp; Nữ</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="fashionSlotFilter">👒 Loại Trang Bị:</label>
                <select id="fashionSlotFilter" class="input-select-sm">
                  <option value="ALL">Tất cả loại (Nón, Tóc, Áo...)</option>
                  <option value="Nón">👑 Nón</option>
                  <option value="Tóc">💇 Tóc</option>
                  <option value="Áo">👕 Áo</option>
                  <option value="Mắt">👁️ Mắt</option>
                  <option value="Kính">👓 Kính</option>
                  <option value="Mặt">🎭 Mặt</option>
                  <option value="Set Trang Phục">👗 Set Trang Phục</option>
                  <option value="Cánh">🪽 Cánh</option>
                  <option value="Bong Bóng">💬 Bong Bóng</option>
                </select>
              </div>

              <div class="fashion-counter-pill">
                Hiển thị: <strong id="fashionMatchCount" class="gold">0</strong> / <span id="fashionTotalCount">1,139</span> vật phẩm
              </div>
            </div>
          </div>

          <!-- Results Grid -->
          <div id="fashionGrid" class="fashion-grid"></div>
        </div>
      </section>

    </div>
  </main>

  <!-- ════════════════ SMART COMMAND PALETTE (CTRL + K) ════════════════ -->
  <div id="commandPaletteModal" class="modal-overlay">
    <div class="command-palette-card glass-card">
      <div class="palette-search-bar">
        <span class="palette-icon">🔍</span>
        <input type="text" id="paletteSearchInput" placeholder="Tìm nhanh tính năng, vật phẩm, công thức (ví dụ: Đá hóa thần, Góc 65, Cánh...)" autocomplete="off">
        <button id="btnClosePalette" class="palette-close-btn">ESC</button>
      </div>
      <div id="paletteResultsList" class="palette-results"></div>
    </div>
  </div>

  <!-- ════════════════ SMART GOAL SHOPPING BAG DRAWER ════════════════ -->
  <div id="goalBagDrawer" class="drawer-overlay">
    <div class="goal-bag-panel glass-card">
      <div class="drawer-header">
        <div class="drawer-title-wrap">
          <span class="drawer-icon">🎒</span>
          <h3>Túi Dự Tính Nguyên Liệu Mục Tiêu</h3>
        </div>
        <button id="btnCloseGoalBag" class="drawer-close-btn">✕</button>
      </div>
      <div class="drawer-body">
        <p class="drawer-desc">Danh sách các mốc nâng cấp bạn đang nhắm tới:</p>
        <div id="goalItemsList" class="goal-items-list"></div>
        <div class="goal-total-summary" id="goalTotalSummary"></div>
      </div>
      <div class="drawer-footer">
        <button id="btnClearAllGoals" class="btn-clear-goals">🗑️ Xóa Tất Cả</button>
        <button id="btnCopyGoalSummary" class="btn-copy-goals">📋 Sao Chép Danh Sách</button>
      </div>
    </div>
  </div>

  <!-- ════════════════ FOOTER ════════════════ -->
  <footer class="footer">
    <div class="footer-container">
      <p>© 2026 <strong>PMT Gunny Master</strong> — Nguồn dữ liệu chuẩn chuẩn xác bởi <strong>PMT</strong> &amp; Gunner Community.</p>
    </div>
  </footer>

</div>

<!-- Data scripts -->
<script src="src/data/refining.js"></script>
<script src="src/data/pet_evolution.js"></script>
<script src="src/data/magic_stones_exp.js"></script>
<script src="src/data/jewel_conversion.js"></script>
<script src="src/data/mount_up.js"></script>
<script src="src/data/phu_ma.js"></script>
<script src="src/data/vat_to.js"></script>
<script src="src/data/duc_hon.js"></script>
<script src="src/data/chien_hon_don.js"></script>
<script src="src/data/manh_hoa_pet.js"></script>
<script src="src/data/ngoc.js"></script>
<script src="src/data/fashion.js"></script>
<script src="src/data/info_data.js"></script>
<script src="src/data/mieu_than.js"></script>
<script src="src/data/pet_linh_hach.js"></script>
<script src="src/data/pet_tai_nang.js"></script>
<script src="src/data/hoa_than_tu_luyen.js"></script>
<script src="src/data/ngoc_vu_khi.js"></script>

<!-- Engine scripts -->
<script src="src/core/calculatorEngine.js"></script>
<script src="src/core/ballisticsEngine.js"></script>

<!-- Client App Logic (Modular ES6 Architecture) -->
<script type="module" src="js/app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), indexHtmlContent);
console.log('Saved updated index.html successfully!');
