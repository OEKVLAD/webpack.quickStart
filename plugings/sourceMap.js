const webpack = require('webpack');

module.exports = function(public_path) {
  let sourceMapSetting;
  sourceMapSetting={
    devtool: false,
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        exclude: ['vendor~*', 'runtime.js'],
      }),
    ],
  };
  
  return sourceMapSetting;
};
