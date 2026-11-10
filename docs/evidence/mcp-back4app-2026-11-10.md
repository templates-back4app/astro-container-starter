# Deploy through the Back4app MCP — astro-container-starter — 2026-11-10

Repo commit uploaded: `dd187b9` (branch `main` = the SSR variant, clean tree).

## Context (same for the 9 starters measured this day)

- Date: 2026-11-10 (all times UTC).
- Account kind: permanent, signed in (`whoami` -> `accountKind: "permanent"`, `limits: {freeAppsUsed: 19, maxFreeApps: 50}` before this run). Apps created on the Free plan.
- Client: Claude Code driving the Back4app MCP connector; terminal on macOS (Node v25.8.1, curl 8.7.1); validation requests left from Sao Paulo (CloudFront POP `GRU1-P5`).
- Upload CLI: `@back4app/cli` 0.3.2, run as `npx -y @back4app/cli upload --url <upload-link>` inside the starter folder. The upload link carries a one-time token and is not recorded here. `create_upload` returned `expiresAt` 15 minutes after the call.
- "create -> READY" below = deployment `createdAt` to the `updatedAt` of the `get_deployment` answer that first said `READY`. It is the platform's own clock, not the wall time of the polling.

## Tools called, in order

`create_upload` (no appId) -> CLI upload in the folder -> `create_web_app` -> `get_web_app` -> `get_deployment` (x3) -> `get_runtime_logs` (and once more 18 minutes later)

## Upload (CLI output)

```text
Packing .../astro-container-starter ...
21 file(s), 164 KB (2 left out)
Sending 19 new file(s) ...
Upload ready.
uploadId: b05fcd84-5d7d-4a3a-9f45-367159b969b8
manifestSha256: eeae2d2df3c35bb4c0913810371fbf5cfbd7be53beb9e61041a58613ab17cb46
```

- Wall time: 8 s. No "may hold secrets" message for this folder.
- The repo tracks 16 files; the CLI packed 21, which is every file in the folder outside `node_modules/` and `.git/` (so the local `dist/`, `.astro/` and `.vscode/` went along: the CLI does not read `.gitignore`).

## App and deployment

- `create_web_app` arguments: `name: "mcp-astro"`, `port: 8080`, `uploadId`, `manifestSha256`; `builder` not specified.
- appId `23ceb9c7-d4fa-4d23-9f09-020512f3c044` · deploymentId `5bbbc373-9125-4a17-a2e1-e8afacbcbb99`
- App `createdAt` 12:43:46.541Z · deployment `createdAt` 12:43:46.680Z
- Status seen: `BUILDING` / `FETCHING_CODE` (12:43:46) -> `BUILDING` / `BUILDING_IMAGE` (since 12:44:00) -> `DEPLOYING` / `RELEASING` (since 12:45:19) -> `READY` (`updatedAt` 12:45:46.716Z) -> **120.0 s**
- Public URL: 404 from 12:43:55, first 200 at 12:45:41. A `get_deployment` call made right after that 200 still answered `DEPLOYING` / `RELEASING`; the next call said `READY`. The URL answered about 5 s before the status said so.

Settings reported by `get_web_app`:

- `builder`: `DOCKERFILE` · `port`: `8080` · `startCommand`: `null` · `healthCheckPath`: `"/"` · `isStaticSite`: `false` · `rootDir`: `""` · `runtimeVersion`: `null` · `envVarNames`: `[]` · `plan`: `Free` · `source.kind`: `UPLOAD`
- `url`: https://mcpastro-7ii8s18v.back4.app
- `urlExpiresAt`: 2026-11-10T13:43:46.619Z (60 minutes after the app was created)
- `get_deployment` returned no `suggestions` and no `portDetected` on this deployment.

## Validation on the public URL (12:45Z)

- `GET /` -> 200, `content-type: text/html`, `via: 1.1 ... .cloudfront.net (CloudFront)`. No `content-encoding` and no `server` header. 312 B.
- Served HTML contains the rendered `<h1>`: `Astro` (`<meta name="generator" content="Astro v7.4.7">`).
- The HTML references no JS file: 0 files, 0 B. That is the starter (one static-content page rendered on the server), not a failure.
- `GET /favicon.svg` -> 200, 749 B, no `content-encoding`.
- `GET /nope-404` -> 404.
- Nothing this app served came compressed: neither the Astro Node server nor the platform edge added gzip to the 312 B document or the 749 B SVG. Larger responses were not measured on this app.

## Runtime logs

`get_runtime_logs` returned 0 lines at 12:45Z and again 0 lines at 13:03Z.

## Not tested

- No Part B test used this repo.
- The static variant of this starter (other branch), islands/client JS, compression of a response large enough to matter.
- Not tested anywhere in this series: `update_web_app` with a confirmationId, `rollback_web_app`, `confirm_action`, custom domains, env vars at creation, GitHub as the code source through MCP, behaviour after `urlExpiresAt`, a temporary (not signed in) account, the `files` upload path for clients with no terminal.
