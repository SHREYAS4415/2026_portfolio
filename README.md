# Shreyas Y M — engineering portfolio

Static Astro / TypeScript portfolio with Tailwind CSS 4 and shared editorial styles. No client framework or application JavaScript is required.

## Local development

```sh
npm install
npm run dev -- --background
npm run dev -- status
npm run dev -- logs
npm run dev -- stop
```

Use the URL printed by Astro (normally http://localhost:4321; another port is selected if occupied).

## Validation

```sh
npm run check
npm run typecheck
npm run build
```

Routes: `/` and `/work/creddinv-v2`.

## Content and evidence

Edit `src/data/portfolio.ts` for navigation, contact destinations, career and stories. Email, LinkedIn and resume are explicitly unset until real destinations are supplied. Set email to the plain address, LinkedIn to the actual profile URL, and resume to an actual public PDF path.

Edit `src/data/creddinv.ts` for case-study content. Metrics and contribution claims are supplied portfolio content, not independently verified analytics. Detailed implementation evidence is visibly marked pending.

Add real approved images following `src/assets/creddinv/README.md`. Missing assets render labelled placeholders. Rebuild after adding files.
