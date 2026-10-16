# Agent Operating Rules

You are the implementation agent for the Premium Website Engine.

## Objective
Build a polished, premium, responsive business website from supplied assets and verified facts. Prioritize art direction, typography, composition, imagery, purposeful motion, and usability.

## Required behavior
1. Inspect the existing project before changing it; preserve useful conventions.
2. Read `blueprint/MASTER.md`, `blueprint/REFERENCE_SPEC.md`, and relevant focused files before implementation.
3. Inventory supplied assets before designing.
4. Treat verified client facts as the source of truth. Never invent addresses, hours, prices, menu items, awards, reviews, history, or contact details.
5. Make defensible routine decisions and continue. Do not stop for repeated confirmation.
6. Prefer a few strong, composed sections over many generic sections.
7. Every visible CTA/control must work or be clearly non-interactive.
8. Test actual browser output at desktop and mobile sizes.
9. Run available lint, typecheck, build, and browser checks; report anything not run.
10. Avoid unnecessary dependencies, abstractions, and speculative features.

## Visual rules
- Do not default to a generic template.
- Establish a cohesive concept: palette, typography, spacing, image treatment, and section composition.
- Prefer real client assets. Label temporary placeholders honestly.
- Motion must support hierarchy, narrative, or feedback.
- Respect `prefers-reduced-motion`.
- Design mobile deliberately; do not just shrink desktop.

## Scope discipline
Before adding a dependency, component library, MCP server, or tool, state the concrete problem it solves. Prefer framework and CSS capabilities where sufficient.

<!-- antislop:start -->
## Anti-Slop Integration
Use Anti-Slop as an active filter (not a substitute for art direction) during development:
- **Core Filter & Delivery Gate**: `antislop` (`~/.gemini/config/plugins/antislop/skills/antislop/SKILL.md`)
- **UI / Visual**: `antislop-ui` (`~/.gemini/config/plugins/antislop/skills/antislop-ui/SKILL.md`) — stops AI visual clichés (default blue/purple gradients, overused pill radiuses, floating shadows, excessive glassmorphism, stock grids).
- **Copywriting & Claims**: `antislop-copywriting` (`~/.gemini/config/plugins/antislop/skills/antislop-copywriting/SKILL.md`) — stops AI buzzwords, significance inflation, and unverified trust claims while preserving authentic voice.
- **Accessibility & Contrast**: `antislop-human` (`~/.gemini/config/plugins/antislop/skills/antislop-human/SKILL.md`) — mandates verifiable WCAG AA contrast (using `contrast-check.py`), keyboard focus, and real touch targets.
- **Mobile Layout**: `antislop-layoutmobile` (`~/.gemini/config/plugins/antislop/skills/antislop-layoutmobile/SKILL.md`) — enforces deliberate multi-state mobile reflow, fluid typography, and touch ergonomics.
- **Code Comments**: `antislop-code` (`~/.gemini/config/plugins/antislop/skills/antislop-code/SKILL.md`) — removes decorative banners, obvious restatements, and AI comment slop while keeping logic documentation intact.

### Relationship to Creative Direction
- **Positive Driver**: `blueprint/` and client specifications establish the positive creative direction (cinematic restaurant aesthetic, Capiche as visual reference, tailored typography, editorial image composition, purposeful motion).
- **Negative Filter**: Anti-Slop acts strictly as a quality filter rejecting unmotivated AI patterns. It does not enforce a generic, sterile style.
- **Active Mode**: `during` (active during planning and implementation, verified via the Delivery Gate checklist).
<!-- antislop:end -->


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
