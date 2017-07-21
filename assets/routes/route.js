'use strict';

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
  }
};

