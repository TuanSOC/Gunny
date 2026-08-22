import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/info_tables_full.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON from JS code
json_str = content.split('var DeepInfoTables = ')[1].split(';\n\nif')[0]
data = json.loads(json_str)

print(f"Total tables in info_tables_full.js: {len(data)}")

for item in data:
    print(f"\n==================================================")
    print(f"ID: {item['id']} | FILE: {item['fileName']}")
    print(f"LINES ({len(item['lines'])} lines):")
    print(item['lines'])
