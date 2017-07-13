'use strict';

module.exports = {
  '404': "(request, reply) => { reply(Boom.badRequest('route does not exist'));}",
  'POST': "{{entity.upperFirstChar}}Controller.create",
  'GET': "{{entity.upperFirstChar}}Controller.find",
  'DELETE': "{{entity.upperFirstChar}}Controller.remove",
  'PUT': "{{entity.upperFirstChar}}Controller.update",
};

