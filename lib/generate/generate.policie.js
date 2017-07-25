const newFile = require('../utils/newFile');
const policieAssets = require('../../assets/policies/policie');
const getProjectPath = require('../utils/getProjectPath');

exports.new = async (name, options = {}, projectPath = getProjectPath()) => {
  await newFile({
    projectPath,
    filePath: 'policies/',
    fileName: `${name}.policie`,
    fileType: 'js',
    fileContent: policieAssets[name],
    nodeModule: true,
    entity: name,
    modules: ['mongoose', 'boom', { User: 'Models.User' }],
  });
};
