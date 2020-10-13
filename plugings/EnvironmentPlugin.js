const MD5Plugin = require('webpack-assets-manifest');

module.exports = function(pathOut) {
  let htmlString;
  htmlString = {
    plugins: [
      new MD5Plugin(
        {
          entrypoints: true,
          output: pathOut,
        }
      ),
    ],
  };
  
  return htmlString;
};
