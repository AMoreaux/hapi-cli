const newFile = require('../utils/newFile');
const capitalize = require('../utils/capitalize');
const modelsAssets = require('../../assets/models/model.js');
const getProjectPath = require('../utils/getProjectPath');

const schemaTypes = ['String', 'Number', 'Buffer', 'Boolean', 'Date', 'Mixed', 'ObjectId', 'Array'];
const logger = require('../utils/logger');

exports.new = async (name, options, projectPath = getProjectPath()) => {
  function getContent() {
    const model = {
      schema: modelsAssets.getProperties(['createdAt', 'updatedAt']),
      statics: {},
      methods: {},
      onSchema: {
        pre: {},
        post: {},
      },
    };

    if (options.properties) {
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
    }

    if (options.methods) {
      const methods = options.methods.split(',');
      model.methods = modelsAssets.getMethods(methods);
    }

    if (options.hooks) {
      const hooks = options.hooks.split(',');
      model.onSchema = modelsAssets.getHooks(hooks, model.onSchema);
    }

    return model;
  }

  const model = await getContent(options);

  await newFile({
    projectPath,
    filePath: 'models/',
    fileName: `${name}.model`,
    fileType: 'js',
    fileContent: model,
    modules: ['mongoose', 'bcrypt', { Schema: 'Mongoose.Schema' }, { ObjectId: 'Schema.ObjectId' }, { crypto: 'require("../services/cryptPassword.service")' }],
    nodeModule: true,
  });
};

