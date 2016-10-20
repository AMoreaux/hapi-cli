/**
 * Created by antoinemoreaux on 20/10/2016.
 */
'use strict';
const schemaTypes = ['String', 'Number', 'Buffer', 'Boolean', 'Date', 'Mixed', 'Objectid', 'Array'];
const capitalize = require('./capitalize');
const _ = require('lodash');

module.exports = (params, cb) => {

  const model = {
    schema: {},
    statics: {},
    methods: {},
    onSchema: {
      pre: {},
      post: {}
    }
  };

  if (!params) {
    return cb(null);
  }

  if (!/([a-zA-Z]+:[a-zA-Z]+) */g.test(params)) {
    return cb('error: wrong format of params'.error)
  }

  let properties = params.split(' ');

  properties.map((elm) => {

    let key = elm.split(':')[0], value = capitalize(elm.split(':')[1]);

    if (schemaTypes.indexOf(value) !== -1) {

      _.set(model.schema, `${key}`, value);
    } else {

      console.log(`${value} for ${key} is unvailable schema type`.warn)
    }
  });

  return(cb) ? cb(null, model): model;
};
