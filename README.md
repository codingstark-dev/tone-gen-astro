# Tone Generator — [tonegen.net](https://tonegen.net)

A free, browser-based audio toolkit built with [Astro](https://astro.build), React, and [Tone.js](https://tonejs.github.io). Generate pure tones, binaural beats, white/pink/brown noise, and more — no installation required.

## ✨ Features

- **Tone Generator** — produce sine, square, triangle, and sawtooth waves at any frequency (Hz)
- **Multiple Tone Generator** — play several tones simultaneously
- **Binaural Beats** — create left/right channel frequency differences for focus or relaxation
- **Noise Generator** — white, pink, and brown noise
- **Fix My Speakers** — sweep tones to clear dust and debris from speaker grilles
- **Hearing Test** — sweep through frequencies to check auditory range
- **Subwoofer Test** — low-frequency tones to test bass response
- **432 Hz Tuning** — listen to concert pitch tuned to 432 Hz
- **Pips / Time Signals** — generate standard broadcast pip sequences
- 🌍 **Multilingual** — available in English, French, Spanish, Russian, and Indonesian

## 🚀 Project Structure

```text
/
├── public/
│   ├── favicon.png
│   ├── locales/          # i18n translation files (en, fr, es, ru, id)
│   ├── robots.txt
│   └── tone.mp3
├── src/
│   ├── components/       # React & Astro UI components
│   ├── data/             # Shared data (e.g. musical notes)
│   ├── layouts/          # Astro layout wrappers
│   └── pages/            # One .astro file per route/tool
├── astro.config.mjs
├── astro-i18next.config.ts
├── tailwind.config.mjs
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project. The project uses [pnpm](https://pnpm.io) by default.

| Command               | Action                                                   |
| :-------------------- | :------------------------------------------------------- |
| `pnpm install`        | Install dependencies                                     |
| `pnpm dev`            | Start local dev server at `http://localhost:4321`        |
| `pnpm build`          | Generate i18n pages, type-check, and build to `./dist/`  |
| `pnpm preview`        | Preview the production build locally                     |
| `pnpm i18n:generate`  | Regenerate localised page routes from translation files  |

> npm and yarn work equally well — just replace `pnpm` with your preferred package manager.

## 🛠 Tech Stack

| Layer       | Technology |
| :---------- | :--------- |
| Framework   | [Astro 4](https://astro.build) |
| UI          | [React 18](https://react.dev) |
| Styling     | [Tailwind CSS](https://tailwindcss.com) + [daisyUI](https://daisyui.com) |
| Audio       | [Tone.js](https://tonejs.github.io) |
| i18n        | [astro-i18next](https://github.com/yassinedoghri/astro-i18next) |
| SEO         | [astro-seo](https://github.com/jonasmerlin/astro-seo) + [astro sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) |

## 🌐 Live Site

**<https://tonegen.net>**

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.
