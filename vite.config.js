import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@blocknote/react": path.resolve(__dirname, "node_modules/@blocknote/react/dist/blocknote-react.js"),
    },
  },
});