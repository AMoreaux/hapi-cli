module.exports = {

  create: `(request, reply) => {
    const {{entity}} = new {{entity.upperFirstChar}}(request.payload);
    {{entity}}.save((err, {{entity}}) => { 
      if (err) {
        return reply(Boom.badRequest(err));
      }
      reply({'success': '{{entity}}_created'});
    });
  }`,

  update: `(request, reply) => {
    {{entity.upperFirstChar}}.findOneAndUpdate({_id: request.params.id}, request.payload, {new: true})
      .exec((err, result) => {
        if (err) {
          return reply(Boom.badRequest(err));
        }
        reply(result);
      })
    }`,

  find: `(request, reply) => {
    {{entity.upperFirstChar}}.find({_id: request.params.id})
      .exec((err, result) => {
        if (err) {
          return reply(Boom.badData(err));
        }
        reply(result);
      })
    }`,

  remove: `(request, reply) => {
    {{entity.upperFirstChar}}.findOneAndRemove({_id: request.params.id})
      .lean()
      .exec((err, result) => {
        if (err) {
          return reply(Boom.badData(err));
        }
        reply({'success': 'user_delete'});  
      })
    }`,

  get: function (methodList) {

    const result = {};

    methodList.forEach((method) => {
      result[method] = this[method];
    });

    return result;
  }
};
