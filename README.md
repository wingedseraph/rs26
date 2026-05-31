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

## Scripts

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `bun dev`            | Start dev server             |
| `bun run build`      | Type-check and build         |
| `bun run lint`       | Lint with ESLint             |
| `bun run test`       | Run tests (Vitest)           |
| `bun run test:coverage` | Run tests with coverage   |

## Node 25+

Node 25 deprecated `localStorage` in non-browser environments. The `test` script checks the Node version at runtime: on Node >= 25 it adds `--no-webstorage`, on older versions it runs Vitest without the flag. Works on any supported Node version — no manual action needed.

## Tech Stack

React 19, TypeScript 6, Vite 8, Redux Toolkit (RTK Query), React Router 7, Tailwind CSS 4, Vitest, MSW, Husky + CommitLint

## Tasks Completed

- React project setup, class components and error boundary — [task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md)

```bash
git switch class-components
```

- Unit Testing — [task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/tests.md)

```bash
git switch unit-testing
```

- Routing and Hooks (React Router) — [task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/functional-routing.md)

```bash
git switch hooks-and-routing
```

- State Management and Context API (Redux Toolkit) — [task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/state-management.md)

```bash
git switch app-state-management
```

- API Querying (RTK Query) — [task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/queries.md)

```bash
git switch api-queries
```
