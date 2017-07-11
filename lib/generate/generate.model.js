'use strict';

const newFile = require('../../utils/newFile');
const capitalize = require('../../utils/capitalize');
const schemaTypes = ['String', 'Number', 'Buffer', 'Boolean', 'Date', 'Mixed', 'ObjectId', 'Array'];

exports.new = async (name, params, projectPath = require('../../utils/getProjectPath').get()) => {

  const model = await getProperties(params);
  await newFile({
    projectPath: projectPath,
    filePath: 'models/',
    fileName: `${name}.model`,
    fileType: 'js',
    fileContent: model,
    nodeModule: true
  });

  function getProperties(params) {

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
        throw new Error('error: wrong format of params')
      }

      let properties = params.split(' ');

      properties.map((elm) => {

        let key = elm.split(':')[0];
        let value = capitalize(elm.split(':')[1]);

        if (schemaTypes.indexOf(value) !== -1) {
          model.schema[key] = value;
        } else {

          console.log(`${value} for ${key} is unvailable schema type`.warn)
        }
      });


      return model;
    }
};



