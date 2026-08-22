import os
import sys
import json
import easyocr

sys.stdout.reconfigure(encoding='utf-8')

info_dir = 'info'
files = sorted([f for f in os.listdir(info_dir) if not '(1)' in f])

print(f"Deep OCR Scanning {len(files)} info images...")
reader = easyocr.Reader(['vi', 'en'], gpu=False, verbose=False)

all_extracted_tables = []

for idx, fname in enumerate(files):
    fpath = os.path.join(info_dir, fname)
    print(f"[{idx+1}/{len(files)}] OCR processing {fname}...")
    try:
        results = reader.readtext(fpath, detail=1)
        # Sort by vertical Y position then X position
        results_sorted = sorted(results, key=lambda item: (item[0][0][1] // 25, item[0][0][0]))
        
        lines = [r[1].strip() for r in results_sorted if r[1].strip()]
        
        all_extracted_tables.append({
            "id": f"info_deep_{idx+1}",
            "fileName": fname,
            "imagePath": f"assets/info_images/{fname}",
            "lines": lines
        })
    except Exception as e:
        print(f"  Error reading {fname}: {e}")

output_js = f"var DeepInfoTables = {json.dumps(all_extracted_tables, ensure_ascii=False, indent=2)};\n\nif (typeof module !== 'undefined' && module.exports) {{ module.exports = DeepInfoTables; }}\n"

with open('src/data/info_tables_full.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print("Saved src/data/info_tables_full.js with complete text lines!")
