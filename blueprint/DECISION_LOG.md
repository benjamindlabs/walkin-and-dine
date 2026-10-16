# Decision Log

## 2026-10-09 — Initial direction
- Product: Premium Website Engine.
- Initial vertical: restaurants; later expand to other premium business websites.
- Primary priority: visual design and animation together.
- Primary visual reference selected by user: Capiche.
- Secondary reference: El Pueblo #2 recordings.
- Acceptance criteria recorded in `REFERENCE_SPEC.md`.
- Initial stack recommendation: Next.js, React, TypeScript, Tailwind CSS, GSAP/ScrollTrigger for complex scroll motion, Playwright for browser QA.
- Tool policy: minimal and requirement-driven; no bulk component collection.
- Workflow policy: make reasonable decisions and avoid repeated routine confirmations.

## 2026-10-10 — Anti-Slop Plugin Integration
- Installed `anti-slop` globally via `agy plugin install https://github.com/miqdadbadjuber/anti-slop`.
- Verified six skills (`antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`).
- Configured global mode preference to `during` in `%APPDATA%\antislop\settings.json`.
- Integrated Anti-Slop into `AGENTS.md` and `blueprint/` files as a negative filter guarding craftsmanship, without displacing Capiche as the positive creative direction.

## 2026-10-10 — Application Initialization & Asset Ingestion Setup
- Bootstrapped Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4 inside `src/`.
- Configured GSAP and ScrollTrigger scaffolding with `prefers-reduced-motion` compliance.
- Verified build and browser preview (desktop & mobile).
- Audited workspace: verified 0 client assets present (only template SVG utilities).
- Established asset ingestion pipeline (`client/assets/raw/`, `brand/`, `processed/`, `ASSET_INVENTORY.md`, `facts.md`, `brief.md`, `ASSET_INGESTION_GUIDE.md`) with strict prohibition on inventing missing facts.


