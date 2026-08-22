/**
 * Bảng Up Vật Tổ Gunny (Level 1 -> 50)
 * Tổng Lv 1-50: 1,496,690 xu / vé vật tổ
 */
var VatToData = {
totalCost: 1496690,
  levels: [
    { level: 1, coc1: 43, coc7: 300 },
    { level: 2, coc1: 120, coc7: 840 },
    { level: 3, coc1: 210, coc7: 1470 },
    { level: 4, coc1: 280, coc7: 1960 },
    { level: 5, coc1: 350, coc7: 2450 },
    { level: 6, coc1: 440, coc7: 3080 },
    { level: 7, coc1: 510, coc7: 3570 },
    { level: 8, coc1: 580, coc7: 4060 },
    { level: 9, coc1: 670, coc7: 4690 },
    { level: 10, coc1: 740, coc7: 5180 },

    { level: 11, coc1: 880, coc7: 6160 },
    { level: 12, coc1: 1020, coc7: 7140 },
    { level: 13, coc1: 1160, coc7: 8120 },
    { level: 14, coc1: 1300, coc7: 9100 },
    { level: 15, coc1: 1480, coc7: 10360 },
    { level: 16, coc1: 1620, coc7: 11340 },
    { level: 17, coc1: 1760, coc7: 12320 },
    { level: 18, coc1: 1940, coc7: 13580 },
    { level: 19, coc1: 2080, coc7: 14560 },
    { level: 20, coc1: 2220, coc7: 15540 },

    { level: 21, coc1: 2490, coc7: 17430 },
    { level: 22, coc1: 2700, coc7: 18900 },
    { level: 23, coc1: 2910, coc7: 20370 },
    { level: 24, coc1: 3180, coc7: 22260 },
    { level: 25, coc1: 3390, coc7: 23730 },
    { level: 26, coc1: 3600, coc7: 25200 },
    { level: 27, coc1: 3870, coc7: 27090 },
    { level: 28, coc1: 4080, coc7: 28560 },
    { level: 29, coc1: 4290, coc7: 30030 },
    { level: 30, coc1: 4560, coc7: 31920 },

    { level: 31, coc1: 4840, coc7: 33880 },
    { level: 32, coc1: 5120, coc7: 35840 },
    { level: 33, coc1: 5480, coc7: 38360 },
    { level: 34, coc1: 5760, coc7: 40320 },
    { level: 35, coc1: 6040, coc7: 42280 },
    { level: 36, coc1: 6400, coc7: 44800 },
    { level: 37, coc1: 6680, coc7: 46760 },
    { level: 38, coc1: 6960, coc7: 48720 },
    { level: 39, coc1: 7320, coc7: 51240 },
    { level: 40, coc1: 7600, coc7: 53200 },

    { level: 41, coc1: 7950, coc7: 55650 },
    { level: 42, coc1: 8400, coc7: 58800 },
    { level: 43, coc1: 8750, coc7: 61250 },
    { level: 44, coc1: 9100, coc7: 63700 },
    { level: 45, coc1: 9550, coc7: 66850 },
    { level: 46, coc1: 9990, coc7: 69930 },
    { level: 47, coc1: 10250, coc7: 71750 },
    { level: 48, coc1: 10700, coc7: 74900 },
    { level: 49, coc1: 11050, coc7: 77350 },
    { level: 50, coc1: 11400, coc7: 79800 }
  ],
  milestones: [
    { range: "Lv 1 - 10", totalCoc7: 27600 },
    { range: "Lv 11 - 20", totalCoc7: 108220 },
    { range: "Lv 21 - 30", totalCoc7: 245490 },
    { range: "Lv 31 - 40", totalCoc7: 435400 },
    { range: "Lv 41 - 50", totalCoc7: 679980 }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = VatToData;
}
