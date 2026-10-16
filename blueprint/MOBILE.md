# Mobile Design Rules

Mobile is a designed experience, not a squeezed desktop layout.

- Reconsider section order, density, typography, and image crops.
- Make navigation easy to open, use, and close by touch and keyboard.
- Do not rely on hover; ensure comfortable tap targets.
- Prevent horizontal overflow.
- Reduce/remove heavy parallax and long pinned sequences on touch devices when they hurt usability.
- Keep text readable over images.
- Keep contact/menu actions easy to reach.
- Test a narrow phone width and a larger mobile/tablet width.
- Enforce responsive quality via `antislop-layoutmobile` (continuous multi-state reflow, fluid `clamp()` typography, minimum 44x44px touch targets, zero horizontal overflow).

