module.exports = {
  createdAt:{
    "type": "Date",
    "default": "Date.now()"
  },
  updatedAt: {
    "type": "Date",
    "default": "Date.now()"
  },
  get:function (properties){
    const result = {};
    properties.forEach((property) => {
      result[property] = this[property];
    });
    return result;
  }

};
