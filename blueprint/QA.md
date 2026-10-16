# Quality Assurance Checklist

## Visual
- [ ] Hero works at desktop and mobile sizes.
- [ ] Typography, spacing, color, and imagery are consistent.
- [ ] No awkward crops, stretched/missing images, or accidental blank sections.
- [ ] Page has clear rhythm and purposeful section variety.
- [ ] Text is readable over imagery.

## Motion/functionality
- [ ] Reveals trigger sensibly; no major jumps, flicker, or scroll traps.
- [ ] Hover/focus/pressed states work where useful.
- [ ] Navigation works.
- [ ] Every CTA has a verified destination or real action.
- [ ] Reduced-motion mode remains usable.
- [ ] No invented business facts or inert controls.

## Responsive/accessibility
- [ ] Desktop reviewed.
- [ ] Narrow and wider mobile reviewed.
- [ ] No horizontal overflow.
- [ ] Keyboard focus visible.
- [ ] Semantic headings and landmarks are reasonable.
- [ ] Reduced-motion preference respected.

## Engineering
- [ ] No broken images or major network errors.
- [ ] No serious console errors.
- [ ] Lint/typecheck/build run where configured.
- [ ] Browser screenshot/interaction review performed where available.
- [ ] Known gaps documented.

## Anti-Slop Delivery Gate
- [ ] **Purpose Test (C-1)**: Every visual element (gradient, shadow, border radius, motion) serves hierarchy, atmosphere, or readability; no default AI styling tropes.
- [ ] **Character Bar (C-2 & C-3)**: Design possesses distinctive brand character aligned with Capiche inspiration, not generic templates.
- [ ] **Copy Veracity (C-5)**: No AI buzzwords (*unlock, elevate, delve*), no inflated claims, no fabricated stats or reviews.
- [ ] **A11y Verification**: Contrast checked and verified (WCAG AA) via `contrast-check.py` or formula; touch targets >= 44px; keyboard focus visible.
- [ ] **Comment Hygiene**: No decorative ASCII banners, obvious restatements, or AI noise comments (`antislop-code`).

