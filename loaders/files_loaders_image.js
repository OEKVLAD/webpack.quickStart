module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
          include: paths,
          use: [
            'img-loader',
          ],
        },
      ],
    },
  };
};