const path = require('path');

module.exports = (name) => {

  return (name) ? path.join(process.cwd(), name): process.cwd();
};
