# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview
This is a static HTML/CSS/JS product showcase website ("PURSNIC") plus a personal learning/study repository. There is no build system, no framework, and no backend server.

### Running the Site
Serve static files from the repository root with any HTTP server:
```
npx serve -l 3000
```
Then open `http://localhost:3000/` in Chrome. Key pages:
- `index.html` — homepage with hero slider and product grid
- `product-detail.html?id=<N>` — product detail page (N = 1–8)

### Running Tests
The only automated tests live in `单元测试/`:
```
cd 单元测试 && npm test
```
This runs Mocha/Chai unit tests with Babel (ES2015). The `--compilers` flag is deprecated but still functional.

### Lint
There is no linter configured in this repository.

### Key Gotchas
- The `单元测试/package.json` test script references `./test` which resolves to `test.js` (a file, not a directory) — this is intentional and works correctly.
- Product images are in `img/` and referenced via relative paths; a local HTTP server avoids CORS issues with `file://` protocol.
- The `product-detail.html` page reads the product ID from the URL query string (`?id=N`).
