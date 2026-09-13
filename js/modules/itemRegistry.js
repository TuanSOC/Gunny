/* ============================================================
   PMT GUNNY MASTER — Item Registry
   ------------------------------------------------------------
   Nguồn duy nhất cho icon/màu của mọi nguyên liệu (để user
   nhận biết món đồ) — dùng cho badge/chip trong các bảng tính.
   ============================================================ */

/*
 * Bảng tra icon theo TỪ KHÓA — xếp từ CỤ THỂ ➜ CHUNG CHUNG.
 * Vì nhiều vật phẩm đều bắt đầu bằng "Đá ...", các cụm nhiều
 * từ phải đứng TRƯỚC từ khóa chung ("đá") để khớp đúng.
 * color = tên biến CSS accent (gold | cyan | purple | green | red | blue).
 */
const ICON_RULES = [
  // — Gia công cơ bản —
  [['đá gia công', 'gia công'], '⛏️', 'gold'],
  [['đồng'],                    '🪙', 'gold'],
  [['bạc'],                     '🥈', 'cyan'],
  // Cá Vàng / Cá 7 Màu (đan thú cưỡi) phải khớp TRƯỚC 'vàng' để không nhầm ra tiền vàng
  [['cá vàng', 'cá 7 màu'],     '🐟', 'cyan'],
  // "Vàng Linh Hạch" & "Vàng" đều là tiền vàng
  [['vàng'],                    '🥇', 'gold'],
  [['ngọc lam', 'mảnh ngọc'],   '🔷', 'blue'],
  [['ngọc vũ khí', 'nâng cấp ngọc'], '🎯', 'cyan'],
  [['ngọc'],                    '💠', 'cyan'],

  // — Pet —
  [['cỏ thiên điệp', 'cỏ', 'thiên điệp'], '🌿', 'green'],
  [['manh hóa'],                '🐾', 'green'],
  [['mảnh linh hạch', 'linh hạch'], '🧿', 'purple'],
  [['đá luyện linh', 'luyện linh'], '🔵', 'cyan'],
  [['sách trí tuệ', 'sách', 'trí tuệ'], '📚', 'blue'],
  [['tín nhiệm'],               '🤝', 'gold'],

  // — Ma thạch / châu báu —
  [['exp ma thạch', 'ma thạch'], '🔮', 'purple'],
  [['châu báu'],                '💎', 'cyan'],

  // — Hồn / trang bị —
  [['đá phụ ma', 'phụ ma'],     '📜', 'purple'],
  [['đá luyện hồn', 'luyện hồn'], '⚡', 'cyan'],
  [['đá đúc hồn', 'đúc hồn'],    '🔨', 'gold'],
  [['chiến hồn'],               '⚔️', 'red'],
  [['điểm hồn'],                '👻', 'cyan'],

  // — Vật tổ / miếu thần / hóa thần —
  [['vật tổ'],                  '🔥', 'red'],
  [['vật tế', 'miếu thần'],     '🏛️', 'gold'],
  [['đá hóa thần', 'hóa thần'], '☀️', 'gold'],

  // — Thần Hộ Mệnh / Thẻ bài / Tinh hạch —
  [['thần hộ mệnh'],            '🛡️', 'cyan'],
  [['pha lê'],                  '❄️', 'blue'],
  [['linh nguyên'],             '🌟', 'gold'],
  [['đá đột phá', 'đột phá'],   '🃏', 'purple'],
  [['kết tinh'],                '💠', 'cyan'],
  [['tuyệt cảnh', 'thuốc'],     '🧪', 'green'],

  // — Thú cưỡi (đan up) —
  [['ngựa'], '🐴', 'gold'],  [['heo'], '🐷', 'red'],
  [['sói'],  '🐺', 'cyan'],  [['chổi'], '🧹', 'purple'],
  [['cá'], '🐟', 'cyan'],
  [['thảm'], '🧶', 'green'], [['cỗ máy'], '🤖', 'blue'],

  // — Chung chung (fallback theo loại) —
  [['exp'],  '✨', 'purple'],
  [['đá'],   '🪨', 'gold'],
  [['xu', 'vé'], '🎫', 'gold'],
];

const DEFAULT_META = { icon: '📦', color: 'cyan' };

/** Escape ký tự HTML để chèn an toàn vào markup. */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Bỏ emoji + khoảng trắng thừa ở đầu tên để so khớp/hiển thị sạch. */
export function cleanName(name) {
  return String(name || '')
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}️‍\s]+/u, '')
    .trim();
}

/** Trả về { icon, color } cho một tên vật phẩm (khớp theo từ khóa). */
export function iconFor(name) {
  const n = cleanName(name).toLowerCase();
  for (const [keys, icon, color] of ICON_RULES) {
    if (keys.some(k => n.includes(k))) return { icon, color };
  }
  return DEFAULT_META;
}

/**
 * HTML badge cho một vật phẩm: icon + tên.
 * opts.qty  → hiện số lượng bên phải.
 * opts.compact → chỉ icon + tên gọn (dùng trong ô bảng).
 */
export function itemBadge(name, opts = {}) {
  const clean = cleanName(name);
  const safe = esc(clean);
  const { icon, color } = iconFor(name);
  const qtyHtml = opts.qty != null
    ? `<b class="ig-qty">${esc(opts.qty)}</b>` : '';
  return `<span class="ig-badge" data-c="${color}" title="${safe}">`
       + `<span class="ig-ic">${icon}</span>`
       + `<span class="ig-name">${safe}</span>${qtyHtml}</span>`;
}

/** Chỉ lấy icon (khi cần chèn trước text sẵn có). */
export function iconOnly(name) {
  return iconFor(name).icon;
}
