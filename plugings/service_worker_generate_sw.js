// Inside of webpack.config.js:
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = function(name) {
  let SWjs;
  SWjs = {
    plugins: [
      new GenerateSW({
        swDest: name,
        clientsClaim: true,
        skipWaiting: true,
        exclude: ['*.twig'],
        //TODO set SW include file from config
        // include: ['https://code.jquery.com/jquery-1.12.4.min.js', 'https://code.jquery.com/jquery-3.4.1.min.js', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'],
        runtimeCaching: [
          {urlPattern: new RegExp('/*.(?:js|css)$/'),handler: 'CacheFirst' },
        ],
      }),
    ],
  };
  return SWjs;
};
