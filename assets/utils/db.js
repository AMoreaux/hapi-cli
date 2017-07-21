const colors = require('colors/safe');
const Mongoose = require('mongoose');
const Utils = require('./utils');
const err = console.error;
const log = console.log;
const path = require('path');

module.exports = () => {

  Mongoose.connect(Config.get('mongodb.uri'));

  Mongoose.connection.on('error', (e)=> {
    err('Mongoose can not open connection');
    err(e);
    process.exit();
  });

  Mongoose.connection.on('connected', () => {
    log(colors.green('Connection DB ok', Config.get('mongodb.uri')));
  });

  Mongoose.connection.on('disconnected', () => {
    err(colors.red('Connection DB lost'));

    setTimeout(() => {
      Mongoose.connect(Config.get('mongodb.uri'));
      err('DB reconnection');
    }, 15000);
  });

  global.Models = {};

  Utils.getFiles('models').forEach((modelFile) => {

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
          if(Array.isArray(modelInterface.onSchema[type][func])){
            for(var i = 0; i < modelInterface.onSchema[type][func].length; i++){
              schema[type](func, modelInterface.onSchema[type][func][i]);
            }
          }else{
            schema[type](func, modelInterface.onSchema[type][func]);
          }
        }
      }
    }

    let nameModel =  name.split('.')[0];
    nameModel = nameModel.charAt(0).toUpperCase() + nameModel.slice(1);
    Models[nameModel] = Mongoose.model(nameModel, schema);
  });
};