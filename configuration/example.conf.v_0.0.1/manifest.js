const WebpackPwaManifest = require('webpack-pwa-manifest');
// const WebpackPwaManifest = require('html-webpack-tags-plugin');

module.exports = function(publicPath) {
  let globals_var;
  globals_var = {
    plugins: [
      new WebpackPwaManifest({
        filename: 'manifest.luxtime.json',
        name: 'Autoryzowany sklep z zegarkami - Luxtime.pl',
        short_name: 'Luxtime.pl',
        description: 'Autoryzowany sklep z zegarkami - Luxtime.pl',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'fullscreen',
        orientation: 'portrait',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          // {
          //   src: publicPath+'icon.png',
          //   sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          // },
          // {
          //   src: publicPath+'large-icon.png',
          //   size: '1024x1024' // you can also use the specifications pattern
          // },
          // {
          //   src: publicPath+'maskable-icon.png',
          //   size: '1024x1024',
          //   purpose: 'maskable'
          // }
        ],
      }),
    ],
  };
  return globals_var;
};


