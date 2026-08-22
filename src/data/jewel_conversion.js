/**
 * Bảng Quy Đổi Châu Báu Gunny (Nguồn: ♡Mơ Mộng♡)
 */
var JewelConversionData = {
conversions: [
    { target: "Châu Báu Lv 15", equivalents: [{ item: "Châu Báu Lv 13", qty: 9 }] },
    { target: "Châu Báu Lv 17", equivalents: [{ item: "Châu Báu Lv 15", qty: 6 }, { item: "Châu Báu Lv 13", qty: 54 }] },
    { target: "Châu Báu Lv 19", equivalents: [{ item: "Châu Báu Lv 17", qty: 10 }, { item: "Châu Báu Lv 15", qty: 60 }, { item: "Châu Báu Lv 13", qty: 540 }] },
    { target: "Châu Báu Lv 21", equivalents: [{ item: "Châu Báu Lv 19", qty: 5 }, { item: "Châu Báu Lv 17", qty: 50 }, { item: "Châu Báu Lv 15", qty: 300 }] },
    { target: "Châu Báu 2 Dòng Thường Lv 3", equivalents: [{ item: "Châu Báu Lv 21", qty: 2 }, { item: "Châu Báu Lv 19", qty: 10 }, { item: "Châu Báu Lv 17", qty: 100 }] },
    { target: "Châu Báu 2 Dòng Thường Lv 21", equivalents: [{ item: "Châu Báu Lv 21", qty: 3 }] },
    { target: "Châu Báu 2 Dòng Sát - Giáp", equivalents: [{ item: "Châu Báu 2 Dòng Lv 21", qty: 2 }] }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = JewelConversionData;
}
