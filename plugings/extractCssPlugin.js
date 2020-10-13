const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(pathOut, pathIN, chunks, nameLayout, nameScripts, publicPath) {
  let htmlString=null;
  htmlString = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
            use: 'sass-loader',
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
    ],
  };
  
  return htmlString;
};
