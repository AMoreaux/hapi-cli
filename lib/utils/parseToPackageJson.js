const hoek = require('hoek');

module.exports = (params) => {
  return JSON.stringify(hoek.merge(params.customData, JSON.parse(params.fileContent)));
};