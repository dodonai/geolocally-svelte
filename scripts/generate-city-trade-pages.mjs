// One-off generator: produces 11 city × service landing pages following the
// /tampa/plumbers template structure. Each page is trade-and-city specific.
//
// Usage:  node scripts/generate-city-trade-pages.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ----------------- city signals -----------------
const CITIES = {
  tampa: {
    label: 'Tampa',
    region: 'Tampa Bay',
    neighborhoods: 'South Tampa, New Tampa, Brandon, Riverview, Carrollwood',
    seasonal: 'Summer storm season and slab-leak season produce different emergency calls.',
    demographic: 'A homeowner in South Tampa and a homeowner in New Tampa ask different questions, even for the same service.',
  },
  miami: {
    label: 'Miami',
    region: 'Miami-Dade',
    neighborhoods: 'Brickell, Coral Gables, Coconut Grove, Wynwood, Doral',
    seasonal: 'Hurricane season and year-round high humidity shape what your customers are searching for.',
    demographic: 'Many Miami customers prefer Spanish-language consultation. Your page can say so where it counts.',
  },
  orlando: {
    label: 'Orlando',
    region: 'Central Florida',
    neighborhoods: 'Winter Park, College Park, Lake Eola Heights, Baldwin Park, Dr. Phillips',
    seasonal: 'Summer storm season produces the bulk of emergency calls. Your page should reflect that intent.',
    demographic: 'Orlando is a transplant-heavy market. Customers often search without knowing local trade brands yet — clear positioning wins.',
  },
  jacksonville: {
    label: 'Jacksonville',
    region: 'Northeast Florida',
    neighborhoods: 'Riverside, San Marco, the Beaches, Mandarin, Avondale',
    seasonal: 'Coastal humidity and hurricane prep create distinct service spikes through summer.',
    demographic: 'Jacksonville has a strong military and retiree population. Trust signals tied to long-tenure local operators move the needle.',
  },
  'st-petersburg': {
    label: 'St. Petersburg',
    label_short: 'St. Pete',
    region: 'Pinellas County',
    neighborhoods: 'Old Northeast, Snell Isle, Downtown, Kenwood, Crescent Lake',
    seasonal: 'Beach proximity and storm season drive a different mix of calls than inland markets.',
    demographic: 'St. Pete has a heavy retiree and second-home demographic. Reviews mentioning specific neighborhoods carry more weight here.',
  },
};

