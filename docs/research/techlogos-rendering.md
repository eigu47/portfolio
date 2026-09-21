# TechLogos Rendering Research

**Question:** Is the current `TechLogos` implementation standard?

**Scope:** `src/components/canvas/TechLogos.tsx` as present on 2026-09-21. The repository uses Three.js `0.185.1`, React Three Fiber `9.7.0`, and Drei `10.7.8`.

## Conclusion

The implementation is broadly standard, but two parts are scene-specific workarounds rather than library requirements:

- Copying each SVG image into a `CanvasTexture` is valid, but direct SVG URLs through `useTexture` are already the standard loading path.
- Replacing Drei `Center` with a calculated `groupOffset` is valid for this fixed, evenly spaced logo row, but it is not equivalent to content-aware bounding-box centering.

The custom decal material is intentional and defensible. Its `transparent`, `depthTest={false}`, and `depthWrite={false}` settings are appropriate for a front-facing logo overlay. `depthWrite={false}` is explicit but redundant when depth testing is disabled. `alphaTest={0.01}` and `toneMapped={false}` are visual choices for these logo assets, not Drei defaults. If depth testing is later enabled, the custom child material should also receive the usual decal `polygonOffset` settings.

## Decal, Material, and Depth

Drei documents `Decal` as an abstraction over Three's `DecalGeometry`; it uses its parent mesh by default, and the decal box must intersect the surface. With no child material, Drei creates a transparent `MeshBasicMaterial` with `polygonOffsetFactor={-10}`. Its documented custom-material example explicitly sets `polygonOffset` and `polygonOffsetFactor={-1}`. ([Drei Decal docs](https://drei.docs.pmnd.rs/abstractions/decal), [Drei `Decal.tsx` at v10.7.8](https://github.com/pmndrs/drei/blob/v10.7.8/src/core/Decal.tsx))

The v10.7.8 source defaults `depthTest` to `false`, `polygonOffsetFactor` to `-10`, and applies transparent, polygon-offset, depth-test, and map properties to the fallback material. Supplying children supplies the material instead, so the child material's properties are the relevant ones for this implementation.

Three's material defaults are `depthTest: true`, `depthWrite: true`, `transparent: false`, and `alphaTest: 0`. Three also specifies that disabling depth testing implicitly disables depth writing, and documents polygon offset as useful for decals. ([Three `Material` docs](https://threejs.org/docs/pages/Material.html), [Three `DecalGeometry` docs](https://threejs.org/docs/pages/DecalGeometry.html))

