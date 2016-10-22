'use strict';

module.exports = {

  get404: () => {

    return {
      method: "'*'",

      path: "'/{p*}'",

      handler: "(request, reply) => { reply(Boom.badRequest('route does not exist'));}"
    }
  }
};