// ----------------- trade signals -----------------
const TRADES = {
  plumbers: {
    singular: 'plumber',
    plural: 'plumbers',
    longLabel: 'plumbing and HVAC companies',
    heroOpener: (city) => `When a burst pipe homeowner asks ChatGPT "who is the best emergency plumber in ${city}," the answer is one business. Sometimes two. Not ten blue links.`,
    callExample: 'a slab leak in {{CITY}}, my carpet is wet, who do I call right now and what should I expect to pay',
    commonJobs: ['slab leak', 'water heater install', 're-piping', 'drain cleaning', 'emergency leak repair'],
    weakHomepage: '"Premium plumbing solutions" or "Family-owned for 30 years"',
    trustSignals: 'license number, years in {{CITY}}, response time, a few reviews that mention specific jobs in specific neighborhoods',
    eyebrow: 'AI search · Local plumbing',
    titleNoun: 'Plumber',
    descTrade: 'plumber',
  },
  dentists: {
    singular: 'dentist',
    plural: 'dentists',
    longLabel: 'dental practices',
    heroOpener: (city) => `When a parent asks ChatGPT "best family dentist in ${city} that accepts new patients," the answer is one practice. Maybe two.`,
    callExample: 'I need a dentist in {{CITY}} for my 8-year-old who is anxious about needles, accepting new patients, in network with Delta Dental',
    commonJobs: ['family dentistry', 'sedation dentistry', 'pediatric care', 'cosmetic veneers', 'Invisalign and clear aligners'],
    weakHomepage: '"Premium dental experiences" or "Caring family dentist since 1998"',
    trustSignals: 'license number, years in {{CITY}}, ADA membership, accepted insurance plans, before-and-after photos, reviews that name specific procedures',
    eyebrow: 'AI search · Local dental',
    titleNoun: 'Dental Practice',
    descTrade: 'dentist',
  },
  hvac: {
    singular: 'HVAC company',
    plural: 'HVAC companies',
    longLabel: 'HVAC and electrical companies',
    heroOpener: (city) => `When a homeowner in ${city} types "my AC just died and it's 94 degrees" into ChatGPT, the answer is one company that can be there today.`,
    callExample: 'AC stopped working in {{CITY}}, the air handler is dripping, who can come today and what does a same-day call cost',
    commonJobs: ['emergency AC repair', 'system replacement', 'duct cleaning', 'heat-pump install', 'preventive maintenance plans'],
    weakHomepage: '"Premium HVAC solutions" or "Comfort you can count on"',
    trustSignals: 'FL HVAC license, NATE certification if any, response time promise, photos of real trucks and crews, reviews that mention specific repairs',
    eyebrow: 'AI search · Local HVAC',
    titleNoun: 'HVAC',
    descTrade: 'HVAC company',
  },
  lawyers: {
    singular: 'lawyer',
    plural: 'lawyers',
    longLabel: 'law firms',
    heroOpener: (city) => `When someone in ${city} asks ChatGPT "personal injury lawyer near me who has won cases like mine," AI tools name one firm. Generic "full-service law firm" pages get skipped.`,
    callExample: 'I was hit by a delivery truck in {{CITY}} last Tuesday, I need a personal injury attorney who handles cases in {{REGION}}, with case results',
    commonJobs: ['personal injury', 'estate planning', 'family law', 'criminal defense', 'business and contract disputes'],
    weakHomepage: '"Full-service law firm serving Florida"',
    trustSignals: 'Bar number, year admitted, practice area focus, named case results ("recovered $X for a {{CITY}} family"), attorney profiles with photos',
    eyebrow: 'AI search · Local legal',
    titleNoun: 'Law Firm',
    descTrade: 'lawyer or law firm',
  },
  'med-spas': {
    singular: 'med spa',
    plural: 'med spas',
    longLabel: 'med spas and aesthetic clinics',
    heroOpener: (city) => `When a customer in ${city} asks ChatGPT "best med spa for Botox with a real provider who explains the options," AI tools surface one clinic at a time.`,
    callExample: 'I want lip filler in {{CITY}} done by a board-certified provider, with consultation included, and recent before-and-afters of the actual injector',
    commonJobs: ['Botox and dysport', 'dermal fillers', 'laser hair removal', 'skin resurfacing', 'medical-grade facials'],
    weakHomepage: '"Premium aesthetic experiences" or "Luxury med spa"',
    trustSignals: 'medical director name and credentials, injector names and headshots, real before-and-after photos (not stock), reviews that name specific treatments and providers',
    eyebrow: 'AI search · Local med spa',
    titleNoun: 'Med Spa',
    descTrade: 'med spa or aesthetic clinic',
  },
};

// ----------------- which pages to generate -----------------
const TARGETS = [
  ['tampa', 'dentists'],
  ['tampa', 'hvac'],
  ['tampa', 'lawyers'],
  ['miami', 'plumbers'],
  ['miami', 'dentists'],
  ['miami', 'med-spas'],
  ['orlando', 'plumbers'],
  ['orlando', 'dentists'],
  ['orlando', 'hvac'],
  ['jacksonville', 'plumbers'],
  ['st-petersburg', 'plumbers'],
];

