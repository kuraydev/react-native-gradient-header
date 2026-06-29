/* eslint-disable @typescript-eslint/no-var-requires */
jest.mock("react-native-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");
  const LinearGradient = (props) =>
    React.createElement(View, {
      ...props,
      testID: props.testID ?? "linear-gradient",
    });
  return { __esModule: true, default: LinearGradient };
});

jest.mock("@freakycoder/react-native-helpers", () => ({
  isAndroid: false,
  isIOS: true,
  hasNotch: () => true,
  getStatusBarHeight: () => 20,
  getBottomSpace: () => 0,
}));
