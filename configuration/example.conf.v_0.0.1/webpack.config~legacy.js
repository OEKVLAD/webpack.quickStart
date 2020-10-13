import Config from "./config";

const path = require('path');
const merge = require('webpack-merge');
const entry = require('webpack-glob-entry');
//////////////////////////////////////////////////////////////////////////////////
//loaders
const sass_loaders = require('./../../loaders/sass');
// const css_loaders = require('./../../loaders/postcss_files');
const babel_loaders = require('./../../loaders/legacy~babelJQ.js');
const sourcemapJS1 = require('./../../loaders/sourceMap');
const JSX_loaders = require('./../../loaders/jsx');
const file_loaders = require('./../../loaders/file_loaders');
const typeScript_loaders = require('./../../loaders/typeScript');
const ignoreLoaders = require('./../../loaders/ignore_style_font');
const postcss_loader = require('./../../loaders/postcss');
//end loaders
//////////////////////////////////////////////////////////////////////////////////
//partial
const optimization_parts = require('./../../parts/optimization.js');
//end partial
//////////////////////////////////////////////////////////////////////////////////
//plugins
const HtmlWebpack_plugin = require('./../../plugings/htmlWebpack/noTagsOnlyCreate');
const tinyCompress_plugin = require('./../../plugings/tinyCompressPlugin');
const dev_server = require('./../../plugings/devserver');
const sourceMap = require('./../../plugings/sourceMap');
const spriteSmith_plugin = require('./../../plugings/SpriteSmithPlugin.js');
const environment_plugin = require('./../../plugings/EnvironmentPlugin.js');
const swJs = require('./../../plugings/service_worker_generate_sw.js');
const manifest = require('./manifest.js');
const progressBar_views = require("./../../plugings/progress_bar_webpack.js");
const Analyze_code = require("./../../plugings/bundler_analyze.js");
const compress_assets = require("./../../plugings/compress_assets.js");
const font_min = require("./../../plugings/fontmin.js");

// const globals_var = require('./../../../app/config/zegarek_net/globals');
// const unusedfiles = require('./../../plugings/unusedfiles');
//end plugins
//////////////////////////////////////////////////////////////////////////////////
// PATH
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
// end path
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////\
// partial
const common = merge([
  //in_out_points
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
          "bundle":     ["@babel/polyfill",  path.resolve(PATHS.source,'index.js')],
        },
        entry(path.resolve( PATHS.source_twig, '*.index.js')),
        entry(path.resolve( PATHS.source_twig, '**/*.index.js')),
    ),
    output: {
      filename: 'legacy~'+Config.getPathBuild + '/[name].js?[contenthash]/' + Math.floor((Math.random() * 100000) + 1),
      chunkFilename: 'legacy~'+Config.getPathBuildModule + '/module.[name].js?[contenthash]/' + Math.floor((Math.random() * 100000) + 1),
      publicPath: '/',
      path: path.resolve(__dirname, PATHS.build),
    },
  },

  babel_loaders(),

  postcss_loader(Config.getProjectPrefix, pathBase),

  file_loaders(pathIN.resources, pathOUT.resources, Config.getPublicPathResources),

  environment_plugin(Config.getPathBuild + "/entery.json"),
  progressBar_views(),



]);

module.exports = function (env, argv) {
    console.log("legacy cod");
  if (argv.mode === 'production') {
    return merge([
      common,
      tinyCompress_plugin(PATHS.build+"*"),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      module.exports = {
       stats: 'none'
      },
    ]);
  }
};
