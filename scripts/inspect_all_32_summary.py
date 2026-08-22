import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/info_tables_full.js', 'r', encoding='utf-8') as f:
    content = f.read()

data = json.loads(content.split('var DeepInfoTables = ')[1].split(';\n\nif')[0])

print(f"Total tables: {len(data)}")

for idx, item in enumerate(data):
    lines_preview = " | ".join(item['lines'][:6])
    print(f"[{idx+1:02d}] {item['fileName']} => {lines_preview}")
