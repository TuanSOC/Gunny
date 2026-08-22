/**
 * Bảng Đúc Hồn Gunny Chuẩn Xác 100% (Cấp 1 đến 5)
 */
var DucHonData = {
  levels: [
    {
      level: "Lv 1",
      dong: { dlh: 120, duc: 0 },
      bac: { dlh: 530, duc: 75 },
      vang: { dlh: 940, duc: 610 },
      kimCuong: { dlh: 1350, duc: 2250 }
    },
    {
      level: "Lv 2",
      dong: { dlh: 200, duc: 0 },
      bac: { dlh: 610, duc: 135 },
      vang: { dlh: 1020, duc: 825 },
      kimCuong: { dlh: 1430, duc: 2780 }
    },
    {
      level: "Lv 3",
      dong: { dlh: 280, duc: 0 },
      bac: { dlh: 690, duc: 210 },
      vang: { dlh: 1100, duc: 1090 },
      kimCuong: { dlh: 1510, duc: 3390 }
    },
    {
      level: "Lv 4",
      dong: { dlh: 360, duc: 0 },
      bac: { dlh: 770, duc: 310 },
      vang: { dlh: 1180, duc: 1410 },
      kimCuong: { dlh: 1600, duc: 4095 }
    },
    {
      level: "Lv 5",
      dong: { dlh: 440, duc: 0 },
      bac: { dlh: 850, duc: 445 },
      vang: { dlh: 1270, duc: 1795 },
      kimCuong: { dlh: 1680, duc: 4890 }
    }
  ],
  totals: {
    dong: { dlh: 1400, duc: 0 },
    bac: { dlh: 3450, duc: 1175 },
    vang: { dlh: 5510, duc: 5730 },
    kimCuong: { dlh: 7570, duc: 17405 }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DucHonData;
}
