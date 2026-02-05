module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // IMPORTANT: react-native-worklets/plugin must be listed LAST
      'react-native-worklets/plugin',
    ],
  };
};
