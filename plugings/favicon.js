const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
module.exports = function() {
  let FactionsWebpackPluginSetting;
  FactionsWebpackPluginSetting = {
    plugins: [
      new FaviconsWebpackPlugin('./source/favicon.png'),
    ],
  };
  
  return FactionsWebpackPluginSetting;
};
