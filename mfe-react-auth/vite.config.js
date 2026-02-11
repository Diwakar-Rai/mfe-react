import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "auth",
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
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
