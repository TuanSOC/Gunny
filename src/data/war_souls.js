/**
 * Dữ liệu Chiến Hồn & Thần Khí Gunny (War Souls & Divine Artifacts)
 */
var WarSoulsData = {
soulLevels: [
    { level: 1, exp: 100, attackBonus: 20 },
    { level: 2, exp: 300, attackBonus: 50 },
    { level: 3, exp: 700, attackBonus: 90 },
    { level: 4, exp: 1500, attackBonus: 150 },
    { level: 5, exp: 3000, attackBonus: 240 },
    { level: 6, exp: 6000, attackBonus: 360 },
    { level: 7, exp: 10000, attackBonus: 520 },
    { level: 8, exp: 16000, attackBonus: 720 },
    { level: 9, exp: 25000, attackBonus: 1000 },
    { level: 10, exp: 40000, attackBonus: 1400 }
  ],
  divineWeaponShardsRequired: 100
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WarSoulsData;
}
