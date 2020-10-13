module.exports = function() {
  return {
    module: {
      rules: [
        {
          // test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
      ],
    },
  };
};