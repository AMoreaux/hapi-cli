'use strict';
const appPackage = require(__dirname + '/package.json');
const Hapi = require('hapi');
const Hapiauthjwt = require('hapi-auth-jwt2');
const colors = require('colors/safe');
const Config = require('config');
const utils = require('./services/utils/utils.js');
const db = require('./services/utils/db.js')


async function start() {

  try {
    db.connect();

    utils.addModels();

    const connectionConfig = Config.get('server.connection')

    const server = new Hapi.Server(JSON.parse(JSON.stringify(connectionConfig)))

    await server.register({
      plugin: Hapiauthjwt
    })

    utils.addPolicies(server)

    utils.addRoute(server);

    await server.start()
    console.log(colors.green('%s %s started on %s'), appPackage.name, appPackage.version, server.info.uri);

    module.exports = server;

  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

start()