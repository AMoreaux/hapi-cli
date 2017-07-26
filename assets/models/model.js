const capitalize = require('../../lib/utils/capitalize')

module.exports = {
  schema:{
    createdAt:{
      "type": "Date",
      "default": "Date.now()"
    },
    updatedAt: {
      "type": "Date",
      "default": "Date.now()"
    },
  },
  methods: {
    comparePassword: `function (candidatePassword, cb) {
      Bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch);
      });
    }`,
  },
  hooks: {
    addDate : `function(){
      this.update({},{ $set: { updatedAt: new Date() } });
    }`
  },


  getProperties:function (properties){
    const result = {};
    properties.forEach((property) => {
      result[property] = this.schema[property];
    });
    return result;
  },

  getMethods:function (methods){
    const result = {};
    methods.forEach((method) => {
      result[method] = this.methods[method];
    });
    return result;
  },

  getHooks: function (hooks, onSchema) {
    hooks.forEach((hook) => {
      const flowLocationAndName = hook.split('.');
      if(!onSchema[flowLocationAndName[0]][flowLocationAndName[1]])  onSchema[flowLocationAndName[0]][flowLocationAndName[1]] = [];
      onSchema[flowLocationAndName[0]][flowLocationAndName[1]].push((this.hooks[flowLocationAndName[2]]) ? this.hooks[flowLocationAndName[2]] : capitalize(flowLocationAndName[2]));
    });
    return onSchema
  }

};
