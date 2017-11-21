
const hoek = require('hoek');
const getPropertiesFromModel = require('../../lib/utils/getPropertiesFromModel');

module.exports = {
  404: {
    handler: `(request, h) => {
        return Boom.badRequest('route does not exist');
      }`,
    uri: '/{p*}',
  },
  POST: {
    handler: '{{entity.upperFirstChar}}Controller.create',
    uri: '',
    validate: {
      payload: {}//getPropertiesFromModel,
    },
  },
  GET: {
    handler: '{{entity.upperFirstChar}}Controller.find',
    uri: '/{id}',
    validate: {
      params: {
        id: 'Joi.required()',
      },
    },
  },
  DELETE: {
    handler: '{{entity.upperFirstChar}}Controller.remove',
    uri: '/{id}',
    validate: {
      params: {
        id: 'Joi.required()',
      },
    },
  },
  PUT: {
    handler: '{{entity.upperFirstChar}}Controller.update',
    uri: '/{id}',
    validate: {
      params: {
        id: 'Joi.required()',
      },
    },
  },
  get(name, projectPath, modelName) {
    const route = hoek.merge(this[name], this.defaultConfig(name));
    this.customConfig(name, modelName, route, projectPath);
    return route;
  },

  defaultConfig(name) {
    if (!this[name].validate) return {};

    return {
      options: {
        auth: false,
        validate:{
          options: {
            abortEarly: false,
            allowUnknown: true,
          },
        },
      },
      pre: [],
    };
  },

  customConfig(name, modelName, route, projectPath) {
    if (!this[name].validate) return {};

    for (const validate in this[name].validate) {
      if (typeof this[name].validate[validate] === 'function') {
        this[name].validate[validate] = this[name].validate[validate](projectPath, modelName);
      }
    }

    route.options.validate = hoek.merge(route.options.validate, this[name].validate);
  },
};

