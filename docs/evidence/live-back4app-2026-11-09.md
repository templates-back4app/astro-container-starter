# Live deploy — Back4app Containers — 2026-11-09

App: spoke-astro (free plan), created fresh from back4app-templates/container-deploy-lab @ rotation (commit 679c7da = this repo @ 8f75e8d + stamp 7b9b2418-bc60-46ba-9e78-c93f96a52bb5). Port 8080 at creation. SSR mode (Node adapter standalone), server started with node ./dist/server/entry.mjs.

## Timeline
- ~13:22 UTC creation → 13:24:34 public URL serving the stamp (~2.5 min; the npm ci --omit=dev of the runtime stage dominates, as locally).

## Public URL (client São Paulo; CloudFront edge; fresh deploy)
- SSR verified: HTML contains the rendered content (<h1>Astro…).
- **Zero external <script> tags in the served HTML** — the zero-JS-by-default claim held on the live deploy of the minimal template.
- HTML /: 312 B gzip. TTFB (3 requests, illustrative): 1.375 / 1.174 / 1.204 s.

Local measurements: docs/evidence/local-measurements-2026-11-06.md (583 MB image explained there: astro as a prod dependency + npm ci --omit=dev requirement of the "standalone" adapter).
