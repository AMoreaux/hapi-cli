
  (function (log) {

    /**
     * On récupère le fichier package.json
     * On stock l'objet dans une variable `appPackage`
     */
    const appPackage = require(__dirname + '/package.json');
    const path = require('path');
    const Mongoose = require('mongoose');
    const Hapi = require('hapi');
    const Hapiauthjwt = require('hapi-auth-jwt2');
    const colors = require('colors/safe');
    const corsHeaders = require('hapi-cors-headers');
    

    for (let i = 0; i < appPackage.global_dependencies.length; i++) {
      let pack = appPackage.global_dependencies[i];
      global[(pack.charAt(0).toUpperCase() + pack.substr(1).toLowerCase()).replace(/[\W\d\s_-]+/g, '')] = require(pack);
    }

    /**
     * Récupération de notre fichier comprenant les méthodes statiques utiles
     */
    var Utils = require('./services/utils/utils.js');

    /**
     * Création de notre instance mongoose
     */
    if(Config.mongodb) require('./services/utils/db.js')();

    /**
     * On place les models dans une variable globale pour y avoir accès partout
     * La première condition charge les methods et middlewares spécifique au schéma mongoose
     * La deuxième condition charge les méthodes statiques
     * La troisième les méthodes sur les objets déjà instancié.
     */
    global.Models = {};

    Utils.getFiles('models').forEach((modelFile) => {

      let modelInterface = require(modelFile);
      let schema = Mongoose.Schema(modelInterface.schema, {versionKey: false});
      let name = path.basename(modelFile, '.js');

      if (modelInterface.statics) {
        for (let modelStatic in modelInterface.statics) {
          schema.statics[modelStatic] = modelInterface.statics[modelStatic];
        }
      }

      if (modelInterface.methods) {
        for (let modelMethod in modelInterface.methods) {
          schema.methods[modelMethod] = modelInterface.methods[modelMethod];
        }
      }

      if (modelInterface.onSchema) {
        for (let type in modelInterface.onSchema) {
          for (let func in modelInterface.onSchema[type]) {
            if(Array.isArray(modelInterface.onSchema[type][func])){
              for(var i = 0; i < modelInterface.onSchema[type][func].length; i++){
                schema[type](func, modelInterface.onSchema[type][func][i]);
              }
            }else{
              schema[type](func, modelInterface.onSchema[type][func]);
            }
          }
        }
      }

      let nameModel = name.charAt(0).toUpperCase() + name.slice(1);
      Models[nameModel] = Mongoose.model(nameModel, schema);
    });

    /**
     * On instancie le serveur
     */
    var server = new Hapi.Server();


    /**
     * On configure HapiJS depuis la configuration définie dans les fichiers de configuration
     * Par défaut, le fichier de configuration défini sera:
     * ./config/default.json
     * Lorsque vous mettrez en production votre projet, il se peut que vous ayez besoin de
     * définir des variables de développement différentes (accès à la base de données, port, etc...)
     * Dans ce cas, il vous faudra définir la variable d'environnement NODE_ENV à production.json
     * Votre fichier ./config/production.json contiendra quant à lui les variables de configuration
     * qui viendront surcharger celles de votre fichier ./config/default.json
     */

    server.connection(Config.get('server.connection'));



    /**
     * On mets en place les authentifications qui sont déclaré dans le dossier policies
     */
    server.register(Hapiauthjwt, (err) => {

      if (err) {
        console.log('Hapiauthjwt error', err);
      }

      Utils.getFiles('policies').forEach((policyFile)=> {

        let policy = require(policyFile);
        let name = path.basename(policyFile, '.js');

        server.auth.strategy(name, 'jwt',
          {
            key: Config.get('server.auth.secretKey'),
            validateFunc: policy,
            verifyOptions: {algorithms: ['HS256'], ignoreExpiration: true}
          });
      });
    });


    /**
     * On récupère les routes et on les rends disponibles pour Hapi.
     */

    Utils.getFiles('routes').forEach((routesFile) => {

      require(routesFile).forEach((route) => {
        server.route(route);
      });
    });

    server.ext('onRequest', function (request, reply) {

      request.headers['access-control-request-method'] = 'GET,PUT,POST,DELETE,OPTIONS';
      request.headers.origin = '*';
      request.headers['Content-Type'] =  'application/json';

      if(request.method.toLowerCase() === 'options'){
        return reply('VERB \'OPTIONS\' NOT ACCEPTED');
      }
      return reply.continue();
    });

    server.ext('onPreResponse', function (request, reply) {
      corsHeaders(request, reply);
    });
    

    /**
     * On lance le serveur
     */
    server.start(() => {
      log(colors.green('%s %s est lancé sur %s'), appPackage.name, appPackage.version, server.info.uri);

    });

    module.exports = server;

  })(console.log);
