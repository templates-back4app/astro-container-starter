// @ts-check
import { defineConfig } from 'astro/config';

// Static branch: Astro's default build. `astro build` emits plain HTML into
// dist/ and the Dockerfile serves it with nginx. The SSR variant (output:
// 'server' + the Node standalone adapter) lives on the main branch.
export default defineConfig({});
