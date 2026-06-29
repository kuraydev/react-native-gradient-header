declare module "@freakycoder/react-native-helpers" {
  export const isAndroid: boolean;
  export const isIOS: boolean;
  export function hasNotch(): boolean;
  export function getStatusBarHeight(safe?: boolean): number;
  export function getBottomSpace(): number;
}
