const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = function() {
  let htmlString;
  htmlString = {
    plugins: [
      new ProgressBarPlugin(
        {
          format:  chalk.bold(':msg') + chalk.blue(' [:bar] ') + chalk.green.bold(':percent   ') + chalk.bgYellowBright.bold.blackBright(' (left time: :elapsed seconds) '),
          clear: true,
        }
        
      ),
    ],
  };
  
  return htmlString;
};
