#!/usr/bin/env node
// Weekly AEO blog drafter for GeoLocally.
// Ported from ttv-asc-checker. Picks the next unshipped slug from
// src/lib/content/CONTENT_BRIEF.md, drafts an article via Claude using
// the AEO pillar page as voice anchor, writes
// src/routes/blog/<slug>/+page.svelte, and appends the post entry to
// src/lib/content/blog-posts.js.
//
// Env:
//   ANTHROPIC_API_KEY  required unless DRY_RUN=true
//   FORCE_SLUG         optional override of the topic picker
//   DRY_RUN            "true" → picks topic + prints prompts, writes nothing
//   GITHUB_OUTPUT      provided by Actions

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const BRIEF_PATH = path.join(ROOT, "src", "lib", "content", "CONTENT_BRIEF.md");
const BLOG_ROUTES = path.join(ROOT, "src", "routes", "blog");
const BLOG_INDEX = path.join(ROOT, "src", "lib", "content", "blog-posts.js");
const VOICE_ANCHOR = path.join(BLOG_ROUTES, "answer-engine-optimization-for-local-businesses", "+page.svelte");

const TODAY = new Date().toISOString().slice(0, 10);
const DISPLAY_DATE = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const DRY_RUN = process.env.DRY_RUN === "true";
const FORCE_SLUG = process.env.FORCE_SLUG?.trim() || "";

async function existingSlugs() {
  const entries = await fs.readdir(BLOG_ROUTES, { withFileTypes: true }).catch(() => []);
  return new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name));
}

function parseBriefRows(md) {
  const rows = [];
  const re = /^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/gm;
  let m;
  while ((m = re.exec(md))) {
    const [, slug, title, keyword, length] = m;
    rows.push({ slug: slug.trim(), title: title.trim(), keyword: keyword.trim(), length: parseInt(length, 10) || 1200 });
  }
  return rows;
}

async function pickTopic() {
  if (FORCE_SLUG) {
    return { slug: FORCE_SLUG, title: FORCE_SLUG.replace(/-/g, " "), keyword: FORCE_SLUG.replace(/-/g, " "), length: 1200 };
  }
  const brief = await fs.readFile(BRIEF_PATH, "utf8");
  const rows = parseBriefRows(brief);
  const taken = await existingSlugs();
  const next = rows.find((r) => !taken.has(r.slug));
  if (!next) throw new Error("No unshipped topics in CONTENT_BRIEF.md. Add more rows or pass FORCE_SLUG.");
  return next;
}

async function loadVoiceAnchor() {
  return await fs.readFile(VOICE_ANCHOR, "utf8").catch(() => "");
}

function systemPrompt() {
  return `You write AEO (Answer Engine Optimization) content for GeoLocally (geolocally.com), a Florida-focused service that builds focused landing pages + explainer videos for local service businesses (plumbers, dentists, lawyers, HVAC, med spas) who want to surface in ChatGPT, Perplexity, Google AI Overviews, and Google AI Mode.

VOICE RULES (non-negotiable):
- Direct, operator-tone. No "in today's fast-paced world." No AI throat-clearing. No emojis.
- First paragraph delivers the practical takeaway. Lead with the answer.
- Short paragraphs. Concrete examples. Specific cities, specific trades.
- Use <h2> for top sections, <h3> for sub-sections. Use <p>, <ul>, <ol>, <li>, <strong>, <em>, <a href="...">.
- Banned words/phrases: "leverage", "robust", "delve", "tapestry", "AI-powered", "AI-assisted", "in this article we will", "the world of", "navigate the complexities".
- Hedge if uncertain. Never invent statistics, company names, or case studies.
- Use em-dashes — sparingly. Mix sentence length.

SEO/AEO RULES:
- The primary keyword must appear in title, description, the first paragraph, and at least one <h2>.
- Include 2–4 internal links using these verified slugs:
  - /blog/answer-engine-optimization-for-local-businesses
  - /blog/how-local-businesses-show-up-in-ai-search
  - /blog/your-customers-arent-just-googling-anymore
  - /blog/what-aeo-means-for-local-businesses
  - /blog/why-a-video-first-storefront-beats-a-generic-website
  - /blog/how-to-make-your-business-easier-to-understand-online
  - /pricing
  - /faq
  - /tampa/plumbers
  - /miami/dentists
  - /orlando/hvac
- End with a 1–2 sentence CTA linking to /pricing or the contact form.
- Description must be ≤ 160 characters.
- Excerpt must be ≤ 160 characters.
- Category is a short 2–3 word label (e.g., "AEO Playbook", "Local AI", "Practical Fix").

OUTPUT FORMAT — return a single JSON object exactly like:
{
  "slug": "...",
  "title": "...",
  "description": "...",
  "excerpt": "...",
  "category": "...",
  "reading_time_minutes": 6,
  "body_html": "<p>...</p><h2>...</h2>..."
}

The body_html must:
- Be plain HTML (no markdown, no Svelte directives, no className/class attributes).
- Use only these tags: <p>, <h2>, <h3>, <ul>, <ol>, <li>, <strong>, <em>, <a href="...">, <blockquote>.
- Escape HTML special chars in user text. Use straight quotes inside attributes.
- Include 2+ internal <a href="/..."> links from the allowed slugs above.

Return ONLY the JSON. No prose before or after, no code fences.`;
}

