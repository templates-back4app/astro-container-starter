# Astro Container Starter

Minimal Astro app (`create astro`, minimal template) configured for **SSR** with `@astrojs/node` in standalone mode: `astro build` emits a Node server at `dist/server/entry.mjs` that honors `HOST` and `PORT` env vars. This repo ships in SSR mode so it deploys as a server container.

Astro's default is a **static** build: remove `output: 'server'` and the `adapter` from `astro.config.mjs` and `astro build` emits plain HTML into `dist/` for any static host instead. Both modes are commented in the config.

Run locally with Docker:

```sh
docker build -t astro-starter .
docker run -p 8080:8080 astro-starter
# open http://localhost:8080
```

Deploy guide: see the Back4app blog post for deploying this repo on Back4app Containers (placeholder — link coming with the tutorial).

Measurements for this exact commit are in `docs/evidence/local-measurements-2026-11-06.md`.
