/**
 * Created by antoinemoreaux on 03/07/2016.
 */

const async = require('async');
const path = require('path');
const fs = require('fs');

module.exports = (params, callback) => {


  if (fs.existsSync(params.projectPath)) {

    return callback(`project ${params.projectName} already exists`);
  }
  
  async.map(params.folders, (elm, cb) => {

    fs.mkdir(`${params.projectPath}/${elm}`,(err) => {

      if(err){
        
        return cb(`error to create project ${elm} : ${err}`.error);
      }
      
      cb(null);
    })
  }, (err, result) => {

    console.log('Folders created'.info);

    callback(null);
  });



};