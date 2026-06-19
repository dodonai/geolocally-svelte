// AEO pSEO page generator: produces /ai-search-visibility-for-<trade>-in-<city>-fl pages.
//
// This mirrors the atomicsocial.com URL shape that Google AI Overviews
// cited for the "Florida plumber + ChatGPT" prompt (see Brand Radar
// data 2026-06). Different motion from /tampa/plumbers — these pages
// target the AEO query directly, not the trade.
//
// Usage:
//   node scripts/generate-aeo-city-trade-pages.mjs               # generate the default TARGETS
//   node scripts/generate-aeo-city-trade-pages.mjs --all          # every city × trade combo
//   node scripts/generate-aeo-city-trade-pages.mjs --only tampa:plumbers,miami:dentists
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ----------------- city signals (mirrors generate-city-trade-pages.mjs) -----------------
const CITIES = {
  tampa: { label: 'Tampa', region: 'Tampa Bay', neighborhoods: 'South Tampa, New Tampa, Brandon, Riverview, Carrollwood' },
  miami: { label: 'Miami', region: 'Miami-Dade', neighborhoods: 'Brickell, Coral Gables, Coconut Grove, Wynwood, Doral' },
  orlando: { label: 'Orlando', region: 'Central Florida', neighborhoods: 'Winter Park, College Park, Lake Eola Heights, Baldwin Park, Dr. Phillips' },
  jacksonville: { label: 'Jacksonville', region: 'Northeast Florida', neighborhoods: 'Riverside, San Marco, the Beaches, Mandarin, Avondale' },
  'st-petersburg': { label: 'St. Petersburg', label_short: 'St. Pete', region: 'Pinellas County', neighborhoods: 'Old Northeast, Snell Isle, Downtown, Kenwood, Crescent Lake' },
  'fort-lauderdale': { label: 'Fort Lauderdale', region: 'Broward County', neighborhoods: 'Las Olas, Victoria Park, Coral Ridge, Rio Vista, Flagler Village' },
  'west-palm-beach': { label: 'West Palm Beach', label_short: 'West Palm', region: 'Palm Beach County', neighborhoods: 'Northwood, El Cid, Flamingo Park, Downtown, SoSo' },
  'cape-coral': { label: 'Cape Coral', region: 'Lee County', neighborhoods: 'Southeast Cape, Pelican, Pine Island Road corridor, Yacht Club, Hancock Bridge' },
  tallahassee: { label: 'Tallahassee', region: 'North Florida', neighborhoods: 'Midtown, Lafayette Park, Killearn, Downtown, Southwood' },
};

const TRADES = {
  plumbers: { singular: 'plumber', plural: 'plumbers', noun: 'Plumbing', exampleQ: 'who is the best emergency plumber in {{CITY}} for a burst pipe' },
  dentists: { singular: 'dentist', plural: 'dentists', noun: 'Dentistry', exampleQ: 'best family dentist in {{CITY}} accepting new patients' },
  hvac: { singular: 'HVAC company', plural: 'HVAC companies', noun: 'HVAC', exampleQ: 'AC stopped working in {{CITY}}, who can come today' },
  lawyers: { singular: 'lawyer', plural: 'lawyers', noun: 'Law', exampleQ: 'personal injury lawyer in {{CITY}} who has won cases like mine' },
  'med-spas': { singular: 'med spa', plural: 'med spas', noun: 'Med Spa', exampleQ: 'best med spa for Botox in {{CITY}} with a board-certified provider' },
  electricians: { singular: 'electrician', plural: 'electricians', noun: 'Electrical', exampleQ: 'emergency electrician in {{CITY}} my power just died' },
  roofers: { singular: 'roofer', plural: 'roofers', noun: 'Roofing', exampleQ: 'roof leak in {{CITY}} after storm, who can come this week' },
  'auto-repair': { singular: 'auto repair shop', plural: 'auto repair shops', noun: 'Auto Repair', exampleQ: 'auto repair shop in {{CITY}} I can trust for a transmission issue' },
};

// ----------------- TARGETS -----------------
// Default seed batch (10). Use --all to expand to every combo.
const DEFAULT_TARGETS = [
  ['tampa', 'plumbers'], ['tampa', 'dentists'], ['tampa', 'hvac'], ['tampa', 'lawyers'],
  ['miami', 'plumbers'], ['miami', 'dentists'], ['miami', 'med-spas'],
  ['orlando', 'hvac'], ['orlando', 'plumbers'],
  ['jacksonville', 'roofers'],
];

