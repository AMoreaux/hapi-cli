#!/usr/bin/env node
'use strict';

const program = require('commander');
const newProject = require('./lib/new/newProject');
const logger = require('./utils/logger');

program
  .version('0.0.1')
  .command('new [name]')
  .option('-d, --debug', 'active debug mode')
  .description('create new project')
  .action(async (name, options) => {

    await newProject
      .new(name)
      .catch(err => logger.error((options.debug) ? err.stack : err));

    process.exit();
  });

program
  .version('0.0.1')
  .command('generate controller [name]')
  .option('-m, --methods <methods>', 'List methods for new controller like (create,remove,find,update)')
  .option('-d, --debug', 'active mode debug')
  .description('generate new controller')
  .action(async (name, options) => {

    await require(`./lib/generate/generate.controller`)
      .new(name, options)
      .catch(err => logger.error((options.debug) ? err.stack : err));

    process.exit();
  });

program
  .version('0.0.1')
  .command('generate model [name]')
  .option('-p, --properties <properties>', 'For model list properties like (firstname:String,age:Number)')
  .option('-d, --debug', 'active mode debug')
  .description('generate new file')
  .action(async (name, options) => {

    await require(`./lib/generate/generate.model`)
      .new(name, options)
      .catch(err => logger.error((options.debug) ? err.stack : err));

    process.exit();
  });


program
  .version('0.0.1')
  .command('generate route [name]')
  .option('-u, --uri <path>', 'Set uri for your route like (/user)')
  .option('-v, --verb <verb>', 'Set verbs for your route like (get,post)')
  .option('-c, --controller', 'Set the name of the controller which contain handlers')
  .option('-d, --debug', 'active mode debug')
  .description('generate new file')
  .action(async (name, options) => {

    await require(`./lib/generate/generate.route`)
      .new(name, options)
      .catch(err => logger.error((options.debug) ? err.stack : err));

    process.exit();
  });


program.parse(process.argv);