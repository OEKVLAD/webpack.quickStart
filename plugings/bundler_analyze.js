const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function() {
  let htmlString;
  htmlString = {
    plugins: [
      new BundleAnalyzerPlugin({

      }),
    ],
  };
  
  return htmlString;
};