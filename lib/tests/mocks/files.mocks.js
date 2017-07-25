const getProjectPath = require('../../utils/getProjectPath');

module.exports = {
  jsFile: () => {
    return {
      projectPath: getProjectPath('test'),
      filePath: '/',
      fileName: 'app',
      fileType: 'js',
      hasModel: true,
    }
  },
  jsonFile: () => {
    return {
      projectPath: getProjectPath('test'),
      filePath: '/',
      fileName: 'package',
      fileType: 'json',
      customData: {
        method: 'merge',
        content: {
          name: 'test',
          scripts: {
            start: 'node app.js'
          }
        }
      },
      hasModel: true,
    }
  },
  jsFileWithOutputFilePath: () => {
    return {
      projectPath: getProjectPath('test'),
      filePath: '/utils/',
      fileName: 'utils',
      fileType: 'js',
      hasModel: true,
      outputFilePath: '/services/utils/',
    }
  },
  controller: () => {
    return {
      name: 'user',
      projectPath: getProjectPath('test'),
      options: {
        methods: 'crud'
      }
    }
  },
  controllerWithSpecificMethods: () => {
    return {
      name: 'otherUser',
      projectPath: getProjectPath('test'),
      options: {
        methods: 'create,remove'
      }
    }
  },
  model: () => {
    return {
      name: 'user',
      projectPath: getProjectPath('test'),
      options: {}
    }
  },
  modelWithSpecificProperties: () => {
    return {
      name: 'otherUser',
      projectPath: getProjectPath('test'),
      options: {
        properties: 'firstname:string'
      }
    }
  },
  route: () => {
    return {
      name: 'user',
      projectPath: getProjectPath('test'),
      options: {
        verb: 'GET,POST,PUT,DELETE',
        uri: '/user/{id}'
      }
    }
  },
  routelWithSpecificOptions: () => {
    return {
      name: 'otherUser',
      projectPath: getProjectPath('test'),
      options: {
        verb: 'GET',
        uri: '/{p*}',
        custom: '404',
        controller: 'none'
      }
    }
  },
  policieDefault: () => {
    return {
      name: 'default',
      options: {},
      projectPath: getProjectPath('test')
    }
  },
  policieAdmin: () => {
    return {
      name: 'admin',
      options: {},
      projectPath: getProjectPath('test')
    }
  },
  config: () => {
    return {
      name: 'test',
      projectPath: getProjectPath('test'),
      type: 'default'
    }
  }
}