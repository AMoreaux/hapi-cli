/**
 * Created by antoinemoreaux on 03/07/2016.
 */

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const async = require('async');
const _ = require('lodash');


module.exports = (projectPath, projectName, type, cb) => {

  let config = {
    'server': {
      'auth': {
        'saltFactor': 10
      },
      'connection': {
        'host': 'localhost',
        'port': (type === 'production') ? 80 : 3000,
        'routes': {
          'cors': true
        }
      }
    }
  };
  
  

  async.waterfall([

    (cb) => {
      
      if(type !== 'production'){

        return cb(null);
      }

      rl.question(`Do you create your production config file ? (Y/n) `.question, (response) => {
        
        (response.toLowerCase() === 'y') ? cb(null) : cb('skip')
      });

    },

    (cb) => {

      rl.question(`What is your ${type} database host (default: localhost) : `.question, (host) => {
        
        cb(null, host);
      });
    },

    (host, cb) => {

      rl.question(`What is your ${type} database name (default: ${projectName} )`.question, (name) => {

        host =  host.length !== 0 ?  host : 'localhost';
        name =  name.length !== 0 ?  name : name;

        _.set(config, 'mongodb.uri', `mongodb://${host}/${name}`);

        cb(null);
      });
    },

    (cb) => {

      rl.question(`What is your ${type} database user : `.question, (user ='user') => {

        _.set(config, 'mongodb.options.user', user);

        cb(null);
      });
    },

    (cb) => {

      rl.question(`What is your ${type} database password : `.question, (password = 'password') => {

        _.set(config, 'mongodb.options.pass', password);

        cb(null);
      });
    },

    (cb) => {

      rl.question(`What is your ${type} secret key (default: ChangeThisSecret) : `.question, (secret = 'ChangeThisSecret') => {

        _.set(config, 'server.auth.secretKey', secret);

        cb(null);
      });
    }


  ], (err) => {
    
    if(err){
      return (err === 'skip') ? cb(null) : cb(err);
    }
    
    fs.writeFile(`${projectPath}/config/${type}.json`, JSON.stringify(config), (err) => {

      if (err) {
        return cb('error to generate config file'.error, err);
      }
      
      console.log(`Config files for ${type} created`.info);
      cb(null);
    });
  });
};