// One-off blog cover renderer. Adapted from buffer-toolkit's render-cards
// approach but at 1200x630 (matches the aspect ratio used in the blog grid).
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '..');
const OUT_DIR = resolve(ROOT, 'static/blog-covers');

const slug = process.argv[2];
const overline = process.argv[3] ?? 'AI Search · FAQ';
const headline = process.argv[4] ?? 'How local businesses show up in AI search.';
if (!slug) {
  console.error('Usage: node scripts/render-blog-cover.mjs <slug> [overline] [headline]');
  process.exit(1);
}

const html = `<!doctype html>
<html><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap" rel="stylesheet" />
<style>
  :root {
    --indigo-500:#6366f1; --indigo-400:#818cf8; --indigo-300:#a5b4fc; --indigo-600:#4f46e5;
    --ink-950:#030712; --ink-300:#cbd5e1; --ink-400:#94a3b8; --white:#fff;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{width:1200px;height:630px;overflow:hidden;}
  body{font-family:'Inter',system-ui,sans-serif;color:var(--white);
    background:
      radial-gradient(900px 500px at 18% 28%, rgba(79,70,229,0.22), transparent 60%),
      radial-gradient(700px 380px at 88% 78%, rgba(129,140,248,0.14), transparent 60%),
      var(--ink-950);
    -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;position:relative;}
  .card{width:1200px;height:630px;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;position:relative;}
  .overline{font-size:16px;letter-spacing:0.22em;text-transform:uppercase;color:var(--indigo-400);font-weight:700;}
  .headline{font-family:'Inter',sans-serif;font-size:72px;font-weight:800;line-height:1.02;letter-spacing:-0.035em;color:var(--white);max-width:18ch;}
  .headline .accent{font-family:'Playfair Display',Georgia,serif;font-weight:900;font-style:italic;color:var(--indigo-400);}
  .footer{display:flex;justify-content:space-between;align-items:flex-end;}
  .wordmark{font-family:'Inter',sans-serif;font-weight:800;font-size:26px;letter-spacing:-0.025em;line-height:1;}
  .wordmark .geo{color:var(--indigo-400);} .wordmark .locally{color:var(--white);}
  .url{font-family:'Inter',sans-serif;font-size:16px;color:var(--ink-400);font-weight:500;}
  .squares{position:absolute;top:60px;right:72px;display:grid;grid-template-columns:repeat(5,28px);grid-auto-rows:28px;gap:7px;opacity:.85;}
  .squares span{background:rgba(129,140,248,0.18);border-radius:4px;}
  .squares span.f{background:var(--indigo-500);} .squares span.o{background:transparent;border:1.5px solid rgba(129,140,248,.55);} .squares span.l{background:var(--indigo-400);}
</style></head>
<body>
<div class="card">
  <div><div class="overline">${overline.replace(/</g,'&lt;')}</div></div>
  <div><div class="headline">${headline}</div></div>
  <div class="footer">
    <div class="wordmark"><span class="geo">Geo</span><span class="locally">Locally</span></div>
    <div class="url">geolocally.com</div>
  </div>
  <div class="squares">
    <span class="f"></span><span></span><span class="o"></span><span class="l"></span><span></span>
    <span></span><span class="o"></span><span class="l"></span><span></span><span class="f"></span>
    <span class="o"></span><span class="l"></span><span></span><span class="f"></span><span class="o"></span>
  </div>
</div>
</body></html>`;

const tmpPath = `${tmpdir()}/blog-cover-${slug}.html`;
writeFileSync(tmpPath, html);
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(pathToFileURL(tmpPath).href, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const outPng = resolve(OUT_DIR, `${slug}.png`);
await page.screenshot({ path: outPng, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`✓ ${outPng}`);
