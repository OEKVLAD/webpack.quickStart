const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = function(pathOut, pathIN, chunks, nameLayout, nameScripts, publicPath) {
  let htmlString;
  htmlString = {
    plugins: [

      new HtmlWebpackPlugin({
        
        filename: pathOut + nameLayout,
        chunks: [chunks],
      }),

      new HtmlWebpackTagsPlugin({
        append: true,
        links: [],
        scripts: nameScripts,
        inject: 'head',
        hash: true,
        
        publicPath: publicPath,
      }),
    ],
  };
  
  return htmlString;
};
