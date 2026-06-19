# IndexNow ping

Notifies Bing (and downstream: DuckDuckGo, Yahoo, ChatGPT search), Yandex,
Seznam, Naver of changed URLs. **Google does not participate** — for Google
we still rely on GSC + the sitemap.

## Setup (one-time)

1. The key is hard-coded in `ping.mjs` as `KEY`. To rotate, generate a new one:
   ```bash
   openssl rand -hex 16
   ```
2. Create the verification file at `static/<KEY>.txt` containing only the key:
   ```bash
   echo "8c4b1f3e2d9a47b1a0c5e9f7d2b6a4c3" > static/8c4b1f3e2d9a47b1a0c5e9f7d2b6a4c3.txt
   ```
3. Commit and deploy. The file must be reachable at `https://geolocally.com/<KEY>.txt`.

## Usage

```bash
# Ping the sitemap (safe default after any deploy)
node scripts/indexnow/ping.mjs --sitemap

# Discover URLs from the last commit (run in CI after a merge to main)
node scripts/indexnow/ping.mjs --auto

# Ping specific URLs
node scripts/indexnow/ping.mjs https://geolocally.com/blog/my-post
```

## CI integration

Add to `.github/workflows/deploy.yml` (after the deploy step) or as its own job:

```yaml
- name: IndexNow ping
  if: github.ref == 'refs/heads/main'
  run: node scripts/indexnow/ping.mjs --auto
```

## Why this matters for AEO

ChatGPT's search citations are powered partly by Bing's index. Faster Bing
recrawl = faster ChatGPT awareness of new GeoLocally pages.
