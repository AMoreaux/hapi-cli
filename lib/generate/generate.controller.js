const newFile = require('../utils/newFile');
const controllerAssets = require('../../assets/controllers/controller');
const logger = require('../utils/logger');
const capitalize = require('../utils/capitalize');
const getProjectPath = require('../utils/getProjectPath');

const availableMethods = ['create', 'remove', 'find', 'update'];

exports.new = async (name, options = {}, projectPath = getProjectPath()) => {
  function getMethods() {
    const methods = (!options.methods || options.methods === 'crud') ? availableMethods : options.methods.split(',');

    methods.forEach((method) => {
      if (availableMethods.indexOf(method) === -1) {
        logger.warn(`${method} is not a valid method. You can use "create", "remove", "find" or "update")`);
      }
    });

    return controllerAssets.get(methods);
  }
  const controller = await getMethods(options);
  await newFile({
    projectPath,
    filePath: 'controllers/',
    fileName: `${name}.controller`,
    fileType: 'js',
    fileContent: controller,
    nodeModule: true,
    entity: name,
    modules: ['mongoose', 'boom', { [name]: `Models.${capitalize(name)}` }],
  });
};
