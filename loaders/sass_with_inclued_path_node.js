const glob = require('glob');
module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () =>[require('autoprefixer')({grid: false})],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: glob.sync('./*/node_modules').map((d) => path.join(__dirname, d)),
              },
            },
          ],
        },
      ],
    },
  };
};