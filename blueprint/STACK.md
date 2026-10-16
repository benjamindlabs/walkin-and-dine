# Recommended Initial Stack

## Default
- **Next.js + React + TypeScript:** routing, component ecosystem, image support, production path.
- **Tailwind CSS:** consistent responsive styling while retaining custom art direction.
- **GSAP + ScrollTrigger:** complex scroll-linked motion, timelines, and pinned sequences.
- **Native CSS:** simple hover/focus/state transitions.
- **Lucide:** small number of useful icons.
- **Playwright:** repeatable browser checks and screenshots.

## Selective
- **shadcn/ui:** accessible functional primitives such as dialogs/dropdowns when needed; customize them and do not let defaults dictate the visual identity.
- **Context7 or similar docs retrieval:** only if the agent repeatedly uses outdated API patterns.
- **Lenis/smooth-scroll library:** do not add initially; first test native scrolling plus GSAP.

## Do not add initially
Multiple animation libraries, huge component collections, a CMS without an editing need, auth/database for a simple marketing site, video/3D before a concrete design calls for them, or MCP servers without a defined workflow benefit.

Add a dependency only when a requirement exists, native capabilities are insufficient, the package is maintained/compatible, and the complexity cost is justified. Check current official setup instructions when creating the app.
