const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');
const Imagemin = require('imagemin-webpack-plugin');

module.exports = function(pathIN, pathOUT, publicPath,  paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot|svg|otf|jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
          /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
          exclude: paths,
          use: [{
            loader: 'file-loader',
            options: {
              publicPath: publicPath,
              name: '[name].[ext]?v=[contenthash]',
              outputPath: pathOUT,
            },
          },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: paths,
          use: [{
            loader: 'image-webpack-loader',
            options: {
              plugins: [
                imageminGifsicle({
                  interlaced: false,
                }),
                imageminMozjpeg({
                  progressive: true,
                  arithmetic: false,
                }),
                imageminPngquant({
                  strip: true,
                  floyd: 0.5,
                  speed: 1,
                }),
              ],
            },
          },
          ],
        },
      ],
    },
  };
};


