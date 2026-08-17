import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Landing-Raqib/",
  root: ".", // Root is admin-portal directory
  publicDir: "public",
  build: {
    outDir: "dist",
  },
  server: {
    port: 5174,
    strictPort: true,
  },
});
