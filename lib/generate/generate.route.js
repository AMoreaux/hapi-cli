const newFile = require('../utils/newFile');
const util = require('util');
const routeAssets = require('../../assets/routes/route.js');

const available_verbs = ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT', 'HEAD', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'COPY', '*'];

exports.new = async (name, options, projectPath = require('../utils/getProjectPath')()) => {


  await newFile( {
    projectPath: projectPath,
    filePath: 'routes/',
    fileName: `${name}.route`,
    entity: name,
    controller: options.controller,
    fileType: 'js',
    fileContent: getProperties(options),
    nodeModule: true
  });

  function getProperties(options) {


    const verbs = (!options.verb || options.verb.toUpperCase() === 'CRUD') ? ['GET', 'POST', 'DELETE', 'PUT'] : options.verb.split(',');

    return verbs.map((verb) => {
      verb = verb.toUpperCase();
      if(available_verbs.indexOf(verb) === -1) throw new Error(`VERB ${verb} is not available`);
      return {
        method: verb,
        path: options.uri,
        handler: routeAssets[options.custom || verb]
      };
    });
  }
};




