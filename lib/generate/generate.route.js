const async = require('async');
const _ = require('lodash');
const newFile = require('../../utils/newFile');
const util = require('util');
const verbs = ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT', 'HEAD', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'COPY', '*'];

exports.new = (name, params, projectPath, cb) => {

  if (typeof projectPath === 'function') {
    cb = projectPath;
    projectPath = require('../../utils/getProjectPath').get();
  }

  let routes = [];

  async.waterfall([

    async.apply(getProperties, params),
    formatParamsNewFile,
    newFile
  ], (err, result) => {

    if (err) {
      console.log(`error: ${err}`.error);
      process.exit()
    }

    cb();
  });

  function formatParamsNewFile(cb) {

    cb(null, {
      projectPath: projectPath,
      filePath: 'routes/',
      fileName: `${name}.route`,
      fileType: 'js',
      fileContent: routes,
      nodeModule: true
    })
  }

  function getProperties(params, cb) {

    if (!params) {
      return cb(null);
    }

    let route = {};
    route.method = (verbs.indexOf(params.method.replace(/'/g, '')) !== -1) ? params.method : cb(`VERB ${params.method} is not available`);
    route.path = params.path;
    route.handler = params.handler;

    routes.push(route);

    cb(null)
  }
};




