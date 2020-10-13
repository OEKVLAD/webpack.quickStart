module.exports = function(pathIN, pathOUT, paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
          /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
          exclude: paths,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: pathOUT,
            },
          }],
        },
      ],
    },
  };
};