const {promisify} = require('util');
const fs = require('fs');
const fsReadFilePromise = promisify(fs.readFile);
const Path = require('path');

module.exports = async (projectPath, modelName) => {

  const path = Path.join(projectPath, 'models', `${modelName}.model.js`);

  // const test = require(path);

  // console.log('>>>>>>>>>> test', test.schema);

  const modelContentStingify = await fsReadFilePromise(path, 'utf8');
  const properties = modelContentStingify.match(/type:( |[a-zA-Z]|\.)+/gm);

  const result = {};

  console.log('>>>>>>>>>>', properties);

  properties.forEach((property) => {
    let test = property.replace(' ', '').split(':');
    result[test[0]] = `Joi.${test[1].toLowerCase()}()`
  })

  console.log('>>>>>>>>>>', result);


  // const modelContent = eval('(' + modelContentStingify.match(/{[^]+/gm)[0]+')')
  //
  // const result = [];
  // for(let key in modelContent.schema){
  //   if(key !== 'updatedAt' && key !== 'createdAt'){
  //     if(typeof modelContent.schema[key] === 'object'){
  //       result.push({[key]: 'Joi.optionnal()'modelContent.schema[key].type.name});
  //       continue
  //     }
  //     result.push({[key]: modelContent.schema[key].name})
  //   }
  // }
  // return result;
};