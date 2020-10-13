const multi = require('multi-loader'); // https://webpack.js.org/loaders/multi-loader/
module.exports = function() {
  return {
    externals: {
      'jquery': 'jQuery',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use:
            {
              loader: 'babel-loader',
              query: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      'targets': {
                        'node': '10',
                      },
                    },
                  ],
                ],
                plugins: ['@babel/plugin-syntax-jsx'],
                // plugins: [ process.env.npm_lifecycle_event.indexOf('prod')+1 ? ["transform-remove-console"] : ["transform-remove-console", { "exclude": [ "log","error", "warn"] }] ]
                plugins: [ ['transform-remove-console'] ],
              },
            },
          
        },
      ],
    },
  };
};