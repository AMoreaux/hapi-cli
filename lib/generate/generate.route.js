const async = require('async');
const _ = require('lodash');
const newFile = require('../../utils/newFile');
const capitalize = require('../../utils/capitalize');
const util = require('util');

exports.new = (name, params, cb) => {

  const projectPath = require('../../utils/getProjectPath')();
  const verbs = ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT', 'HEAD', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'COPY', '*'];

  let routes = [];

  async.waterfall([

    async.apply(addProperties, route, params),

    async.apply(newFile, {
      projectPath: projectPath,
      filePath: 'routes/',
      fileName: `${name}.route`,
      fileType: 'js',
      fileContent: routes,
      nodeModule: true
    })
  ], (err, result) => {

    if (err) {
      console.log(`error: ${err}`.error);
      process.exit()
    }

    cb();
  });

  function addProperties(route = {}, params, cb) {

    if (!params) {
      return cb(null);
    }

    route.method = (verbs.indexOf(route.method) !== -1) ? params.method : cb(`VERB ${route.method} is not available`);
    route.path = params.path;
    route.handlet = params.handler;
  }
};



