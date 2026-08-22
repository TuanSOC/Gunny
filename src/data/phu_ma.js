/**
 * Bảng Up Phụ Ma Gunny Chuẩn Xác 100%
 */
var PhuMaData = {
  summary: "Bậc 1: 1,260 | Bậc 2: 3,400 | Bậc 3: 8,350 | Bậc 4: 14,800 | Bậc 5: 2,000 | TỔNG CỘNG: 29,810 Đá Phụ Ma",
  matrix: [
    { level: "Lv 0", bac1: null, bac2: 250, bac3: 700, bac4: 1300, bac5: 2000 },
    { level: "Lv 1", bac1: 100, bac2: 270, bac3: 730, bac4: 1340, bac5: null },
    { level: "Lv 2", bac1: 110, bac2: 290, bac3: 760, bac4: 1380, bac5: null },
    { level: "Lv 3", bac1: 120, bac2: 310, bac3: 790, bac4: 1420, bac5: null },
    { level: "Lv 4", bac1: 130, bac2: 330, bac3: 820, bac4: 1460, bac5: null },
    { level: "Lv 5", bac1: 140, bac2: 350, bac3: 850, bac4: 1500, bac5: null },
    { level: "Lv 6", bac1: 150, bac2: 370, bac3: 880, bac4: 1540, bac5: null },
    { level: "Lv 7", bac1: 160, bac2: 390, bac3: 910, bac4: 1580, bac5: null },
    { level: "Lv 8", bac1: 170, bac2: 410, bac3: 940, bac4: 1620, bac5: null },
    { level: "Lv 9", bac1: 180, bac2: 430, bac3: 970, bac4: 1660, bac5: null }
  ],
  totals: {
    bac1: 1260,
    bac2: 3400,
    bac3: 8350,
    bac4: 14800,
    bac5: 2000,
    grandTotal: 29810
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhuMaData;
}
