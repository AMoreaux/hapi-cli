'use strict';

const newFile = require('../utils/newFile');
const controllerAssets = require('../../assets/controllers/controller');
const available_methods = ['create', 'remove', 'find', 'update'];
const logger = require('../utils/logger');
const capitalize = require('../utils/capitalize');

exports.new = async (name, options = {}, projectPath = require('../utils/getProjectPath')()) => {

  const controller = await getMethods(options);
  await newFile({
    projectPath: projectPath,
    filePath: 'controllers/',
    fileName: `${name}.controller`,
    fileType: 'js',
    fileContent: controller,
    nodeModule: true,
    entity: name,
    modules: ['mongoose', 'boom', {[name] : `Models.${capitalize(name)}`}]
  });

  function getMethods(options) {

    const methods = (!options.methods || options.methods === 'crud') ? available_methods : options.methods.split(',');

    methods.forEach((method)=>{
      if (available_methods.indexOf(method) === -1) {
        logger.warn(`${method} is not a valid method. You can use "create", "remove", "find" or "update")`)
      }
    });

    return controllerAssets.get(methods);
  }
};