function userPrompt(topic, voiceSample) {
  return `Write the next GeoLocally AEO article.

Topic: ${topic.title}
Slug: ${topic.slug}
Primary keyword: ${topic.keyword}
Target length: ~${topic.length} words

Voice anchor (study the tone, structure, paragraph length, and how it speaks to a local operator):

---
${voiceSample.slice(0, 9000)}
---

Now produce the JSON object described in the system prompt.`;
}

async function callAnthropic(system, user) {
  if (DRY_RUN) {
    console.log("[DRY_RUN] system prompt:\n", system.slice(0, 400), "...\n");
    console.log("[DRY_RUN] user prompt:\n", user.slice(0, 600), "...\n");
    return {
      slug: "dry-run-placeholder",
      title: "Dry-run placeholder title",
      description: "Dry-run placeholder description.",
      excerpt: "Dry-run placeholder excerpt.",
      category: "Test",
      reading_time_minutes: 4,
      body_html: "<p>Dry-run placeholder body.</p>",
    };
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is required (or set DRY_RUN=true).");
  }
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const resp = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-opus-4-7",
    max_tokens: 8000,
    system,
    messages: [{ role: "user", content: user }],
  });
  const text = resp.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Claude response as JSON:\n", cleaned.slice(0, 2000));
    throw err;
  }
}

function escForSvelteAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

function pageSvelte(slug) {
  return `<script>
\timport BlogPostLayout from '$lib/components/marketing/BlogPostLayout.svelte';
\timport { blogPostBySlug } from '$lib/content/blog-posts';

\tconst post = blogPostBySlug['${slug}'];
</script>

<BlogPostLayout {post}>
\t{@html post.bodyHtml}
</BlogPostLayout>
`;
}

function postEntryJs(topic, draft) {
  return `  {
    slug: ${JSON.stringify(topic.slug)},
    title: ${JSON.stringify(draft.title)},
    description: ${JSON.stringify(draft.description)},
    published: ${JSON.stringify(TODAY)},
    displayDate: ${JSON.stringify(DISPLAY_DATE)},
    readingTime: ${JSON.stringify(`${draft.reading_time_minutes || 6} min read`)},
    category: ${JSON.stringify(draft.category || "AEO")},
    coverImage: ${JSON.stringify(`/blog-covers/${topic.slug}.png`)},
    coverAlt: ${JSON.stringify(`GeoLocally blog cover for ${draft.title}.`)},
    excerpt: ${JSON.stringify(draft.excerpt)},
    bodyHtml: ${JSON.stringify(draft.body_html)},
  },
`;
}

async function appendBlogIndex(topic, draft) {
  const file = await fs.readFile(BLOG_INDEX, "utf8");
  if (file.includes(`slug: "${topic.slug}"`) || file.includes(`slug: '${topic.slug}'`)) {
    console.log(`Slug ${topic.slug} already in blog-posts.js — skipping.`);
    return;
  }
  const entry = postEntryJs(topic, draft);
  // Insert before the closing `];` of the blogPosts array.
  const next = file.replace(/(\n\];\s*\n)/, `${entry}$1`);
  if (next === file) throw new Error("Could not find `];` to insert before in blog-posts.js");
  await fs.writeFile(BLOG_INDEX, next);
}

async function emitOutput(key, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  await fs.appendFile(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}

(async () => {
  const topic = await pickTopic();
  console.log(`Topic: ${topic.slug} — ${topic.title}`);
  console.log(`Keyword: ${topic.keyword}, target ${topic.length} words`);

  const voiceSample = await loadVoiceAnchor();
  const draft = await callAnthropic(systemPrompt(), userPrompt(topic, voiceSample));

  if (DRY_RUN) {
    console.log("\n[DRY_RUN] draft:\n", JSON.stringify(draft, null, 2).slice(0, 2200));
    return;
  }

  // Write the +page.svelte
  const pageDir = path.join(BLOG_ROUTES, topic.slug);
  await fs.mkdir(pageDir, { recursive: true });
  const pagePath = path.join(pageDir, "+page.svelte");
  await fs.writeFile(pagePath, pageSvelte(topic.slug));

  // Append to blog-posts.js
  await appendBlogIndex(topic, draft);

  console.log(`✓ wrote ${pagePath}`);
  console.log(`✓ updated ${BLOG_INDEX}`);
  await emitOutput("slug", topic.slug);
  await emitOutput("title", draft.title);
  await emitOutput("primary_keyword", topic.keyword);
})().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
