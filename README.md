# GeoLocally Svelte

Marketing site for `geolocally.com`, built with SvelteKit, Tailwind CSS, and DaisyUI. The site is deployed to GitHub Pages via `.github/workflows/deploy.yml`.

## Local Setup

Use Node `20` to match CI:

```bash
nvm use
npm ci
```

## Commands

```bash
npm run dev
npm run check
npm run lint
npm run build
npm run preview
```

## Branch Readiness

Local baseline was verified on April 10, 2026:

- `npm run check` passes
- `npm run lint` passes
- `npm run build` passes

Open items before production polish are tracked in [docs/branch-readiness-audit.md](./docs/branch-readiness-audit.md).
