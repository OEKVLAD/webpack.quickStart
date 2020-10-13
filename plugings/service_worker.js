// Inside of webpack.config.js:
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = function(pathIn, pathOut) {
  let SWjs;
  SWjs = {
    plugins: [
      // Other plugins...
      new InjectManifest({
        swSrc: pathIn,
        swDest: pathOut,
        include:[
          /\.js$/,
          /\.css$/,
        ],
      }),
    ],
  };
  return SWjs;
};