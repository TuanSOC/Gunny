/**
 * Ngọc Dùng Để Lên EXP Thú Cưỡi & Mảnh Ngọc Lam Gunny PC
 * - Ngọc 1: Lv 1-20 (526 viên)
 * - Ngọc 2: Lv 21-40 (871 viên)
 * - Ngọc 3: Lv 41-50 (347 viên)
 * - Tổng quy đổi Ngọc 1 toàn bộ: 3,656 viên
 */
var NgocThuCuoiData = {
  types: [
    { name: "Ngọc 1 (Lv 1 – 20)", levelRange: "Lv 1 – 20", qty: 526, exp: 100, quyDoiNgoc1: 526, desc: "Dùng để nâng cấp thú cưỡi từ Lv 1 đến Lv 20" },
    { name: "Ngọc 2 (Lv 21 – 40)", levelRange: "Lv 21 – 40", qty: 871, exp: 200, quyDoiNgoc1: 1742, desc: "Dùng để nâng cấp thú cưỡi từ Lv 21 đến Lv 40 (1 viên = 2 Ngọc 1)" },
    { name: "Ngọc 3 (Lv 41 – 50)", levelRange: "Lv 41 – 50", qty: 347, exp: 400, quyDoiNgoc1: 1388, desc: "Dùng để nâng cấp thú cưỡi từ Lv 41 đến Lv 50 (1 viên = 4 Ngọc 1)" }
  ],
  totalNgoc1: 3656
};

var ManhNgocLamData = {
  levels: [
    { level: "Cấp 1", manhCan: 200, congDon: 200 },
    { level: "Cấp 2", manhCan: 500, congDon: 700 },
    { level: "Cấp 3", manhCan: 800, congDon: 1500 },
    { level: "Cấp 4", manhCan: 1200, congDon: 2700 },
    { level: "Cấp 5", manhCan: 1600, congDon: 4300 },
    { level: "Cấp 6", manhCan: 2300, congDon: 6600 },
    { level: "Cấp 7", manhCan: 3000, congDon: 9600 },
    { level: "Cấp 8", manhCan: 4000, congDon: 13600 },
    { level: "Cấp 9", manhCan: 5000, congDon: 18600 }
  ],
  totalManh: 18600
};

var NgocData = {
  thuCuoiExp: NgocThuCuoiData.types,
  tongNgoc1CanToanBo: NgocThuCuoiData.totalNgoc1,
  manhNgocLam: ManhNgocLamData.levels,
  totalManhNgocLam: ManhNgocLamData.totalManh
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NgocThuCuoiData, ManhNgocLamData, NgocData };
}
