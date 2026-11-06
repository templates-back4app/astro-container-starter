# Local measurements — 2026-11-06

Machine: Apple M5, macOS 26.5.2. Docker: colima VM (docker 29.5.2, linux/aarch64, 4 CPUs, 8 GB) — Docker Desktop was not installed on the work machine, so the docker CLI + colima were installed via Homebrew.
Node v22.23.4 / npm 10.9.9 (host builds; images use `node:22-alpine`).

Packages: astro@7.4.7, @astrojs/node@11.1.11.

| Metric | Value | Command |
|---|---|---|
| npm ci | 1.1 s | `rm -rf node_modules && time npm ci` |
| npm run build (SSR mode) | 3.9–4.5 s | `time npm run build` |
| Output folder | 528 KB (`dist/`) | `du -sh dist` |
| docker build (no cache) | 57.8 s | `time docker build --no-cache -t astro-container-starter .` |
| Image size | 583 MB | `docker images --format '{{.Size}}'` |
| First-load JS (gzip) | **0 bytes** | see method below |

First-load JS method: `docker run -p 8091:8080 …`, `curl http://localhost:8091/`, collect every `.js` URL referenced from the page (script `src` + `rel="modulepreload"` links), then curl each with `Accept-Encoding: gzip` and sum `size_download`. The minimal Astro page references no JavaScript at all — zero-JS by default is real.

Notes / pitfalls:
- **"standalone" is not self-contained.** With only `dist/` + `package.json` in the runtime image, the server crashed on boot: `ERR_MODULE_NOT_FOUND: Cannot find package 'devalue'`. The @astrojs/node standalone build keeps some imports external, so the runtime stage must run `npm ci --omit=dev`. Since `astro` itself is a production dependency, that pulls the whole framework into the image — hence 583 MB vs ~240 MB for the other starters.
- `npx astro add node -y` configures the adapter but leaves `output` at the default (`static`). For an always-SSR server we set `output: 'server'` explicitly; without it the minimal app prerenders everything and the Node server just serves static files.
- The standalone server reads `HOST` and `PORT` env vars; start command is `node ./dist/server/entry.mjs`.
- Static mode (the Astro default) was kept for the record: removing `output`/`adapter` makes `astro build` emit plain HTML into `dist/` (no Node server).
