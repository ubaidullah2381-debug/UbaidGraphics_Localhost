import os

def generate_tree(start_path, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for root, dirs, files in os.walk(start_path):
            # node_modules کو نظر انداز کریں
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            
            level = root.replace(start_path, '').count(os.sep)
            indent = ' ' * 4 * (level)
            f.write(f'{indent}{os.path.basename(root)}/\n')
            subindent = ' ' * 4 * (level + 1)
            for file in files:
                f.write(f'{subindent}{file}\n')

# یہاں اپنے پروجیکٹ کا پاتھ دیں
generate_tree('.', 'project_structure.txt')
print("اسٹرکچر 'project_structure.txt' میں محفوظ ہو گیا ہے۔")