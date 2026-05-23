# MEMORY.LEAK — personal blog

A small, fast, dependency-light personal blog built with [Astro](https://astro.build).

## Stack

- **Astro 6** with content collections for Markdown posts
- **System serif** typography, minimal CSS, no UI framework
- **Light/dark** theme toggle with `localStorage` persistence (no FOUC)
- **RSS feed** at `/rss.xml`
- **Tags** with per-tag pages

## Project structure

```text
.
├── public/                     Static assets (favicon, etc.)
├── src/
│   ├── components/             Header, Footer, PostList, ThemeToggle, FormattedDate
│   ├── content/
│   │   └── blog/               Markdown posts (one .md file per post)
│   ├── layouts/
│   │   └── Layout.astro        Base HTML, meta tags, global styles, theme bootstrap
│   ├── pages/
│   │   ├── index.astro         Home (intro + recent posts)
│   │   ├── about.astro         About page
│   │   ├── blog/
│   │   │   ├── index.astro     All posts, grouped by year
│   │   │   └── [...slug].astro Individual post
│   │   ├── tags/
│   │   │   ├── index.astro     Tag cloud
│   │   │   └── [tag].astro     Posts for a single tag
│   │   └── rss.xml.js          RSS feed endpoint
│   ├── consts.ts               Site title, description, nav links
│   └── content.config.ts       Blog collection schema
├── astro.config.mjs
└── package.json
```

## Writing a post

Create a new Markdown file in `src/content/blog/`. The filename becomes the URL slug.

```markdown
---
title: "Post title"
description: "Optional one-line summary used in lists and meta tags."
pubDate: 2026-05-23
updatedDate: 2026-06-01     # optional
tags: ["writing", "meta"]   # optional, drives /tags pages
draft: false                # optional; drafts are hidden everywhere
---

Post body in Markdown.
```

## Commands

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `pnpm install`  | Install dependencies                         |
| `pnpm dev`      | Start dev server at `localhost:4321`         |
| `pnpm build`    | Build production site to `./dist/`           |
| `pnpm preview`  | Preview the production build locally         |
| `pnpm astro …`  | Run any Astro CLI command                    |

## Configuration

Before deploying, update:

- `astro.config.mjs` — set `site` to your production URL (used by RSS and canonical tags).
- `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_EMAIL`, nav links.
