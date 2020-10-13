module.exports = function({ paths, options }) {
  let jsLint;
  jsLint={
    module: {
      rules: [
        {
          test: /\.js$/,
          include: paths,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: options,
        },
      ],
    },
  };
  
  return jsLint;
};
