const chalk = require('chalk');

const theme = {
  error: chalk.bold.red,
  info: chalk.bold.green,
  question: chalk.bold.blue,
  warn: chalk.bold.yellow
};


module.exports = {
  warn: message => console.log(theme.warn(message)),
  question: message => console.log(theme.question(message)),
  error: message => console.log(theme.error(`\u274C  ${message}`)),
  info: message => console.log(theme.info(`\u2713  ${message}`)),
  getTheme: () => theme
};