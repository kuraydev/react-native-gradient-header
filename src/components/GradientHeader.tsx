import React, { forwardRef, useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

import Shape from "./Shape/Shape";
import HeaderContent from "./HeaderContent/HeaderContent";
import { buildContainerStyles, buildShadowStyle } from "./GradientHeader.style";

export interface GradientPoint {
  x: number;
  y: number;
}

export interface GradientHeaderProps {
  /** Big bold title. @default "Today" */
  title?: string;
  /** Secondary line under the title. @default "Have a nice day" */
  subtitle?: string;
  /** Render the gradient shape (`true`) or a solid color shape (`false`). @default true */
  gradient?: boolean;
  /** Colors used by the linear gradient. @default ["#12c2e9", "#c471ed", "#f64f59"] */
  gradientColors?: string[];
  /** Gradient start point. @default { x: 0, y: 0 } */
  start?: GradientPoint;
  /** Gradient end point. @default { x: 1, y: 0 } */
  end?: GradientPoint;
  /** Solid background color, used when `gradient` is `false`. @default "#ba75df" */
  shapeColor?: string;
  /** Source for the circular profile image. Defaults to the bundled avatar. */
  imageSource?: ImageSourcePropType;
  /** Called when the profile image is tapped. @default () => {} */
  imageOnPress?: () => void;
  /** Override the computed position of the background shape. */
  position?: StyleProp<ViewStyle>;
  /** Replace the default title/subtitle/avatar content entirely. */
  headerContentComponent?: React.ReactNode;
  /** Override the container's shadow style. */
  shadowStyle?: StyleProp<ViewStyle>;
  /** Shadow color used by the default shadow. @default "#000" */
  shadowColor?: string;
}

const GradientHeader = forwardRef<View, GradientHeaderProps>((props, ref) => {
  const {
    end,
    start,
    title,
    gradient,
    position,
    subtitle,
    shapeColor,
    shadowColor = "#000",
    shadowStyle,
    imageSource,
    imageOnPress,
    gradientColors,
    headerContentComponent,
  } = props;

  const { width } = useWindowDimensions();

  const containerStyle = useMemo(
    () => buildContainerStyles(width).container,
    [width],
  );
  const shadow = useMemo(
    () => shadowStyle ?? buildShadowStyle(shadowColor),
    [shadowStyle, shadowColor],
  );

  return (
    <View ref={ref} style={[containerStyle, shadow]}>
      <Shape
        end={end}
        start={start}
        position={position}
        gradient={gradient}
        shapeColor={shapeColor}
        gradientColors={gradientColors}
      />
      {headerContentComponent ?? (
        <HeaderContent
          title={title}
          subtitle={subtitle}
          imageSource={imageSource}
          imageOnPress={imageOnPress}
        />
      )}
    </View>
  );
});

GradientHeader.displayName = "GradientHeader";

export default React.memo(GradientHeader);
