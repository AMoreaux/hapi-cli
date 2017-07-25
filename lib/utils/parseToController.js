const manipulateJS = require('./manipulateJS');
const capitalize = require('./capitalize');
const endOfLine = require('os').EOL;

module.exports = (params) => {

  if(params.controller !== 'none'){
    params.fileContent = ` const ${capitalize(params.entity)} = Mongoose.model('${params.entity}'); ${endOfLine} ${params.fileContent}`;
  }

  return params.fileContent
};