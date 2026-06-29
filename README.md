<img alt="React Native Gradient Header" src="https://raw.githubusercontent.com/kuraydev/react-native-gradient-header/master/assets/logo.png" width="1050"/>

[![Battle Tested ✅](https://img.shields.io/badge/-Battle--Tested%20%E2%9C%85-03666e?style=for-the-badge)](https://github.com/kuraydev/react-native-gradient-header)
[![npm version](https://img.shields.io/npm/v/react-native-gradient-header.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-gradient-header)
[![npm downloads](https://img.shields.io/npm/dt/react-native-gradient-header.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-gradient-header)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![TypeScript](https://img.shields.io/badge/types-included-blue.svg?style=for-the-badge)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> Fully customizable, unique curved-shape gradient header for React Native — a title/subtitle and a tappable circular avatar over a soft gradient curve. Written in TypeScript, ships type definitions, and works with the New Architecture.

<p align="center">
<img alt="Example" src="https://raw.githubusercontent.com/kuraydev/react-native-gradient-header/master/assets/Screenshots/example.png" width="49.7%" />
<img alt="Example" src="https://raw.githubusercontent.com/kuraydev/react-native-gradient-header/master/assets/Screenshots/example1.png" width="49.7%" />
</p>
<p align="center">
<img alt="Example" src="https://raw.githubusercontent.com/kuraydev/react-native-gradient-header/master/assets/Screenshots/example2.png" width="49.7%" />
<img alt="Example" src="https://raw.githubusercontent.com/kuraydev/react-native-gradient-header/master/assets/Screenshots/example3.png" width="49.7%" />
</p>

## Table of Contents

- [Installation](#installation)
- [Peer Dependencies](#peer-dependencies)
- [Usage](#usage)
- [TypeScript](#typescript)
- [Props](#props)
- [New Architecture & Expo](#new-architecture--expo)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Installation

```sh
npm install react-native-gradient-header
# or
yarn add react-native-gradient-header
```

## Peer Dependencies

This component renders its gradient through
[`react-native-linear-gradient`](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
and reads safe-area metrics through
[`@freakycoder/react-native-helpers`](https://www.npmjs.com/package/@freakycoder/react-native-helpers).
Install them alongside the library:

```sh
yarn add react-native-linear-gradient @freakycoder/react-native-helpers
```

Minimum supported versions:

```jsonc
"react": ">=18.0.0",
"react-native": ">=0.72.0",
"react-native-linear-gradient": ">=2.8.0",
"@freakycoder/react-native-helpers": ">=0.1.2"
```

> **Migrating from `0.2.x`?** See the [Changelog](./CHANGELOG.md). The package is
> now written in TypeScript and published as compiled CJS/ESM + type
> definitions. The default import and every prop name and default value are
> unchanged, so the upgrade is a drop-in for any project on the supported
> peer-dependency ranges above.

## Usage

### Basic

```tsx
import GradientHeader from "react-native-gradient-header";

export default function Screen() {
  return <GradientHeader />;
}
```

### Advanced

```tsx
import GradientHeader from "react-native-gradient-header";

export default function Screen() {
  return (
    <GradientHeader
      title="Title"
      subtitle="Have a nice day Kuray"
      gradientColors={["#00416A", "#E4E5E6"]}
      imageSource={require("./assets/profile.jpg")}
      imageOnPress={() => console.log("avatar tapped")}
    />
  );
}
```

### Custom header content

Pass any element as `headerContentComponent` to replace the default
title/subtitle/avatar entirely. The background shape now keeps its geometry
regardless of the content you render (see [#9](https://github.com/kuraydev/react-native-gradient-header/issues/9)):

```tsx
<GradientHeader
  gradientColors={["#00416A", "#E4E5E6"]}
  headerContentComponent={<MyCustomHeaderRow />}
/>
```

## TypeScript

Type definitions ship with the package — no `@types/...` install needed.

```tsx
import GradientHeader, {
  GradientHeaderProps,
} from "react-native-gradient-header";

const headerProps: GradientHeaderProps = {
  title: "Today",
  gradient: true,
  gradientColors: ["#12c2e9", "#c471ed", "#f64f59"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};
```

`GradientHeader` also forwards a `ref` to its underlying `View`.

## Props

| Prop                     | Type                       | Default                             | Description                                                          |
| ------------------------ | -------------------------- | ----------------------------------- | ------------------------------------------------------------------- |
| `title`                  | `string`                   | `"Today"`                           | Big bold title.                                                     |
| `subtitle`               | `string`                   | `"Have a nice day"`                 | Secondary line under the title.                                    |
| `gradient`               | `boolean`                  | `true`                              | Render the gradient shape; set `false` for a solid color shape.    |
| `gradientColors`         | `string[]`                 | `["#12c2e9", "#c471ed", "#f64f59"]` | Colors used by the linear gradient.                                |
| `start`                  | `{ x: number; y: number }` | `{ x: 0, y: 0 }`                    | Gradient start point.                                              |
| `end`                    | `{ x: number; y: number }` | `{ x: 1, y: 0 }`                    | Gradient end point.                                               |
| `shapeColor`             | `string`                   | `"#ba75df"`                         | Solid background color, used when `gradient` is `false`.          |
| `imageSource`            | `ImageSourcePropType`      | bundled avatar                      | Source for the circular profile image.                            |
| `imageOnPress`           | `() => void`               | `() => {}`                          | Called when the profile image is tapped.                          |
| `position`               | `StyleProp<ViewStyle>`     | notch-aware computed offset         | Override the computed position of the background shape.           |
| `headerContentComponent` | `React.ReactNode`          | default title/subtitle/avatar       | Replace the default header content entirely.                      |
| `shadowStyle`            | `StyleProp<ViewStyle>`     | platform default shadow             | Override the container's shadow style.                            |
| `shadowColor`            | `string`                   | `"#000"`                            | Shadow color used by the default shadow.                          |

## New Architecture & Expo

`react-native-gradient-header` is a pure-JS component (`View` / `Text` /
`Image` / `SafeAreaView` / `TouchableOpacity`) with **no native code of its
own**, so it works with the React Native **New Architecture (Fabric)** in
interop mode. Full New-Arch readiness depends on its native peer,
`react-native-linear-gradient`, being Fabric-ready — use a recent version
(`>=2.8.0`).

**Expo:** works in any Expo project that supports custom native modules
(dev client / prebuild / EAS Build). It is **not** supported in Expo Go,
because `react-native-linear-gradient` is a native module. Expo users who want
a managed-friendly gradient can polyfill `react-native-linear-gradient` with
[`expo-linear-gradient`](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
via a Metro alias.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and
open an issue or pull request. Run `yarn lint`, `yarn typecheck`, and
`yarn test` before submitting.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full release history.

## Author

Kuray (FreakyCoder), kurayogun@gmail.com

## License

React Native Gradient Header is available under the MIT license. See the
[LICENSE](./LICENSE) file for more info.