// ----------------- page template -----------------
function pageFor(citySlug, tradeSlug) {
  const c = CITIES[citySlug];
  const t = TRADES[tradeSlug];
  const cityLabel = c.label;
  const cityShort = c.label_short ?? c.label;
  const sub = (s) => s.replace(/\{\{CITY\}\}/g, cityLabel).replace(/\{\{REGION\}\}/g, c.region);

  const url = `https://geolocally.com/${citySlug}/${tradeSlug}`;
  const title = `${cityLabel} ${t.titleNoun} Marketing | Show Up When Customers Ask AI | GeoLocally`;
  const desc = `A focused landing page and explainer video built for ${cityLabel} ${t.descTrade}s who want to be the answer when a customer asks ChatGPT or Google AI. Live in 5 business days. Starting at $499.`;
  const sectionLabel = `${cityLabel} · ${t.titleNoun}${t.titleNoun.endsWith('s') ? '' : 's'}`;

  return `<script>
\timport LeadCapturePanel from '$lib/components/marketing/LeadCapturePanel.svelte';
\timport SectionLabel from '$lib/components/ui/SectionLabel.svelte';
</script>

<svelte:head>
\t<title>${title}</title>
\t<meta name="description" content="${desc}" />
\t<meta property="og:type" content="website" />
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
\t\t\t<h1
\t\t\t\tclass="font-display text-4xl md:text-6xl font-black italic leading-tight text-balance mb-6"
\t\t\t>
\t\t\t\tBe the ${cityLabel} ${t.singular} AI recommends first.
\t\t\t</h1>
\t\t\t<p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-8">
\t\t\t\t${t.heroOpener(cityShort)} GeoLocally builds the focused page and explainer video that puts you in that answer.
\t\t\t</p>
\t\t\t<ul class="grid sm:grid-cols-2 gap-3 max-w-2xl text-gray-300">
\t\t\t\t<li class="flex items-start gap-2">
\t\t\t\t\t<span class="text-indigo-400 font-bold">→</span>
\t\t\t\t\tBuilt for ${cityLabel} ${t.longLabel}
\t\t\t\t</li>
\t\t\t\t<li class="flex items-start gap-2">
\t\t\t\t\t<span class="text-indigo-400 font-bold">→</span>
\t\t\t\t\tStructured for AI search, not just Google
\t\t\t\t</li>
\t\t\t\t<li class="flex items-start gap-2">
\t\t\t\t\t<span class="text-indigo-400 font-bold">→</span>
\t\t\t\t\tLive in 5 business days
\t\t\t\t</li>
\t\t\t\t<li class="flex items-start gap-2">
\t\t\t\t\t<span class="text-indigo-400 font-bold">→</span>
\t\t\t\t\tStarting at $499, flat fee
\t\t\t\t</li>
\t\t\t</ul>
\t\t</div>
\t</div>
</section>

<section class="bg-[#030712] text-white py-16 md:py-20">
\t<div class="container mx-auto max-w-4xl px-4 prose prose-invert prose-lg">
\t\t<h2>What changed for ${cityLabel} ${t.plural} in 2026</h2>

\t\t<p>
\t\t\tA ${cityLabel} customer used to search "${t.singular} ${cityLabel.toLowerCase()} fl" on Google and scroll through ten links plus a map. They picked based on who answered the phone first and how recent the reviews were.
\t\t</p>

\t\t<p>That is not how 2026 works.</p>

\t\t<p>
\t\t\tNow they type into ChatGPT, Perplexity, or Google AI Overview: "${sub(t.callExample)}." The AI returns one or two names with a short reason for each.
\t\t</p>

\t\t<p>
\t\t\tIf your business is not in that answer, the rest of your marketing is fighting for second place. The ${t.singular} who shows up in the AI answer gets the call. Everyone else gets the scrap.
\t\t</p>

\t\t<h2>Why ${cityLabel} ${t.plural} get skipped by AI search</h2>

\t\t<p>The patterns we see across ${t.singular} websites in the ${c.region} area:</p>

\t\t<ul>
\t\t\t<li>
\t\t\t\tThe homepage opens with ${t.weakHomepage}. Neither tells an AI what the business actually does.
\t\t\t</li>
\t\t\t<li>
\t\t\t\tNo mention of ${cityLabel}, the specific neighborhoods served, or what makes this ${t.singular} different from the next one down the road.
\t\t\t</li>
\t\t\t<li>
\t\t\t\tReviews say "Great service, will use again" — useful for humans, useless for AI summaries. AI tools cite reviews that mention the specific job (${t.commonJobs.slice(0, 3).join(', ')}) and the specific outcome.
\t\t\t</li>
\t\t\t<li>
\t\t\t\tThe Google Business Profile is missing the secondary categories that match the actual services. Hours are stale. Service area is not set.
\t\t\t</li>
\t\t\t<li>
\t\t\t\tThe phone number on the site does not match the one on directory listings and review sites. AI tools see three different businesses, not one.
\t\t\t</li>
\t\t</ul>

\t\t<p>
\t\t\tAny one of these signals is fixable in an afternoon. The compound effect of all five is what makes a ${cityLabel} ${t.singular} invisible to recommendation engines.
\t\t</p>

\t\t<h2>What we build for ${cityLabel} ${t.plural}</h2>

\t\t<p>One focused landing page and one short explainer video. That is it.</p>

\t\t<p>The page covers four things in order, the way an AI would summarize you:</p>

\t\t<ul>
\t\t\t<li>
\t\t\t\t<strong>Service and area</strong> — what kind of ${t.singular} work you do, which ${cityLabel} neighborhoods you serve, what makes you different
\t\t\t</li>
\t\t\t<li>
\t\t\t\t<strong>Specific work, specific outcomes</strong> — the most common reasons customers call you, named and described so an AI can match them to real customer queries
\t\t\t</li>
\t\t\t<li>
\t\t\t\t<strong>Trust signals</strong> — ${sub(t.trustSignals)}
\t\t\t</li>
\t\t\t<li>
\t\t\t\t<strong>One clear next step</strong> — the phone number, the form, what happens after they submit
\t\t\t</li>
\t\t</ul>

\t\t<p>
\t\t\tThe explainer video is 30 to 60 seconds. It runs above the fold. It says out loud what the page says in writing. AI tools and human customers both reward the businesses that can explain themselves out loud.
\t\t</p>

\t\t<h2>What is different about doing this for ${cityLabel} specifically</h2>

\t\t<p>
\t\t\t${c.region} covers a lot of ground. ${c.demographic} The page names the neighborhoods you actually cover (${c.neighborhoods}) so the AI does not have to guess.
\t\t</p>

\t\t<p>
\t\t\t${c.seasonal} The page reflects the calls your business takes most this time of year, in language a customer would type under pressure.
\t\t</p>

\t\t<p>
\t\t\tFlorida licensing matters for trust. Your license number, your years operating in Florida, and any specialty certifications go where AI tools can find and cite them.
\t\t</p>

\t\t<h2>What this is not</h2>

\t\t<p>
\t\t\tThis is not a redesign of your existing website. We do not touch your main site if you have one. We build a single focused page at its own URL, designed to be the page an AI cites and a customer lands on.
\t\t</p>

\t\t<p>
\t\t\tThis is not SEO consulting. We do not write you a 50-page audit. We ship a working page and video in 5 business days.
\t\t</p>

\t\t<p>
\t\t\tThis is not a recurring contract. Flat fee. One page. You own it.
\t\t</p>

\t\t<h2>How long it takes and what we need from you</h2>

\t\t<ol>
\t\t\t<li>
\t\t\t\t<strong>Day 1.</strong> You tell us the basics — business name, ${tradeSlug === 'lawyers' ? 'Bar number and practice area' : 'license and credentials'}, neighborhoods, the three things customers call you about most, what makes you different from the other ${t.singular} down the road.
\t\t\t</li>
\t\t\t<li>
\t\t\t\t<strong>Days 2 to 4.</strong> We write the page, shape the offer, create the video, package everything into one storefront.
\t\t\t</li>
\t\t\t<li>
\t\t\t\t<strong>Day 5.</strong> You review, approve, we help get it live.
\t\t\t</li>
\t\t</ol>

\t\t<p>
\t\t\tTotal time from you: about 30 minutes on day 1 and 30 minutes on day 5. We handle the rest.
\t\t</p>

\t\t<h2>Starting at $499</h2>

\t\t<p>
\t\t\tOne flat fee. No monthly retainer. No "consultation call" that turns into a pitch. The page and the video are yours.
\t\t</p>

\t\t<p>
\t\t\tIf you also want help fixing your Google Business Profile, reviewing your reviews for AI signals, or building service-specific sub-pages, those are optional add-ons. We will tell you which ones actually move the needle for your specific ${t.singular} business and which ones you do not need.
\t\t</p>
\t</div>
</section>

<section class="bg-gray-900 text-white py-16 md:py-20">
\t<div class="container mx-auto max-w-4xl px-4">
\t\t<LeadCapturePanel
\t\t\ttitle="Tell us about your ${cityLabel} ${t.singular} business."
\t\t\tbody="We reply within 1 business day with a clear yes or no on whether your business is a fit. If yes, your storefront ships in 5 business days, flat fee, starting at $499."
\t\t/>
\t</div>
</section>
`;
}

// ----------------- generate + write -----------------
let count = 0;
for (const [citySlug, tradeSlug] of TARGETS) {
  const dir = resolve(ROOT, `src/routes/${citySlug}/${tradeSlug}`);
  mkdirSync(dir, { recursive: true });
  const out = resolve(dir, '+page.svelte');
  writeFileSync(out, pageFor(citySlug, tradeSlug));
  console.log(`✓ ${citySlug}/${tradeSlug} → ${out.replace(ROOT + '/', '')}`);
  count++;
}
console.log(`\nGenerated ${count} city × service pages.`);
