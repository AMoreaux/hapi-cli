module.exports = {

  hashPassword: `function (next) {
    let user = (this.op === 'update') ? this._update.$set : this;
    if (!user || !user.password || user.password.length === 60) {
      return next();
    }
    Bcrypt.genSalt(Config.get('server.auth.saltFactor'), (err, salt) => {
      if (err) {
        return next(err);
      }
      Bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  };`,

  get:function (services){
    const result = {};
    if(!Array.isArray(services)){
      return this[services]
    }
    services.forEach((service) => {
      result[service] = this[service];
    });
    return result;
  },

};