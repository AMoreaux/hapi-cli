const { spawn } = require('child_process');

module.exports = {
  schemaConfig: {
    title: 'config file',
    type: 'object',
    required: ['server'],
    properties: {
      server: {
        auth: {
          saltFactor: 'number'
        },
      },
      connection: {
        port: 'number',
        routes: {
          cors: 'boolean'
        },
        host: 'string'
      }
    }
  },
  schemaConfigWithBDD: {
    title: 'config file',
    type: 'object',
    required: ['server', 'mongodb'],
    properties: {
      server: {
        auth: {
          saltFactor: 'number'
        },
      },
      connection: {
        port: 'number',
        routes: {
          cors: 'boolean'
        },
        host: 'string'
      },
      mongodb: {
        uri: "string",
        options: {
          user: "string",
          pass: "string"
        }
      }
    }
  },
  newProject: () => {
    const child = spawn('node', ['index', 'new', 'test-cli'], {stdio: 'pipe'});
    return new Promise((res) => {
      child.on('close', () => res());
      child.stdout.on('data', (data) => {
        switch (true) {
          case /What is your default server host/.test(data.toString()):
            child.stdin.write('127.0.0.1\r');
            break;
          case /Do you want a database for the default env/.test(data.toString()):
            child.stdin.write('n\r');
            break;
          case /Do you want a database for the production env/.test(data.toString()):
            child.stdin.write('n\r');
            break;
          case /What is your production server host/.test(data.toString()):
            child.stdin.write('127.0.0.1\r');
            break;
        }
      });
    })
  },
  newProjectWithBDD: () => {
    const child = spawn('node', ['index', 'new', 'test-cli'], {stdio: 'pipe'});
    return new Promise((res) => {
      child.on('close', () => res());
      child.stdout.on('data', (data) => {
        switch (true) {
          case /What is your default server host/.test(data.toString()):
            child.stdin.write('127.0.0.1\r');
            break;
          case /Do you want a database for the default env/.test(data.toString()):
            child.stdin.write('y\r');
            break;
          case /What is your default database host/.test(data.toString()):
            child.stdin.write('102.222.222.222\r');
            break;
          case /What is your default database name/.test(data.toString()):
            child.stdin.write('my-local-database\r');
            break;
          case /What is your default database user/.test(data.toString()):
            child.stdin.write('admin\r');
            break;
          case /What is your default database password/.test(data.toString()):
            child.stdin.write('4829729hjbhh38Yu\r');
            break;
          case /What is your default secret key/.test(data.toString()):
            child.stdin.write('rergrgarekfij9809809cnjn0990809noNJinuinUINO\r');
            break;
          case /Do you want a database for the production env/.test(data.toString()):
            child.stdin.write('n\r');
            break;
          case /What is your production server host/.test(data.toString()):
            child.stdin.write('127.0.0.1\r');
            break;
        }
      })
    })
  }
};