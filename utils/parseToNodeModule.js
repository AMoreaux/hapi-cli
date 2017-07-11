/**
 * Created by antoinemoreaux on 21/08/2016.
 */
module.exports = (params) => {

  return `module.exports = ${params.fileContent.replace(/"|(\r\n|\n|\r)/gm, '')}`
};