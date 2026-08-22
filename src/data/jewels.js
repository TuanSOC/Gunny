/**
 * Dữ liệu Châu Báu & Mũi Khoan Gunny PC (Cập nhật Mới Nhất)
 */
var JewelsData = {
categories: [
    { id: "attack", name: "Châu Báu Tấn Công (Sát Thương, Xuyên Giáp, Bạo Kích, Thần Báo)" },
    { id: "defense", name: "Châu Báu Phòng Thủ (Giáp, Hộ Giáp, Chống Bạo)" },
    { id: "attribute", name: "Châu Báu Thuộc Tính (Tấn Công, Phòng Thủ, Nhanh Nhẹn, May Mắn, Máu)" }
  ],
  levels: [
    { level: 1, expRequired: 0, cumulativeExp: 0, attackVal: 5, defenseVal: 5, hpVal: 30 },
    { level: 2, expRequired: 30, cumulativeExp: 30, attackVal: 10, defenseVal: 10, hpVal: 60 },
    { level: 3, expRequired: 90, cumulativeExp: 120, attackVal: 18, defenseVal: 18, hpVal: 110 },
    { level: 4, expRequired: 240, cumulativeExp: 360, attackVal: 30, defenseVal: 30, hpVal: 180 },
    { level: 5, expRequired: 500, cumulativeExp: 860, attackVal: 48, defenseVal: 48, hpVal: 280 },
    { level: 6, expRequired: 1000, cumulativeExp: 1860, attackVal: 72, defenseVal: 72, hpVal: 420 },
    { level: 7, expRequired: 2000, cumulativeExp: 3860, attackVal: 105, defenseVal: 105, hpVal: 620 },
    { level: 8, expRequired: 4000, cumulativeExp: 7860, attackVal: 150, defenseVal: 150, hpVal: 900 },
    { level: 9, expRequired: 8000, cumulativeExp: 15860, attackVal: 210, defenseVal: 210, hpVal: 1300 },
    { level: 10, expRequired: 15000, cumulativeExp: 30860, attackVal: 290, defenseVal: 290, hpVal: 1800 },
    { level: 11, expRequired: 25000, cumulativeExp: 55860, attackVal: 390, defenseVal: 390, hpVal: 2500 },
    { level: 12, expRequired: 40000, cumulativeExp: 95860, attackVal: 520, defenseVal: 520, hpVal: 3400 },
    { level: 13, expRequired: 65000, cumulativeExp: 160860, attackVal: 680, defenseVal: 680, hpVal: 4500 },
    { level: 14, expRequired: 100000, cumulativeExp: 260860, attackVal: 880, defenseVal: 880, hpVal: 5800 },
    { level: 15, expRequired: 150000, cumulativeExp: 410860, attackVal: 1120, defenseVal: 1120, hpVal: 7500 },
    { level: 16, expRequired: 230000, cumulativeExp: 640860, attackVal: 1420, defenseVal: 1420, hpVal: 9500 },
    { level: 17, expRequired: 350000, cumulativeExp: 990860, attackVal: 1800, defenseVal: 1800, hpVal: 12000 }
  ],
  jewelExpValues: {
    lv1: 10,
    lv2: 40,
    lv3: 130,
    expJewelSmall: 100,
    expJewelMedium: 500,
    expJewelLarge: 2000
  },

  // Mũi khoan mở lỗ khảm 13 -> 18
  drillsInfo: [
    { slot: "Lỗ Khảm 13 - 14", drillLevel: "Mũi Khoan Cấp 1", quantityPerSlot: 10, totalDrills: 20 },
    { slot: "Lỗ Khảm 15 - 16", drillLevel: "Mũi Khoan Cấp 2", quantityPerSlot: 25, totalDrills: 50 },
    { slot: "Lỗ Khảm 17 - 18", drillLevel: "Mũi Khoan Cấp 3", quantityPerSlot: 50, totalDrills: 100 }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = JewelsData;
}
