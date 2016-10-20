/**
 * Created by antoinemoreaux on 08/06/2016.
 */

const async = require('async');
const childProcess = require('child_process');
const genFolders = require('./genFolders');
const genConfigFile = require('./genConfigFile');
const newFile = require('../../utils/newFile');
const controllerAssets = require('../../assets/controllers/controller.js');
const generateModel = require('../generate/generate.model');

exports.new = (name, cb) => {

  const projectPath = require('../../utils/getProjectPath')(name);

  async.waterfall([

    async.apply(genFolders, {
      projectPath: projectPath,
      projectName: name,
      folders: ['', 'controllers', 'models', 'routes', 'policies', 'config']
    }),
    async.apply(newFile, {
      projectPath: projectPath,
      filePath: '/',
      fileName: 'app',
      fileType: 'js',
      outputFileType: 'js',
      outputFilePath: '/',
      outputFileName: 'app'
    }),
    async.apply(genConfigFile, projectPath, name, 'default'),
    async.apply(genConfigFile, projectPath, name, 'production'),
    async.apply(newFile, {
      projectPath: projectPath,
      filePath: '/',
      fileName: 'package',
      fileType: 'json',
      outputFileType: 'json'
    }),
    async.apply(newFile, {
      projectPath: projectPath,
      filePath: '/',
      fileName: 'utils',
      fileType: 'js',
      outputFilePath: '/',
      outputFileName: 'utils',
      outputFileType: 'js',
    }),
    async.apply(newFile, {
      projectPath: projectPath,
      filePath: 'routes/',
      fileName: 'main.route',
      fileType: 'json',
      outputFileType: 'js',
      nodeModule: true
    }),
    async.apply(newFile, {
      projectPath: projectPath,
      outputFilePath: 'controllers/',
      outputFileName: 'example.controller',
      outputFileType: 'js',
      fileContent: controllerAssets.get(['create', 'remove', 'find', 'update']),
      nodeModule: true,
      entity: 'user'
    }),
    async.apply(generateModel.new, 'example', 'firstname:string', projectPath)

  ], (err, result) => {

    if (err) {
      console.log(`error: ${err}`.error);
      process.exit();
    }

    // childProcess.spawn('npm', ['install'], {stdio: 'inherit', cwd: projectPath}).on('exit', error => {
    //
    //   if (!error) {
    //
    //     console.log('Success!');
    //   }

    console.log(`Project ${name} created.`.info);
    cb();
    // });
  });
};
