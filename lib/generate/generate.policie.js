'use strict';

const newFile = require('../utils/newFile');
const policieAssets = require('../../assets/policies/policie');
const logger = require('../utils/logger');
const capitalize = require('../utils/capitalize');

exports.new = async (name, options = {}, projectPath = require('../utils/getProjectPath')()) => {

  await newFile({
    projectPath: projectPath,
    filePath: 'policies/',
    fileName: `${name}.policie`,
    fileType: 'js',
    fileContent: policieAssets[name],
    nodeModule: true,
    entity: name,
    modules: ['mongoose', 'boom', {User: `Models.User`}]
  });
};
