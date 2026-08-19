import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Silk is consumed as source (link:) — Vite must be allowed to read it, must
// transpile its TSX, and must use ONE React copy (dedupe) to avoid hook errors.
const SILK = "/Users/izabela.krol/silk-storybook";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // Don't pre-bundle the source-only lib; let Vite transpile it on the fly.
    exclude: ["@silk/components"],
  },
  server: {
    port: 4174,
    fs: {
      // allow serving Silk's source + its node_modules from outside the app root
      allow: [".", SILK],
    },
  },
});
