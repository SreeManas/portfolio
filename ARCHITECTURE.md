# Architecture

This project is intentionally static-first. It uses Vite, React, TypeScript,
Tailwind CSS, and Framer Motion without a router until multiple document-level
views justify one.

## Routing

The site is a single page. Navigation is section-based and powered by stable
anchor IDs from `src/config/navigation.ts`.

This keeps the initial implementation fast, accessible, and SEO-friendly while
leaving room to add file-based or client routing later if the product grows
beyond one page.

## Design System

Design tokens live in CSS custom properties inside `src/styles/tokens.css`.
Tailwind reads those tokens through its CSS-first theme layer, so tokens are
available both to utility classes and handcrafted CSS.

The design system starts with primitives:

- `Container` for readable width and page gutters
- `Section` for repeatable narrative sections
- `PageShell` for global page structure
- `Button`, `Kbd`, `SkipLink`, and `VisuallyHidden` for accessible UI
- `Reveal` for motion that respects reduced-motion preferences
- `DocumentMeta` for route-ready metadata without extra dependencies

Feature sections live under `src/sections`. Section copy lives under
`src/content` so writing, hierarchy, and layout can be refined independently.
The first section, `src/sections/hero/Hero.tsx`, establishes the product's
typographic and editorial language without introducing the rest of the page.

## Motion

Motion is centralized through `src/lib/motion.ts`. Components should use these
presets unless there is a clear explanatory reason to create a local exception.

## Accessibility

The app includes a skip link, semantic layout primitives, visible focus states,
reduced-motion support, readable color contrast, and keyboard-first component
defaults.

## Performance

The foundation avoids webfont downloads, heavy UI libraries, icon packs, and
runtime routing. Future visual assets should be optimized, lazy-loaded where
appropriate, and justified by the story they carry.
