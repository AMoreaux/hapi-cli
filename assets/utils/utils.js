const Path = require('path');
const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
const path = require('path');
const Config = require('config');

module.exports = {

  getFiles: function (path) {
    path = path[path.length - 1] !== '/' ? path + '/' : path;
    let files = [];
    try {
      files = require('fs').readdirSync(Path.resolve(__dirname, '../..', path));
    } catch (e) {
      console.log(e);
      process.exit();
    }
    return files.map((file) => {
      return Path.resolve(__dirname, '../..', path, file)
    });
  },

  addRoute: function (server) {
    this.getFiles('routes').forEach((routesFile) => {

      require(routesFile).forEach((route) => {
        server.route(route);
      });
    });
  },

  addPolicies: function (server) {
    this.getFiles('policies').forEach((policyFile) => {

      let policy = require(policyFile);
      let name = path.basename(policyFile, '.js');
      let namePolicie = name.split('.')[0];


      server.auth.strategy(namePolicie, 'jwt', {
        key: Config.get('server.auth.secretKey'),
        validate: policy,
        verifyOptions: {algorithms: ['HS256'], ignoreExpiration: true}
      });

      if (namePolicie === 'default') {
        server.auth.default('default', 'jwt');
      }
    });
  },

  addModels: function () {
    global.Models = {};

    this.getFiles('models').forEach((modelFile) => {

      let modelInterface = require(modelFile);
      let schema = Mongoose.Schema(modelInterface.schema, {versionKey: false});
      let name = path.basename(modelFile, '.js');

      if (modelInterface.statics) {
        for (let modelStatic in modelInterface.statics) {
          schema.statics[modelStatic] = modelInterface.statics[modelStatic];
        }
      }

      if (modelInterface.methods) {
        for (let modelMethod in modelInterface.methods) {
          schema.methods[modelMethod] = modelInterface.methods[modelMethod];
        }
      }

      if (modelInterface.onSchema) {
        for (let type in modelInterface.onSchema) {
          for (let func in modelInterface.onSchema[type]) {
            if (Array.isArray(modelInterface.onSchema[type][func])) {
              for (var i = 0; i < modelInterface.onSchema[type][func].length; i++) {
                schema[type](func, modelInterface.onSchema[type][func][i]);
              }
            } else {
              schema[type](func, modelInterface.onSchema[type][func]);
            }
          }
        }
      }

      let nameModel = name.split('.')[0];
      nameModel = nameModel.charAt(0).toUpperCase() + nameModel.slice(1);
      Models[nameModel] = Mongoose.model(nameModel, schema);
    });
  }
};
