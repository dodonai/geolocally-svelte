# Weekly AEO blog automation — GeoLocally

Drafts one AEO-themed blog post per week. Cron Mon 01:00 UTC (09:00 Asia/Manila). Opens a PR. Never auto-merges.

## How it works

1. GH Action `.github/workflows/weekly-blog.yml` fires on cron or via workflow_dispatch.
2. `run.mjs`:
   - parses `src/lib/content/CONTENT_BRIEF.md` for the next slug not already under `src/routes/blog/`
   - calls Claude with the pillar at `src/routes/blog/answer-engine-optimization-for-local-businesses/+page.svelte` as voice anchor
   - **self-verifies the draft** (see QA gate below), revising up to `QA_MAX_REVISIONS` times
   - writes `src/routes/blog/<slug>/+page.svelte`
   - appends the entry to `src/lib/content/blog-posts.js`
   - writes `qa-report.md` (the QA verdict, surfaced in the PR body)
3. Workflow opens a PR titled `📝 Weekly AEO blog draft — <title>` on branch `weekly-blog/<slug>`. A draft that passed QA opens as a normal PR; one that still has issues opens as a **draft PR** with the unresolved issues listed.

## QA gate (the verification loop)

Before anything is written, every draft passes through `draft → verify → revise → re-verify` (bounded by `QA_MAX_REVISIONS`, default 2). Two layers:

- **Deterministic checks** (no LLM, ground truth): banned words, internal-link allowlist + minimum count, primary keyword in title/description/first paragraph, description/excerpt ≤160 chars, presence of `<h2>`, no `class`/`className` or markdown fences, required fields present.
- **Editorial LLM judge**: voice match vs the anchor, no invented stats/case studies, naturalness, usefulness to the ICP. Returns `{ pass, score, issues }`.

Issues from both layers are fed back into a revise call. If the draft is clean it ships as a normal PR; if issues remain after the revision budget it ships as a **draft PR** flagged `needs-work` — the human still ships, but now reviews a self-corrected draft with a confidence report instead of a raw dump.

## One-time setup

Repo → Settings → Secrets → Actions → New repository secret:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |

## Local testing

```bash
DRY_RUN=true node scripts/weekly-blog/run.mjs
ANTHROPIC_API_KEY=sk-ant-... node scripts/weekly-blog/run.mjs
FORCE_SLUG=some-topic-slug ANTHROPIC_API_KEY=sk-ant-... node scripts/weekly-blog/run.mjs
```

## Tuning

- **Topic queue** — `src/lib/content/CONTENT_BRIEF.md`. Format `| \`slug\` | Title | keyword | words |`.
- **Voice anchor** — edit `VOICE_ANCHOR` in run.mjs to point at a different article.
- **Banned words / internal links** — embedded in the system prompt AND enforced by the deterministic QA checks; rescaffold via the aeo-geo-engine skill if they change a lot.
- **Model** — set `ANTHROPIC_MODEL` env var. The QA judge can use a separate `ANTHROPIC_JUDGE_MODEL` (defaults to `ANTHROPIC_MODEL`).
- **QA strictness** — `QA_MAX_REVISIONS` env var (default 2) controls how many self-correction passes before shipping as a draft PR.

## Why never auto-merge

Google penalises thin AI content. Human read forces edit + quality. The action assembles, you ship.

## Cost tracking

Each successful call appends to `~/.openclaw/usage/ai-usage.jsonl` with project `geolocally-weekly-blog`. The shared cost watcher (`~/.openclaw/scripts/det/ai-cost-watcher.mjs`) picks it up automatically.
