// postcss.config.js
module.exports = {
  map: false,
  parser: false,
  plugins: [
    require('postcss-nested')(),
    require('postcss-sort-media-queries')(),
    require('autoprefixer')(),
  ],
};
