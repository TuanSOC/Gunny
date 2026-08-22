const fs = require('fs');
const path = require('path');

const targetImgDir = path.join(__dirname, '..', 'assets', 'fashion_images');
if (!fs.existsSync(targetImgDir)) {
  fs.mkdirSync(targetImgDir, { recursive: true });
}

// Copy original cell images
const srcResourceDir = path.join(__dirname, '..', 'sheet_html_export', 'resources');
if (fs.existsSync(srcResourceDir)) {
  const files = fs.readdirSync(srcResourceDir);
  let copyCount = 0;
  files.forEach(file => {
    if (file.startsWith('cellImage_')) {
      const srcPath = path.join(srcResourceDir, file);
      const destPath = path.join(targetImgDir, file);
      fs.copyFileSync(srcPath, destPath);
      copyCount++;
    }
  });
  console.log(`Copied ${copyCount} cell images.`);
}

function clean(str) {
  if (!str) return '';
  return str.replace(/^"+|"+$/g, '').replace(/\n+/g, ' ').replace(/&nbsp;/g, ' ').trim();
}

const SLOT_KEYWORDS = new Set(['Nón', 'Tóc', 'Áo', 'Mắt', 'Kính', 'Mặt', 'Cánh', 'Set Trang Phục', 'Bong Bóng']);

const setsMap = new Map();

function getSet(setName, gender, theme, imageSrc = null) {
  let name = clean(setName);
  if (!name || SLOT_KEYWORDS.has(name)) return null;

  const g = gender || 'Cả Nam & Nữ';
  const key = `${name}__${g}`;

  if (!setsMap.has(key)) {
    setsMap.set(key, {
      setId: 'set_' + (setsMap.size + 1),
      setName: name,
      gender: g,
      theme: theme || 'Thời Trang Gunny',
      image: imageSrc ? 'assets/fashion_images/' + path.basename(imageSrc) : null,
      items: []
    });
  } else {
    const s = setsMap.get(key);
    if (!s.image && imageSrc) {
      s.image = 'assets/fashion_images/' + path.basename(imageSrc);
    }
  }
  return setsMap.get(key);
}

function addItemToSet(setObj, slot, itemName) {
  if (!setObj || !slot || !itemName) return;
  const sSlot = clean(slot);
  const sItem = clean(itemName);

  if (!sSlot || !sItem || SLOT_KEYWORDS.has(sItem)) return;

  if (!setObj.items.some(i => i.slot === sSlot && i.name === sItem)) {
    setObj.items.push({
      slot: sSlot,
      name: sItem,
      image: setObj.image
    });
  }
}

// Parse HTML File 1: PK Thời Trang.html
const html1 = fs.readFileSync(path.join(__dirname, '..', 'sheet_html_export', 'PK Thời Trang.html'), 'utf8');

const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
let matchRow;
let currentTheme = 'HALLOWEEN';

let currNam1 = '', currNu1 = '';
let currNam2 = '', currNu2 = '';

let rowIdx = 0;

while ((matchRow = rowRegex.exec(html1)) !== null) {
  rowIdx++;
  if (rowIdx < 12) continue;

  const rowContent = matchRow[1];
  const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let matchTd;
  const cells = [];

  while ((matchTd = tdRegex.exec(rowContent)) !== null) {
    const tdInner = matchTd[1];
    const imgMatch = /<img[^>]+src=["']?([^"'\s>]+)["']?/i.exec(tdInner);
    const textContent = clean(tdInner.replace(/<[^>]+>/g, ''));
    cells.push({
      text: textContent,
      imgSrc: imgMatch ? imgMatch[1] : null
    });
  }

  if (cells.length === 0) continue;

  const col0Text = cells[0].text;

  // Theme Banner Header
  if (col0Text && !cells[1]?.text && !cells[2]?.text && col0Text.length > 2 && !col0Text.startsWith('Credit') && !col0Text.startsWith('NOTE')) {
    currentTheme = col0Text;
    currNam1 = ''; currNu1 = ''; currNam2 = ''; currNu2 = '';
    continue;
  }

  // Case A: Full Header Row (Col 0 is Set Name Nam 1)
  if (col0Text && !SLOT_KEYWORDS.has(col0Text)) {
    currNam1 = col0Text;
    const col1 = cells[1] ? cells[1].text : '';
    const col2 = cells[2] ? cells[2].text : '';
    const img1 = cells[3] ? cells[3].imgSrc : null;
    const col4 = cells[4] ? cells[4].text : '';
    const col5 = cells[5] ? cells[5].text : '';
    const col6 = cells[6] ? cells[6].text : '';

    if (col6) currNu1 = col6;

    if (col1 && col2) {
      const s = getSet(currNam1, 'Nam', currentTheme, img1);
      addItemToSet(s, col1, col2);
    }
    if (col5 && col4) {
      const s = getSet(currNu1 || currNam1.replace(/\(Nam\)/i, '(Nữ)'), 'Nữ', currentTheme, img1);
      addItemToSet(s, col5, col4);
    }

    // Block 2 Header (Col 7 is Set Name Nam 2)
    const col7 = cells[7] ? cells[7].text : '';
    const col8 = cells[8] ? cells[8].text : '';
    const col9 = cells[9] ? cells[9].text : '';
    const img2 = cells[10] ? cells[10].imgSrc : null;
    const col11 = cells[11] ? cells[11].text : '';
    const col12 = cells[12] ? cells[12].text : '';
    const col13 = cells[13] ? cells[13].text : '';

    if (col7 && !SLOT_KEYWORDS.has(col7)) currNam2 = col7;
    if (col13) currNu2 = col13;

    if (col8 && col9) {
      const s = getSet(currNam2, 'Nam', currentTheme, img2);
      addItemToSet(s, col8, col9);
    }
    if (col12 && col11) {
      const s = getSet(currNu2 || currNam2.replace(/\(Nam\)/i, '(Nữ)'), 'Nữ', currentTheme, img2);
      addItemToSet(s, col12, col11);
    }
  } 
  // Case B: Shifted Continuation Row (Col 0 is Slot Name Nam 1)
  else if (col0Text && SLOT_KEYWORDS.has(col0Text)) {
    const slotNam1 = col0Text;
    const itemNam1 = cells[1] ? cells[1].text : '';
    const itemNu1  = cells[2] ? cells[2].text : '';
    const slotNu1  = cells[3] ? cells[3].text : slotNam1;

    if (itemNam1) {
      const s = getSet(currNam1, 'Nam', currentTheme);
      addItemToSet(s, slotNam1, itemNam1);
    }
    if (itemNu1) {
      const s = getSet(currNu1 || currNam1.replace(/\(Nam\)/i, '(Nữ)'), 'Nữ', currentTheme);
      addItemToSet(s, slotNu1, itemNu1);
    }

    // Block 2 Continuation (Col 4 is Slot Nam 2)
    const slotNam2 = cells[4] ? cells[4].text : '';
    const itemNam2 = cells[5] ? cells[5].text : '';
    const itemNu2  = cells[6] ? cells[6].text : '';
    const slotNu2  = cells[7] ? cells[7].text : slotNam2;

    if (slotNam2 && SLOT_KEYWORDS.has(slotNam2)) {
      if (itemNam2) {
        const s = getSet(currNam2, 'Nam', currentTheme);
        addItemToSet(s, slotNam2, itemNam2);
      }
      if (itemNu2) {
        const s = getSet(currNu2 || currNam2.replace(/\(Nam\)/i, '(Nữ)'), 'Nữ', currentTheme);
        addItemToSet(s, slotNu2, itemNu2);
      }
    }
  }
}

