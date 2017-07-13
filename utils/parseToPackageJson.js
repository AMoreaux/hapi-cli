const { readFileSync } = require('fs');
const path = require('path');
const hoek = require('hoek');

module.exports = (params) => {
  const packageRef = readFileSync(path.join(params.projectPath, 'package.json'));
  return JSON.stringify(hoek.merge(JSON.parse(packageRef), JSON.parse(params.fileContent)));
};