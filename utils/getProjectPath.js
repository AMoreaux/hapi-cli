/**
 * Created by antoinemoreaux on 07/08/2016.
 */

module.exports = (name) => {

  return (name) ? process.cwd() + '/' + name : process.cwd();
};