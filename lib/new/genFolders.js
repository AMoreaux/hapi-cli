/**
 * Created by antoinemoreaux on 03/07/2016.
 */

const Path = require('path');
const util = require('util');
const fs = require('fs');
const fsMkdirPromise = util.promisify(fs.mkdir);
const logger = require('../../utils/logger');

module.exports = async (params) => {


  if (fs.existsSync(params.projectPath)) throw new Error(`project ${params.projectName} already exists`);

  for (let folder of params.folders) {
     await fsMkdirPromise(Path.join(params.projectPath, folder));
  }

  logger.info('Folders created');
};