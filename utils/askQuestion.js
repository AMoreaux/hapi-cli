const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = (question) => {
  return new Promise((res) => {
    rl.question(question.question, answer => {
      res(answer);
    });
  });
};