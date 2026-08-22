import os
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8')

print("Starting Final Deep Cleanup...")

files_to_remove = [
  'fashion_gid0.csv',
  'fashion_gid1455077948.csv',
  'scripts/inspect_csv.js',
  'scripts/inspect_tab2.js',
  'scripts/inspect_tab2_part2.js',
  'scripts/parse_fashion_all.js',
  'scripts/parse_fashion_sets_accurate.js',
  'scripts/parse_sets.js',
  'scripts/parse_sheets.js',
  'scripts/generate_icons.js'
]

removed_count = 0
for file in files_to_remove:
  if os.path.exists(file):
    try:
      os.remove(file)
      print(f"  [DELETED SCRATCH FILE] {file}")
      removed_count += 1
    except Exception as e:
      print(f"  [ERROR] Could not delete {file}: {e}")

print(f"\nDEEP CLEANUP COMPLETE: Removed {removed_count} extra scratch files!")
