#!/usr/bin/env node
// IndexNow ping for geolocally.com.
//
// IndexNow (https://www.indexnow.org/) is supported by Bing, Yandex, Seznam,
// Naver. Bing's index also feeds DuckDuckGo, Yahoo, and ChatGPT search.
// No ownership verification — just host the key file at the documented URL
// and POST.
//
// Google does NOT participate in IndexNow as of 2026. For Google we still
// rely on GSC + the sitemap.
//
// Usage:
//   node scripts/indexnow/ping.mjs https://geolocally.com/blog/foo
//   node scripts/indexnow/ping.mjs --auto         # discover from git HEAD
//   node scripts/indexnow/ping.mjs --sitemap      # ping the sitemap only

const HOST = "geolocally.com";
// Key file lives at static/<KEY>.txt and is served at https://geolocally.com/<KEY>.txt
// Generate with `openssl rand -hex 16` and update both places if you rotate.
const KEY = "8c4b1f3e2d9a47b1a0c5e9f7d2b6a4c3";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function changedUrlsFromGit() {
  const { execSync } = await import("node:child_process");
  const diff = execSync("git show --name-only --pretty='' HEAD", { encoding: "utf8" });
  const urls = new Set();
  for (const line of diff.split("\n")) {
    // src/routes/<slug>/+page.svelte  → https://geolocally.com/<slug>
    // src/routes/<city>/<trade>/+page.svelte → https://geolocally.com/<city>/<trade>
    // src/routes/blog/<slug>/+page.svelte → https://geolocally.com/blog/<slug>
    const m = line.match(/^src\/routes\/(.+)\/\+page\.svelte$/);
    if (m) {
      const route = m[1];
      // Skip route group/layout artefacts and the root +page.svelte
      if (route.startsWith("(")) continue;
      urls.add(`https://${HOST}/${route}`);
    }
    // Blog metadata change → ping the blog index
    if (line === "src/lib/content/blog-posts.js") urls.add(`https://${HOST}/blog`);
    if (line === "static/sitemap.xml") urls.add(`https://${HOST}/sitemap.xml`);
  }
  return [...urls];
}

async function ping(urls) {
  if (urls.length === 0) {
    console.log("IndexNow: no URLs to submit.");
    return;
  }
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
  console.log(`IndexNow: submitting ${urls.length} URL${urls.length === 1 ? "" : "s"}:`);
  urls.forEach((u) => console.log(`  - ${u}`));
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow: HTTP ${res.status} ${res.statusText}`);
  if (res.status !== 200 && res.status !== 202) {
    const text = await res.text().catch(() => "");
    console.error(`IndexNow body: ${text.slice(0, 500)}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
let urls;
if (args.length === 0 || args[0] === "--auto") {
  urls = await changedUrlsFromGit();
} else if (args[0] === "--sitemap") {
  urls = [`https://${HOST}/sitemap.xml`];
} else {
  urls = args;
}
await ping(urls);
