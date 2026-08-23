# -*- coding: utf-8 -*-
"""
Build Redesigned index.html for PMT Gunny Master Dashboard
"""
import re

with open('index.html', 'r', encoding='utf-8') as f:
    old_html = f.read()

# Extract #tab-refining content
start_ref = old_html.find('<section id="tab-refining"')
end_ref = old_html.find('</section>', start_ref) + len('</section>')
refining_content = old_html[start_ref:end_ref]

# Extract #tab-ballistics content
start_bal = old_html.find('<section id="tab-ballistics"')
end_bal = old_html.find('</section>', start_bal) + len('</section>')
ballistics_content = old_html[start_bal:end_bal]

# Extract #tab-fashion content
start_fash = old_html.find('<section id="tab-fashion"')
end_fash = old_html.find('</section>', start_fash) + len('</section>')
fashion_content = old_html[start_fash:end_fash]

# Extract #tab-services content
start_serv = old_html.find('<section id="tab-services"')
end_serv = old_html.find('</section>', start_serv) + len('</section>')
services_content = old_html[start_serv:end_serv]

# Extract scripts from bottom
start_scripts = old_html.find('<!-- Data scripts -->')
scripts_content = old_html[start_scripts:]

# Build Dashboard View HTML
dashboard_view_html = '''      <!-- ════════ TAB 0: DASHBOARD (HOME HUB) ════════ -->
      <section id="tab-dashboard" class="tab-panel active">
        <!-- Hero Welcome Banner -->
        <div class="dashboard-hero-banner">
          <div class="hero-welcome-badge">
            <span class="pulse-dot"></span> PHIÊN BẢN 3.0 · PMT GUNNY MASTER DASHBOARD
          </div>
          <h2 class="hero-title">Trợ Thủ Tra Cứu &amp; Tối Ưu Hóa Gunny PC</h2>
          <p class="hero-subtitle">
            Hệ thống dashboard toàn diện chuẩn xác 100%: Tra cứu 21 bảng nguyên liệu nâng cấp, thước tính góc và quỹ đạo đạn radar AI, kho thời trang 540+ set và dịch vụ kéo acc Gunny chuyên nghiệp.
          </p>
          <div class="hero-stats-row">
            <div class="hero-stat-card">
              <span class="h-num cyan">21</span>
              <span class="h-lbl">Bảng Nâng Cấp Chuẩn</span>
            </div>
            <div class="hero-stat-card">
              <span class="h-num gold">540+</span>
              <span class="h-lbl">Set &amp; Cánh Thời Trang</span>
            </div>
            <div class="hero-stat-card">
              <span class="h-num purple">6</span>
              <span class="h-lbl">Công Thức Bắn Góc AI</span>
            </div>
            <div class="hero-stat-card">
              <span class="h-num green">100%</span>
              <span class="h-lbl">Dữ Liệu Chuẩn Game PC</span>
            </div>
          </div>
        </div>

        <!-- Quick Access Action Cards -->
        <div class="section-title-bar">
          <h3 class="section-title">⚡ Lối Tắt Truy Cập Nhanh (Quick Actions)</h3>
        </div>
        <div class="quick-actions-grid">
          <div class="quick-action-card" data-jump-tab="tab-refining" data-jump-target="refining">
            <div class="action-icon-box gold">💎</div>
            <div class="action-card-info">
              <span class="action-card-title">Gia Công Vòng Nạp</span>
              <span class="action-card-desc">Cấp 0 → 14 (Đá, Đồng, Bạc, Vàng, Ngọc)</span>
            </div>
          </div>
          <div class="quick-action-card" data-jump-tab="tab-ballistics">
            <div class="action-icon-box cyan">🎯</div>
            <div class="action-card-info">
              <span class="action-card-title">Thước Bắn Góc 65°</span>
              <span class="action-card-desc">Tính lực, bù trừ gió &amp; dốc siêu chuẩn</span>
            </div>
          </div>
          <div class="quick-action-card" data-jump-tab="tab-refining" data-jump-target="than_ho_menh">
            <div class="action-icon-box purple">🛡️</div>
            <div class="action-card-info">
              <span class="action-card-title">Thần Hộ Mệnh</span>
              <span class="action-card-desc">Lv 1 → 70, Pha Lê &amp; Linh Nguyên</span>
            </div>
          </div>
          <div class="quick-action-card" data-jump-tab="tab-refining" data-jump-target="pet_ca_tinh">
            <div class="action-icon-box gold">🎭</div>
            <div class="action-card-info">
              <span class="action-card-title">Cá Tính Pet</span>
              <span class="action-card-desc">Lv 1 → 60 (Đá Tín Nhiệm)</span>
            </div>
          </div>
          <div class="quick-action-card" data-jump-tab="tab-refining" data-jump-target="pet_evo">
            <div class="action-icon-box">🌿</div>
            <div class="action-card-info">
              <span class="action-card-title">Tiến Hóa Pet</span>
              <span class="action-card-desc">Cỏ Thiên Điệp Lv 1 → 50</span>
            </div>
          </div>
          <div class="quick-action-card" data-jump-tab="tab-fashion">
            <div class="action-icon-box purple">👗</div>
            <div class="action-card-info">
              <span class="action-card-title">Kho Thời Trang</span>
              <span class="action-card-desc">Tra cứu 540+ set, cánh bay &amp; bong bóng</span>
            </div>
          </div>
        </div>

        <!-- Featured System Categories Explorer -->
        <div class="section-title-bar">
          <h3 class="section-title">📂 Danh Mục Hệ Thống Trọng Tâm</h3>
        </div>
        <div class="hub-categories-grid">
          <div class="hub-group">
            <div class="hub-group-header">
              <span>⚔️ Trang Bị &amp; Cường Hóa (7 Mục)</span>
            </div>
            <div class="hub-tiles-row">
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="refining">
                <span class="tile-icon">💎</span>
                <span class="tile-info"><strong class="tile-name">Gia Công</strong><small class="tile-sub">Lv 0 → 14</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="jewel_convert">
                <span class="tile-icon">💠</span>
                <span class="tile-info"><strong class="tile-name">Châu Báu</strong><small class="tile-sub">Cb 13 → 21</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="phu_ma">
                <span class="tile-icon">✨</span>
                <span class="tile-info"><strong class="tile-name">Phụ Ma</strong><small class="tile-sub">Bậc 1 → 5</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="duc_hon">
                <span class="tile-icon">🔮</span>
                <span class="tile-info"><strong class="tile-name">Đúc Hồn</strong><small class="tile-sub">Đồng → KC</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="ngoc_vu_khi">
                <span class="tile-icon">🎯</span>
                <span class="tile-info"><strong class="tile-name">Ngọc Vũ Khí</strong><small class="tile-sub">Lv 1 → 20</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="the_bai_dot_pha">
                <span class="tile-icon">🃏</span>
                <span class="tile-info"><strong class="tile-name">Đột Phá Thẻ</strong><small class="tile-sub">Lv 1 → 30</small></span>
              </button>
            </div>
          </div>

          <div class="hub-group">
            <div class="hub-group-header">
              <span>🐾 Pet &amp; Thú Cưỡi (8 Mục)</span>
            </div>
            <div class="hub-tiles-row">
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="pet_evo">
                <span class="tile-icon">🌿</span>
                <span class="tile-info"><strong class="tile-name">Tiến Hóa Pet</strong><small class="tile-sub">Lv 1 → 50</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="mount_up">
                <span class="tile-icon">🐴</span>
                <span class="tile-info"><strong class="tile-name">Thú Cưỡi</strong><small class="tile-sub">9 Loại Thú</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="pet_linh_hach">
                <span class="tile-icon">💠</span>
                <span class="tile-info"><strong class="tile-name">Linh Hạch</strong><small class="tile-sub">Lv 1 → 17</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="pet_tai_nang">
                <span class="tile-icon">📖</span>
                <span class="tile-info"><strong class="tile-name">Tài Năng Pet</strong><small class="tile-sub">Sách 1 → 10</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="tinh_hach_thu_cuoi">
                <span class="tile-icon">💎</span>
                <span class="tile-info"><strong class="tile-name">Ô Tinh Hạch</strong><small class="tile-sub">Lv 1 → 10</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="pet_ca_tinh">
                <span class="tile-icon">🎭</span>
                <span class="tile-info"><strong class="tile-name">Cá Tính Pet</strong><small class="tile-sub">Lv 1 → 60</small></span>
              </button>
            </div>
          </div>

          <div class="hub-group">
            <div class="hub-group-header">
              <span>🔥 Hóa Thần &amp; Thần Khí (6 Mục)</span>
            </div>
            <div class="hub-tiles-row">
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="than_ho_menh">
                <span class="tile-icon">🛡️</span>
                <span class="tile-info"><strong class="tile-name">Thần Hộ Mệnh</strong><small class="tile-sub">Lv 1 → 70</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="hoa_than_tu_luyen">
                <span class="tile-icon">🔥</span>
                <span class="tile-info"><strong class="tile-name">Hóa Thần TL</strong><small class="tile-sub">Bậc 1 → 10</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="mieu_than">
                <span class="tile-icon">⛩️</span>
                <span class="tile-info"><strong class="tile-name">Miếu Thần</strong><small class="tile-sub">Cấp 0 → 10</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="vat_to">
                <span class="tile-icon">🗿</span>
                <span class="tile-info"><strong class="tile-name">Vật Tổ</strong><small class="tile-sub">Lv 1 → 50</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="chien_hon">
                <span class="tile-icon">⚔️</span>
                <span class="tile-info"><strong class="tile-name">Chiến Hồn</strong><small class="tile-sub">Lv 1 → 5</small></span>
              </button>
              <button class="hub-tile" data-jump-tab="tab-refining" data-jump-target="magic_exp">
                <span class="tile-icon">🔮</span>
                <span class="tile-info"><strong class="tile-name">Ma Thạch</strong><small class="tile-sub">Lv 2 → 10</small></span>
              </button>
            </div>
          </div>
        </div>
      </section>
'''

