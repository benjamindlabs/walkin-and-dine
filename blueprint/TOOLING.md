# Minimal Tooling Plan

## Needed for the first build
1. Node.js LTS and a package manager.
2. Next.js, React, TypeScript, Tailwind CSS.
3. GSAP + ScrollTrigger for complex motion.
4. A real browser preview.
5. Playwright when browser QA needs to be repeatable.

## Agent integrations
Use Antigravity as the working environment. `AGENTS.md` and the focused blueprint files provide the project's operating rules. Do not add plugins/MCP servers just because they exist; add them when they improve a repeatable task.

## Official documentation
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Playwright: https://playwright.dev/docs/intro
- shadcn/ui: https://ui.shadcn.com/docs
- Lucide: https://lucide.dev/guide/

When initializing, use current official Next.js setup instructions and select TypeScript, Tailwind CSS, and App Router. Add GSAP/Playwright as the implementation needs them; do not rely on stale version assumptions.
