const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

module.exports = function(){
  [
    new UnusedFilesWebpackPlugin(),
  ]
};
