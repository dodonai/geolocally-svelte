# GeoLocally — AEO content brief queue

Topic queue for the weekly blog runner (`scripts/weekly-blog/run.mjs`).
Format: `| \`slug\` | Title | primary keyword | target word count |`.

The runner picks the first row whose `slug` is **not** already a directory under
`src/routes/blog/`.

Order roughly = priority. Edit freely; add new rows at the bottom.

---

### Foundational AEO

| slug | title | keyword | length |
|---|---|---|---|
| `the-aeo-checklist-for-geolocally-customers` | The AEO Checklist for Florida local service businesses (plumbers, dentists, lawyers, HVAC, med spas) | aeo checklist geolocally | 1400 |
| `how-to-write-an-aeo-faq-page-for-geolocally` | How to Write an AEO FAQ Page That Gets Cited | aeo faq page | 1300 |
| `aeo-vs-seo-vs-geo-for-geolocally` | AEO vs SEO vs GEO: One Operator's Plain-English Map | aeo vs seo vs geo | 1300 |

### Customer-intent angles

| slug | title | keyword | length |
|---|---|---|---|
| `how-ai-search-actually-picks-businesses` | How AI Search Actually Picks Which Business to Recommend | how ai search picks | 1500 |
| `does-aeo-actually-drive-customers` | Does AEO Actually Drive Customers? An Operator's Honest Answer | does aeo drive customers | 1300 |
| `measuring-ai-search-visibility-in-2026` | Measuring AI Search Visibility When Most Tools Are Still Beta | measuring ai search visibility | 1300 |

### Comparison + competitor angles

| slug | title | keyword | length |
|---|---|---|---|
| `cheap-alternatives-to-incumbent-x` | Cheaper Alternatives to [Incumbent X] for [ICP] | [incumbent] alternatives | 1400 |
| `geolocally-vs-incumbent-x` | GeoLocally vs [Incumbent X]: Which Fits a Small Operator | geolocally vs incumbent | 1100 |

### Add brand- and category-specific topics below

After running the diagnose step, replace the placeholders above with topics that match the actual queries Brand Radar shows. Use cited-question text from `ai-responses` (translate to operator-tone titles).
