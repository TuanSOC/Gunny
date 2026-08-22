const fs = require('fs');
const path = require('path');

// 1. Hóa Thần Tu Luyện Data (From 776666089)
const hoaThanData = {
  title: "Hóa Thần Tu Luyện",
  tiers: [
    { tier: "Bậc 1", daHoaThan: 20,  tl3_lv1: 140, tl3_lv2: 240, tl3_lv3: 340, tl3_lv4: 440, tl3_lv5: 540 },
    { tier: "Bậc 2", daHoaThan: 130, tl3_lv1: 274, tl3_lv2: 373, tl3_lv3: 673, tl3_lv4: 473, tl3_lv5: 574 },
    { tier: "Bậc 3", daHoaThan: 280, tl3_lv1: 407, tl3_lv2: 506, tl3_lv3: 607, tl3_lv4: 707, tl3_lv5: 806 },
    { tier: "Bậc 4", daHoaThan: 480, tl3_lv1: 540, tl3_lv2: 640, tl3_lv3: 740, tl3_lv4: 840, tl3_lv5: 940 },
    { tier: "Bậc 5", daHoaThan: 720, tl3_lv1: 674, tl3_lv2: 773, tl3_lv3: 873, tl3_lv4: 974, tl3_lv5: 1073 },
    { tier: "Bậc 6", daHoaThan: 1130,tl3_lv1: 807, tl3_lv2: 906, tl3_lv3: 1007,tl3_lv4: 1107,tl3_lv5: 1206 },
    { tier: "Bậc 7", daHoaThan: 1630,tl3_lv1: 940, tl3_lv2: 1040,tl3_lv3: 1140,tl3_lv4: 1240,tl3_lv5: 1340 },
    { tier: "Bậc 8", daHoaThan: 2280,tl3_lv1: 1074,tl3_lv2: 1173,tl3_lv3: 1273,tl3_lv4: 1374,tl3_lv5: 1473 },
    { tier: "Bậc 9", daHoaThan: 3080,tl3_lv1: 1207,tl3_lv2: 1306,tl3_lv3: 1407,tl3_lv4: 1507,tl3_lv5: 1606 },
    { tier: "Bậc 10",daHoaThan: 4080,tl3_lv1: "-",   tl3_lv2: "-",   tl3_lv3: "-",   tl3_lv4: "-",   tl3_lv5: "-" }
  ]
};

// 2. Ngọc Vũ Khí Data (From 774524167)
const ngocVuKhiData = {
  title: "Ngọc Vũ Khí",
  levels: [
    { level: "Lv 1", daCan: 80 },
    { level: "Lv 2", daCan: 100 },
    { level: "Lv 3", daCan: 150 },
    { level: "Lv 4", daCan: 200 },
    { level: "Lv 5", daCan: 250 },
    { level: "Lv 6", daCan: 300 },
    { level: "Lv 7", daCan: 350 },
    { level: "Lv 8", daCan: 400 },
    { level: "Lv 9", daCan: 450 },
    { level: "Lv 10", daCan: 500 },
    { level: "Lv 11", daCan: 550 },
    { level: "Lv 12", daCan: 600 },
    { level: "Lv 13", daCan: 650 },
    { level: "Lv 14", daCan: 700 },
    { level: "Lv 15", daCan: 750 },
    { level: "Lv 16", daCan: 800 },
    { level: "Lv 17", daCan: 850 },
    { level: "Lv 18", daCan: 900 },
    { level: "Lv 19", daCan: 950 },
    { level: "Lv 20", daCan: 1000 }
  ]
};

const writeDataFile = (fileName, varName, obj) => {
  const content = `var ${varName} = ${JSON.stringify(obj, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) { module.exports = ${varName}; }\n`;
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', fileName), content);
  console.log(`Saved src/data/${fileName}`);
};

writeDataFile('hoa_than_tu_luyen.js', 'HoaThanTuLuyenData', hoaThanData);
writeDataFile('ngoc_vu_khi.js', 'NgocVuKhiData', ngocVuKhiData);
