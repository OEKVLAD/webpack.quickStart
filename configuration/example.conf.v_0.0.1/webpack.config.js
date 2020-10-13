import Config from "./config";

const path = require('path');
const merge = require('webpack-merge');
const entry = require('webpack-glob-entry');

const babel_loaders = require('./../../loaders/babelJQ');
const file_loaders = require('./../../loaders/file_loaders');

const postcss_loader = require('./../../loaders/postcss');

const optimization_parts = require('./../../parts/optimization.js');

const tinyCompress_plugin = require('./../../plugings/tinyCompressPlugin');
const dev_server_plugin = require('./../../plugings/devserver');
const sourceMap_plugin = require('./../../plugings/sourceMap');
const environment_plugin = require('./../../plugings/EnvironmentPlugin.js');
const swJs_plugin = require('./../../plugings/service_worker_generate_sw.js');
const manifest_plugin = require('./manifest.js');
const progressBar_views_plugin = require("./../../plugings/progress_bar_webpack.js");
const font_min_plugin = require("./../../plugings/fontmin.js");
const umd_require_webpack_plugin = require("./../../plugings/UmdRequireWebpackPlugin.js");

const pathBase= __dirname + './../../../';

const pathIN = {
  JS: pathBase + Config.getPathJS,
  CSS: pathBase + Config.getPathCss,
  HTML: pathBase + Config.getPathHtml,
  resources: pathBase + Config.getPathResources,
};

const pathOUT = {
  JS: pathBase + Config.getPathPublic,
  HTML: pathBase + Config.getPathHtml,
  resources: __dirname + './../../' + Config.getOutPathResources,
};

const PATHS = {
  source: path.join( pathIN.JS),
  source_css: path.join( pathIN.CSS),
  source_twig: path.join( pathIN.HTML, "../"),
  build: path.join( pathOUT.JS),
};

const common = merge([
  {
    resolve: {
      modules: ['node_modules', 'node_modules/@material' ],
      alias: {
        _assets: path.resolve(pathBase, Config.getAliasPathAssets),
        _componets: path.resolve(pathBase, Config.getAliasPathComponent),
        _css: path.resolve(pathBase, Config.getAliasPathCss),
        _js: path.resolve(pathBase, Config.getAliasPathJs),
      }
    },
    entry:Object.assign(
{
        "bundle":     [ path.resolve(PATHS.source,'index.js')],
      },
        entry(path.resolve( PATHS.source_twig, '*.index.js')),
        entry(path.resolve( PATHS.source_twig, '**/*.index.js')),
    ),

    output: {
      filename: Config.getPathBuild + '/[name].js?[contenthash]/' + Math.floor((Math.random() * 100000) + 1),
      chunkFilename: Config.getPathBuildModule + '/module.[name].js?[contenthash]/' + Math.floor((Math.random() * 100000) + 1),
      publicPath: '/',
      path: path.resolve(__dirname, PATHS.build),
    },
  },

  optimization_parts(),

  postcss_loader(Config.getProjectPrefix, pathBase),
  file_loaders(pathIN.resources, pathOUT.resources, Config.getPublicPathResources),

  babel_loaders(),

  umd_require_webpack_plugin(),

  environment_plugin(Config.getPathBuild + "/entery.json"),
  swJs_plugin('service.worker.'+Config.getProjectPrefix+'.net.js'),
  manifest_plugin(pathOUT.JS+'assets/'+Config.getProjectPrefix+"/"),
  progressBar_views_plugin(),
  font_min_plugin(),
]);

module.exports = function (env, argv) {
  console.log('webpack start');
  if (argv.mode === 'production') {
    return merge([
      common,
      tinyCompress_plugin(PATHS.build+"*"),
    ]);
  }
  if (argv.mode === 'development') {
    console.log("" +
      "           .-.-..                                                                                                                                 \n" +
      "       .--:::.-:::-.                                                                                                                              \n" +
      "    .-:::::::.-::::::--.                                    .**:                                        :**.                  =###.               \n" +
      " .-::::::-.-+==:.--::::::-                                  -##=                                        =##-                .@####.               \n" +
      " :-..-..:=========+-.--..--     .:::   .::-   :::.  -+=+:.  -##=.*=+:.  .**-.+=+:     -*==+-     .*==*. =##-  -**-         -##*@##.               \n" +
      " ::::.-.*=========+-..-:::-      =##*  %###. -##% +###%@##@.-#####@###@.-#####@###%. =##@####. *####@##.=##-.@##:         +##- @##.               \n" +
      " ::::.+==*.-+==*.:===--:::-      .##@ :####* %##-*##=---:##=-##@    *##=-##@.   :##=  -++**##**##+      =##+##%.        .%#@.  @##.               \n" +
      " ::::.+======.*======--:::-       *##*@#+:##-##= +##%======+-##=    .##%-##=    .##%*##@*+###*+##:      =##+##%.       .##@++++###++-             \n" +
      " ::::.+======-+======--:::-        %####. %####. .###*..:@=.-###=..:###:-###=..:###:=##:  +##*.###+..:= =##--###-      :@@@@@@@###@@:             \n" +
      " :::-.-+=====-+=====:.-:::-        -###*  -###*    *######: -##%#####=. -##%@####%.  +####@##*  *#####@-=##- .%##+             @##.               \n" +
      " -..-::-..:==-+=*..-:::-...                                             -##=                                                   =%%.               \n" +
      "  .-:::::::-. .-:::::::-..                                              -##=                                                                      \n" +
      "     ..-:::::.-:::::-.                                                                                                                            \n" +
      "         .-::.-:-.                                                                                                                                \n" +
      "             ..                                                                                       create this config by Vladyslav             \n" +
      "");
    return merge([
      common,
      module.exports = {
        stats: 'errors-only'
      },
      sourceMap_plugin(pathOUT.JS),
      dev_server_plugin("http://localhost:8888", 3101, pathOUT.JS+"dist/zegarek_net/"),
    ]);
  }
};
