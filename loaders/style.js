// documentatio
/*
*
*  Configuration
*   module.rules allows you to specify several loaders within your webpack configuration. This is a concise way to display
*   loaders, and helps to maintain clean code. It also offers you a full overview of each respective loader.
*
*   Loaders are evaluated/executed from right to left (or from bottom to top). In the example below execution starts with
*   sass-loader, continues with css-loader and finally ends with style-loader. See "Loader Features" for more information
*   about loaders order.
*
* Inline
*
*   It's possible to specify loaders in an import statement, or any equivalent "importing" method. Separate loaders from
*   the resource with !. Each part is resolved relative to the current directory.
*
*   import Styles from 'style-loader!css-loader?modules!./styles.css';
*
*   It's possible to override any loaders, preLoaders and postLoaders from the configuration by
*   prefixing the inline import statement:
*
*
*     1) Prefixing with ! will disable all configured normal loaders
*
*             import Styles from '!style-loader!css-loader?modules!./styles.css';
*
*     2) Prefixing with !! will disable all configured loaders (preLoaders, loaders, postLoaders)
*
*             import Styles from '!!style-loader!css-loader?modules!./styles.css';
*
*     3) Prefixing with -! will disable all configured preLoaders and loaders but not postLoaders
*
*             import Styles from '-!style-loader!css-loader?modules!./styles.css';
*
*     Options can be passed with a query parameter, e.g. ?key=value&foo=bar, or
*       a JSON object, e.g. ?{"key":"value","foo":"bar"}.
*
*
*      CLI
*
*       You can also use loaders through the CLI:
*     
*       webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
*
*       This uses the jade-loader for .jade files, and the style-loader and css-loader for .css files.
*
*     documentatio from webpack: https://webpack.js.org/concepts/loaders/#example
*
*
*     small guide for sass: https://sass-lang.com/guide
*/

module.exports = function() {
  let styleLoader;
  styleLoader={
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // style-loader
            { loader: 'style-loader' },
            // css-loader
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            // sass-loader
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
  };
  
  return styleLoader;
};