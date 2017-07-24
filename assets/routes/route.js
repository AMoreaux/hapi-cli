'use strict';
const hoek = require('hoek');

module.exports = {
  '404': {
    handler: `(request, reply) => {
        reply(Boom.badRequest('route does not exist'));
      }`,
    uri: '/{p*}'
  },
  'POST': {
    handler: "{{entity.upperFirstChar}}Controller.create",
    uri: ''
  },
  'GET': {
    handler: "{{entity.upperFirstChar}}Controller.find",
    uri: '/{id}'
  },
  'DELETE': {
    handler: "{{entity.upperFirstChar}}Controller.remove",
    uri: '/{id}'
  },
  'PUT': {
    handler: "{{entity.upperFirstChar}}Controller.update",
    uri: '/{id}'
  },
  get: function (name, payload = {}) {
    return hoek.merge(this[name], this.config(name, payload));
  },
  config: (name, payload) => {
    const config = {
      config: {
        auth: false
      },
      pre: []
    };
    if (name !== 'GET' && name !== '404' ){
      config.config.validate = {
        options: {
          abortEarly: false
        },
        payload
      }
    }
    return config;
  }
};

