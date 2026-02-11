import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "shell",
      remotes: {
        auth: "http://localhost:3001/assets/remoteEntry.js",
        notes: "http://localhost:3002/assets/remoteEntry.js",
      },
    }),
  ],
  build: {
    target: "esnext",
  },
});
