import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Silk is consumed as source (link:) — Vite must be allowed to read it, must
// transpile its TSX, and must use ONE React copy (dedupe) to avoid hook errors.
const SILK = "/Users/izabela.krol/silk-storybook";

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves this project site under /teaser-auracare/ in production;
  // dev stays at root so the local URL is unchanged.
  base: mode === "production" ? "/teaser-auracare/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    exclude: ["@silk/components"],
  },
  server: {
    port: 4174,
    fs: {
      allow: [".", SILK],
    },
  },
}));
