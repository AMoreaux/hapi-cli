/**
 * Created by antoinemoreaux on 03/07/2016.
 */

const path = require('path');
const newFile = require('../utils/newFile');
const askQuestions = require('../utils/askQuestion');
const configAssets = require('../../assets/configs/config');

module.exports = async (projectPath, projectName, type) => {

  let config = configAssets(type);
  let hasDatabase;

  config.server.connection.host = await askQuestions(`What is your ${type} server host (default: localhost) : `) || 'localhost';
  config.server.auth.secretKey = await askQuestions(`What is your ${type} secret key (default: ChangeThisSecret) : `) || 'ChangeThisSecret';

  if(type !== 'default'){
    hasDatabase = await askQuestions(`Do you want a database for the ${type} env ? (Y/n) : `);
  }

  if (type === 'default' || hasDatabase.toLowerCase() === 'y') {
    config.mongodb = {};
    let host = await askQuestions(`What is your ${type} database host (default: localhost) : `) || 'localhost';
    let name = await askQuestions(`What is your ${type} database name (default: ${projectName} ) : `) || projectName;
    let user = await askQuestions(`What is your ${type} database user (default: admin) : `) || 'admin';
    let password = await askQuestions(`What is your ${type} database password (default: admin) : `) || 'admin';
    config.mongodb.uri = `mongodb://${user}:${password}@${host}/${name}`;
    await newFile({
      projectPath: projectPath,
      filePath: '/utils/',
      fileName: 'db',
      fileType: 'js',
      hasModel: true,
      outputFilePath: '/services/utils/',
    })
  }

  await newFile({
    projectPath: projectPath,
    filePath: 'config/',
    fileName: type,
    fileType: 'json',
    fileContent: config
  })
};