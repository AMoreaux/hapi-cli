/**
 * Created by antoinemoreaux on 08/06/2016.
 */

const {spawnSync, execSync} = require('child_process');
const genFolders = require('./genFolders');
const genConfigFile = require('./genConfigFile');
const newFile = require('../../utils/newFile');
const generateModel = require('../generate/generate.model');
const generateRoute = require('../generate/generate.route');
const generateController = require('../generate/generate.controller');
const logger = require('../../utils/logger');

exports.new = async (name) => {

  const projectPath = require('../../utils/getProjectPath').get(name);

  await genFolders({
    projectPath: projectPath,
    projectName: name,
    folders: ['', 'controllers', 'models', 'routes', 'policies', 'config', 'services', 'services/utils']
  })

  await execSync('npm init', {stdio: 'inherit', cwd: projectPath});

  await newFile([{
    projectPath: projectPath,
    filePath: '/',
    fileName: 'app',
    fileType: 'js',
    hasModel: true,
  }, {
    projectPath: projectPath,
    filePath: '/',
    fileName: 'package',
    fileType: 'json',
    merge: true,
    hasModel: true,
  }, {
    projectPath: projectPath,
    filePath: '/utils/',
    fileName: 'utils',
    fileType: 'js',
    hasModel: true,
    outputFilePath: '/services/utils/',
  }]);

  await generateController.new('user', {methods: 'crud'}, projectPath);
  await generateModel.new('user', {properties: 'firstname:string'}, projectPath);
  await generateRoute.new('user', {verb: 'GET,POST,PUT,DELETE', uri: '/user/{id}'}, projectPath);
  await generateRoute.new('base', {
    verb: 'GET',
    uri: '/{p*}',
    custom: '404',
    controller: 'none'
  }, projectPath);

  await genConfigFile(projectPath, name, 'default');
  await genConfigFile(projectPath, name, 'production');

  await spawnSync('npm', ['install'], {stdio: 'inherit', cwd: projectPath});

  return logger.info(`Project ${name} created.`)
};
