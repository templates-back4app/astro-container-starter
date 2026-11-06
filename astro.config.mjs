// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
//
// This starter ships in SSR mode ("server" + the Node standalone adapter), so
// `astro build` produces a Node server in dist/server/entry.mjs that you can
// run in a container (it honors the HOST and PORT env vars).
//
// Astro's default is a fully static build: to go back to it, remove the
// `output` and `adapter` lines below — `astro build` then emits plain HTML
// into dist/ that any static file server (or nginx) can host.
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});
