'use strict';
const hoek = require('hoek');
const getPropertiesFromModel = require('../../lib/utils/getPropertiesFromModel');
module.exports = {
  '404': {
    handler: `(request, reply) => {
        reply(Boom.badRequest('route does not exist'));
      }`,
    uri: '/{p*}'
  },
  'POST': {
    handler: "{{entity.upperFirstChar}}Controller.create",
    uri: '',
    validate: {
      payload: {}//getPropertiesFromModel
    }
  },
  'GET': {
    handler: "{{entity.upperFirstChar}}Controller.find",
    uri: '/{id}',
    validate: {
      params: {
        'id': "Joi.require()"
      }
    }
  },
  'DELETE': {
    handler: "{{entity.upperFirstChar}}Controller.remove",
    uri: '/{id}',
    validate: {
      params: {
        'id': "Joi.require()"
      }
    }
  },
  'PUT': {
    handler: "{{entity.upperFirstChar}}Controller.update",
    uri: '/{id}',
    validate: {
      params: {
        'id': "Joi.require()"
      }
    }
  },
  get: function (name, projectPath, modelName) {
    const route = hoek.merge(this[name], this.defaultConfig(name));
    this.customConfig(name, modelName, route, projectPath);
    return route;
  },

  defaultConfig: function (name) {
    if (!this[name].validate) return {};

    return {
      config: {
        auth: false,
        options: {
          abortEarly: false,
          allowUnknown: true
        }
      },
      pre: []
    };
  },

  customConfig: function (name, modelName, route, projectPath) {

    if (!this[name].validate) return {};

    for (let validate in this[name].validate) {
      if (typeof this[name].validate[validate] === 'function') {
        this[name].validate[validate] = this[name].validate[validate](projectPath, modelName)
      }
    }

    route.config.validate = this[name].validate;
  }
};