// Parse HTML File 2: PK Set, Cánh & Bong Bóng.html
const html2 = fs.readFileSync(path.join(__dirname, '..', 'sheet_html_export', 'PK Set, Cánh & Bong Bóng.html'), 'utf8');

let matchRow2;
let currentCategory2 = 'BỘ THẦN ÁNH SÁNG & ĐẶC BIỆT';
const rowRegex2 = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
let lastNamesRow = [];

while ((matchRow2 = rowRegex2.exec(html2)) !== null) {
  const rowContent = matchRow2[1];
  const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let matchTd;
  const cells = [];
  while ((matchTd = tdRegex.exec(rowContent)) !== null) {
    const tdInner = matchTd[1];
    const imgMatch = /<img[^>]+src=["']?([^"'\s>]+)["']?/i.exec(tdInner);
    const textContent = clean(tdInner.replace(/<[^>]+>/g, ''));
    cells.push({ text: textContent, imgSrc: imgMatch ? imgMatch[1] : null });
  }

  if (cells.length === 0) continue;

  const col0Text = cells[0].text;
  if (col0Text && col0Text.toUpperCase() === col0Text && col0Text.length > 3 && !col0Text.includes(',')) {
    currentCategory2 = col0Text;
    lastNamesRow = [];
    continue;
  }

  const hasNames = cells.some(c => c.text && c.text.length > 1 && !c.text.includes('NAM') && !c.text.includes('NỮ'));
  const hasImgs = cells.some(c => c.imgSrc);

  if (hasNames) {
    lastNamesRow = cells.map(c => c.text);
  } else if (hasImgs && lastNamesRow.length > 0) {
    cells.forEach((c, cIdx) => {
      const name = lastNamesRow[cIdx];
      if (name && c.imgSrc && !SLOT_KEYWORDS.has(name)) {
        let slot = 'Set Trang Phục';
        if (currentCategory2.includes('BAY LƯỢN') || currentCategory2.includes('CÁNH') || name.includes('Điểu') || name.includes('Cánh') || name.includes('Điệp')) {
          slot = 'Cánh';
        } else if (currentCategory2.includes('BONG BÓNG') || name.includes('Bong Bóng')) {
          slot = 'Bong Bóng';
        }
        let gender = 'Cả Nam & Nữ';
        if (name.includes('(Nam)') || name.includes('(nam)')) gender = 'Nam';
        if (name.includes('(Nữ)') || name.includes('(nữ)')) gender = 'Nữ';

        const s = getSet(name, gender, currentCategory2, c.imgSrc);
        if (s) {
          addItemToSet(s, slot, name);
        }
      }
    });
  }
}

// Build cleaned sets and items array
const cleanedSets = [];
const cleanedItems = [];

setsMap.forEach(s => {
  if (s.items && s.items.length > 0 && !SLOT_KEYWORDS.has(s.setName)) {
    s.setId = 'set_' + (cleanedSets.length + 1);
    cleanedSets.push(s);

    s.items.forEach(item => {
      cleanedItems.push({
        id: 'item_' + cleanedItems.length,
        itemName: item.name,
        slotType: item.slot,
        setName: s.setName,
        gender: s.gender,
        theme: s.theme,
        image: s.image
      });
    });
  }
});

console.log('Cleaned Total Sets:', cleanedSets.length);
console.log('Cleaned Total Items:', cleanedItems.length);

const outputCode = `var FashionData = {
  sets: ${JSON.stringify(cleanedSets, null, 2)},
  items: ${JSON.stringify(cleanedItems, null, 2)}
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FashionData;
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'fashion.js'), outputCode);
console.log('Saved clean src/data/fashion.js successfully!');
