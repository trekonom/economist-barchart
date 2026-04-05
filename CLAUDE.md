# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000 (auto-opens browser)
npm run build     # Production build to dist/
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

No test suite exists in this project.

## Architecture

This is an Economist-style horizontal bar chart built with a **hybrid D3 + React approach**: D3 handles math (scales, calculations), React handles DOM rendering. This avoids conflicts between D3's and React's DOM manipulation.

**Data flow:**
1. `src/main.jsx` — Defines the static dataset (9 pathogens with infection counts), chart dimensions (650×360), and passes data + dimensions to the chart component.
2. `src/EconomistBarChart.jsx` — Receives `data`, `width`, `height` as props. Creates D3 `xScale` (linear) and `yScale` (band, 0.3 padding) for positioning, then renders SVG via JSX: background rect, one `<g>` per pathogen (label + bar rect), and a header/footer rendered as HTML divs outside the SVG.
3. `src/EconomistBarChart.css` — CSS custom properties for colors/typography; Roboto font loaded via Google Fonts in `index.html`.

**Label positioning logic:** Labels render outside the bar (left-aligned, `--economist-blue`) when `count < 8`, otherwise inside the bar (white).

## Stack

- React 19, no TypeScript
- D3 v7 (scales/utilities only, no DOM manipulation)
- Vite 8 with `@vitejs/plugin-react` (Oxc compiler)
- ESLint flat config (eslint.config.js) — JS recommended + React Hooks + React Refresh rules
