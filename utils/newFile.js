const Path = require('path');
const fs = require('fs');
const beautify = require('js-beautify').js_beautify;
const util = require('util');
const toModule = require('./parseToNodeModule');
const hookByType = require('./hookByType');
const parseToController = require('./parseToController');
const addUseStrict = require('./addUseStrict');
const fsWriteFilePromise = util.promisify(fs.writeFile);
const fsReadFilePromise = util.promisify(fs.readFile);

/**
 * @param params {projectPath, filePath, fileName, fileType}
 */
module.exports = async (params) => {

  const outputFilePath = (params.outputFilePath) ? params.outputFilePath : params.filePath;
  const outputFileType = (params.outputFileType) ? params.outputFileType : params.fileType;
  const outPutFileName = (params.outputFileName) ? params.outputFileName : params.fileName;

  await isExist(params);
  await readFile(params);
  await hookByType[outputFileType](params);
  await isNodeModule(params);
  await isController(params);
  await replaceEntity(params);
  await writeFile(params);

  async function writeFile(params) {

    try{
      params.fileContent = (outputFileType !== 'json') ? beautify(params.fileContent, { indent_size: 4}) : params.fileContent;
      await fsWriteFilePromise(`${params.projectPath}/${outputFilePath}${outPutFileName}.${outputFileType}`, params.fileContent);
      console.log(`${params.fileName}.${outputFileType} file created`.info);
    }catch (err){
      throw new Error(`error to generate ${params.fileName}.${outputFileType} file : ${err}`);
    }

  }


  async function readFile(params) {
    if(!params.hasModel)return;

    const fileReferencePath = Path.join(__dirname, '../assets', `${params.filePath}${params.fileName}.${params.fileType}`);

    try {
      params.fileContent = await fsReadFilePromise(fileReferencePath);
    }catch(err) {
      throw new Error(`error to generate ${params.fileName}.${outputFileType} file : ${err}`)
    }

  }

  async function isExist(params) {

    const path = Path.join(params.projectPath, params.filePath, `${params.fileName}.${params.outputFileType}`);

    try{
      await fsReadFilePromise(path);
      throw new Error(`file : ${path} already exist`);
    }catch (e){}
  }

  function isNodeModule(params) {

    if (params.nodeModule) {
      params.fileContent = toModule(params);
    }

    if(params.fileType === 'js'){
      params.fileContent = addUseStrict(params);
    }
  }

  function replaceEntity(params) {

    if(params.entity){
      params.fileContent = params.fileContent.replace(new RegExp('{{entity}}', 'gm'), params.entity.toLowerCase());
      params.fileContent = params.fileContent.replace(new RegExp('{{entity.upperFirstChar}}', 'gm'), params.entity.charAt(0).toUpperCase() + params.entity.slice(1));
    }
  }

  function isController(params) {

    if(params.filePath === 'controllers/'){
      params.fileContent = parseToController(params);
    }
  }
};