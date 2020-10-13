const FontminPlugin = require('fontmin-webpack');
  
module.exports = function() {
  let htmlString;
  htmlString = {
    plugins: [
      // ...
      new FontminPlugin({
        autodetect: true, // automatically pull unicode characters from CSS
      }),
    ],
  };
  return htmlString;
};

