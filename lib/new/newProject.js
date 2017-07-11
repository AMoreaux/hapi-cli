/**
 * Created by antoinemoreaux on 08/06/2016.
 */

const childProcess = require('child_process');
const genFolders = require('./genFolders');
const genConfigFile = require('./genConfigFile');
const newFile = require('../../utils/newFile');
const generateModel = require('../generate/generate.model');
const generateRoute = require('../generate/generate.route');
const generateController = require('../generate/generate.controller');
const getRoutes = require('../../assets/routes/route');

exports.new = async (name) => {

  const projectPath = require('../../utils/getProjectPath').get(name);

  await genFolders({
    projectPath: projectPath,
    projectName: name,
    folders: ['', 'controllers', 'models', 'routes', 'policies', 'config']
  })

  await newFile({
    projectPath: projectPath,
    filePath: '/',
    fileName: 'app',
    fileType: 'js',
    hasModel: true,
    outputFileType: 'js',
    outputFilePath: '/',
    outputFileName: 'app'
  })

  await genConfigFile(projectPath, name, 'default')
  await genConfigFile(projectPath, name, 'production')

  await newFile({
    projectPath: projectPath,
    filePath: '/',
    fileName: 'package',
    fileType: 'json',
    hasModel: true,
  })
  await newFile({
    projectPath: projectPath,
    filePath: '/',
    fileName: 'utils',
    fileType: 'js',
    hasModel: true,
    outputFilePath: '/',
    outputFileName: 'utils',
    outputFileType: 'js'
  })

  await generateController.new('user', 'crud', projectPath);
  await generateModel.new('user', 'firstname:string', projectPath);
  await generateRoute.new('base', getRoutes.get404(), projectPath);


  // async.waterfall([
  //
  //   async.apply(genFolders, {
  //     projectPath: projectPath,
  //     projectName: name,
  //     folders: ['', 'controllers', 'models', 'routes', 'policies', 'config']
  //   }),
  //   async.apply(newFile, {
  //     projectPath: projectPath,
  //     filePath: '/',
  //     fileName: 'app',
  //     fileType: 'js',
  //     outputFileType: 'js',
  //     outputFilePath: '/',
  //     outputFileName: 'app'
  //   }),
  //   async.apply(genConfigFile, projectPath, name, 'default'),
  //   async.apply(genConfigFile, projectPath, name, 'production'),
  //   async.apply(newFile, {
  //     projectPath: projectPath,
  //     filePath: '/',
  //     fileName: 'package',
  //     fileType: 'json',
  //     outputFileType: 'json'
  //   }),
  //   async.apply(newFile, {
  //     projectPath: projectPath,
  //     filePath: '/',
  //     fileName: 'utils',
  //     fileType: 'js',
  //     outputFilePath: '/',
  //     outputFileName: 'utils',
  //     outputFileType: 'js'
  //   }),
  //   async.apply(generateController.new, 'example', 'crud', projectPath),
  //   async.apply(generateModel.new, 'example', 'firstname:string', projectPath),
  //   async.apply(generateRoute.new, 'example', getRoutes.get404(), projectPath)
  //
  // ], (err, result) => {
  //
  //   if (err) {
  //     console.log(`error: ${err}`.error);
  //     process.exit();
  //   }
  //
  //   // childProcess.spawn('npm', ['install'], {stdio: 'inherit', cwd: projectPath}).on('exit', error => {
  //   //
  //   //   if (!error) {
  //   //
  //   //     console.log('Success!');
  //   //   }
  //
  //   console.log(`Project ${name} created.`.info);
  //   cb();
  //   // });
  // });
};
