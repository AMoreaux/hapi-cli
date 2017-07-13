const capitalize = require('./capitalize');
const manipulateJS = require('./manipulateJS');

module.exports = (params) => {
  let modules = '';

  return `${addModules()} ${parseToJSON()}`;

  function parseToJSON() {
    return params.fileContent
      .replace(/GET|POST|DELETE|OPTIONS|PATCH|PUT|HEAD|LINK|UNLINK|PURGE|LOCK|UNLOCK|COPY|\*'/g, '"$&"')
      .replace(/\/(.*?)(?=,)/g, '"$&"')
  }

  function addModules() {
    if(params.controller !== 'none'){
      const controller = `${capitalize(params.controller || params.entity)}Controller`;
      modules += ` const ${controller} = require('../controllers/${controller}');`;
    }
    modules += ` const Joi = require('joi');`;
    modules += `${manipulateJS.breakLine} module.exports = `;
    return modules
  }
};