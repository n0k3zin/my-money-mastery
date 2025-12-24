import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 👇 ADICIONE ESTA LINHA AQUI!
  // Substitua 'nome-do-seu-repositorio' pelo nome exato do seu repo no GitHub.
  // Exemplo: se a URL é github.com/voce/financeiro, coloque '/financeiro/'
  base: "/my-money-mastery/", 

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
