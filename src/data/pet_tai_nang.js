/* ============================================================
   GUNNY MASTER DATA — Pet Tài Năng (Sách Trí Tuệ Lv 1 → 10)
   ============================================================ */

var PetTaiNangData = {
  levels: [
    { level: "Lv 1", sach: 150, congDon: 150 },
    { level: "Lv 2", sach: 270, congDon: 420 },
    { level: "Lv 3", sach: 487, congDon: 907 },
    { level: "Lv 4", sach: 877, congDon: 1784 },
    { level: "Lv 5", sach: 1582, congDon: 3366 },
    { level: "Lv 6", sach: 1897, congDon: 5263 },
    { level: "Lv 7", sach: 2280, congDon: 7543 },
    { level: "Lv 8", sach: 2737, congDon: 10280 },
    { level: "Lv 9", sach: 3285, congDon: 13565 },
    { level: "Lv 10", sach: 3945, congDon: 17510 }
  ],
  totalSach: 17510
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PetTaiNangData;
}
