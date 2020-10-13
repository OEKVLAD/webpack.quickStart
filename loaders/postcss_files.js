

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-sass-loader',
              options: {
                plugins: () => [require('autoprefixer')({
                  'overrideBrowserslist': ['> 1%', 'last 2 versions'],
                })],
              },
            },
          ],
        },
      ],
    },
  
  };
};