/**
 * Created by antoinemoreaux on 07/08/2016.
 */

exports.get = (name) => {

  return (name) ? process.cwd() + '/' + name : process.cwd();
};
