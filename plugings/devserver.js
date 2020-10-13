const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function(proxy, port, public) {
  let BrowserSP;
  BrowserSP = {
    plugins: [
      new BrowserSyncPlugin({
        host: proxy,
        port: port,
        proxy: proxy,
      },
      {
        injectCss: true,
        files: [public+"*.js", public+"*.css", public+"**/*.js", public+"**/*.css"]
      },
      
      ),
    ],
  };
  
  return BrowserSP;
};
