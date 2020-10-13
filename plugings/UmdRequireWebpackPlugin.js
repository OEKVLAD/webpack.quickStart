const UmdRequireWebpackPlugin = require('umd-require-webpack-plugin');

module.exports = function(){
  [
    new UmdRequireWebpackPlugin(),
  ];
};
