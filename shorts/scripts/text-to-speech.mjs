#!/usr/bin/env node
// ElevenLabs TTS + per-character timing for the geolocally shorts pipeline.
//
// Reads drafts/<slug>.json (the latest, or --slug <slug>), calls ElevenLabs
// with-timestamps endpoint, writes public/short.mp3 + public/short.timing.json,
// and moves drafts/<slug>.json → shipped/<slug>.json.
//
// Env:
//   ELEVENLABS_API_KEY  required
//   ELEVENLABS_VOICE_ID optional (default Rachel — 21m00Tcm4TlvDq8ikWAM)
//   ELEVENLABS_MODEL_ID optional (default eleven_turbo_v2_5)
//
// Usage:
//   node scripts/text-to-speech.mjs                # latest draft
//   node scripts/text-to-speech.mjs --slug X       # specific
//   node scripts/text-to-speech.mjs --keep-draft   # don't move to shipped/
//
// After this runs successfully:
//   npm run render   # produces out/short.mp4

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DRAFTS = path.join(ROOT, "drafts");
const SHIPPED = path.join(ROOT, "shipped");
const PUBLIC = path.join(ROOT, "public");

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // Rachel
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || "eleven_turbo_v2_5";
const ENDPOINT = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`;

const args = process.argv.slice(2);
const SLUG = (() => {
  const i = args.indexOf("--slug");
  return i !== -1 ? args[i + 1] : null;
})();
const KEEP_DRAFT = args.includes("--keep-draft");

async function pickDraft() {
  await fs.mkdir(DRAFTS, { recursive: true });
  if (SLUG) {
    const p = path.join(DRAFTS, `${SLUG}.json`);
    await fs.access(p);
    return p;
  }
  const files = (await fs.readdir(DRAFTS)).filter((f) => f.endsWith(".json"));
  if (!files.length) throw new Error("No drafts in shorts/drafts/. Run `npm run script` first.");
  // pick most recent by mtime
  const stats = await Promise.all(files.map(async (f) => ({ f, m: (await fs.stat(path.join(DRAFTS, f))).mtimeMs })));
  stats.sort((a, b) => b.m - a.m);
  return path.join(DRAFTS, stats[0].f);
}

async function callElevenLabs(text) {
  if (!process.env.ELEVENLABS_API_KEY) throw new Error("ELEVENLABS_API_KEY required.");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.25, use_speaker_boost: true },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`ElevenLabs HTTP ${res.status}: ${body.slice(0, 500)}`);
  }
  return await res.json();
}

(async () => {
  const draftPath = await pickDraft();
  const draft = JSON.parse(await fs.readFile(draftPath, "utf8"));
  console.log(`Draft: ${draft.slug}`);
  console.log(`Voice: ${VOICE_ID} · Model: ${MODEL_ID}`);
  console.log(`Script (${draft.script.length} chars):\n  ${draft.script.slice(0, 200)}${draft.script.length > 200 ? "…" : ""}\n`);

  const data = await callElevenLabs(draft.script);
  if (!data.audio_base64 || !data.alignment) {
    throw new Error(`ElevenLabs returned unexpected shape: keys=${Object.keys(data).join(",")}`);
  }

  await fs.mkdir(PUBLIC, { recursive: true });
  const mp3Path = path.join(PUBLIC, "short.mp3");
  const timingPath = path.join(PUBLIC, "short.timing.json");

  await fs.writeFile(mp3Path, Buffer.from(data.audio_base64, "base64"));
  await fs.writeFile(
    timingPath,
    JSON.stringify({
      _generated: new Date().toISOString(),
      _slug: draft.slug,
      alignment: data.alignment,
      outroCta: draft.outro_cta || "Full breakdown →",
      outroUrl: draft.outro_url || "geolocally.com",
    }, null, 2) + "\n",
  );

  const lastEnd = data.alignment.character_end_times_seconds.slice(-1)[0];
  console.log(`✓ ${mp3Path} (${(Buffer.from(data.audio_base64, "base64").length / 1024).toFixed(1)} KB)`);
  console.log(`✓ ${timingPath} (audio length: ${lastEnd.toFixed(2)}s)`);

  if (!KEEP_DRAFT) {
    await fs.mkdir(SHIPPED, { recursive: true });
    const dest = path.join(SHIPPED, path.basename(draftPath));
    await fs.rename(draftPath, dest);
    console.log(`✓ moved ${draftPath} → ${dest}`);
  }

  console.log("\nNext: npm run render");
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
