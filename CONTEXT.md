# CONTEXT.md

## Glossary

- **Chrome** — the persistent page furniture around a route's main content (nav bars, action bars, docks). Distinct from the content itself. The site navbar's surface treatment (translucent dark fill + backdrop blur + hairline border) is the canonical chrome treatment; other chrome reuses it.
- **Locale toggle** — a control that switches the active display language of a view *and* everything derived from it (downloads, generated documents). One source of truth: the active locale, not parallel buttons per language.
- **Contact** — an externally reachable social profile used to find the site owner, with its label, destination, and visual mark.
- **Mail** — the site's single primary email destination, displayed separately from social contacts.
- **Tilt activation gesture** — the first completed tap on the 3D keyboard in the hero scene that opts a supported touch device into tilt; unsupported or denied activation has no visible result. _Avoid_: tilt chip, enable button.
- **Tilt recenter gesture** — a completed tap on the 3D keyboard while tilt is active that returns tilt-driven camera parallax to neutral, preserves the current page position, and replaces the tilt baseline with the latest observed pose. Every later tap repeats this behavior. _Avoid_: camera reset, disable tilt.
- **Tilt direction** — the mapping from a phone's physical tilt to the visible direction of scene parallax. In portrait mode, a leftward phone tilt makes the scene shift left, and tipping the top edge toward the user makes the scene shift down; landscape behavior is outside the contract. _Avoid_: camera direction, gyro direction.
- **Tilt baseline** — the first valid phone pose received after tilt is enabled, or the latest observed pose captured by a tilt recenter gesture, treated as zero movement for subsequent relative tilt. _Avoid_: calibration pose, absolute orientation.
- **Tilt response** — the amount of scene parallax produced by a change from the tilt baseline. The intended response is approximately 1.5 times the current response, without a dead zone. _Avoid_: camera movement, movement gain.
- **Camera parallax** — the screen-relative displacement of the camera position caused by tilt, with its X/Y axes inverted relative to the tilt response. _Avoid_: camera offset, camera movement, tilt translation.
