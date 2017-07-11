module.exports = (params) => {
  let modules = '';

  for (let module of params.modules) {
    modules += ` const ${module} = require('${module}');`
  }

  return`${modules} ${params.fileContent}`;
};