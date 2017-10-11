const {exec} = require('child_process');
const path = require('path');
const {expect} = require('chai').use(require('chai-fs'));
const generateController = require('../generate/generate.controller');
const generateModel = require('../generate/generate.model');
const generateRoute = require('../generate/generate.route');
const generatePolicie = require('../generate/generate.policie');
const generateService = require('../generate/generate.service');
const genFolders = require('../new/genFolders');
const newFile = require('../utils/newFile');
const getProjectPath = require('../utils/getProjectPath');
const mocksFolders = require('./mocks/folders.mocks');
const mocksFiles = require('./mocks/files.mocks');

describe('Create files and folders', () => {

  before(() => process.env.NODE_ENV = 'test');

  after(() => exec('rm -r ./test'));

  it('get project path', () => {
    const projectPath = getProjectPath();
    expect(projectPath).to.be.a.path();
    expect(projectPath).to.be.a.directory();
  });

  it('generate folders', async () => {
    await genFolders(mocksFolders);
    expect(mocksFolders.projectPath).to.be.a.directory().with.deep.contents(mocksFolders.folders.slice(1));
  });

  it('generate js file', async () => {
    const mock = mocksFiles.jsFile();
    await newFile(mock);
    expect(path.join(mock.projectPath, mock.filePath, mock.fileName + '.' + mock.fileType)).to.be.a.file().to.have.extname('.js')
  });

  it('generate js file with outputFilePath', async () => {
    const mock = mocksFiles.jsFileWithOutputFilePath();
    await newFile(mock);
    expect(path.join(mock.projectPath, mock.outputFilePath, mock.fileName + '.' + mock.fileType)).to.be.a.file().to.have.extname('.js')
  });

  it('generate json file', async () => {
    const mock = mocksFiles.jsonFile();
    await newFile(mock);
    expect(path.join(mock.projectPath, mock.filePath, mock.fileName + '.' + mock.fileType)).to.be.a.file().to.have.extname('.json')
  });

  it('generate controller', async () => {
    const mock = mocksFiles.controller();
    await generateController.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'controllers/', mock.name + '.controller.js')).to.be.a.file().to.have.extname('.js')
  });

  it('generate controller with specific methods', async () => {
    const mock = mocksFiles.controllerWithSpecificMethods();
    await generateController.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'controllers/', mock.name + '.controller.js')).to.be.a.file().to.have.extname('.js')
  });


  it('generate service', async () => {
    const mock = mocksFiles.service();
    await generateService.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'services/', mock.name + '.service.js')).to.be.a.file().to.have.extname('.js')
  });


  it('generate model', async () => {
    const mock = mocksFiles.model();
    await generateModel.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'models/', mock.name + '.model.js')).to.be.a.file().to.have.extname('.js')
  });

  it('generate model with specific properties', async () => {
    const mock = mocksFiles.modelWithSpecificProperties();
    await generateModel.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'models/', mock.name + '.model.js')).to.be.a.file().to.have.extname('.js')
  });

  it('generate route', async () => {
    const mock = mocksFiles.route();
    await generateRoute.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'routes/', mock.name + '.route.js')).to.be.a.file().to.have.extname('.js')
  });

  it('generate route with specific options', async () => {
    const mock = mocksFiles.routelWithSpecificOptions();
    await generateRoute.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'routes/', mock.name + '.route.js')).to.be.a.file().to.have.extname('.js')
  });

  it('generate policie default', async () => {
    const mock = mocksFiles.policieDefault();
    await generatePolicie.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'policies/', mock.name + '.policie.js')).to.be.a.file().to.have.extname('.js')
  });

  it('generate policie admin', async () => {
    const mock = mocksFiles.policieAdmin();
    await generatePolicie.new(mock.name, mock.options, mock.projectPath);
    expect(path.join(mock.projectPath, 'policies/', mock.name + '.policie.js')).to.be.a.file().to.have.extname('.js')
  });
});

