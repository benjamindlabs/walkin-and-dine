# Animation System Rules

Motion should clarify hierarchy, create atmosphere, connect sections, or provide feedback—not make the site busy.

## Categories
- Entrance reveals.
- Image scale/crop/reveal/parallax.
- Coordinated narrative sequences.
- Interaction feedback.
- Rare, restrained ambient motion.

## Implementation
- Use CSS for simple state changes.
- Use an animation library for timelines, scroll progress, pinning, or complex orchestration.
- Prefer transform and opacity over expensive layout changes.
- Keep scroll-triggered effects understandable; avoid excessive pinning and scroll traps.
- Clean up listeners, observers, timelines, and animation instances on unmount.
- Test refresh, resize, route navigation, and mobile.
- Keep content visible if JavaScript or animation fails.

## Accessibility
Respect `prefers-reduced-motion`. Remove parallax, large scale changes, and nonessential scroll-linked motion when reduced motion is requested. Never communicate meaning only through animation. Avoid rapid flashing and disorienting movement.

## Initial motion budget
Start with one hero treatment, one reveal pattern, one meaningful image/gallery interaction, and subtle feedback. Add a complex pinned sequence only if it improves the experience and passes browser testing.
