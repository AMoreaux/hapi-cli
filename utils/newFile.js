const path = require('path');
const fs = require('fs');
const beautify = require('js-beautify').js_beautify;
const async = require('async');
const toModule = require('./parseToNodeModule');
const parseToMongooseSchema = require('./parseToMongooseSchema');

/**
 *
 * @param params {projectPath, filePath, fileName, fileType}
 * @param cb
 */
module.exports = (params, cb) => {


  async.waterfall([
    async.apply(isExist, params),
    async.apply(readFile, params),
    async.apply(isNodeModule, params),
    async.apply(parseToMongooseSchema, params),
    async.apply(writeFile, params)
  ], (err, result) => {

    if (err) {
      console.log(`error: ${err}`.error);
      process.exit()
    }

    cb();
  });


  function writeFile(params, cb) {

    const outputFilePath = (params.outputFilePath) ? params.outputFilePath : params.filePath;
    const outputFileType = (params.outputFileType) ? params.outputFileType : params.fileType;

    fs.writeFile(`${params.projectPath}/${outputFilePath}${params.fileName}.${outputFileType}`, beautify(params.fileContent, { indent_size: 4}), (err) => {

      if (err) {
        return cb(`error to generate ${params.fileName}.${outputFileType} file : ${err}`.error);
      }

      console.log(`${params.fileName}.${outputFileType} file created`.info);

      cb(null);
    });
  }


  function readFile(params, cb) {

    if (typeof params.fileContent === 'object') {

      params.fileContent = JSON.stringify(params.fileContent, null, 4);
      return cb(null);
    }

    const fileReferencePath = path.join(__dirname, '../assets', `${params.filePath}${params.fileName}.${params.fileType}`);

    fs.readFile(fileReferencePath, (err, result) => {

      params.fileContent = result.toString();
      cb(null);
    });
  }

  function isExist(params, cb) {

    fs.readFile(`${params.projectPath}/${params.filePath}${params.fileName}.${params.outputFileType}`, (err, result) => {

      if (result) {
        return cb('file already exist');
      }

      cb(null);
    })
  }

  function isNodeModule(params, cb) {

    if (params.nodeModule) {
      params.fileContent = toModule(params.fileContent);
    }

    cb(null);
  }
};