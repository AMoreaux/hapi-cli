const newFile = require('../utils/newFile');
const util = require('util');
const routeAssets = require('../../assets/routes/route.js');
const capitalize = require('../utils/capitalize');

const available_verbs = ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT', 'HEAD', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'COPY', '*'];

exports.new = async (name, options, projectPath = require('../utils/getProjectPath')()) => {

  const modules = ['joi', 'boom'];
  if(options.controller !== 'none'){
    const controllerName = `${capitalize(options.controller || name)}Controller`;
    const property = `require('../controllers/${name.toLowerCase()}.controller')`;
    modules.push({[controllerName]: property})
  }

  await newFile({
    projectPath: projectPath,
    filePath: 'routes/',
    fileName: `${name}.route`,
    entity: name,
    controller: options.controller,
    fileType: 'js',
    fileContent: getProperties(options),
    nodeModule: true,
    modules: modules
  });

  function getProperties(options) {

    const verbs = (!options.verbs || options.verbs.toUpperCase() === 'CRUD') ? ['GET', 'POST', 'DELETE', 'PUT'] : options.verbs.split(',');

    return verbs.map((verb) => {
      verb = verb.toUpperCase();
      if(available_verbs.indexOf(verb) === -1) throw new Error(`VERB ${verb} is not available`);
      const routeParams = routeAssets.get(options.custom || verb);
      return {
        method: `'${verb}'`,
        path: "'" + ((options.custom) ? routeParams.uri : `/${name}${routeParams.uri}`) + "'",
        handler: routeParams.handler,
        config: routeParams.config
      };
    });
  }
};




