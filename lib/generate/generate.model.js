const async = require('async');
const _ = require('lodash');
const newFile = require('../../../utils/newFile');
const capitalize = require('../../../utils/capitalize');
const util = require('util');

exports.new = (name, params, cb) => {

  const projectPath = require('../../../utils/getProjectPath')();
  const schemaTypes = ['String', 'Number', 'Buffer', 'Boolean', 'Date', 'Mixed', 'Objectid', 'Array'];

  let model = {
    schema: {},
    statics: {},
    methods: {},
    onSchema: {
      pre: {},
      post: {}
    }
  };

  async.waterfall([

    async.apply(addProperties, model, params),
    async.apply(newFile, {
      projectPath: projectPath,
      filePath: 'models/',
      fileName: `${name}.model`,
      fileType: 'js',
      fileContent: model,
      nodeModule: true
    })
  ], (err, result) => {

    if (err) {
      console.log(`error: ${err}`.error);
      process.exit()
    }

    cb();
  });

  function addProperties(params, cb) {

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

    cb(null);
  }
};



