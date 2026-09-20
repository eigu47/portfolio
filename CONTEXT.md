# CONTEXT.md

## Glossary

- **Chrome** — the persistent page furniture around a route's main content (nav bars, action bars, docks). Distinct from the content itself. The site navbar's surface treatment (translucent dark fill + backdrop blur + hairline border) is the canonical chrome treatment; other chrome reuses it.
- **Locale toggle** — a control that switches the active display language of a view *and* everything derived from it (downloads, generated documents). One source of truth: the active locale, not parallel buttons per language.
- **Contact** — an externally reachable social profile used to find the site owner, with its label, destination, and visual mark.
- **Mail** — the site's single primary email destination, displayed separately from social contacts.
- **Tilt activation gesture** — a completed tap on the 3D keyboard in the hero scene that opts a supported touch device into tilt; unsupported or denied activation has no visible result. _Avoid_: tilt chip, enable button.
- **Tilt direction** — the mapping from a phone's physical tilt to the visible direction of scene parallax. In portrait mode, a leftward phone tilt makes the scene shift left, and tipping the top edge toward the user makes the scene shift down; landscape behavior is outside the contract. _Avoid_: camera direction, gyro direction.
- **Tilt baseline** — the first valid phone pose received after tilt is enabled, treated as zero movement for subsequent relative tilt. A future reset may replace this baseline; no reset interaction is part of the current behavior. _Avoid_: calibration pose, absolute orientation.
- **Tilt response** — the amount of scene parallax produced by a change from the tilt baseline. The intended response is approximately 1.5 times the current response, without a dead zone. _Avoid_: camera movement, movement gain.
- **Camera parallax** — the additional screen-relative displacement of the camera position derived from the normalized tilt response, applied alongside the existing target-based scene parallax. It moves opposite the phone's physical tilt, reaches a maximum of 0.375 world units, applies on all tilt-enabled pages, clamps at the normalized limits, and smoothly returns to zero at the tilt baseline. _Avoid_: camera offset, camera movement, tilt translation.
