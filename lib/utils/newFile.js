const Path = require('path');
const fs = require('fs');
const beautify = require('js-beautify').js_beautify;
const util = require('util');
const parseToController = require('./parseToController');
const parseToRoute = require('./parseToRoute');
const parseToPackageJson = require('./parseToPackageJson');
const fsWriteFilePromise = util.promisify(fs.writeFile);
const fsReadFilePromise = util.promisify(fs.readFile);
const fsAccessFilePromise = util.promisify(fs.access);
const hookByFileType = require('./hookByType');
const logger = require('./logger');
const capitalize = require('./capitalize');
const manipulateJS = require('./manipulateJS');

/**
 * @param files
 */
module.exports = async (files) => {

  if(!Array.isArray(files)){
    return await generateFile(files);
  }

  for (let file of files) {
    await generateFile(file);
  }


  async function writeFile(params) {

    try {
      params.fileContent = (params.outputFileType !== 'json') ? beautify(params.fileContent, {indent_size: 4}) : params.fileContent;
      await fsWriteFilePromise(`${params.projectPath}/${params.outputFilePath}${params.outPutFileName}.${params.outputFileType}`, params.fileContent);
      logger.info(`${params.outPutFileName}.${params.outputFileType} file created`);
    } catch (err) {
      throw new Error(err);
    }

  }

  async function readFile(params) {
    if (!params.hasModel)return;

    const fileReferencePath = Path.join(__dirname, '../../assets', `${params.filePath}${params.fileName}.${params.fileType}`);

    try {
      params.fileContent = await fsReadFilePromise(fileReferencePath);
    } catch (err) {
      throw new Error(`error to generate ${params.outPutFileName}.${params.outputFileType} file : ${err}`)
    }

  }

  async function isExist(params) {

    const path = Path.join(params.projectPath, params.outputFilePath, `${params.outPutFileName}.${params.outputFileType}`);

    try {
      await fsAccessFilePromise(path, fs.constants.F_OK);
      throw new Error();
    } catch (e) {
      if(e.code !== 'ENOENT'){
        throw new Error(`file ${path} already exist`);
      }
    }
  }


  function replaceEntity(params) {

    if (params.entity) {
      params.fileContent = params.fileContent.replace(new RegExp('{{entity}}', 'gm'), params.entity.toLowerCase());
      params.fileContent = params.fileContent.replace(new RegExp('{{entity.upperFirstChar}}', 'gm'), capitalize(params.entity));
    }
  }

  function hookByRole(params) {

    var fileRole = params.fileName.split('.')[1] || params.fileName;

    switch (fileRole){
      case 'controller' :
        params.fileContent = parseToController(params);
        break;
      case 'route' :
        params.fileContent = parseToRoute(params);
        break;
      case 'package' :
        params.fileContent = parseToPackageJson(params);
        break;
    }
  }

  function isNodeModule(params) {
    if (params.nodeModule) {
      params.fileContent = `module.exports = ${params.fileContent.replace(/"|(\n|\r)/gm, '')}`;
    }
  }

  function addUseStrict(params) {
    if (params.fileType === 'js') {
      params.fileContent = `'use strict'; ${params.fileContent}`;
    }
  }

  async function generateFile(params) {
    params.outputFilePath = (params.outputFilePath) ? params.outputFilePath : params.filePath;
    params.outputFileType = (params.outputFileType) ? params.outputFileType : params.fileType;
    params.outPutFileName = (params.outputFileName) ? params.outputFileName : params.fileName;

    await isExist(params);
    await readFile(params);
    await hookByFileType[params.outputFileType](params);
    await isNodeModule(params);
    await replaceEntity(params);
    await hookByRole(params);
    await addUseStrict(params);
    await writeFile(params);
  }
};