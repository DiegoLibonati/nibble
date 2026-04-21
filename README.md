# Nibble

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

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

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/nibble`](https://www.diegolibonati.com.ar/#/project/nibble)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
