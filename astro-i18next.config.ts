import type { AstroI18nextConfig } from "astro-i18next";

const config: AstroI18nextConfig = {
  defaultLocale: "en",
  locales: ["en", "fr","es","ru","id"],
  i18nextServer: {
    debug: true,
    
  },
};

export default config;
