const getProjectPath = require('../../utils/getProjectPath');

module.exports = {
  projectPath: getProjectPath('test'),
  projectName: 'test',
  folders: ['', 'controllers', 'models', 'routes', 'policies', 'config', 'services', 'services/utils']
}