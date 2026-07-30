#!/usr/bin/env python3
"""
Submit every URL in the live sitemap to Bing (and all IndexNow-enabled
engines: Bing/Copilot, Seznam, Naver, Yandex) via the IndexNow protocol.

IndexNow gives near-instant crawl notification instead of waiting for the
scheduled sitemap re-crawl. Google does NOT use IndexNow — Google discovers
via the sitemap in Search Console, which is already submitted.

Setup (already done in this repo):
  - Key file public/9da143c99487f65f430a76326f7723ba.txt is deployed at
    https://www.insuranceuntangled.com/9da143c99487f65f430a76326f7723ba.txt
    which proves domain ownership to IndexNow.

Run after any deploy that adds/changes pages:
  python scripts/bing-index.py

No dependencies — stdlib only.
"""

import json
import re
import sys
import urllib.request

HOST = "www.insuranceuntangled.com"
SITEMAP_URL = f"https://{HOST}/sitemap.xml"
INDEXNOW_KEY = "9da143c99487f65f430a76326f7723ba"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"  # fans out to Bing + others


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "IU-IndexNow/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8")


def main() -> int:
    # 1. Verify the key file is actually being served (else submissions 403)
    try:
        served = fetch(KEY_LOCATION).strip()
    except Exception as e:
        print(f"ERROR: key file not reachable at {KEY_LOCATION}: {e}")
        print("Deploy the site first — public/<key>.txt must be live before submitting.")
        return 1
    if served != INDEXNOW_KEY:
        print(f"ERROR: key file content mismatch (got {served!r}).")
        return 1
    print(f"Key file verified: {KEY_LOCATION}")

    # 2. Pull every URL from the live sitemap
    try:
        xml = fetch(SITEMAP_URL)
    except Exception as e:
        print(f"ERROR: could not fetch sitemap: {e}")
        return 1
    urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)
    if not urls:
        print("ERROR: no <loc> entries found in sitemap.")
        return 1
    print(f"Sitemap contains {len(urls)} URLs.")

    # 3. Submit in one batch (IndexNow allows up to 10,000 per request)
    payload = json.dumps({
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode("utf-8")

    req = urllib.request.Request(
        ENDPOINT,
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            status = r.status
    except urllib.error.HTTPError as e:
        status = e.code

    if status in (200, 202):
        print(f"SUCCESS (HTTP {status}): {len(urls)} URLs submitted to IndexNow.")
        print("Bing typically crawls within minutes to hours. Check Bing")
        print("Webmaster Tools → IndexNow for the submission log.")
        return 0

    hints = {
        400: "Bad request — malformed payload.",
        403: "Key not valid — key file missing or not yet deployed.",
        422 : "URLs don't belong to the host or key mismatch.",
        429: "Too many requests — wait and retry.",
    }
    print(f"FAILED (HTTP {status}): {hints.get(status, 'unexpected response')}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
