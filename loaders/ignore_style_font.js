// documentatio
/*
*   web documentation   https://webpack.js.org/plugins/html-webpack-plugin/
*
*   npm install --save-dev html-webpack-plugin
*   npm install --save-dev html-webpack-tags-plugin
*
*   this plugin add to twig layout scripts and style
*
*
*
*
*  [12, 'str', 234, true].map( function(nameScripts){ HtmlWebpackPlugin(pathOut, pathIN, chunks, nameLayout, nameScripts=[], publicPath);} );
*
*
*
*
*
*
*
*
*
*
*
*
*/


module.exports = function() {
  let htmlString;
  htmlString = {
    
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: {
            loader: 'ignore-loader',
          },
        },
      ],
    }
  };
  
  return htmlString;
};