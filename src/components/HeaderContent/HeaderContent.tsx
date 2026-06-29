import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import type { ImageSourcePropType } from "react-native";

import { buildHeaderContentStyles } from "./HeaderContent.style";
import defaultProfileImage from "../../../assets/profile.jpg";

export interface HeaderContentProps {
  title?: string;
  subtitle?: string;
  imageSource?: ImageSourcePropType;
  imageOnPress?: () => void;
}

const noop = () => {};

const HeaderContent: React.FC<HeaderContentProps> = ({
  title = "Today",
  subtitle = "Have a nice day",
  imageOnPress = noop,
  imageSource = defaultProfileImage,
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => buildHeaderContentStyles(width), [width]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text accessibilityRole="header" style={styles.dateTextStyle}>
            {title}
          </Text>
          <Text style={styles.saluteTextStyle}>{subtitle}</Text>
        </View>
        <View style={styles.rightContainer}>
          {imageSource ? (
            <TouchableOpacity
              accessibilityRole="imagebutton"
              accessibilityLabel="Profile"
              onPress={imageOnPress}
            >
              <Image source={imageSource} style={styles.myProfileImageStyle} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HeaderContent);
