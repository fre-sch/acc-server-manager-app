import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from "fs";

export default defineConfig({
  base: "/app",
  plugins: [sveltekit()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      path: "/app",
    },
    https: {
      key: fs.readFileSync(`${__dirname}/../localhost+2-key.pem`),
      cert: fs.readFileSync(`${__dirname}/../localhost+2.pem`),
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    },
  },
})