function resolveTargets() {
  const args = process.argv.slice(2);
  if (args.includes('--all')) {
    const out = [];
    for (const c of Object.keys(CITIES)) for (const t of Object.keys(TRADES)) out.push([c, t]);
    return out;
  }
  const onlyIdx = args.indexOf('--only');
  if (onlyIdx !== -1 && args[onlyIdx + 1]) {
    return args[onlyIdx + 1].split(',').map((s) => s.split(':'));
  }
  return DEFAULT_TARGETS;
}

// ----------------- page template -----------------
function pageFor(citySlug, tradeSlug) {
  const c = CITIES[citySlug];
  const t = TRADES[tradeSlug];
  if (!c || !t) throw new Error(`Unknown city/trade: ${citySlug}/${tradeSlug}`);
  const cityLabel = c.label;
  const cityShort = c.label_short ?? c.label;
  const sub = (s) => s.replace(/\{\{CITY\}\}/g, cityLabel).replace(/\{\{REGION\}\}/g, c.region);

  // Slug + URL — mirrors atomicsocial.com/ai-search-visibility-for-plumbers-in-tampa-fl/
  const slug = `ai-search-visibility-for-${tradeSlug}-in-${citySlug}-fl`;
  const url = `https://geolocally.com/${slug}`;
  const title = `AI Search Visibility for ${cityLabel} ${t.plural} | GeoLocally`;
  const desc = `How ${cityLabel} ${t.plural} get cited by ChatGPT, Perplexity, and Google AI. Specific signals AI tools read. A 5-day storefront fix from GeoLocally.`;
  const sectionLabel = `AEO · ${cityLabel} ${t.noun}`;

  return `<script>
\timport LeadCapturePanel from '$lib/components/marketing/LeadCapturePanel.svelte';
\timport SectionLabel from '$lib/components/ui/SectionLabel.svelte';
</script>

<svelte:head>
\t<title>${title}</title>
\t<meta name="description" content="${desc}" />
\t<meta property="og:type" content="article" />
\t<meta property="og:url" content="${url}" />
\t<meta property="og:title" content="${title}" />
\t<meta property="og:description" content="${desc}" />
\t<meta property="og:image" content="https://geolocally.com/og-image.png" />
\t<meta name="twitter:card" content="summary_large_image" />
\t<meta name="twitter:title" content="${title}" />
\t<meta name="twitter:description" content="${desc}" />
\t<meta name="twitter:image" content="https://geolocally.com/og-image.png" />
\t<link rel="canonical" href="${url}" />
</svelte:head>

<section class="bg-gray-900 text-white">
\t<div class="container mx-auto max-w-6xl px-4 py-20 md:py-24">
\t\t<div class="max-w-4xl">
\t\t\t<SectionLabel>${sectionLabel}</SectionLabel>
\t\t\t<h1 class="font-display text-4xl md:text-6xl font-black italic leading-tight text-balance mb-6">
\t\t\t\tAI search visibility for ${cityLabel} ${t.plural}.
\t\t\t</h1>
\t\t\t<p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6">
\t\t\t\tWhen a ${cityLabel} customer types "${sub(t.exampleQ)}" into ChatGPT, Perplexity, or Google AI Overview, the answer is one ${t.singular}. Sometimes two.
\t\t\t</p>
\t\t\t<p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
\t\t\t\tThis page is for ${cityLabel} ${t.plural} who want to be the one AI picks. Specific signals AI tools read. The 5-day fix.
\t\t\t</p>
\t\t</div>
\t</div>
</section>

<section class="bg-[#030712] text-white py-16 md:py-20">
\t<div class="container mx-auto max-w-4xl px-4 prose prose-invert prose-lg">
\t\t<h2>Why most ${cityLabel} ${t.plural} are invisible to AI search</h2>
\t\t<p>
\t\t\tAI search engines do not crawl the way Google did. They read sources, summarise what is consistent across them, and pick one or two businesses to name.
\t\t</p>
\t\t<p>
\t\t\tThe ${t.plural} who get picked are not the biggest in ${cityLabel}. They are the clearest. AI tools can describe what they do, where they work, who they help, in one paragraph — without guessing.
\t\t</p>
\t\t<p>
\t\t\tEvery ${t.singular} who gets skipped fails at least one of these:
\t\t</p>
\t\t<ul>
\t\t\t<li>The homepage opens with a slogan, not a sentence an AI can paraphrase.</li>
\t\t\t<li>${cityLabel} and the actual service area are not on the page in plain text.</li>
\t\t\t<li>Reviews say "great service" instead of naming specific jobs in specific neighborhoods.</li>
\t\t\t<li>Phone number on the site does not match the directory listings, so AI sees three different businesses.</li>
\t\t\t<li>Schema markup is missing or wrong, so AI has to guess at hours, services, and license info.</li>
\t\t</ul>

\t\t<h2>What AI search looks for in a ${cityLabel} ${t.singular}</h2>
\t\t<p>Across ChatGPT, Perplexity, Gemini, and Google AI Overviews, the signals overlap:</p>
\t\t<ol>
\t\t\t<li><strong>Entity clarity.</strong> One business name. One phone. One address. Same on Google Business Profile, Yelp, Facebook, your site, and BBB.</li>
\t\t\t<li><strong>Service-specific pages.</strong> A page that says "emergency ${t.singular} ${cityLabel}" beats a homepage that says "your local ${t.singular}."</li>
\t\t\t<li><strong>Review language.</strong> Reviews that name the job ("fixed the slab leak in our Carrollwood kitchen") beat 200 five-star reviews that say "great team."</li>
\t\t\t<li><strong>Citations on third-party sites.</strong> Local news, "best of ${cityLabel}" listicles, industry directories, Reddit threads. AI cites what other sources cite.</li>
\t\t\t<li><strong>Structured data.</strong> LocalBusiness, Service, FAQ schema. This is the technical multiplier that makes everything else legible.</li>
\t\t</ol>

\t\t<h2>What we ship for ${cityLabel} ${t.plural}</h2>
\t\t<p>
\t\t\tOne focused landing page and one 30–60 second explainer video. Live in 5 business days. Flat fee. No retainer.
\t\t</p>
\t\t<p>The page is written and structured for AI summarisation first, human reader second. Both still work — AI tools want what humans want, just in a cleaner shape.</p>
\t\t<p>What you get:</p>
\t\t<ul>
\t\t\t<li>A landing page at its own URL, designed to be the page AI cites and the customer lands on</li>
\t\t\t<li>An explainer video above the fold that says what you do in 30 seconds</li>
\t\t\t<li>LocalBusiness + Service + FAQ schema embedded correctly</li>
\t\t\t<li>NAP audit across your major directory listings + fix recommendations</li>
\t\t\t<li>A review-language guide so the next 10 reviews you ask for actually help AI find you</li>
\t\t</ul>

\t\t<h2>How long it takes</h2>
\t\t<p>
\t\t\tThirty minutes from you on day 1. Thirty minutes from you on day 5. We handle the rest.
\t\t</p>

\t\t<h2>Starting at $499</h2>
\t\t<p>
\t\t\tOne flat fee. You own the page and the video. No monthly retainer. If you want NAP cleanup, more service pages, or ongoing review coaching, those are optional add-ons we will quote separately based on what actually moves your numbers.
\t\t</p>
\t</div>
</section>

<section class="bg-gray-900 text-white py-16 md:py-20">
\t<div class="container mx-auto max-w-4xl px-4">
\t\t<LeadCapturePanel
\t\t\ttitle="Tell us about your ${cityLabel} ${t.singular} business."
\t\t\tbody="We reply within 1 business day with a clear yes or no on whether your business is a fit. If yes, your AI-search storefront ships in 5 business days, starting at $499."
\t\t/>
\t</div>
</section>
`;
}

// ----------------- generate -----------------
const TARGETS = resolveTargets();
let count = 0;
for (const [citySlug, tradeSlug] of TARGETS) {
  const slug = `ai-search-visibility-for-${tradeSlug}-in-${citySlug}-fl`;
  const dir = resolve(ROOT, `src/routes/${slug}`);
  mkdirSync(dir, { recursive: true });
  const out = resolve(dir, '+page.svelte');
  writeFileSync(out, pageFor(citySlug, tradeSlug));
  console.log(`✓ ${slug}`);
  count++;
}
console.log(`\nGenerated ${count} AEO city × trade pages.`);
console.log('Reminder: add each new URL to static/sitemap.xml then run scripts/indexnow/ping.mjs after deploy.');
