/**
 * Created by antoinemoreaux on 03/07/2016.
 */

const path = require('path');
const newFile = require('../utils/newFile');
const askQuestions = require('../utils/askQuestion');

module.exports = async (projectPath, projectName, type) => {

  let config = {
    'server': {
      'auth': {
        'saltFactor': 10
      },
      'connection': {
        'port': (type === 'production') ? 80 : 3000,
        'routes': {
          'cors': true
        }
      }
    }
  };

  config.server.connection.host = await askQuestions(`What is your ${type} server host (default: localhost) : `) || 'localhost';

  const hasDatabase = await askQuestions(`Do you want a database for the ${type} env ? (Y/n)`);

  if (hasDatabase.toLowerCase() === 'y') {
    config.mongodb = {};
    let host = await askQuestions(`What is your ${type} database host (default: localhost) : `) || 'localhost';
    let name = await askQuestions(`What is your ${type} database name (default: ${projectName} )`) || projectName;
    config.mongodb.uri = `mongodb://${host}/${name}`;
    config.mongodb.options = {};
    config.mongodb.options.user = await askQuestions(`What is your ${type} database user (default: admin) : `) || 'admin';
    config.mongodb.options.password = await askQuestions(`What is your ${type} database password (default: admin) : `) || 'admin';
    config.mongodb.options.secretKey = await askQuestions(`What is your ${type} secret key (default: ChangeThisSecret) : `) || 'ChangeThisSecret';
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