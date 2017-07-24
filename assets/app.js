const appPackage = require(__dirname + '/package.json');
const Hapi = require('hapi');
const Hapiauthjwt = require('hapi-auth-jwt2');
const colors = require('colors/safe');
const corsHeaders = require('hapi-cors-headers');
const Config = require('config');
const utils = require('./services/utils/utils.js');
const db = require('./services/utils/db.js')

db.connect();

utils.addModels();

const server = new Hapi.Server();

server.connection(Config.get('server.connection'));

server.register(Hapiauthjwt, (err) => {

  if (err) {
    console.log('Hapiauthjwt error', err);
  }

  utils.addPolicies(server);
});

utils.addRoute(server);

server.ext('onPreResponse', (request, reply) => {
  corsHeaders(request, reply);
});

server.start(() => {
  console.log(colors.green('%s %s started on %s'), appPackage.name, appPackage.version, server.info.uri);
});

module.exports = server;

