module.exports = {

  create: `async (request, h) => {
    try{
      const {{entity}} = await new {{entity.upperFirstChar}}(request.payload).save();
      return h.response({'success': '{{entity}}_created', '{{entity}}': {{entity}}}).code(201);
    }catch (err){
      throw Boom.badRequest(err);
    }
  }`,

  update: `async (request, h) => {
    try{
      const result = await {{entity.upperFirstChar}}.findOneAndUpdate({_id: request.params.id}, request.payload, {new: true}).exec();
      return result;
    }catch(e){
      return Boom.badRequest(err);
    }
  }`,

  find: `async (request, h) => {
    try{
      const query = await {{entity.upperFirstChar}}.find({
        _id: request.params.id
      }).exec();
      return query;
    }catch(e){
      return Boom.badData(err);
    }
  }`,

  remove: `async (request, h) => {
    try{
      await {{entity.upperFirstChar}}.findOneAndRemove({
        _id: request.params.id
      }).exec();
      return {'success': 'user_delete'};  
    }catch(e){
      return Boom.badData(err);
    }
  }`,

  get: function (methodList) {

    const result = {};

    methodList.forEach((method) => {
      result[method] = this[method];
    });

    return result;
  }
};
