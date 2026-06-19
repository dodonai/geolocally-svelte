# Weekly AEO blog automation

Drafts one AEO-themed blog post every Monday, opens a PR for human review,
never auto-merges. Mirrors the `ttv-asc-checker` weekly-blog pattern.

## How it works

1. **GitHub Actions** (`.github/workflows/weekly-blog.yml`) fires Monday `01:00 UTC`
   (09:00 Asia/Manila) or via `workflow_dispatch`.
2. **`run.mjs`**:
   - parses `src/lib/content/CONTENT_BRIEF.md` for the next slug not already
     a directory under `src/routes/blog/`
   - calls Claude with the AEO pillar page as voice anchor
   - writes `src/routes/blog/<slug>/+page.svelte`
   - appends the post entry to `src/lib/content/blog-posts.js`
3. Workflow opens a PR titled `📝 Weekly AEO blog draft — <title>` on branch
   `weekly-blog/<slug>`. **You review + merge.** Pages deploy after merge.

## One-time setup

Repo → Settings → Secrets and variables → Actions → New repository secret:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |

That is it. `GITHUB_TOKEN` covers PR creation.

## Local testing

```bash
# Topic-picker + prompt assembly (no API call):
DRY_RUN=true node scripts/weekly-blog/run.mjs

# Full local run (writes files but won't open a PR):
ANTHROPIC_API_KEY=sk-ant-... node scripts/weekly-blog/run.mjs

# Force a specific slug from the brief:
FORCE_SLUG=how-to-write-an-aeo-faq-page \
  ANTHROPIC_API_KEY=sk-ant-... \
  node scripts/weekly-blog/run.mjs
```

## Tuning

- **Topics queue** — edit `src/lib/content/CONTENT_BRIEF.md`. Format:
  ```
  | `slug` | Title | primary keyword | target word count |
  ```
- **Voice anchor** — currently the AEO pillar page. Swap path in `run.mjs`
  `VOICE_ANCHOR` to retune.
- **Model** — set `ANTHROPIC_MODEL` env to override `claude-opus-4-7`.
- **Cadence** — change cron in `.github/workflows/weekly-blog.yml`. Default
  Monday 01:00 UTC.

## Why never auto-merge

Google penalises thin AI content. The PR queue forces a human to read,
edit, and approve before publish. The action assembles the draft —
you ship it.
