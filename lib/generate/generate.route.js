const newFile = require('../../utils/newFile');
const util = require('util');
const verbs = ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT', 'HEAD', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'COPY', '*'];

exports.new = async (name, params, projectPath = require('../../utils/getProjectPath').get()) => {

  let routes = [];

  await getProperties(params);
  await newFile( {
    projectPath: projectPath,
    filePath: 'routes/',
    fileName: `${name}.route`,
    fileType: 'js',
    fileContent: routes,
    nodeModule: true
  });

  function getProperties(params) {

    if (!params) {
      return cb(null);
    }

    let route = {};
    route.method = (verbs.indexOf(params.method.replace(/'/g, '')) !== -1) ? params.method : cb(`VERB ${params.method} is not available`);
    route.path = params.path;
    route.handler = params.handler;

    routes.push(route);
  }
};




