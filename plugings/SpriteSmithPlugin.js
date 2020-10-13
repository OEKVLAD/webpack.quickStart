const SpritesmithPlugin = require('webpack-spritesmith');
module.exports = function(pathIn, pathOutImg, pathOutCss, name='~sprite.png') {
  let StyleLintPluginSetting;
  StyleLintPluginSetting={
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: pathIn,
          glob: '*.png',
        },
        target: {
          image: pathOutImg,
          css: pathOutCss,
        },
        apiOptions: {
          cssImageRef: name,
        },
      }),
    ],
  };
  
  return StyleLintPluginSetting;
};
