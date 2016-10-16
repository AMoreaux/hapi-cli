module.exports = {

  create: "(request, reply) => { reply({'success': 'user_created'});}",

  update: "(request, reply) => {reply({'success': 'user_updated'});}",

  find: "(request, reply) => { reply({'success': 'user_find'});}",

  remove: "(request, reply) => { reply({'success': 'user_delete'}); }",

  get: function (params) {

    const result = {};

    params.map((elm) => {
      result[elm] = this[elm];

    });

    return result;
  }
};