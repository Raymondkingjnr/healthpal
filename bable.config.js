module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    presets: ["module:metro-react-native-babel-preset"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