Current assessment at [`TechLogos.tsx:94-109`](../../src/components/canvas/TechLogos.tsx#L94-L109):

- `transparent` is standard for an SVG logo with transparent background.
- `depthTest={false}` matches Drei's Decal default and is a reasonable choice when the logo should sit visibly on this front projector.
- `depthWrite={false}` is safe and communicates overlay intent, but Three already disables depth writes as a consequence of `depthTest={false}`.
- `alphaTest={0.01}` is scene-specific. It is not a library-required decal setting and changes how near-transparent pixels are discarded.
- `toneMapped={false}` is scene-specific. It is reasonable for brand colors that should not be altered by scene tone mapping, but it is not required for decals.
- `polygonOffset` is absent from the custom child material. That is not inherently wrong while depth testing is disabled, but it does diverge from Drei's fallback and documented custom-material examples. Add it to the child material if depth testing is re-enabled or z-fighting appears.

The fixed position, rotation, and projector scale at [`TechLogos.tsx:95-99`](../../src/components/canvas/TechLogos.tsx#L95-L99) are scene geometry decisions. They are not workarounds prescribed by Drei or Three.

## SVG Loading and CanvasTexture

Drei's `useTexture` is explicitly a convenience hook around R3F `useLoader` and Three `TextureLoader`. ([Drei `useTexture` docs](https://drei.docs.pmnd.rs/loaders/texture-use-texture), [Drei `Texture.tsx` at v10.7.8](https://github.com/pmndrs/drei/blob/v10.7.8/src/core/Texture.tsx))

R3F's `useLoader` caches loader results, and its `TextureLoader` path is the documented way to load reusable texture assets. ([R3F performance pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls), [R3F `hooks.tsx` at v9.7.0](https://github.com/pmndrs/react-three-fiber/blob/v9.7.0/packages/fiber/src/core/hooks.tsx))

Three's `TextureLoader` delegates to `ImageLoader`, which creates an HTML image element and assigns the URL to `image.src`. Therefore an imported SVG URL is a normal image texture input; `SVGLoader` is a separate addon for parsing SVG paths into geometry, not a prerequisite for using an SVG as an image texture. ([Three `TextureLoader` docs](https://threejs.org/docs/pages/TextureLoader.html), [Three `ImageLoader.js` at r185](https://github.com/mrdoob/three.js/blob/r185/src/loaders/ImageLoader.js), [Three `TextureLoader.js` at r185](https://github.com/mrdoob/three.js/blob/r185/src/loaders/TextureLoader.js), [Three `SVGLoader` docs](https://threejs.org/docs/pages/SVGLoader.html))

Consequently, [`useTexture(src)` at `TechLogos.tsx:57`](../../src/components/canvas/TechLogos.tsx#L57) is standard. The canvas copy at [`TechLogos.tsx:58-71`](../../src/components/canvas/TechLogos.tsx#L58-L71) is a valid browser-side rasterization step, but it is not a standard Drei workaround required for SVGs. It should be retained only if this scene needs the observed rasterization behavior, sizing behavior, or browser compatibility fix.

`CanvasTexture` itself is standard when the source really is a canvas: Three documents that it sets `needsUpdate` immediately, with normal texture defaults. ([Three `CanvasTexture` docs](https://threejs.org/docs/pages/CanvasTexture.html), [Three `CanvasTexture.js` at r185](https://github.com/mrdoob/three.js/blob/r185/src/textures/CanvasTexture.js))

The explicit `nextTexture.colorSpace = SRGBColorSpace` is also standard for logo color data. Three states that color maps need an appropriate texture color space, while `Texture` defaults to `NoColorSpace`. R3F also auto-converts eligible color-map textures to sRGB in its prop application path, so the explicit assignment is clear and robust rather than a required workaround. ([Three `Texture.js` at r185](https://github.com/mrdoob/three.js/blob/r185/src/textures/Texture.js), [Three `MeshBasicMaterial.js` at r185](https://github.com/mrdoob/three.js/blob/r185/src/materials/MeshBasicMaterial.js), [R3F `utils.tsx` at v9.7.0](https://github.com/pmndrs/react-three-fiber/blob/v9.7.0/packages/fiber/src/core/utils.tsx))

## Center Versus Manual Layout

Drei `Center` groups its children, measures them with `Box3.setFromObject`, and offsets an outer group by the measured center. `disableY` and `disableZ` suppress those axes while leaving X centering active. ([Drei Center docs](https://drei.docs.pmnd.rs/staging/center), [Drei `Center.tsx` at v10.7.8](https://github.com/pmndrs/drei/blob/v10.7.8/src/core/Center.tsx))

The previous implementation's `<Center disableZ disableY>` was therefore standard Drei usage for content-aware X centering. The current [`groupOffset` at `TechLogos.tsx:23-27`](../../src/components/canvas/TechLogos.tsx#L23-L27) is a valid scene-specific layout calculation: with seven equally spaced objects at `0..6 * gap`, `-(6 * gap) / 2` centers their positions on X. It does not measure actual child bounds, so it can drift if object sizes, spacing, or child content become asymmetric. This is a deliberate simplification, not a framework workaround.

## `useMemo` and Resource Lifecycle

R3F's performance guidance recommends `useMemo` for expensive Three objects such as geometries and materials so they are not recreated on each render. Using it to keep one `CanvasTexture` per `Ball` is consistent with that guidance. ([R3F performance pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls))

`useMemo` provides stable creation during a component's lifetime; it does not dispose Three resources. Three's `Texture.dispose()` documentation says to call it when the texture is no longer used. The cleanup effect at [`TechLogos.tsx:73-77`](../../src/components/canvas/TechLogos.tsx#L73-L77) is therefore standard ownership for the newly created, per-ball canvas texture. ([Three `Texture` docs](https://threejs.org/docs/pages/Texture.html), [Three `Texture.js` at r185](https://github.com/mrdoob/three.js/blob/r185/src/textures/Texture.js))

The cleanup correctly avoids disposing the `useTexture` result: Drei/R3F cache loaded textures, and those results may be shared. R3F's reconciler disposes declarative instances on removal, but the canvas texture here is an external object assigned as a material map rather than a declarative `<texture>` child; explicit cleanup makes that ownership clear. ([R3F `reconciler.tsx` at v9.7.0](https://github.com/pmndrs/react-three-fiber/blob/v9.7.0/packages/fiber/src/core/reconciler.tsx), [Drei `Texture.tsx` at v10.7.8](https://github.com/pmndrs/drei/blob/v10.7.8/src/core/Texture.tsx))

## Classification

**Standard library usage:**

- `useTexture` for imported SVG URLs.
- A stable `useMemo` for a manually created Three texture.
- Explicit disposal of a unique manually created texture.
- `CanvasTexture` for actual canvas-backed texture data.
- sRGB color-space annotation for logo color data.
- A custom transparent `MeshBasicMaterial` for an unlit decal overlay.

**Scene-specific choices or workarounds:**

- SVG-to-canvas copying; not needed by the official SVG texture loading path.
- `groupOffset` in place of `Center`; correct for this fixed row, less resilient than bounding-box centering.
- `alphaTest={0.01}`, `toneMapped={false}`, fixed decal projector dimensions, and fixed decal orientation.
- Explicit `depthWrite={false}`; harmless and communicative, but implied by `depthTest={false}`.

No application source was modified for this research.
