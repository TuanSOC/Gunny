/**
 * Dữ liệu Thú Cưng Gunny PC (Pets - Cập nhật Mới Nhất)
 */
var PetsData = {
petTypes: [
    { id: "rong_bang_gia", name: "Rồng Băng Giá 5★ (Bán Băng & Đóng Băng)", primaryStat: "Gai Băng & Hơi Thở Băng Giá" },
    { id: "ton_ngo_khong", name: "Tôn Ngộ Không 5★ (Cận Chiến & Biến Hình)", primaryStat: "Sát Thương & Bạo Kích" },
    { id: "thanh_long", name: "Thanh Long 5★ (Thần Lôi & Triệu Hồi)", primaryStat: "Công Thủ Toàn Diện" },
    { id: "mầm_xanh", name: "Mầm Xanh (Hồi Máu & Phòng Thủ)", primaryStat: "Máu & Hộ Giáp" },
    { id: "gà_con", name: "Gà Con (Bạo Kích & Sát Thương)", primaryStat: "Tấn Công & Bạo Kích" },
    { id: "đấu_sĩ", name: "Đấu Sĩ Kiến (Giáp & Khống Chế)", primaryStat: "Giáp & Giảm Thương" },
    { id: "rồng_lửa", name: "Rồng Lửa (Siêu Sát Thương Fiery)", primaryStat: "Sát Thương & Thiêu Đốt" },
    { id: "phụng_hoàng", name: "Phụng Hoàng (Hồi Sinh & Bạo Kích)", primaryStat: "Sát Thương & Tái Sinh" }
  ],
  maxPetLevel: 70,
  foodTypes: [
    { name: "Thức Ăn Thường (Lúa/Ngô)", exp: 50 },
    { name: "Thức Ăn Cao Cấp", exp: 200 },
    { name: "Thức Ăn Thượng Hạng (Thức Ăn Pet Siêu Cấp)", exp: 1000 }
  ],
  getExpRequiredForLevel: function(level) {
    if (level <= 10) return level * 100;
    if (level <= 30) return 1000 + (level - 10) * 300;
    if (level <= 50) return 7000 + (level - 30) * 800;
    return 23000 + (level - 50) * 2000;
  },
  starAscension: [
    { star: 1, foodCost: 50, pillCost: 10, bonusPercent: "10%" },
    { star: 2, foodCost: 150, pillCost: 30, bonusPercent: "25%" },
    { star: 3, foodCost: 400, pillCost: 80, bonusPercent: "45%" },
    { star: 4, foodCost: 1000, pillCost: 200, bonusPercent: "70%" },
    { star: 5, foodCost: 2500, pillCost: 500, bonusPercent: "100%" }
  ],

  // Đột phá & Thức Tỉnh Pet
  breakthroughInfo: {
    startLevel: 60,
    targetLevel: 70,
    materialsNeeded: {
      linhLoDon: 100, // Tăng sao
      daTamSinh: 30,   // Đột phá giới hạn level 70
      buaBaoVe: 10
    },
    awakeningSkills: [
      { name: "Gai Băng (Rồng Băng)", desc: "Gây 250% sát thương băng và đóng băng mục tiêu trong 1 lượt." },
      { name: "Hơi Thở Băng Giá", desc: "Sát thương xuyên địa hình và xuyên 30% phòng thủ đối phương." },
      { name: "Giấc Ngủ Vĩnh Hằng", desc: "Khi nhận sát thương kết liễu, hóa băng bảo hộ bản thân 1 lượt." }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PetsData;
}
