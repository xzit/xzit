import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import node from "@astrojs/node";
import keystatic from "@keystatic/astro";

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Victor Mono",
      cssVariable: "--font-victor-mono",
      fallbacks: ["monospace"],
      weights: ["400 700"],
      featureSettings: "'ss07' 1",
    },
  ],
  integrations: [react(), markdoc(), keystatic(), icon()],
});