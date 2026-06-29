import { StyleSheet } from "react-native";
import {
  isAndroid,
  getStatusBarHeight,
} from "@freakycoder/react-native-helpers";

export const buildHeaderContentStyles = (width: number) =>
  StyleSheet.create({
    container: {
      width,
      flexDirection: "row",
      marginTop: isAndroid ? getStatusBarHeight() + 8 : 8,
    },
    leftContainer: {
      left: 16,
    },
    dateTextStyle: {
      fontSize: 32,
      color: "white",
      fontWeight: "bold",
    },
    saluteTextStyle: {
      fontSize: 14,
      color: "white",
      fontWeight: "500",
    },
    rightContainer: {
      right: 16,
      position: "absolute",
      flexDirection: "row",
    },
    myProfileImageStyle: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
    },
  });
