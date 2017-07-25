const newFile = require('../utils/newFile');
const capitalize = require('../utils/capitalize');
const modelsAssets = require('../../assets/models/model.js');
const getProjectPath = require('../utils/getProjectPath');

const schemaTypes = ['String', 'Number', 'Buffer', 'Boolean', 'Date', 'Mixed', 'ObjectId', 'Array'];
const logger = require('../utils/logger');

exports.new = async (name, options, projectPath = getProjectPath()) => {
  function getProperties() {
    const model = {
      schema: modelsAssets.get(['createdAt', 'updatedAt']),
      statics: {},
      methods: {},
      onSchema: {
        pre: {},
        post: {},
      },
    };

    if (!options.properties) return model;

    if (!/([a-zA-Z]+:[a-zA-Z]+) */g.test(options.properties)) {
      throw new Error('error: wrong format of params (firstname:String,age:Number)');
    }

    const properties = options.properties.split(',');

    properties.forEach((elm) => {
      const key = elm.split(':')[0];
      const value = capitalize(elm.split(':')[1]);

      if (schemaTypes.indexOf(value) !== -1) {
        model.schema[key] = { type: value };
      } else {
        logger.warn(`${value} for ${key} is unavailable schema type`);
      }
    });


    return model;
  }

  const model = await getProperties(options);

  await newFile({
    projectPath,
    filePath: 'models/',
    fileName: `${name}.model`,
    fileType: 'js',
    fileContent: model,
    modules: ['mongoose', { Schema: 'mongoose.Schema' }, { ObjectId: 'Schema.ObjectId' }],
    nodeModule: true,
  });
};

