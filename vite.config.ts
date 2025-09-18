import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/apple-touch-icon.png", "icons/maskable-icon.png"],
      manifest: {
        name: "System Shop",
        short_name: "Shop",
        description: "Solo Leveling–style System Shop",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "./",
        icons: [
          {
            src: "icons/maskable-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: { host: true }, // handy for local network on iPad
});
