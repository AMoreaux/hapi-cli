const capitalize = require('./capitalize');
const manipulateJS = require('./manipulateJS');

module.exports = (params) => {

  // if(params.controller !== 'none'){
  //   params.fileContent = ` const ${capitalize(params.controller || params.entity)}Controller = require('../controllers/${params.entity.toLowerCase()}.controller'); ${manipulateJS.breakLine} ${params.fileContent}`;
  // }

  return params.fileContent
};