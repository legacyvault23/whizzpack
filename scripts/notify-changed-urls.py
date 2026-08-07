#!/usr/bin/env python3
"""
notify-changed-urls.py
Reads changed files from git diff, maps them to whizzpack.in URLs,
and notifies Google Indexing API + IndexNow (Bing) for each.

Usage:
  python notify-changed-urls.py [changed_files.txt]
  If no file given, reads from stdin or auto-detects via git diff HEAD~1 HEAD.
"""

import sys
import os
import json
import time
import re
import subprocess
from pathlib import Path

# Config
BASE_URL = "https://www.whizzpack.in"
INDEXNOW_KEY = "8249d520fb029e61ad839dfdd862ff69"
INDEXNOW_ENDPOINT = f"https://api.indexnow.org/indexnow?key={INDEXNOW_KEY}&keyLocation={BASE_URL}/{INDEXNOW_KEY}.txt"

# Auth (reads JSON from env var GOOGLE_INDEXING_KEY or local file)
def load_credentials():
    import google.oauth2.service_account as sa
    from google.auth.transport.requests import Request as GoogleRequest

    key_json = os.environ.get("GOOGLE_INDEXING_KEY")
    if key_json:
        info = json.loads(key_json)
    else:
        key_file = Path(__file__).parent / "service-account-key.json"
        with open(key_file) as f:
            info = json.load(f)

    creds = sa.Credentials.from_service_account_info(
        info,
        scopes=["https://www.googleapis.com/auth/indexing"]
    )
    creds.refresh(GoogleRequest())
    return creds

# File to URL mapping
def files_to_urls(changed_files: list[str]) -> list[str]:
    urls = set()

    for f in changed_files:
        f = f.strip()
        if not f:
            continue

        # Blog content files: content/blog/<slug>.md
        m = re.match(r"content/blog/(.+)\.md$", f)
        if m:
            slug = m.group(1)
            urls.add(f"{BASE_URL}/blogs/{slug}")
            urls.add(f"{BASE_URL}/blogs")
            continue

        # Public HTML pages
        mapping_html = {
            "public/index.html":           f"{BASE_URL}/",
            "public/corrugated-boxes.html": f"{BASE_URL}/corrugated-boxes",
            "public/cotton-seed-bags.html": f"{BASE_URL}/cotton-seed-bags",
            "public/privacy-policy.html":   f"{BASE_URL}/privacy-policy",
        }
        if f in mapping_html:
            urls.add(mapping_html[f])
            continue

        # Next.js pages
        mapping_pages = {
            "pages/index.jsx":             f"{BASE_URL}/",
            "pages/about.jsx":             f"{BASE_URL}/about",
            "pages/blogs/index.jsx":       f"{BASE_URL}/blogs",
            "pages/blog/index.jsx":        f"{BASE_URL}/blogs",
            "pages/authors/jash-b.jsx":    f"{BASE_URL}/author/jash-b",
        }
        if f in mapping_pages:
            urls.add(mapping_pages[f])
            continue

        # Dynamic page templates
        if f in ("pages/blogs/[slug].jsx", "pages/blog/[slug].jsx"):
            urls.add(f"{BASE_URL}/blogs")
            continue
        if f == "pages/corrugated-boxes/[slug].jsx":
            urls.add(f"{BASE_URL}/corrugated-boxes")
            continue
        if f == "pages/cotton-seed-bags/[slug].jsx":
            urls.add(f"{BASE_URL}/cotton-seed-bags")
            continue

        # Sitemap changed - submit everything
        if f == "public/sitemap.xml":
            urls.update(get_sitemap_urls())
            continue

        # Layout / shared components
        if f in ("components/Layout.jsx", "components/Layout.tsx",
                 "styles/globals.css", "next.config.mjs", "next.config.js"):
            urls.update([
                f"{BASE_URL}/",
                f"{BASE_URL}/corrugated-boxes",
                f"{BASE_URL}/cotton-seed-bags",
                f"{BASE_URL}/blogs",
                f"{BASE_URL}/about",
            ])
            continue

        # Sub-pages via file path
        m = re.match(r"pages/(corrugated-boxes|cotton-seed-bags)/(.+)\.jsx$", f)
        if m:
            section, slug = m.group(1), m.group(2)
            if not slug.startswith("["):
                urls.add(f"{BASE_URL}/{section}/{slug}")
            continue

    return sorted(urls)


def get_sitemap_urls() -> list[str]:
    sitemap = Path(__file__).parent.parent / "public" / "sitemap.xml"
    if not sitemap.exists():
        return []
    import xml.etree.ElementTree as ET
    tree = ET.parse(sitemap)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [loc.text for loc in tree.findall(".//sm:loc", ns)]


def notify_google(url: str, creds) -> dict:
    import requests
    resp = requests.post(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {creds.token}"
        },
        json={"url": url, "type": "URL_UPDATED"},
        timeout=15
    )
    return {"status": resp.status_code, "body": resp.json()}


def notify_indexnow(urls: list[str]):
    import requests
    payload = {
        "host": "www.whizzpack.in",
        "key": INDEXNOW_KEY,
        "keyLocation": f"{BASE_URL}/{INDEXNOW_KEY}.txt",
        "urlList": urls
    }
    resp = requests.post(
        "https://api.indexnow.org/indexnow",
        headers={"Content-Type": "application/json; charset=utf-8"},
        json=payload,
        timeout=15
    )
    return resp.status_code


def main():
    if len(sys.argv) > 1 and sys.argv[1] != "-":
        with open(sys.argv[1]) as f:
            changed = f.read().splitlines()
    elif not sys.stdin.isatty():
        changed = sys.stdin.read().splitlines()
    else:
        result = subprocess.run(
            ["git", "diff", "--name-only", "HEAD~1", "HEAD"],
            capture_output=True, text=True,
            cwd=Path(__file__).parent.parent
        )
        changed = result.stdout.splitlines()

    urls = files_to_urls(changed)

    if not urls:
        print("No indexable URLs changed - nothing to submit.")
        return

    print(f"URLs to notify ({len(urls)}):")
    for u in urls:
        print(f"  {u}")

    try:
        import google.oauth2.service_account
        creds = load_credentials()
    except ImportError:
        print("google-auth not installed. Run: pip install google-auth requests")
        sys.exit(1)

    print("\nSubmitting to Google Indexing API...")
    ok = 0
    for url in urls:
        result = notify_google(url, creds)
        status = result["status"]
        if status == 200:
            print(f"  OK  {url}")
            ok += 1
        elif status == 429:
            print(f"  RATE LIMIT - waiting 60s then retrying {url}")
            time.sleep(60)
            result = notify_google(url, creds)
            if result["status"] == 200:
                print(f"  OK  {url}")
                ok += 1
            else:
                print(f"  ERR {url}: {result}")
        else:
            print(f"  ERR {url}: {result}")
        time.sleep(0.5)

    print("\nSubmitting to IndexNow (Bing)...")
    bing_status = notify_indexnow(urls)
    print(f"  IndexNow response: HTTP {bing_status}")

    print(f"\nDone: {ok}/{len(urls)} URLs submitted to Google, IndexNow pinged.")


if __name__ == "__main__":
    main()
