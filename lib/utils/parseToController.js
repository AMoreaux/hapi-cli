const manipulateJS = require('./manipulateJS');
const capitalize = require('./capitalize');

module.exports = (params) => {

  if(params.controller !== 'none'){
    params.fileContent = ` const ${capitalize(params.entity)} = Mongoose.model('${params.entity}'); ${manipulateJS.breakLine} ${params.fileContent}`;
  }

  return params.fileContent


  // let modules = '';

  // for (let module of params.modules) {
  //   modules += ` const ${capitalize(module)} = require('${module}');\r`
  // }

  // modules += `const ${capitalize(params.entity)} = Mongoose.model('${params.entity}')`;
  //
  // return`${modules} ${manipulateJS.breakLine} ${params.fileContent}`;
};