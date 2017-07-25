/**
 * Created by antoinemoreaux on 08/06/2016.
 */

const { spawnSync } = require('child_process');
const genFolders = require('./genFolders');
const genConfigFile = require('./genConfigFile');
const newFile = require('../utils/newFile');
const generateModel = require('../generate/generate.model');
const generateRoute = require('../generate/generate.route');
const generateController = require('../generate/generate.controller');
const generatePolicie = require('../generate/generate.policie');
const logger = require('../utils/logger');
const getProjectPath = require('../utils/getProjectPath');

exports.new = async (name) => {
  const projectPath = getProjectPath(name);

  await genFolders({
    projectPath,
    projectName: name,
    folders: ['', 'controllers', 'models', 'routes', 'policies', 'config', 'services', 'services/utils'],
  });

  await spawnSync('git', ['init'], { cwd: projectPath });
  await newFile([{
    projectPath,
    filePath: '/',
    fileName: 'app',
    fileType: 'js',
    hasModel: true,
  }, {
    projectPath,
    filePath: '/',
    fileName: 'package',
    fileType: 'json',
    customData: {
      method: 'merge',
      content: {
        name, scripts: { start: 'node app.js' },
      },
    },
    hasModel: true,
  }, {
    projectPath,
    filePath: '/utils/',
    fileName: 'utils',
    fileType: 'js',
    hasModel: true,
    outputFilePath: '/services/utils/',
  }]);

  await generateController.new('user', { methods: 'crud' }, projectPath);
  await generateModel.new('user', { properties: 'firstname:string,age:number' }, projectPath);
  await generateRoute.new('user', {}, projectPath);
  await generateRoute.new('base', {
    verbs: '*',
    custom: '404',
    controller: 'none',
  }, projectPath);
  await generatePolicie.new('default', {}, projectPath);
  await generatePolicie.new('admin', {}, projectPath);
  await genConfigFile(projectPath, name, 'default');
  await genConfigFile(projectPath, name, 'production');

  if (process.env.NODE_ENV !== 'test') {
    await spawnSync('npm', ['install'], { stdio: 'inherit', cwd: projectPath });
  }

  return logger.info(`Project ${name} created.`);
};
