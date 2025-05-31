import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Activer la gestion des fichiers statiques
    fs: {
      strict: false,
    },
  },
  build: {
    // Spécifier le dossier public comme base
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "./index.html",
        evenement: "./evenement/index.html",
      },
    },
  },
  publicDir: "public", // Assure que le dossier public est bien reconnu
});
