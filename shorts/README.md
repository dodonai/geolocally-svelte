# geolocally-shorts

Vertical (1080×1920) Remotion shorts for GeoLocally, ported from
`~/Projects/third-team-avp/src/shorts/`. Same caption engine + Remotion
render harness, GeoLocally brand (indigo + green, Inter + Playfair Display).

## Layout

```
shorts/
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── src/
│   ├── index.ts            # Remotion entry — registers Root
│   ├── Root.tsx            # Composition registry
│   ├── Short.tsx           # The video — brand label + karaoke captions + outro
│   ├── Background.tsx      # Animated indigo/green mesh + dot grid
│   └── captions.ts         # Reads public/short.timing.json → word + line tokens
├── public/
│   ├── short.mp3           # Audio (drop here after TTS)
│   └── short.timing.json   # { alignment, outroCta, outroUrl }
├── scripts/
│   └── generate-short-script.mjs
├── drafts/                 # Draft scripts (JSON, written by the generator)
├── shipped/                # Approved scripts (move here after review)
├── out/                    # Rendered MP4s (gitignored)
└── SHORTS_QUEUE.md         # The topic queue
```

## The four-step pipeline

### 1. Draft a script

```bash
cd shorts
# Picks next unshipped slug from SHORTS_QUEUE.md
ANTHROPIC_API_KEY=sk-ant-... npm run script

# Or force a specific slug:
FORCE_SLUG=chatgpt-named-one-plumber ANTHROPIC_API_KEY=... npm run script
```

The generator writes `drafts/<slug>.json`. **Read it. Edit it.** The
spoken script field is what TTS will read.

### 2. Generate audio + timing.json

GeoLocally uses ElevenLabs (preferred, gives per-character timing for free)
or OpenAI TTS (need to align with whisper.cpp after).

**ElevenLabs (recommended)**:
```bash
# uses ELEVENLABS_API_KEY
curl -sS -X POST "https://api.elevenlabs.io/v1/text-to-speech/<VOICE_ID>/with-timestamps" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "content-type: application/json" \
  -d @- <<EOF | tee public/short.timing.raw.json
{ "text": "<paste the script field here>", "model_id": "eleven_turbo_v2_5" }
EOF

# Then split out the mp3 and timing:
node -e '
const j = JSON.parse(require("fs").readFileSync("public/short.timing.raw.json","utf8"));
require("fs").writeFileSync("public/short.mp3", Buffer.from(j.audio_base64, "base64"));
require("fs").writeFileSync("public/short.timing.json", JSON.stringify({
  alignment: j.alignment,
  outroCta: process.env.OUTRO_CTA || "Full breakdown →",
  outroUrl: process.env.OUTRO_URL || "geolocally.com"
}));
'
```

**OpenAI TTS** (no native timing — pair with whisper.cpp transcribe to get
character timings; see `~/Projects/third-team-avp/voiceover/README.md` for
the proven flow).

### 3. Render

```bash
# Studio preview (browser)
npm run studio

# Headless render → out/short.mp4
npm run render
```

### 4. Move to shipped

```bash
git mv drafts/<slug>.json shipped/<slug>.json
git add public/short.mp3 public/short.timing.json out/short.mp4
git commit -m "shorts: ship <slug>"
```

## Brand notes

- Indigo `#4f46e5`, Accent `#10b981`, BG `#030712`
- Fonts: `Inter` body, `Playfair Display` italic display
- Outro CTA is a one-liner shown on the closing frame — keep it short
- Spoken script: 60–75 words. Hard cap.

## Next thing to build

A `text-to-speech.mjs` that automates step 2 end-to-end. Skipped for now
because it depends on which TTS provider we commit to — ElevenLabs needs
a voice ID picked from a list, OpenAI needs a whisper alignment pass.
Once we ship the first manual short and you sign off on the voice,
add the script.
