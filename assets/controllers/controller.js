module.exports = {

  create: "(request, reply) => { const {{entity.upperFirstChar}} = mongoose.model('{{entity}}'); const user = new {{entity.upperFirstChar}}(request.payload); {{entity}}.save((err, {{entity}}) => { if (err) {  return reply(Boom.badRequest(err));  } reply({'success': '{{entity}}_created'}); });}",

  update: "(request, reply) => {reply({'success': 'user_updated'});}",

  find: "(request, reply) => { reply({'success': 'user_find'});}",

  remove: "(request, reply) => { reply({'success': 'user_delete'}); }",

  get: function (params) {

    const result = {};

    if(typeof params === 'string') return this[params];

    params.forEach((elm) => {
      result[elm] = this[elm];
    });

    return result;
  }
};
