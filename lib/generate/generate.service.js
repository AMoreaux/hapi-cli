const newFile = require('../utils/newFile');
const serviceAssets = require('../../assets/services/service');
const getProjectPath = require('../utils/getProjectPath');

exports.new = async (name, options = {}, projectPath = getProjectPath()) => {
  await newFile({
    projectPath,
    filePath: 'services/',
    fileName: `${name}.service`,
    fileType: 'js',
    fileContent: serviceAssets.get(name),
    nodeModule: true,
    modules: options.modules.split(','),
  });
};
