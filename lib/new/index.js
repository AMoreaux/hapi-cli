/**
 * Created by antoinemoreaux on 08/06/2016.
 */

const async = require('async');
const childProcess = require('child_process');
const genFolders = require('./genFolders');
const genConfigFile = require('./genConfigFile');
const newFile = require('../../utils/newFile');
const exampleCtrl = require('../../assets/example/example.controller');

exports.new = (name, cb) => {

  const projectPath = require('../../utils/getProjectPath')(name);

  async.waterfall([

    async.apply(genFolders, {
      projectPath: projectPath,
      projectName: name,
      folders: ['', 'controllers', 'models', 'routes', 'models', 'policies', 'config']
    }),
    async.apply(newFile, {
      projectPath: projectPath,
      filePath: '/',
      fileName: 'app',
      fileType: 'js',
      outputFileType: 'js'
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
      outputFileType: 'js'
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
      filePath: 'example/',
      outputFilePath: 'models/',
      fileName: 'example.model',
      fileType: 'json',
      outputFileType: 'js',
      nodeModule: true
    }),
    async.apply(newFile, {
      projectPath: projectPath,
      filePath: 'example/',
      outputFilePath: 'controllers/',
      fileName: 'example.controller',
      fileType: 'js',
      fileContent: exampleCtrl.get(['create', 'remove', 'find', 'update']),
      nodeModule: true
    })

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
