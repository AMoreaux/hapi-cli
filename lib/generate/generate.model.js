const async = require('async');
const newFile = require('../../utils/newFile');
const addProperties = require('../../utils/addPropertiesModel');

exports.new = (name, params, projectPath, cb) => {

  if (typeof projectPath === 'function') {
    cb = projectPath;
    projectPath = require('../../utils/getProjectPath')();
  }


  async.waterfall([

    async.apply(addProperties, params),
    formatParamsNewFile,
    newFile
  ], (err, result) => {

    if (err) {
      console.log(`error: ${err}`.error);
      process.exit()
    }

    cb(null);
  });

  function formatParamsNewFile(model, cb) {

    cb(null, {
      projectPath: projectPath,
      filePath: 'models/',
      fileName: `${name}.model`,
      fileType: 'js',
      fileContent: model,
      nodeModule: true
    })
  }
};



