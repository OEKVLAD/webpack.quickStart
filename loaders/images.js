module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg|gif|ttf|eot|otf)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      ],
    },
  };
};