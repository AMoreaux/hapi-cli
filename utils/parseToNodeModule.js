/**
 * Created by antoinemoreaux on 21/08/2016.
 */
module.exports = (content) => {


  return `module.exports = ${content.replace(/"|(\r\n|\n|\r)/gm, '')}`
};