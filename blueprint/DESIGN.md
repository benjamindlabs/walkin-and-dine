# Design System Rules

Before coding, define brand mood, palette, typography roles, spacing rhythm, content width, image strategy, surface treatment, and CTA styles.

## Composition
- Balance memorable large-scale moments with quieter reading sections.
- Vary layouts with purpose; avoid repeating the same section structure.
- Keep text readable and headings clear.
- Use a consistent underlying grid even with asymmetric compositions.
- Prefer a few memorable compositions to many decorative cards.

## Typography
- Limit font families and weights.
- Use display typography for personality and body typography for readability.
- Avoid tiny all-caps text for essential information.
- Load fonts efficiently with sensible fallbacks.

## Imagery
- Prefer suitable real client assets.
- Crop intentionally; never stretch.
- Keep focal subjects visible on mobile.
- Use overlays only for contrast or atmosphere.
- Use meaningful alt text for informative images.

## Controls
- Make the primary action obvious.
- Distinguish links and buttons semantically and visually.
- Provide visible keyboard focus.
- Hover feedback must have a touch/keyboard equivalent.

## Avoid
Generic SaaS layouts, gratuitous cards/gradients/glass effects, repeated identical reveals, low-contrast text over photos, and empty sections with no narrative purpose. Enforce via the `antislop-ui` filter (purpose test R-01 through R-14; avoid generic AI default gradients, excessive pill radiuses, floating soft shadows, and unmotivated background grids).

