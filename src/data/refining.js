/**
 * Dữ liệu Gia Công / Vòng Tẩy Nạp Gunny PC (100% Chính Xác Từ Bảng Tra Chuẩn)
 */
var RefiningData = {
maxLevel: 14,
  levels: [
    { level: 1, da: 21, dong: 30, bac: 37, vang: 41, ngoc: 43 },
    { level: 2, da: 28, dong: 42, bac: 51, vang: 56, ngoc: 59 },
    { level: 3, da: 37, dong: 57, bac: 69, vang: 76, ngoc: 80 },
    { level: 4, da: 52, dong: 77, bac: 93, vang: 102, ngoc: 109 },
    { level: 5, da: 69, dong: 104, bac: 127, vang: 140, ngoc: 148 },
    { level: 6, da: 95, dong: 142, bac: 173, vang: 189, ngoc: 201 },
    { level: 7, da: 128, dong: 193, bac: 234, vang: 257, ngoc: 272 },
    { level: 8, da: 174, dong: 261, bac: 318, vang: 349, ngoc: 371 },
    { level: 9, da: 237, dong: 356, bac: 433, vang: 474, ngoc: 503 },
    { level: 10, da: 321, dong: 482, bac: 587, vang: 644, ngoc: 683 },
    { level: 11, da: 437, dong: 656, bac: 797, vang: 875, ngoc: 927 },
    { level: 12, da: 593, dong: 890, bac: 1082, vang: 1188, ngoc: 1260 },
    { level: 13, da: 805, dong: 1210, bac: 1470, vang: 1613, ngoc: 1710 },
    { level: 14, da: 1094, dong: 1642, bac: 1997, vang: 2191, ngoc: 2324 }
  ],
  totalsForMax: {
    da: 4091,
    dong: 6142,
    bac: 7468,
    vang: 8195,
    ngoc: 8690
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RefiningData;
}