# Build Character Overview View HTML
character_view_html = '''      <!-- ════════ TAB 1: CHARACTER OVERVIEW (HỒ SƠ TIẾN ĐỘ) ════════ -->
      <section id="tab-character" class="tab-panel">
        <div class="character-header-card">
          <div class="char-avatar-box">👑</div>
          <div class="char-meta-info">
            <h2 class="char-name">Gunner Siêu Cấp · PMT Gaming Companion</h2>
            <p class="char-subtitle">Tổng quan mốc phát triển &amp; ước tính chỉ số toàn diện các hệ thống sức mạnh Gunny.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
              <span class="badge gold">🏆 Đua Top Toàn Server</span>
              <span class="badge cyan">⚡ 21 Hệ Thống Tối Ưu</span>
              <span class="badge purple">🛡️ Lực Chiến Đỉnh Cao</span>
            </div>
          </div>
          <div class="char-power-box">
            <span class="power-lbl">Lực Chiến Ước Tính</span>
            <span class="power-val">8,500,000,000+</span>
            <span style="font-size:11px;color:var(--text-muted);margin-top:2px;">Cập nhật theo 21 hệ thống</span>
          </div>
        </div>

        <div class="section-title-bar">
          <h3 class="section-title">📊 Tiến Độ 12 Hệ Thống Trọng Điểm (Bấm để tính toán)</h3>
        </div>

        <div class="progression-cards-grid">
          <!-- Card 1 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">💎 Gia Công Vòng Tẩy Nạp</span>
              <span class="prog-level">Cấp 14 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill gold" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>Đá, Đồng, Bạc, Vàng, Ngọc</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="refining">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 2 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🛡️ Thần Hộ Mệnh &amp; Linh Bảo</span>
              <span class="prog-level">Cấp 70 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>EXP 4★/5★, Pha Lê &amp; Linh Nguyên</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="than_ho_menh">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 3 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🎭 Cá Tính Pet</span>
              <span class="prog-level">Cấp 60 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill gold" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>97,714 Đá Tín Nhiệm</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="pet_ca_tinh">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 4 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🌿 Tiến Hóa Pet</span>
              <span class="prog-level">Cấp 50 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>80,903 Cỏ Thiên Điệp</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="pet_evo">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 5 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🐴 Thú Cưỡi &amp; Tọa Kỵ</span>
              <span class="prog-level">9 Thú Cưỡi Lv 10</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill gold" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>Đan Ngựa, Heo, Sói, Chổi, Cỗ Máy</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="mount_up">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 6 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🃏 Đột Phá Thẻ Bài</span>
              <span class="prog-level">Cấp 30 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>Đá Đột Phá &amp; Điểm Hồn</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="the_bai_dot_pha">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 7 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">💎 Ô Tinh Hạch Thú Cưỡi</span>
              <span class="prog-level">Cấp 10 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill gold" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>3,990 Kết Tinh &amp; 51.1k Thuốc</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="tinh_hach_thu_cuoi">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 8 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">✨ Phụ Ma Trang Bị</span>
              <span class="prog-level">Bậc 5 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>29,810 Đá Phụ Ma</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="phu_ma">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 9 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🔮 Đúc Hồn Kim Cương</span>
              <span class="prog-level">Cấp 5 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill gold" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>Đá Luyện Hồn &amp; Đá Đúc Hồn</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="duc_hon">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 10 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🔥 Vật Tổ</span>
              <span class="prog-level">Cấp 50 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>Chi phí 1 cọc &amp; 7 cọc</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="vat_to">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 11 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🎯 Ngọc Vũ Khí</span>
              <span class="prog-level">Cấp 20 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill gold" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>19,000 Đá Nâng Cấp</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="ngoc_vu_khi">Mở Bảng Tính ➔</button>
          </div>

          <!-- Card 12 -->
          <div class="progression-card">
            <div class="prog-head">
              <span class="prog-title">🔥 Hóa Thần Tu Luyện</span>
              <span class="prog-level">Bậc 10 MAX</span>
            </div>
            <div class="prog-bar-wrap">
              <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 100%;"></div></div>
              <div class="prog-info-row"><span>Đá Hóa Thần &amp; Tu Luyện 3</span><span>100%</span></div>
            </div>
            <button class="btn-outline" data-jump-tab="tab-refining" data-jump-target="hoa_than_tu_luyen">Mở Bảng Tính ➔</button>
          </div>
        </div>
      </section>
'''

