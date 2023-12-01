/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  daisyui: {
    themes: ["light", "dark"],
  },
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
