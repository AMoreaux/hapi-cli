const hoek = require('hoek');
const getPropertiesFromModel = require('../../lib/utils/getPropertiesFromModel');

module.exports = {
  404: {
    handler: `(request, h) => {
        return Boom.badRequest('route does not exist');
      }`,
    uri: '/{p*}',
    options: {}
  },
  POST: {
    handler: '{{entity.upperFirstChar}}Controller.create',
    uri: '',
    options: {
      validate: {
        payload: {}//getPropertiesFromModel,
      },
    }
  },
  GET: {
    handler: '{{entity.upperFirstChar}}Controller.find',
    uri: '/{id}',
    options: {
      validate: {
        params: {
          id: 'Joi.required()',
        },
      },
    },
  },
  DELETE: {
    handler: '{{entity.upperFirstChar}}Controller.remove',
    uri: '/{id}',
    options: {
      validate: {
        params: {
          id: 'Joi.required()',
        },
      },
    },
  },
  PUT: {
    handler: '{{entity.upperFirstChar}}Controller.update',
    uri: '/{id}',
    options: {
      validate: {
        params: {
          id: 'Joi.required()',
        },
      },
    },
  },
  get(name, projectPath, modelName) {
    const route = hoek.merge(this[name], this.defaultConfig(name));
    this.customConfig(name, modelName, route, projectPath);
    return route;
  },

  defaultConfig(name) {
    // if (!this[name].options.validate) return {};

    return {
      options: {
        auth: false,
        validate: {
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
    if (!this[name].options.validate) return {};

    for (const validate in this[name].options.validate) {
      if (typeof this[name].options.validate[validate] === 'function') {
        this[name].options.validate[validate] = this[name].options.validate[validate](projectPath, modelName);
      }
    }

    route.options.validate = hoek.merge(route.options.validate, this[name].options.validate);
  },
};

