import { Platform, StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";

/**
 * Builds the default drop-shadow for the header container.
 *
 * Kept as a pure helper (memoize the result with the `shadowColor` it was
 * built from) so it is not re-allocated on every render.
 */
export const buildShadowStyle = (shadowColor: string): ViewStyle => ({
  ...Platform.select({
    ios: {
      shadowRadius: 4.65,
      shadowColor,
      shadowOpacity: 0.29,
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    android: {
      elevation: 7,
    },
    default: {},
  }),
});

/**
 * @deprecated Use {@link buildShadowStyle}. Kept for backwards compatibility
 * with the original underscore-prefixed export.
 */
export const _shadowStyle = buildShadowStyle;

/**
 * Returns the static container styles. `width` is supplied at runtime from
 * `useWindowDimensions()` so the centered, horizontally-scaled `Shape` keeps
 * its geometry regardless of the rendered header content (fixes #9).
 */
export const buildContainerStyles = (width: number) =>
  StyleSheet.create({
    container: {
      top: 0,
      width,
      position: "absolute",
    },
  });

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: "absolute",
  },
});

export default styles;
