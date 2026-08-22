const fs = require('fs');
const path = require('path');

const infoDir = path.join(__dirname, '..', 'assets', 'info_images');
const files = fs.readdirSync(infoDir).filter(f => !f.includes('(1)'));

const categoryMap = [
  { keyword: '772938078', title: '🌿 Pet - Lên Cấp Lv 48 → 69', desc: 'Bảng chi tiết kinh nghiệm nâng cấp Pet cao cấp' },
  { keyword: '772959005', title: '⛩️ Miếu Thần - Chúc Phúc & Thăng Hoa (Cấp 0 → 10)', desc: 'Chỉ số cộng: HP, Ma Kháng, Kháng Bạo, Miễn Thương, Tất Kháng, Bảo Vệ' },
  { keyword: '772989183', title: '⚔️ Chiến Hồn - Cấp Chiến Hồn Đơn (Lv 1 → 6)', desc: 'Số lượng Chiến Hồn Đơn cần cho các mốc Lv 1 đến Lv 6' },
  { keyword: '773034398', title: '💠 Pet - Linh Hạch (Cấp Lv 1 → 17)', desc: 'Chi tiết Mảnh Linh Hạch và Đá Luyện Linh theo từng cấp' },
  { keyword: '773099247', title: '📖 Pet - Tài Năng (Sách Trí Tuệ Lv 1 → 10)', desc: 'Số lượng Sách Trí Tuệ cần thiết cho từng cấp Tài Năng Pet' },
  { keyword: '773138253', title: '☯️ Tu Luyện - Chỉ Số Tu Luyện Trang Bị', desc: 'Bảng quy đổi thuộc tính Tu Luyện nhân vật' },
  { keyword: '773158784', title: '🃏 Thẻ Bài - Cấp Sao & Tăng Cường Thẻ', desc: 'Chỉ số thuộc tính Thẻ Bài Gunny' },
  { keyword: '773240358', title: '🗿 Vật Tổ - Chi Phí Up Vật Tổ', desc: 'Lượng Điểm Danh Vọng / Điểm Kinh Nghiệm Vật Tổ' },
  { keyword: '773304132', title: '🔮 Ma Thạch - Cấp Ma Thạch & EXP', desc: 'EXP Nâng cấp Ma Thạch Hoàn Mỹ, Siêu Việt, Truyền Thuyết' },
  { keyword: '773339116', title: '🐎 Thú Cưỡi - Cấp Độ & Thuốc Up Thú', desc: 'Chi tiết Thuốc Thú Cưỡi cho từng loại' },
  { keyword: '773429972', title: '✨ Phụ Ma - Đá Phụ Ma Bậc 1 → 5', desc: 'Chỉ số cộng thêm & Số Đá Phụ Ma các bậc' },
  { keyword: '773450344', title: '🔮 Đúc Hồn - Đúc Hồn Đồng · Bạc · Vàng · Kim Cương', desc: 'Bảng tra lượng Đá Đúc Hồn & Đồng' },
  { keyword: '773454929', title: '⚔️ Chiến Hồn Đơn - Mốc Kim Hồn', desc: 'Bảng tra Chiến Hồn Đơn tổng 10 món' },
  { keyword: '773486105', title: '🐣 Pet - Manh Hóa Pet (Mốc 1 → 29)', desc: 'Số Mảnh Manh Hóa Pet từng cấp' },
  { keyword: '773492247', title: '🐎 Thú Cưỡi - Ngọc Up EXP Thú Cưỡi', desc: 'EXP Ngọc Thú Cưỡi Cấp 1, 2, 3' },
  { keyword: '773492357', title: '💠 Ngọc Lam - Mảnh Ngọc Lam (Cấp 1 → 9)', desc: 'Mảnh Ngọc Lam dùng nâng cấp' }
];

const infoList = files.map((file, idx) => {
  const match = categoryMap.find(c => file.includes(c.keyword));
  return {
    id: 'info_' + (idx + 1),
    fileName: file,
    imagePath: `assets/info_images/${file}`,
    title: match ? match.title : `📜 Bảng Chi Tiết System #${idx + 1}`,
    description: match ? match.description : 'Bảng chi tiết thông số hệ thống Gunny trích xuất từ folder Info'
  };
});

console.log('Total info items mapped:', infoList.length);

const outputCode = `var InfoData = ${JSON.stringify(infoList, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = InfoData;
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'info_data.js'), outputCode);
console.log('Saved src/data/info_data.js successfully!');
