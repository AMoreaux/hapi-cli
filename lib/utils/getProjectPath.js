/* eslint-disable no-confusing-arrow */
const path = require('path');

module.exports = name => (name) ? path.join(process.cwd(), name) : process.cwd();
