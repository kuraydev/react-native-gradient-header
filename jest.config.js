module.exports = {
  preset: "react-native",
  setupFiles: ["<rootDir>/jest/setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp)$": "<rootDir>/jest/assetMock.js",
  },
  modulePathIgnorePatterns: ["<rootDir>/example/"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.test.{ts,tsx}"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-linear-gradient|@freakycoder)/)",
  ],
};
