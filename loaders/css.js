const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(paths) {
  return {
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/',
              },
            'style-loader',
            'css-loader',
          ],
        },
      ], 
    }, 
  }; 
}