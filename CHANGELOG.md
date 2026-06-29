# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- TypeScript source and shipped type definitions (`GradientHeaderProps`,
  `GradientPoint`, `ShapeProps`, `HeaderContentProps`).
- Named exports `GradientHeader`, `Shape`, and `HeaderContent` alongside the
  default export.
- `ref` forwarding on `GradientHeader` to the underlying `View`.
- Accessibility: the title is a `header`, the avatar is an `imagebutton`
  labelled "Profile", and the decorative shape is hidden from assistive tech.
- Test suite (Jest + `@testing-library/react-native`) covering default and
  custom props, gradient/solid branches, `imageOnPress`, custom
  `headerContentComponent`, ref forwarding, and the #9 regression.
- GitHub Actions CI (lint + typecheck + test + build on a Node 18/20 matrix).
- `react-native-builder-bob` build producing CommonJS, ES module, and
  TypeScript declaration outputs.
- `CHANGELOG.md`, `CONTRIBUTING.md`, issue templates, and a pull-request
  template.

### Changed

- **BREAKING:** the package now publishes compiled output. `main` points at
  `lib/commonjs/index.js`, `module` at `lib/module/index.js`, `types` at
  `lib/typescript/src/index.d.ts`, and `react-native`/`source` at
  `src/index.tsx` (used by Metro). The default import
  (`import GradientHeader from "react-native-gradient-header"`) and the npm
  package name are unchanged.
- **BREAKING:** peer-dependency floors raised to `react >=18`,
  `react-native >=0.72`, and `react-native-linear-gradient >=2.8`, dropping the
  advertised `>=16` / `>=0.55` support.
- Styles converted to `StyleSheet.create`; components memoized with
  `React.memo`/`useMemo`; window size now read with `useWindowDimensions` so
  rotation and resize are handled instead of a module-load
  `Dimensions.get("window")` snapshot.
- ESLint migrated from the deprecated `babel-eslint` + Airbnb setup to
  `@typescript-eslint` + `eslint-plugin-react`/`react-hooks`/`react-native`
  with Prettier.

### Fixed

- #9: a custom `headerContentComponent` no longer distorts the background
  shape. The container is pinned to the window width so the centered,
  horizontally-scaled shape keeps its geometry regardless of content size.
- `GradientHeader` itself is now type/prop documented (previously only the
  `Shape`/`HeaderContent` subcomponents validated props).

### Notes

- Default prop values and visuals are unchanged (title `"Today"`, subtitle
  `"Have a nice day"`, `gradientColors ["#12c2e9","#c471ed","#f64f59"]`,
  `shapeColor "#ba75df"`, `start {0,0}` / `end {1,0}`, notch-aware offset math).

## [0.2.1] - 2020-01-05

- Last JavaScript-only release.

[Unreleased]: https://github.com/kuraydev/react-native-gradient-header/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/kuraydev/react-native-gradient-header/releases/tag/v0.2.1
