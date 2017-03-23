#!/usr/bin/env node
'use strict';

const program = require('commander');
const newProject = require('./lib/new/newProject');
const types = ['model', 'controller', 'route'];

require('colors').setTheme({
  info: 'green',
  warn: 'yellow',
  error: 'red',
  question: 'blue'
});


program
  .version('0.0.1')
  .command('new [name]')
  .description('create new project')
  .action((name) => {

    newProject.new(name, () => {

      process.exit();
    })


  });

program
  .version('0.0.1')
  .command('generate [type] [name] [params]')
  .description('generate new file')
  .action((type, name, params) => {

    if(types.indexOf(type) === -1){

       console.log(`type of file not available`.error);
        process.exit()
    }

    require(`./lib/generate/generate.${type}`).new(name, params, () => {

      process.exit();
    });
  });


program.parse(process.argv);