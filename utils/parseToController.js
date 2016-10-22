module.exports = (params) => {
  let module = '';

  params.modules.forEach((elm) => {

      module = `${module} const ${elm} = require('${elm}');`;
  });

  return `${module} ${params.fileContent}`;
};