const path = require('path');
const TinypngPlugin = require('tinypng-plugin-webpack-full-featured');

module.exports = async function(pathImage) {
  let htmlString;
  htmlString = {
    plugins: [
      new TinypngPlugin({
        from: path.resolve(pathImage),
        extentions: ['png', 'jpeg', 'jpg'],
        silent: false,
        cache: true,
      }),
    ],
  };
  
  return htmlString;
};

