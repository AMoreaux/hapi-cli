const Path = require('path');
const util = require('util');
const fs = require('fs');
const logger = require('../utils/logger');

const fsMkdirPromise = util.promisify(fs.mkdir);

module.exports = async (params) => {
  if (fs.existsSync(params.projectPath)) throw new Error(`project ${params.projectName} already exists`);

  for (const folder of params.folders) {
    await fsMkdirPromise(Path.join(params.projectPath, folder));
  }

  return logger.info('Folders created');
};
