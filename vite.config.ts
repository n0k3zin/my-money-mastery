import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/my-money-mastery/", // Mantém sua base correta
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Remova qualquer linha que tenha "componentTagger()"
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
