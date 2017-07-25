#!/usr/bin/env node
'use strict';
const program = require('commander');
const newProject = require('./lib/new/newProject');
const logger = require('./lib/utils/logger');
const newModel = require(`./lib/generate/generate.model`);
const newController = require(`./lib/generate/generate.controller`);
const newRoute = require(`./lib/generate/generate.route`);

program


program
  .command('new <name>')
  .description('Create new project.')
  .option('-d, --debug [debug]', 'active mode debug')
  .action(async (name, options) => {

    if(!options.name)options.name = 'new-project';

    await newProject
      .new(name)
      .catch(err => logger.error((options.debug) ? err.stack : err));

    process.exit();
  });

program
  .command('generate <type> <name>')
  .description('generate new file')
  .option('-m, --methods [methods]', 'List methods for new controller like (create,remove,find,update)')
  .option('-p, --properties [properties]', 'For model list properties like (firstname:String,age:Number)')
  .option('-v, --verbs [verbs]', 'Set verbs for your route like (get,post)')
  .option('-c, --controller [controller]', 'Set the name of the controller which contain handlers')
  .option('-d, --debug [debug]', 'active mode debug')
  .action(async (type, name, options) => {

    switch (type) {
      case 'controller':
        await newController.new(name, options).catch((error) => logger.error((options.debug) ? error.stack : error));
        break;
      case 'model':
        await newModel.new(name, options).catch((error) => logger.error((options.debug) ? error.stack : error));
        break;
      case 'route':
        await newRoute.new(name, options).catch((error) => logger.error((options.debug) ? error.stack : error));
        break;
      case 'api':
        try{
          await newController.new(name, options);
          await newModel.new(name, options);
          await newRoute.new(name, options);
        }catch(error){
          logger.error((options.debug) ? error.stack : error)
        }

        break

    }

    process.exit();
  });


program.parse(process.argv);