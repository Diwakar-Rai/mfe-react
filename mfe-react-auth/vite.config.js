import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./mfe-entry": "./src/mfe-entry.jsx",
      },
    }),
  ],
  define: {
    "process.env": {},
  },
});
