'use strict';

const async = require('async');
const newFile = require('../../utils/newFile');
const capitalize = require('../../utils/capitalize');
const _ = require('lodash');
const schemaTypes = ['String', 'Number', 'Buffer', 'Boolean', 'Date', 'Mixed', 'ObjectId', 'Array'];

exports.new = (name, params, projectPath, cb) => {

  if (typeof projectPath === 'function') {
    cb = projectPath;
    projectPath = require('../../utils/getProjectPath').get();
  }
  
  async.waterfall([

    async.apply(getProperties, params),
    formatParamsNewFile,
    newFile
  ], (err, result) => {

    if (err) {
      console.log(`error: ${err}`.error);
      process.exit()
    }

    cb(null);
  });

  /**
   * @param model
   * @param cb
   */
  function formatParamsNewFile(model, cb) {

    cb(null, {
      projectPath: projectPath,
      filePath: 'models/',
      fileName: `${name}.model`,
      fileType: 'js',
      fileContent: model,
      nodeModule: true
    })
  }

  function getProperties(params, cb) {

      const model = {
        schema: {},
        statics: {},
        methods: {},
        onSchema: {
          pre: {},
          post: {}
        }
      };

      if (!params) {
        return cb(null);
      }

      if (!/([a-zA-Z]+:[a-zA-Z]+) */g.test(params)) {
        return cb('error: wrong format of params'.error)
      }

      let properties = params.split(' ');

      properties.map((elm) => {

        let key = elm.split(':')[0], value = capitalize(elm.split(':')[1]);

        if (schemaTypes.indexOf(value) !== -1) {

          _.set(model.schema, `${key}`, value);
        } else {

          console.log(`${value} for ${key} is unvailable schema type`.warn)
        }
      });

      return(cb) ? cb(null, model): model;
    }
};



