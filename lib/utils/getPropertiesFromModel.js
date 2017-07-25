const { promisify } = require('util');
const fs = require('fs');
const Path = require('path');

const fsReadFilePromise = promisify(fs.readFile);

module.exports = async (projectPath, modelName) => {
  const path = Path.join(projectPath, 'models', `${modelName}.model.js`);
  const modelContentStingify = await fsReadFilePromise(path, 'utf8');
  const result = {};
  let property = '';
  let key = [''];
  let onKey = true;
  let level = 0;

  function rebuildJsonSchema(string) {
    const decomposeString = string.replace(/( |\n|\r)+/gm, '').split('');
    decomposeString.pop();
    decomposeString.shift();

    console.log('>>>>>>>>>>', decomposeString[0], decomposeString[decomposeString.length - 1]);
    decomposeString.forEach((elm) => {
      if (elm === ':') {
        onKey = false;
        return;
      }
      if (elm === '{') {
        result[key[level]] = {};
        key.push('');
        level += 1;
        onKey = true;
        return;
      }

      if (elm === ',') {
        key[level] = '';
        result[key[level]] = property;
        property = '';
        onKey = true;
        return;
      }

      if (elm === '}') {
        level -= 1;
        onKey = true;
        return;
      }

      if (onKey) {
        key[level] += elm;
      } else {
        property += elm;
      }
    });
  }


  rebuildJsonSchema(modelContentStingify.match(/{[^]+/gm)[0]);

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
