import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "notes",
      filename: "remoteEntry.js",
      exposes: {
        "./mfe-entry": "./src/mfe-entry.jsx",
      },
      shared: {
        react: {
          requiredVersion: "^18.0.0",
          singleton: true,
        },
        "react-dom": {
          requiredVersion: "^18.0.0",
          singleton: true,
        },
      },
    }),
  ],
  define: {
    "process.env": {},
  },

  build: {
    minify: false,
    cssCodeSplit: false,
    target: "esnext",
  },
});
