# V&A Museum Explorer

Artwork search and discovery app built with the [Victoria and Albert Museum API](https://developers.vam.ac.uk/guide/v2/welcome.html).

## Prerequisites

- [Node.js](https://nodejs.org/) >= 25
- [Bun](https://bun.sh/) (project uses `bun.lock`, `npm i` will also work)

## Getting Started

```bash
cp .env.example .env
npm i        # or: bun install
npm run dev  # or: bun dev
```

## Environment Variables

| Variable   | Description                          | Default |
| ---------- | ------------------------------------ | ------- |
| `VITE_TTL` | RTK Query cache TTL in seconds       | `20`    |

## Scripts

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `bun dev`            | Start dev server             |
| `bun run build`      | Type-check and build         |
| `bun run lint`       | Lint with ESLint           |
| `bun run test`       | Run tests (Vitest)           |
| `bun run test:coverage` | Run tests with coverage   |

## Node 25+

Node 25 deprecated `localStorage` in non-browser environments. The `test` script checks the Node version at runtime: on Node >= 25 it adds `--no-webstorage`, on older versions it runs Vitest without the flag. Works on any supported Node version — no manual action needed.

## Tech Stack

React 19, TypeScript 6, Vite 8, Redux Toolkit (RTK Query), React Router 7, Tailwind CSS 4, Vitest, MSW, Husky + CommitLint

## Features (api-queries branch)

- All API calls via RTK Query endpoints
- Configurable cache TTL via `VITE_TTL` environment variable
- Loading and error states handled per query
- Manual cache invalidation (refresh button)
- Detail page data cached between navigations
- ErrorBoundary resets on route change
