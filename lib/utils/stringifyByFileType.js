
module.exports = {

  js: (params) => {

    if(Buffer.isBuffer(params.fileContent)) {
      return params.fileContent = params.fileContent.toString().replace(/"/g, '');
    }

    params.fileContent = JSON.stringify(params.fileContent, null, 4);
  },

  json: (params) => {

    if(Buffer.isBuffer(params.fileContent)) {
      params.fileContent = JSON.parse(params.fileContent);
    }

    params.fileContent = JSON.stringify(params.fileContent, null, 4);
  }
};