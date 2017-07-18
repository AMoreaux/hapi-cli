const style = require('.//logger').getTheme().question;
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = (question) => {
  return new Promise((res) => {
    rl.question(style(question), answer => {
      res(answer);
    });
  });
};