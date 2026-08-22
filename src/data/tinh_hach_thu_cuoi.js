/**
 * Dữ liệu Ô Tinh Hạch Thú Cưỡi Gunny PC (Lên Cấp 2 → 10)
 * Nguồn: Bảng chuẩn Gunner Community (PMT Gunny Master)
 */
var TinhHachThuCuoiData = {
  maxLevel: 10,
  levels: [
    { level: 2, ketTinh: 60, thuocTuyetCanh: 100 },
    { level: 3, ketTinh: 120, thuocTuyetCanh: 200 },
    { level: 4, ketTinh: 180, thuocTuyetCanh: 400 },
    { level: 5, ketTinh: 270, thuocTuyetCanh: 800 },
    { level: 6, ketTinh: 360, thuocTuyetCanh: 1600 },
    { level: 7, ketTinh: 480, thuocTuyetCanh: 3200 },
    { level: 8, ketTinh: 600, thuocTuyetCanh: 6400 },
    { level: 9, ketTinh: 840, thuocTuyetCanh: 12800 },
    { level: 10, ketTinh: 1080, thuocTuyetCanh: 25600 }
  ],
  totalsForMax: {
    ketTinh: 3990,
    thuocTuyetCanh: 51100
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TinhHachThuCuoiData;
}
