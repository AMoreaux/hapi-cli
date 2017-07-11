
module.exports = {

  /**
   * getFiles(string: path)
   * Retourne une liste de fichiers présents dans `path`
   * @return
   * Tableau de fichiers en chemin absolu
   */
  getFiles: function(path) {
    path = path[path.length-1] !== '/' ? path + '/' : path;
    let files = [];
    try {
      files = require('fs').readdirSync(__dirname + '/' + path);
    } catch (e) {
      console.log(e);
      process.exit();
    }
    return files.map((file) => {
      return __dirname + '/' + path + file;
    });
  }
};
