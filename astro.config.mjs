import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import astroI18next from "astro-i18next";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://tonegen.net",
  integrations: [react(), tailwind(), astroI18next(), sitemap()],
});
