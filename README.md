# Nibble

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Nibble** is a single-page food menu application built with React 19 and TypeScript. It presents a curated list of dishes — breakfasts, lunches, and shakes — each displayed as a card showing the dish name, image, description, and price.

The core feature is category-based filtering: a row of buttons at the top of the page lets users narrow down the menu to a specific food category instantly, with no page reload or network request. Selecting "All" resets the view and shows every item again. The filtering logic is driven by React state (`useState`) and a memoized category list (`useMemo`), so the UI stays responsive and re-renders only when necessary.

The data layer is fully static — the menu is defined as a typed `Food[]` array in a constants file, which keeps the app self-contained and fast to load. The component tree is intentionally flat: a single `NibblePage` orchestrates the state and renders `BtnCategory` buttons and `ItemMenu` cards as pure, prop-driven components with no side effects.

The project is set up with a complete development toolchain: Vite for fast builds and HMR, ESLint with TypeScript rules for code quality, Prettier for consistent formatting, Husky + lint-staged for pre-commit enforcement, and a Jest + Testing Library suite with 70% coverage thresholds to keep the logic verifiable.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Getting Started

The project requires **Node.js >= 22** (pinned via `.nvmrc`). Once cloned, the steps below install dependencies and start the Vite dev server with HMR.

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

### Pre-Commit for Development

The repo ships with a Husky pre-commit hook (`.husky/pre-commit`) that runs **lint-staged** against staged files: ESLint `--fix` followed by Prettier `--write` on `.ts`/`.tsx`, and Prettier `--write` only on `.css`/`.json`/`.md`. The hook is installed automatically by the `prepare` script the first time you run `npm install`, so commits are blocked until lint and formatting issues are resolved.

To run these tools manually outside of a commit:

```bash
npm run lint          # ESLint over src/
npm run lint:fix      # ESLint with auto-fix
npm run lint:all      # ESLint over src/ and __tests__/ with auto-fix
npm run format        # Prettier --write on src/
npm run format:check  # Prettier --check (no writes)
npm run format:all    # Prettier --write on src/ and __tests__/
npm run type-check    # tsc --noEmit against tsconfig.app.json
```

ESLint uses the flat config (`eslint.config.js`) with `typescript-eslint` recommended rules plus `react-hooks` and `react-refresh` plugins. Prettier is configured with double quotes, semicolons, 2-space indent, ES5 trailing commas, and a 100-character print width.

## Testing

The Jest + Testing Library suite covers the helper, both components, and the page. Coverage is enforced at a **70% threshold** for branches, functions, lines, and statements (see `jest.config.js`). Setup lives in `__tests__/jest.setup.ts` (registers `@testing-library/jest-dom` matchers). Asset and stylesheet imports are mocked via `__tests__/__mocks__/{file,style,assets,menu}.mock.ts` so component tests don't need a bundler.

1. Navigate to the project folder
2. Execute: `npm test`

Other test commands:

```bash
npm run test:watch        # Jest in watch mode
npm run test:coverage     # Coverage report (text/lcov/html in coverage/)
npx jest __tests__/components/ItemMenu/ItemMenu.test.tsx   # Run a single file
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
                  ┌─── PR or push to main ───┐
                  ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│      testing     │─▶│      build       │
│ eslint · type-check  │  │   jest (jsdom)   │  │ tsc + vite build │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — runs `npm run lint` (ESLint over `src/`) and `npm run type-check` (`tsc --noEmit` against `tsconfig.app.json`).
2. **`testing`** — runs `npm run test` (Jest + Testing Library on `jest-environment-jsdom`). Depends on `lint-and-audit`.
3. **`build`** — runs `npm run build` (full type-check via `tsc -p tsconfig.app.json` followed by the production Vite bundle into `dist/`). Depends on `testing`.

All three jobs run on `ubuntu-latest`, pin Node to the version declared in [`.nvmrc`](.nvmrc) (Node 22) via `actions/setup-node`, and install dependencies with `npm ci` against the committed `package-lock.json` for fully reproducible installs. The jobs are chained with `needs:` so a lint failure short-circuits the pipeline before running the test or build job.

### Conventional Commits

Commits merged into `main` follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `style:`, `ci:`, etc.) so the history stays readable and grouping changes by intent is trivial. The pipeline itself does not parse them — there is no automated versioning or release job in this project — but the convention is enforced by code review.

### Skipping CI

To push a documentation-only change or a trivial tweak without triggering the workflow, append GitHub's standard `[skip ci]` marker to the commit message:

```bash
git commit -m "docs: fix typo in README [skip ci]"
```

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

### Where the build outputs live

| Output                                   | Location                                                           |
| ---------------------------------------- | ------------------------------------------------------------------ |
| Validation logs (lint, type-check, test) | **Actions** tab on GitHub                                          |
| Coverage report (`coverage/`)            | Local only — produced by `npm run test:coverage`, gitignored       |
| Production bundle (`dist/`)              | Ephemeral, inside the runner — not published as a release artifact |

> **Note:** This pipeline is validation-only. There is no automated release, no tagged version bump, and no artifact uploaded to GitHub Releases. Deploying `dist/` to a host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.) is done manually after a green build.

## Security Audit

Before shipping, run both checks below to surface dependency CVEs and architectural smells.

### npm audit

Check for known vulnerabilities in the dependency tree:

```bash
npm audit
```

### React Doctor

Run a health check (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Build

The build runs `tsc -p tsconfig.app.json` first (full type-check, no emit) and then `vite build` to bundle the app into `dist/`. The Vite config enables esbuild minification, an ES2022 target, and a `vendor` chunk that splits `react`/`react-dom` out of the main bundle.

```bash
npm run build       # Type-check + production bundle into dist/
npm run preview     # Serve dist/ locally on http://localhost:3001
```

## Production

The release pipeline goes through three gates already documented above — run them in this order before promoting `dist/`:

1. [Testing](#testing) — `npm run test:coverage` must clear the 70% threshold.
2. [Security Audit](#security-audit) — `npm audit` and `npm run doctor` clean.
3. [Build](#build) — `npm run build`, then `npm run preview` to smoke-test the bundle locally.

Once those pass, ship the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.). The app is fully client-side with no backend or runtime configuration, so no extra deploy-time setup is required.

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/nibble`](https://www.diegolibonati.com.ar/#/project/nibble)
