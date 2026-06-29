import React, { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { buildShapeStyles, computePosition, solidColor } from "./Shape.style";
import type { GradientPoint } from "../GradientHeader";

export interface ShapeProps {
  gradient?: boolean;
  start?: GradientPoint;
  end?: GradientPoint;
  shapeColor?: string;
  gradientColors?: string[];
  position?: StyleProp<ViewStyle>;
}

const Shape: React.FC<ShapeProps> = ({
  gradient = true,
  end = { x: 1, y: 0 },
  start = { x: 0, y: 0 },
  shapeColor = "#ba75df",
  gradientColors = ["#12c2e9", "#c471ed", "#f64f59"],
  position,
}) => {
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => buildShapeStyles(width), [width]);
  const positionStyle = useMemo(
    () => computePosition(height, position),
    [height, position],
  );

  if (gradient) {
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={gradientColors}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.main, styles.customShadowStyle, positionStyle]}
      />
    );
  }

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.main,
        positionStyle,
        solidColor(shapeColor),
        styles.customShadowStyle,
      ]}
    />
  );
};

export default React.memo(Shape);
