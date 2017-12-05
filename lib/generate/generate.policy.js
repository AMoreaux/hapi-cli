const newFile = require('../utils/newFile');
const policyAssets = require('../../assets/policies/policy');
const getProjectPath = require('../utils/getProjectPath');

exports.new = async (name, options = {}, projectPath = getProjectPath()) => {
  await newFile({
    projectPath,
    filePath: 'policies/',
    fileName: `${name}.policy`,
    fileType: 'js',
    fileContent: policyAssets[name],
    nodeModule: true,
    entity: name,
    modules: ['mongoose', 'boom', { User: 'Models.User' }],
  });
};
