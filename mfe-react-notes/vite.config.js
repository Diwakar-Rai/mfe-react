import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },

  build: {
    lib: {
      entry: "src/mfe-entry.jsx",
      formats: ["es"],
      fileName: () => "notes.mfe.js",
    },
  },
});