# New HTML Document Template
new_html = f'''<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PMT Gunny Master — Gaming Utility Dashboard &amp; Companion 2026</title>
  <meta name="description" content="Trang web trợ thủ toàn diện PMT Gunny Master: Tra cứu 21 bảng nguyên liệu chuẩn xác, thước tính góc và lực bắn trực quan, kho wiki thời trang 540+ bộ.">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="alternate icon" href="icons/icon48.png">
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

  <!-- Ambient Cyber Particle Backdrop -->
  <canvas id="bgParticlesCanvas" class="bg-particles-canvas"></canvas>

  <div class="app-shell">

    <!-- Mobile Sidebar Backdrop Overlay -->
    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

    <!-- ════════════════ LEFT SIDEBAR ════════════════ -->
    <aside class="app-sidebar">
      <div class="sidebar-header">
        <a href="#" class="sidebar-brand" data-tab="tab-dashboard">
          <div class="sidebar-brand-logo">
            <img src="favicon.svg" alt="PMT Logo">
          </div>
          <div class="sidebar-brand-text">
            <span class="sidebar-brand-title">GUNNY MASTER</span>
            <span class="sidebar-brand-sub">GAMING COMPANION</span>
          </div>
        </a>
        <button id="btnToggleSidebar" class="sidebar-toggle-btn" title="Thu gọn/Mở rộng Sidebar">
          <span>◀</span>
        </button>
      </div>

      <div class="sidebar-body">
        <!-- Group: Overview -->
        <div class="nav-group">
          <span class="nav-group-title">Tổng Quan</span>
          <button class="nav-item-btn active" data-tab="tab-dashboard">
            <span class="nav-item-icon">📊</span>
            <span class="nav-item-label">Dashboard Hub</span>
            <span class="nav-item-badge">Hot</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-character">
            <span class="nav-item-icon">👤</span>
            <span class="nav-item-label">Hồ Sơ &amp; Lực Chiến</span>
          </button>
        </div>

        <!-- Group: Trang Bị & Rèn -->
        <div class="nav-group">
          <span class="nav-group-title">Trang Bị &amp; Rèn</span>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="refining">
            <span class="nav-item-icon">💎</span>
            <span class="nav-item-label">Gia Công (Lv 0→14)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="jewel_convert">
            <span class="nav-item-icon">💠</span>
            <span class="nav-item-label">Châu Báu (13→21)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="phu_ma">
            <span class="nav-item-icon">✨</span>
            <span class="nav-item-label">Phụ Ma (Bậc 1→5)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="duc_hon">
            <span class="nav-item-icon">🔮</span>
            <span class="nav-item-label">Đúc Hồn (Đồng→KC)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="ngoc_vu_khi">
            <span class="nav-item-icon">🎯</span>
            <span class="nav-item-label">Ngọc Vũ Khí (1→20)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="manh_ngoc_lam">
            <span class="nav-item-icon">🔷</span>
            <span class="nav-item-label">Mảnh Ngọc Lam (1→9)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="the_bai_dot_pha">
            <span class="nav-item-icon">🃏</span>
            <span class="nav-item-label">Đột Phá Thẻ (1→30)</span>
          </button>
        </div>

        <!-- Group: Pet & Thú Cưỡi -->
        <div class="nav-group">
          <span class="nav-group-title">Pet &amp; Thú Cưỡi</span>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="pet_evo">
            <span class="nav-item-icon">🌿</span>
            <span class="nav-item-label">Tiến Hóa Pet (1→50)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="manh_hoa">
            <span class="nav-item-icon">🐣</span>
            <span class="nav-item-label">Manh Hóa (1→29)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="pet_linh_hach">
            <span class="nav-item-icon">💠</span>
            <span class="nav-item-label">Linh Hạch (1→17)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="pet_tai_nang">
            <span class="nav-item-icon">📖</span>
            <span class="nav-item-label">Tài Năng Pet (1→10)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="mount_up">
            <span class="nav-item-icon">🐴</span>
            <span class="nav-item-label">Thú Cưỡi (9 Loại)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="ngoc_thu_cuoi">
            <span class="nav-item-icon">🐎</span>
            <span class="nav-item-label">Ngọc Tọa Kỵ (1/2/3)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="tinh_hach_thu_cuoi">
            <span class="nav-item-icon">💎</span>
            <span class="nav-item-label">Ô Tinh Hạch (1→10)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="pet_ca_tinh">
            <span class="nav-item-icon">🎭</span>
            <span class="nav-item-label">Cá Tính Pet (1→60)</span>
          </button>
        </div>

        <!-- Group: Hóa Thần & Thần Khí -->
        <div class="nav-group">
          <span class="nav-group-title">Hóa Thần &amp; Thần Khí</span>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="mieu_than">
            <span class="nav-item-icon">⛩️</span>
            <span class="nav-item-label">Miếu Thần (0→10)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="hoa_than_tu_luyen">
            <span class="nav-item-icon">🔥</span>
            <span class="nav-item-label">Hóa Thần TL (1→10)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="than_ho_menh">
            <span class="nav-item-icon">🛡️</span>
            <span class="nav-item-label">Thần Hộ Mệnh (1→70)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="magic_exp">
            <span class="nav-item-icon">🔮</span>
            <span class="nav-item-label">Ma Thạch EXP (2→10)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="vat_to">
            <span class="nav-item-icon">🗿</span>
            <span class="nav-item-label">Vật Tổ (1→50)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-refining" data-target="chien_hon">
            <span class="nav-item-icon">⚔️</span>
            <span class="nav-item-label">Chiến Hồn (1→5)</span>
          </button>
        </div>

        <!-- Group: Công Cụ & Wiki -->
        <div class="nav-group">
          <span class="nav-group-title">Công Cụ &amp; Dịch Vụ</span>
          <button class="nav-item-btn" data-tab="tab-ballistics">
            <span class="nav-item-icon">🎯</span>
            <span class="nav-item-label">Thước Bắn Góc AI</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-fashion">
            <span class="nav-item-icon">👗</span>
            <span class="nav-item-label">Kho Thời Trang (540+)</span>
          </button>
          <button class="nav-item-btn" data-tab="tab-services">
            <span class="nav-item-icon">👑</span>
            <span class="nav-item-label">Dịch Vụ PMT Gaming</span>
          </button>
        </div>
      </div>

      <div class="sidebar-footer">
        <div class="sidebar-user-tag">
          <span class="sidebar-status-dot"></span>
          <span>v3.0 Dashboard Active</span>
        </div>
      </div>
    </aside>

    <!-- ════════════════ MAIN WRAPPER ════════════════ -->
    <div class="app-main-wrapper">

      <!-- ════════════════ TOP HEADER ════════════════ -->
      <header class="app-header">
        <div class="header-left">
          <button id="btnMobileMenu" class="mobile-menu-btn" title="Mở Menu">
            <span>☰</span>
          </button>
          <div class="header-breadcrumb">
            <span>Gunny Master</span>
            <span>/</span>
            <span id="breadcrumbActive" class="breadcrumb-active">Bảng Điều Khiển Tổng Quan</span>
          </div>
        </div>

        <div class="header-center">
          <button id="btnOpenCommandPalette" class="global-search-trigger" title="Tìm kiếm nhanh toàn trang (Ctrl+K)">
            <div class="search-trigger-left">
              <span>🔍</span>
              <span>Tìm tính năng, vũ khí, công thức...</span>
            </div>
            <kbd class="shortcut-kbd">Ctrl K</kbd>
          </button>
        </div>

        <div class="header-right">
          <!-- Theme Switcher -->
          <div class="theme-pill-group" title="Đổi màu sắc giao diện">
            <button class="btn-theme-dot active" data-theme="cyan" title="Cyber Cyan" style="background:#00f2fe;"></button>
            <button class="btn-theme-dot" data-theme="gold" title="Hoàng Kim Gold" style="background:#f59e0b;"></button>
            <button class="btn-theme-dot" data-theme="purple" title="Hư Không Violet" style="background:#a855f7;"></button>
            <button class="btn-theme-dot" data-theme="emerald" title="Ngọc Bích Emerald" style="background:#10b981;"></button>
          </div>

          <button id="btnToggleSound" class="btn-header-action" title="Bật/Tắt Âm Thanh Hiệu Ứng">
            <span id="soundIcon">🔊</span>
          </button>

          <a href="https://zalo.me/0981052217" target="_blank" rel="noopener noreferrer" class="btn-header-action zalo" title="Zalo PMT: 0981052217">
            <span>💬</span>
            <span class="btn-text">Zalo: 0981.052.217</span>
          </a>

          <a href="https://www.facebook.com/tinyy139" target="_blank" rel="noopener noreferrer" class="btn-header-action fb" title="Facebook PMT: Tinyy139">
            <span>📘</span>
            <span class="btn-text">Facebook</span>
          </a>
        </div>
      </header>

      <!-- ════════════════ MAIN CONTENT VIEW CONTAINER ════════════════ -->
      <main class="app-content">

{dashboard_view_html}

{character_view_html}

{refining_content}

{ballistics_content}

{fashion_content}

{services_content}

      </main>

      <!-- ════════════════ FOOTER ════════════════ -->
      <footer class="app-footer">
        <p>© 2026 <strong>PMT Gunny Master Dashboard</strong> — Nguồn dữ liệu chuẩn xác bởi <strong>PMT Gaming</strong> &amp; Gunner Community.</p>
      </footer>

    </div>

  </div>

  <!-- ════════ FLOATING FAST CONTACT WIDGET ════════ -->
  <div class="floating-contact-widget">
    <a href="https://zalo.me/0981052217" target="_blank" rel="noopener noreferrer" class="floating-contact-btn zalo" title="Chat Zalo: 0981052217">
      <span>💬</span>
      <span class="tooltip">Zalo: 0981.052.217</span>
    </a>
    <a href="https://www.facebook.com/tinyy139" target="_blank" rel="noopener noreferrer" class="floating-contact-btn fb" title="Facebook: Tinyy139">
      <span>📘</span>
      <span class="tooltip">Facebook PMT</span>
    </a>
  </div>

  <!-- ════════════════ SMART COMMAND PALETTE (CTRL + K) ════════════════ -->
  <div id="commandPaletteModal" class="modal-overlay">
    <div class="command-palette-card">
      <div class="palette-search-bar">
        <span class="palette-icon">🔍</span>
        <input type="text" id="paletteSearchInput" placeholder="Tìm nhanh tính năng, vật phẩm, công thức (ví dụ: Đá hóa thần, Góc 65, Cánh...)" autocomplete="off">
        <button id="btnClosePalette" class="palette-close-btn">ESC</button>
      </div>
      <div id="paletteResultsList" class="palette-results"></div>
    </div>
  </div>

{scripts_content}
'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("SUCCESS: index.html has been completely redesigned with Modern Gaming Utility Dashboard structure!")
