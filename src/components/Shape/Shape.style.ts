import { Dimensions, Platform, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { hasNotch } from "@freakycoder/react-native-helpers";

export const solidColor = (shapeColor?: string): ViewStyle => ({
  backgroundColor: shapeColor || "#ba75df",
});

/**
 * Computes the vertical offset that lifts the oversized circle so only its
 * bottom curve is visible. The original notch-aware math is preserved exactly
 * to keep the default visual identical; passing an explicit `position`
 * short-circuits it.
 */
export const computePosition = (
  height: number,
  position?: StyleProp<ViewStyle>,
): StyleProp<ViewStyle> => {
  if (!position) {
    const top = hasNotch() ? height * -0.17 : height * -0.25;
    return Platform.select({
      ios: { top },
      android: { top: height * -0.185 },
      default: { top },
    });
  }
  return position;
};

/**
 * @deprecated Use {@link computePosition}. Kept for backwards compatibility
 * with the original underscore-prefixed export. Reads window height lazily.
 */
export const _position = (
  position?: StyleProp<ViewStyle>,
): StyleProp<ViewStyle> => {
  const { height } = Dimensions.get("window");
  return computePosition(height, position);
};

export const buildShapeStyles = (width: number) =>
  StyleSheet.create({
    main: {
      width,
      height: width,
      alignSelf: "center",
      position: "absolute",
      alignContent: "center",
      borderRadius: width / 2,
      transform: [{ scaleX: 2 }, { scaleY: 0.5 }],
    },
    customShadowStyle: {
      shadowRadius: 3,
      shadowOpacity: 0.3,
      shadowColor: "#595959",
      shadowOffset: { width: 0, height: 2 },
    },
  });
