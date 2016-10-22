/**
 * Created by antoinemoreaux on 21/08/2016.
 */
module.exports = (params, cb) => {

  params.fileContent = params.fileContent.replace(/"/g, '');

  return (cb) ? cb(null) : params;
};