const CompressionPlugin = require('compression-webpack-plugin');

const zlib = require('zlib');

module.exports = function() {
  let htmlString;
  htmlString = {
    plugins: [
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
    ],
  };
  
  return htmlString;
};
