# AGENTS.md

Personal Astro 6 blog ("MEMORY.LEAK"). Static site, no backend, no UI framework.

## Commands

Package manager is **pnpm** (v11, Node >=22.12). Do not use npm/yarn.

- `pnpm dev` — dev server at `localhost:4321`
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — serve the built `./dist/`
- `pnpm astro check` — type-check Astro/TS (no dedicated `lint`/`test`/`typecheck` script exists; this is the only verification step)

There are **no tests, linter, or formatter** configured. `pnpm build` is the de facto correctness check — it runs content-collection schema validation and the full markdown pipeline.

## Markdown pipeline (the main source of surprises)

Configured in `astro.config.mjs`. Built-in Shiki is **disabled** (`syntaxHighlight: false`); highlighting/diagrams come from a hand-assembled plugin chain:

- `astro-mermaid` integration must run **before** `rehype-pretty-code` so mermaid fences are extracted before they'd be syntax-highlighted. Don't reorder.
- Math: `remark-math` + `rehype-katex` (`$...$` inline, `$$...$$` block).
- Code: `rehype-pretty-code` with dual `github-light`/`github-dark` themes that swap on theme toggle.

`src/content/blog/style-guide.md` is a fixture post that exercises every element (headings/TOC, code, math, mermaid, tables). Use it to sanity-check rendering after touching styles or the markdown chain; keep it working.

## Content

Posts are Markdown in `src/content/blog/`; filename = URL slug. Schema is enforced in `src/content.config.ts` — frontmatter fields beyond the README: `lang` (default `'en'`) and `draft` (default `false`, hides the post everywhere). `pubDate` is required and coerced to a Date.

## Deploy

`.github/workflows/azure-static-web-apps-*.yml` deploys to **Azure Static Web Apps** on push/PR to `main`. CI runs `pnpm build` itself and passes `skip_app_build: true` (Oryx build skipped), uploading prebuilt `dist/`. So the GitHub Actions build, not Azure, is what must pass.

## Gotchas

- `astro.config.mjs` `site` is still the placeholder `https://example.com` — affects RSS (`/rss.xml`) and canonical URLs. Update before treating prod URLs as real.
- Site metadata (title, description, email, nav) lives in `src/consts.ts`.
- `tsconfig.json` extends Astro's **strict** config.
