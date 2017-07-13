const colors = require('colors/safe');
const Mongoose = require('mongoose');
const err = console.error;

module.exports = () => {

  Mongoose.connect(Config.get('mongodb.uri'), Config.get('mongodb.options'));

  /**
   * log si jamais la connexion avec MongoDB n'a pas pu se faire
   */
  Mongoose.connection.on('error', (e)=> {
    err('Mongoose ne peut ouvrir de connection sur %s', Config.get('mongodb.uri'));
    err('Options passées:');
    err(Config.get('mongodb.options'));
    err('Sortie d\'erreur:');
    err(e);
    process.exit();
  });

  /**
   * En cas de succes de connexion avec MongoDB
   */
  Mongoose.connection.on('connected', () => {
    log(colors.green('Connection DB ok', Config.get('mongodb.uri')));
  });

  /**
   * Si mongoose a perdu la connexion avec MongoDB
   */
  Mongoose.connection.on('disconnected', () => {
    err(colors.red('Perte de connection MongoDB'));

    /**
     * On réessai d'ouvrir une connexion au bout de 15 secondes
     */
    setTimeout(() => {
      Mongoose.connect(Config.get('mongodb.uri'), Config.get('mongodb.options'));
      err('Tentative de reconnexion à MongoDB');
    }, 15000);
  });
};