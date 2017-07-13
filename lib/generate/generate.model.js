'use strict';

const newFile = require('../../utils/newFile');
const capitalize = require('../../utils/capitalize');
const modelsAssets = require('../../assets/models/model.js');
const schemaTypes = ['String', 'Number', 'Buffer', 'Boolean', 'Date', 'Mixed', 'ObjectId', 'Array'];
const logger = require('../../utils/logger');
const hoek = require('hoek');

exports.new = async (name, options, projectPath = require('../../utils/getProjectPath').get()) => {

  const model = await getProperties(options);
  await newFile({
    projectPath: projectPath,
    filePath: 'models/',
    fileName: `${name}.model`,
    fileType: 'js',
    fileContent: model,
    nodeModule: true
  });

  function getProperties(options) {

      const model = {
        schema: modelsAssets.get(['createdAt', 'updatedAt']),
        statics: {},
        methods: {},
        onSchema: {
          pre: {},
          post: {}
        }
      };

      if (!/([a-zA-Z]+:[a-zA-Z]+) */g.test(options.properties)) {
        throw new Error('error: wrong format of params (firstname:String age:Number)')
      }

      let properties = options.properties.split(',');

      properties.map((elm) => {

        let key = elm.split(':')[0];
        let value = capitalize(elm.split(':')[1]);

        if (schemaTypes.indexOf(value) !== -1) {
          model.schema[key] = value;
        } else {

          logger.warn(`${value} for ${key} is unavailable schema type`)
        }
      });


      return model;
    }
};



