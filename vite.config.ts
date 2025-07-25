import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3100,
    proxy: {
      ["/workbench"]: {
        target: "http://localhost:3203/",
        changeOrigin: true,
      },
    },
  },
});
