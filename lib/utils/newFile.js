const Path = require('path');
const fs = require('fs');
const beautify = require('js-beautify').js_beautify;
const { promisify } = require('util');
const parseToController = require('./parseToController');
const addCustomDataHelper = require('./addCustomDataHelper');
const fsWriteFilePromise = promisify(fs.writeFile);
const fsReadFilePromise = promisify(fs.readFile);
const fsAccessFilePromise = promisify(fs.access);
const stringifyByFileType = require('./stringifyByFileType');
const logger = require('./logger');
const capitalize = require('./capitalize');
const manipulateJS = require('./manipulateJS');
const hoek = require('hoek');
const endOfLine = require('os').EOL;


module.exports = async (files) => {

  if(!Array.isArray(files)){
    return await generateFile(files);
  }

  for (let file of files) {
    await generateFile(file);
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

  async function readFile(params) {
    if (!params.hasModel)return;

    const fileReferencePath = Path.join(__dirname, '../../assets', `${params.filePath}${params.fileName}.${params.fileType}`);

    try {
      params.fileContent = await fsReadFilePromise(fileReferencePath);
    } catch (err) {
      throw new Error(`error to generate ${params.outPutFileName}.${params.outputFileType} file : ${err}`)
    }
  }

  function addCustomData(params) {

    if(params.customData){
      params.fileContent = addCustomDataHelper[params.customData.method](params)
    }
  }

  function isNodeModule(params) {
    let modules = '';

    if (params.nodeModule) {

      if(params.modules) {
        for (let module of params.modules) {
          if(typeof module === 'object'){
            const key = Object.keys(module)[0];
            modules += ` const ${capitalize(key)} = ${module[key]} ${endOfLine}`;
            continue
          }
          modules += ` const ${capitalize(module)} = require('${module}'); ${endOfLine}`
        }
      }

      params.fileContent = `${modules} ${endOfLine} module.exports = ${params.fileContent.replace(/"|\\n|\\r/gm, '')}`;
    }
  }

  function replaceEntity(params) {

    if (params.entity) {
      params.fileContent = params.fileContent.replace(new RegExp('{{entity}}', 'gm'), params.entity.toLowerCase());
      params.fileContent = params.fileContent.replace(new RegExp('{{entity.upperFirstChar}}', 'gm'), capitalize(params.entity));
    }
  }

  function addUseStrict(params) {
    if (params.fileType === 'js') {
      params.fileContent = `'use strict'; ${params.fileContent}`;
    }
  }

  async function writeFile(params) {

    try {
      params.fileContent = (params.outputFileType !== 'json') ? beautify(params.fileContent, {indent_size: 4}) : params.fileContent;
      await fsWriteFilePromise(`${params.projectPath}/${params.outputFilePath}${params.outPutFileName}.${params.outputFileType}`, params.fileContent, 'utf8');
      logger.info(`${params.outPutFileName}.${params.outputFileType} file created`);
    } catch (err) {
      throw new Error(err);
    }

  }

  async function generateFile(params) {
    params.outputFilePath = (params.outputFilePath) ? params.outputFilePath : params.filePath;
    params.outputFileType = (params.outputFileType) ? params.outputFileType : params.fileType;
    params.outPutFileName = (params.outputFileName) ? params.outputFileName : params.fileName;

    await isExist(params);
    await readFile(params);
    await addCustomData(params);
    await stringifyByFileType[params.outputFileType](params);
    await isNodeModule(params);
    await replaceEntity(params);
    await addUseStrict(params);
    await writeFile(params);
  }
};