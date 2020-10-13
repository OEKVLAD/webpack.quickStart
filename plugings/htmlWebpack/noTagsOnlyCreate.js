const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(pathOut, pathIN, chunks, nameLayout ) {
  let htmlString=null;
  htmlString = {
    plugins: [
      new HtmlWebpackPlugin({
        filename: pathOut + nameLayout,
        publicPath: '/',
        chunks: [chunks],
        
        hash: true,
        template: pathIN + '/empty.html.twig',
      }),
    ],
  };
  
  return htmlString;
};
