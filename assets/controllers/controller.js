module.exports = {

  create: `(request, reply) => {
    const user = new {{entity.upperFirstChar}}(request.payload);
    {{entity}}.save((err, {{entity}}) => { 
      if (err) {
        return reply(Boom.badRequest(err));
      }
      reply({'success': '{{entity}}_created'});
    });
  }`,

  update: `(request, reply) => {
    {{entity.upperFirstChar}}.findOneAndUpdate({_id: request.query.id}, request.payload, {new: true}).exec((err, result) => {
      if (err) {
        return reply(Boom.badRequest(err));
      }
      reply(result);
    })
   }`,

  find: "(request, reply) => { reply({'success': 'user_find'});}",

  remove: "(request, reply) => { reply({'success': 'user_delete'}); }",

  get: function (methodList) {

    const result = {};

    methodList.forEach((method) => {
      result[method] = this[method];
    });

    return result;
  }
};
