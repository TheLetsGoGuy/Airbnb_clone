# AI-assisted development rules

- Treat the supplied reference screenshots as the visual source of truth.
- Preserve desktop-only scope unless explicitly asked otherwise.
- Do not copy source code from the reference implementation. Recreate behavior from observation.
- Keep components small and semantic. Prefer CSS for visual behavior and React state for overlays.
- Every interactive element must have a keyboard-accessible path and an accessible name.
- Before submission, run `npm run build` and manually verify Listing, Photo Tour, and Lightbox states.
