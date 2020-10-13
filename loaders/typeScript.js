module.exports = function() {
  return {
    externals: {
      'jquery': 'jQuery',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};