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
  
  async.eachSeries(params.folders, (elm, cb) => {

    fs.mkdir(`${params.projectPath}/${elm}`,(err) => {

      if(err){
        
        return cb(`error to create project ${elm} : ${err}`.error);
      }
      async.setImmediate(function () {
        cb(null);
      });
      
    })
  }, (err, result) => {

    if(err){
      console.log(err);

    }
    console.log('Folders created'.info);

    callback(null);

  });



};