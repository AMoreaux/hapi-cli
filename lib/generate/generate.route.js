const newFile = require('../utils/newFile');
const routeAssets = require('../../assets/routes/route.js');
const capitalize = require('../utils/capitalize');
const getProjectPath = require('../utils/getProjectPath');

const availableVerbs = ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT', 'HEAD', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'COPY', '*'];

exports.new = async (name, options, projectPath = getProjectPath()) => {
  const modules = ['joi', 'boom'];
  if (options.controller !== 'none') {
    const controllerName = `${capitalize(options.controller || name)}Controller`;
    const property = `require('../controllers/${name.toLowerCase()}.controller')`;
    modules.push({ [controllerName]: property });
  }

  function getProperties() {
    const verbs = (!options.verbs || options.verbs.toUpperCase() === 'CRUD') ? ['GET', 'POST', 'DELETE', 'PUT'] : options.verbs.split(',');

    return verbs.map((verb) => {
      verb = verb.toUpperCase();
      if (availableVerbs.indexOf(verb) === -1) throw new Error(`VERB ${verb} is not available`);
      const routeParams = routeAssets.get(options.custom || verb, projectPath, name);
      return {
        method: `'${verb}'`,
        path: `'${((options.custom) ? routeParams.uri : `/${name}${routeParams.uri}`)}'`,
        handler: routeParams.handler,
        config: routeParams.config,
      };
    });
  }

  await newFile({
    projectPath,
    filePath: 'routes/',
    fileName: `${name}.route`,
    entity: name,
    controller: options.controller,
    fileType: 'js',
    fileContent: getProperties(options),
    nodeModule: true,
    modules,
  });
};

