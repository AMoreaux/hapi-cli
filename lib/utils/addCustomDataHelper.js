const hoek = require('hoek');

module.exports = {

  merge: (params) => {
    if(Buffer.isBuffer(params.fileContent)){
      params.fileContent = JSON.parse(params.fileContent);
    }
    return hoek.merge(params.customData.content, params.fileContent);
  }
};