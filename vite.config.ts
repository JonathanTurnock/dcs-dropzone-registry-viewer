import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Font from "vite-plugin-font";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Font.vite()],
});
