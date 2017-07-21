const capitalize = require('./capitalize');
const manipulateJS = require('./manipulateJS');

module.exports = (params) => {

  if(params.controller !== 'none'){
    params.fileContent = ` const ${capitalize(params.controller || params.entity)}Controller = require('../controllers/${params.entity.toLowerCase()}.controller'); ${manipulateJS.breakLine} ${params.fileContent}`;
  }

  return params.fileContent

  // let modules = '';
  //
  // return `${addModules()} ${parseToJSON()}`;
  //
  // function parseToJSON() {
  //   return params.fileContent
  //     .replace(/GET|POST|DELETE|OPTIONS|PATCH|PUT|HEAD|LINK|UNLINK|PURGE|LOCK|UNLOCK|COPY|\*'/g, '"$&"')
  //     .replace(/\/(.*?)(?=,)/g, '"$&"')
  // }
  //
  // function addModules() {
  //   if(params.controller !== 'none'){
  //     modules += ` const ${capitalize(params.controller || params.entity)}Controller = require('../controllers/${params.entity.toLowerCase()}.controller');`;
  //   }
  //   modules += ` const Joi = require('joi');`;
  //   modules += `${manipulateJS.breakLine} module.exports = `;
  //   return modules
  // }
};