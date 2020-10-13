const CopyPlugin = require('copy-webpack-plugin');

module.exports = function(nodeModule, sourcePath){
  let CopyPluginSetting;
  CopyPluginSetting={
    plugins: [
      new CopyPlugin([
        { from: nodeModule, to: sourcePath },
      ]),
    ],
  };
  
  return CopyPluginSetting ;
};