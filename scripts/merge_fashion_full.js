const fs = require('fs');
const path = require('path');

const currentFashion = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fashion.js'), 'utf8');
const data = (new Function(currentFashion + '; return FashionData;'))();

const existingSets = data.sets || [];
const scratchPath = path.join('C:', 'Users', 'USER', '.gemini', 'antigravity-ide', 'brain', 'e4cdf422-5991-48de-bede-a2db00c3aae4', 'browser', 'scratchpad_nkckztwn.md');
const scratchRaw = fs.readFileSync(scratchPath, 'utf8');
const jsonMatch = scratchRaw.match(/\{[\s\S]*\}/);
const scratch = JSON.parse(jsonMatch[0]);
const sheet2 = scratch.PK_Set_Canh_Bong_Bong;

const pkThoiTrangThemes = new Set(['HALLOWEEN', 'NAM 17 - NỮ 18 (11 món)', 'TRUYỀN THUYẾT', 'World Cup 2 (Nam)']);
const keptSets = existingSets.filter(s => pkThoiTrangThemes.has(s.theme));

let imgIndex = 0;
const newSheet2Sets = [];

for (const [category, itemsList] of Object.entries(sheet2)) {
  itemsList.forEach((name, idx) => {
    let slot = 'Set Trang Phục';
    if (category === 'TỰ DO BAY LƯỢN' || ['Mây 7 Màu', 'Anh Đào Vũ', 'Hạc Giấy', 'I Love You', 'Búp Bê Thời Tiết', 'Kẹo Biến Hóa', 'Lửa Niết Bàn', 'Tiểu Hồ Điệp'].includes(name) || name.includes('Cánh') || name.includes('Điểu') || name.includes('Điệp')) {
      slot = 'Cánh';
    } else if (category === 'TRÒ CHUYỆN VUI VẺ' || category === 'CUỘC SỐNG MUÔN MÀU' || name.includes('Bong bóng') || name.includes('Bong Bóng')) {
      slot = 'Bong Bóng';
    }

    let gender = 'Cả Nam & Nữ';
    if (name.includes('(Nam)') || name.includes('(nam)')) gender = 'Nam';
    if (name.includes('(Nữ)') || name.includes('(nữ)')) gender = 'Nữ';

    const imgFileName = `cellImage_1455077948_${imgIndex}.jpg`;
    const fullImgPath = path.join(__dirname, '..', 'assets', 'fashion_images', imgFileName);
    const imgPath = fs.existsSync(fullImgPath)
      ? `assets/fashion_images/${imgFileName}`
      : null;

    newSheet2Sets.push({
      setId: `set_pk_${category.replace(/[^a-zA-Z0-9]/g, '_')}_${idx + 1}`,
      setName: name,
      gender: gender,
      theme: category,
      image: imgPath,
      items: [
        {
          slot: slot,
          name: name,
          image: imgPath
        }
      ]
    });

    imgIndex++;
  });
}

const mergedSets = [...keptSets, ...newSheet2Sets];
mergedSets.forEach((s, idx) => {
  s.setId = `set_${idx + 1}`;
});

const mergedItems = [];
mergedSets.forEach(s => {
  s.items.forEach(it => {
    mergedItems.push({
      id: `item_${mergedItems.length + 1}`,
      itemName: it.name,
      slotType: it.slot,
      setName: s.setName,
      gender: s.gender,
      theme: s.theme,
      image: it.image || s.image || null
    });
  });
});

console.log('Total Merged Sets:', mergedSets.length);
console.log('Total Merged Items:', mergedItems.length);
console.log('Total Items with images:', mergedItems.filter(i => i.image).length);

const outContent = `var FashionData = ${JSON.stringify({ sets: mergedSets, items: mergedItems }, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = FashionData;\n}\n`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'fashion.js'), outContent);
console.log('Saved src/data/fashion.js successfully!');
