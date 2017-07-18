const utils = require('./utils');
const path = require('path');
const {spawn, exec} = require('child_process');
const {expect} = require('chai').use(require('chai-fs')).use(require('chai-json-schema'));
const getProjectPath = require('../utils/getProjectPath');
const mocksFolders = require('./mocks/folders.mocks');
const mocksFiles = require('./mocks/files.mocks');
const projectPath = getProjectPath('test-cli');

describe('Commands line', () => {

  before(() => process.env.NODE_ENV = 'test');

  afterEach(() => exec('rm -r ./test-cli'));

  it('New project', async () => {

    await utils.newProject();

    let mock;
    expect(projectPath)
      .to.be.a.directory()
      .and.include.deep.contents(mocksFolders.folders.slice(1));
    mock = mocksFiles.jsFile();
    expect(path.join(projectPath, mock.filePath, mock.fileName + '.' + mock.fileType))
      .to.be.a.file()
      .to.have.extname('.js');
    mock = mocksFiles.jsonFile();
    expect(path.join(projectPath, mock.filePath, mock.fileName + '.' + mock.fileType))
      .to.be.a.file()
      .to.have.extname('.json');
    mock = mocksFiles.controller();
    expect(path.join(projectPath, 'controllers/', mock.name + '.controller.js'))
      .to.be.a.file()
      .to.have.extname('.js');
    mock = mocksFiles.model();
    expect(path.join(projectPath, 'models/', mock.name + '.model.js'))
      .to.be.a.file()
      .to.have.extname('.js');
    mock = mocksFiles.route();
    expect(path.join(projectPath, 'routes/', mock.name + '.route.js'))
      .to.be.a.file()
      .to.have.extname('.js');
    expect(path.join(projectPath, 'config/', 'default.json'))
      .to.be.a.file()
      .to.have.extname('.json')
      .with.json.using.schema(utils.schemaConfig);
    expect(path.join(projectPath, 'config/', 'production.json'))
      .to.be.a.file()
      .to.have.extname('.json')
      .with.json.using.schema(utils.schemaConfig);


  });

  it('New project with complexe config', async () => {

    await utils.newProjectWithBDD();

    let mock;
    expect(projectPath)
      .to.be.a.directory()
      .and.include.deep.contents(mocksFolders.folders.slice(1));
    mock = mocksFiles.jsFile();
    expect(path.join(projectPath, mock.filePath, mock.fileName + '.' + mock.fileType))
      .to.be.a.file()
      .to.have.extname('.js');
    mock = mocksFiles.jsonFile();
    expect(path.join(projectPath, mock.filePath, mock.fileName + '.' + mock.fileType))
      .to.be.a.file()
      .to.have.extname('.json');
    mock = mocksFiles.controller();
    expect(path.join(projectPath, 'controllers/', mock.name + '.controller.js'))
      .to.be.a.file()
      .to.have.extname('.js');
    mock = mocksFiles.model();
    expect(path.join(projectPath, 'models/', mock.name + '.model.js'))
      .to.be.a.file()
      .to.have.extname('.js');
    mock = mocksFiles.route();
    expect(path.join(projectPath, 'routes/', mock.name + '.route.js'))
      .to.be.a.file()
      .to.have.extname('.js');
    expect(path.join(projectPath, 'config/', 'default.json'))
      .to.be.a.file()
      .to.have.extname('.json')
      .with.json.using.schema(utils.schemaConfigWithBDD);
    expect(path.join(projectPath, 'config/', 'production.json'))
      .to.be.a.file()
      .to.have.extname('.json')
      .with.json.using.schema(utils.schemaConfig);
  });

  it('New controller', async () => {

    await utils.newProject();

    const child = spawn('hapi-cli', ['generate', 'controller', 'user', '-m', 'create,remove'], {stdio: 'pipe'});

    await new Promise((res) => {
      child.on('close', () => {
        expect(path.join(projectPath, 'controllers/', 'user' + '.controller.js'))
          .to.be.a.file()
          .to.have.extname('.js');
        res()
      })
    })


  })
});