'use strict';

const newFile = require('../../utils/newFile');
const async = require('async');
const controllerAssets = require('../../assets/controllers/controller.js');

exports.new = (name, params, projectPath, cb) => {

    if (typeof projectPath === 'function') {
        cb = projectPath;
        projectPath = require('../../utils/getProjectPath').get();
    }

    async.waterfall([
        async.apply(getMethods, params),
        formatParamsNewFile,
        newFile
    ], (err, result)  => {
        
        if (err) {
            console.log(`error: ${err}`.error);
            process.exit()
        }

        cb(null);
    });
    
    
    function getMethods(params, cb) {
        
        if(!params || params === 'crud')return controllerAssets.get(['create', 'remove', 'find', 'update']);

        let methods = params.split(' ');
        
        const controller = methods.map((elm) => {
            return controllerAssets.get(elm.toLowerCase())
        });
        
        cb(null, controller);
    }

    function formatParamsNewFile(controller, cb) {

        cb(null,{
            projectPath: projectPath,
            filePath: 'controllers/',
            fileName: `${name}.controller`,
            fileType: 'js',
            fileContent: controller ,
            nodeModule: true,
            entity: name
        })
    }

};
