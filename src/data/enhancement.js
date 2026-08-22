/**
 * Dữ liệu Cường Hóa & Tiến Hóa Vũ Khí Gunny PC (Cập nhật Mới Nhất)
 */
var EnhancementData = {
levels: [
    { level: 1, stonesLv1Needed: 3, gold: 500, baseSuccessRate: 1.00, statMultiplier: 1.05 },
    { level: 2, stonesLv1Needed: 6, gold: 1000, baseSuccessRate: 0.90, statMultiplier: 1.10 },
    { level: 3, stonesLv1Needed: 12, gold: 2000, baseSuccessRate: 0.80, statMultiplier: 1.18 },
    { level: 4, stonesLv1Needed: 25, gold: 4000, baseSuccessRate: 0.65, statMultiplier: 1.28 },
    { level: 5, stonesLv1Needed: 50, gold: 8000, baseSuccessRate: 0.50, statMultiplier: 1.40 },
    { level: 6, stonesLv1Needed: 100, gold: 15000, baseSuccessRate: 0.35, statMultiplier: 1.55 },
    { level: 7, stonesLv1Needed: 200, gold: 30000, baseSuccessRate: 0.25, statMultiplier: 1.72 },
    { level: 8, stonesLv1Needed: 400, gold: 50000, baseSuccessRate: 0.15, statMultiplier: 1.92 },
    { level: 9, stonesLv1Needed: 800, gold: 80000, baseSuccessRate: 0.10, statMultiplier: 2.15 },
    { level: 10, stonesLv1Needed: 1500, gold: 120000, baseSuccessRate: 0.07, statMultiplier: 2.45 },
    { level: 11, stonesLv1Needed: 2500, gold: 180000, baseSuccessRate: 0.05, statMultiplier: 2.80 },
    { level: 12, stonesLv1Needed: 4000, gold: 250000, baseSuccessRate: 0.03, statMultiplier: 3.20 },
    { level: 13, stonesLv1Needed: 6500, gold: 350000, baseSuccessRate: 0.02, statMultiplier: 3.70 },
    { level: 14, stonesLv1Needed: 10000, gold: 500000, baseSuccessRate: 0.015, statMultiplier: 4.30 },
    { level: 15, stonesLv1Needed: 15000, gold: 750000, baseSuccessRate: 0.01, statMultiplier: 5.00 }
  ],

  // Tính năng Tăng Cấp / Tiến Hóa Vũ Khí (Sau khi đạt +12)
  evolutionLevels: [
    { evoLevel: 1, upgradeStonesNeeded: 50, baseSuccessRate: 0.20, luckyPointsRequired: 250, desc: "Tăng Cấp 1: Vũ khí bắt đầu tỏa hào quang rực rỡ, tăng 25% Sát Thương." },
    { evoLevel: 2, upgradeStonesNeeded: 120, baseSuccessRate: 0.12, luckyPointsRequired: 600, desc: "Tăng Cấp 2: Đổi ngoại hình cấp 2, mở hiệu ứng vết đạn nguyên tố." },
    { evoLevel: 3, upgradeStonesNeeded: 250, baseSuccessRate: 0.08, luckyPointsRequired: 1200, desc: "Tăng Cấp 3 (MAX): Biến đổi hình dạng tối thượng, mở hiệu ứng Khảm Ngọc Hồn." }
  ],

  stoneConversion: {
    stone1: 1,
    stone2: 3,
    stone3: 9,
    stone4: 27,
    stone5: 81,
    stoneDivine: 243
  },
  luckyCharms: [
    { name: "Không dùng", rateBonus: 0.0 },
    { name: "Đá may mắn 15%", rateBonus: 0.15 },
    { name: "Đá may mắn 25%", rateBonus: 0.25 },
    { name: "Bùa thần tài 50%", rateBonus: 0.50 }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancementData;
}
