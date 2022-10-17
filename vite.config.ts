import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: "static",
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "@root": path.resolve("."),
    },
  },
  plugins: [react()],
});
