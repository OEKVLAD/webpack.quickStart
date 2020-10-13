const StyleLintPlugin = require('stylelint-webpack-plugin');
module.exports = function() {
  let StyleLintPluginSetting;
  StyleLintPluginSetting={
    plugins: [
      new StyleLintPlugin({
        configFile: './.stylelintrc',
      }),
    ],
  };
  
  return StyleLintPluginSetting;
};
