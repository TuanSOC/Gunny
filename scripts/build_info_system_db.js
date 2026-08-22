const fs = require('fs');
const path = require('path');

const infoDataPath = path.join(__dirname, '..', 'src', 'data', 'info_data.js');
let infoData = [];

if (fs.existsSync(infoDataPath)) {
  infoData = require(infoDataPath);
}

console.log(`Processing ${infoData.length} info data items...`);

const enrichedInfoData = infoData.map(item => {
  const lines = item.ocrLines || [];
  
  // Simple table parser heuristic for lines
  const tableRows = [];
  let currentRow = [];
  
  lines.forEach(line => {
    if (line.toLowerCase().includes('cấp') || line.toLowerCase().includes('lv') || line.toLowerCase().includes('mốc')) {
      if (currentRow.length > 0) {
        tableRows.push(currentRow);
      }
      currentRow = [line];
    } else {
      if (currentRow.length < 4) {
        currentRow.push(line);
      } else {
        tableRows.push(currentRow);
        currentRow = [line];
      }
    }
  });
  if (currentRow.length > 0) {
    tableRows.push(currentRow);
  }

  return {
    ...item,
    parsedTable: tableRows
  };
});

const outputCode = `var InfoData = ${JSON.stringify(enrichedInfoData, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = InfoData;
}
`;

fs.writeFileSync(infoDataPath, outputCode);
console.log('Successfully enriched src/data/info_data.js with parsed data tables!');
