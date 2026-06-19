#!/usr/bin/env node
// Drafts the next GeoLocally short:
//   1. Picks an unshipped topic from SHORTS_QUEUE.md
//   2. Calls Claude with a strict hook→payoff prompt
//   3. Writes script.txt + outro for human review (no TTS yet — TTS is the next step)
//
// After human review, run:
//   node scripts/text-to-speech.mjs   # (separate step, uses ElevenLabs/OpenAI)
// to produce public/short.mp3 + public/short.timing.json.
//
// Env:
//   ANTHROPIC_API_KEY   required unless DRY_RUN=true
//   FORCE_SLUG          optional override
//   DRY_RUN             "true" → prints draft, writes nothing

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const QUEUE = path.join(ROOT, "SHORTS_QUEUE.md");
const SHIPPED_DIR = path.join(ROOT, "shipped");
const DRAFT_PATH = path.join(ROOT, "drafts");

const DRY_RUN = process.env.DRY_RUN === "true";
const FORCE_SLUG = process.env.FORCE_SLUG?.trim() || "";

async function existingSlugs() {
  const slugs = new Set();
  for (const dir of [SHIPPED_DIR, DRAFT_PATH]) {
    const files = await fs.readdir(dir).catch(() => []);
    for (const f of files) if (f.endsWith(".json")) slugs.add(f.replace(/\.json$/, ""));
  }
  return slugs;
}

function parseQueue(md) {
  const rows = [];
  const re = /^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/gm;
  let m;
  while ((m = re.exec(md))) rows.push({ slug: m[1].trim(), hook: m[2].trim(), angle: m[3].trim() });
  return rows;
}

async function pickTopic() {
  if (FORCE_SLUG) return { slug: FORCE_SLUG, hook: FORCE_SLUG.replace(/-/g, " "), angle: "(force-slug override)" };
  const md = await fs.readFile(QUEUE, "utf8");
  const rows = parseQueue(md);
  const taken = await existingSlugs();
  const next = rows.find((r) => !taken.has(r.slug));
  if (!next) throw new Error("No unshipped slugs in SHORTS_QUEUE.md.");
  return next;
}

function systemPrompt() {
  return `You write 30-second vertical short scripts for GeoLocally (geolocally.com). The audience is a local service business owner (plumber, dentist, lawyer, HVAC, med spa) in Florida. The brand voice is direct, operator-tone, anti-corporate.

VOICE RULES (non-negotiable):
- Open with a hook: a question, a stat, or a counter-intuitive claim. No "in today's world."
- Maximum 75 words for the spoken script (≈30 seconds at conversational pace).
- Short sentences. Concrete examples. No banned phrases: "AI-powered", "leverage", "robust", "delve", "tapestry", "navigate", "unlock", "harness".
- Mention "ChatGPT" or "AI search" by name at least once.
- End the script with a one-line payoff. The OUTRO CTA is a separate one-liner shown on screen, not spoken.
- Plain spoken English. No SSML. No stage directions. No "[pause]".

OUTPUT FORMAT — return one JSON object exactly:
{
  "slug": "...",
  "title": "...short title for the video (under 60 chars)...",
  "hook": "...the first sentence...",
  "script": "...the full spoken script as plain text, 60–75 words...",
  "outro_cta": "...one short line shown on the closing frame (under 28 chars)...",
  "outro_url": "geolocally.com/..."
}

Return ONLY the JSON. No prose, no code fences.`;
}

function userPrompt(topic) {
  return `Draft the next GeoLocally short.

Slug: ${topic.slug}
Hook seed: ${topic.hook}
Angle: ${topic.angle}

Now produce the JSON.`;
}

async function callClaude(system, user) {
  if (DRY_RUN) {
    console.log("[DRY_RUN] system:", system.slice(0, 300));
    console.log("[DRY_RUN] user:", user);
    return { slug: "dry-run", title: "Dry run", hook: "Dry hook.", script: "Dry script.", outro_cta: "Full breakdown →", outro_url: "geolocally.com" };
  }
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY required (or DRY_RUN=true).");
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const resp = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-opus-4-7",
    max_tokens: 1500,
    system,
    messages: [{ role: "user", content: user }],
  });
  const text = resp.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
  return JSON.parse(text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim());
}

(async () => {
  const topic = await pickTopic();
  console.log(`Topic: ${topic.slug} — ${topic.hook}`);
  const draft = await callClaude(systemPrompt(), userPrompt(topic));
  console.log("\n=== DRAFT ===");
  console.log(JSON.stringify(draft, null, 2));
  console.log("=============\n");
  if (DRY_RUN) return;

  await fs.mkdir(DRAFT_PATH, { recursive: true });
  const out = path.join(DRAFT_PATH, `${draft.slug}.json`);
  await fs.writeFile(out, JSON.stringify(draft, null, 2) + "\n");
  console.log(`✓ wrote ${out}`);
  console.log("\nNext steps:");
  console.log(`  1. Review and edit ${out}`);
  console.log(`  2. Generate audio + timing.json (see README → "TTS step")`);
  console.log(`  3. Drop final files in shipped/${draft.slug}.json + public/short.mp3 + public/short.timing.json`);
  console.log(`  4. npm run render`);
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
