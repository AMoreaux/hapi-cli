const colors = require('colors/safe');
const Mongoose = require('mongoose');
const Config = require('config');
const err = console.error;
const log = console.log;

module.exports ={
  connect: () => {
    Mongoose.connect(Config.get('mongodb.uri'),{useMongoClient: true});

    Mongoose.connection.on('error', (e)=> {
      err('Mongoose can not open connection');
      err(e);
      process.exit();
    });

    Mongoose.connection.on('connected', () => {
      log(colors.green('Connection DB ok', Config.get('mongodb.uri')));
    });

    Mongoose.connection.on('disconnected', () => {
      err(colors.red('Connection DB lost'));

      setTimeout(() => {
        Mongoose.connect(Config.get('mongodb.uri'));
        err('DB reconnection');
      }, 15000);
    });
  }
};