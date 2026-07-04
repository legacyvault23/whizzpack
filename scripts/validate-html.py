#!/usr/bin/env python3
"""
Whizzpack HTML integrity validator.
Run before every push. Blocks deployment if any check fails.
"""
import os
import sys
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ── Per-file rules ────────────────────────────────────────────────────────────
# min_bytes: 80% of current healthy file size — catches truncation
# min_lines: 80% of current healthy line count
# required:  strings that MUST exist — catches JS loss, missing GA4, etc.
RULES = {
    'public/index.html': {
        'min_bytes': 380_000,
        'min_lines': 1000,
        'required': [
            '</html>',
            'revealInView',
            'borderColor',
            'mousemove',
            'G-W8N0CSLMYZ',
            'lenis.min.js',
            'gsap.min.js',
        ],
    },
    'public/corrugated-boxes.html': {
        'min_bytes': 230_000,
        'min_lines': 900,
        'required': [
            '</html>',
            'revealInView',
            'borderColor',
            'mousemove',
            'G-W8N0CSLMYZ',
            'lenis.min.js',
            'gsap.min.js',
        ],
    },
    'public/cotton-seed-bags.html': {
        'min_bytes': 240_000,
        'min_lines': 1000,
        'required': [
            '</html>',
            'revealInView',
            'borderColor',
            'mousemove',
            'G-W8N0CSLMYZ',
            'lenis.min.js',
            'gsap.min.js',
        ],
    },
    'public/privacy-policy.html': {
        'min_bytes': 45_000,
        'min_lines': 250,
        'required': [
            '</html>',
            'revealInView',
            'mousemove',
            'G-W8N0CSLMYZ',
        ],
    },
}

PASS = '\033[92m'
FAIL = '\033[91m'
WARN = '\033[93m'
RESET = '\033[0m'
BOLD = '\033[1m'

def check_file(rel_path, rules):
    path = os.path.join(ROOT, rel_path)
    errors = []

    if not os.path.exists(path):
        return [f'File not found: {rel_path}']

    raw = open(path, 'rb').read()
    size = len(raw)
    try:
        content = raw.decode('utf-8', errors='replace')
    except Exception as e:
        return [f'Could not read file: {e}']

    lines = content.splitlines()
    line_count = len(lines)

    # 1. Size check
    if size < rules['min_bytes']:
        errors.append(
            f'File too small: {size:,} bytes (minimum {rules["min_bytes"]:,}). '
            f'Likely truncated.'
        )

    # 2. Line count check
    if line_count < rules['min_lines']:
        errors.append(
            f'Too few lines: {line_count} (minimum {rules["min_lines"]}). '
            f'Likely truncated.'
        )

    # 3. Must end with </html>
    tail = content.rstrip()
    if not tail.endswith('</html>'):
        errors.append(
            f'File does not end with </html>. '
            f'Last 40 chars: {repr(tail[-40:])}'
        )

    # 4. Required strings
    for needle in rules['required']:
        if needle not in content:
            errors.append(f'Missing required string: {repr(needle)}')

    # 5. Balanced <script> tags
    open_count  = len(re.findall(r'<script[\s>]', content, re.IGNORECASE))
    close_count = len(re.findall(r'</script>', content, re.IGNORECASE))
    if open_count != close_count:
        errors.append(
            f'Unbalanced script tags: {open_count} opening vs {close_count} closing.'
        )

    # 6. No consecutive empty <script> tags (the bug that killed privacy-policy)
    if re.search(r'<script>\s*<script', content):
        errors.append('Consecutive empty <script> tag detected — same bug as before.')

    # 7. Head and body structure
    for tag in ['<head>', '</head>', '<body>', '</body>']:
        if content.count(tag) != 1:
            errors.append(f'Expected exactly 1 {tag}, found {content.count(tag)}.')

    return errors


def main():
    print(f'\n{BOLD}Whizzpack HTML Validator{RESET}')
    print('─' * 40)

    total_errors = 0
    for rel_path, rules in RULES.items():
        errors = check_file(rel_path, rules)
        if errors:
            print(f'{FAIL}FAIL{RESET}  {rel_path}')
            for e in errors:
                print(f'       {FAIL}✗{RESET} {e}')
            total_errors += len(errors)
        else:
            path = os.path.join(ROOT, rel_path)
            size = os.path.getsize(path)
            lines = len(open(path, encoding='utf-8', errors='replace').read().splitlines())
            print(f'{PASS}PASS{RESET}  {rel_path}  ({size:,} bytes, {lines} lines)')

    print('─' * 40)
    if total_errors:
        print(f'{FAIL}{BOLD}BLOCKED: {total_errors} error(s) found. Fix before pushing.{RESET}\n')
        sys.exit(1)
    else:
        print(f'{PASS}{BOLD}All checks passed. Safe to push.{RESET}\n')
        sys.exit(0)

if __name__ == '__main__':
    main()
