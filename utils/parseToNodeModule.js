/**
 * Created by antoinemoreaux on 21/08/2016.
 */
module.exports = (content) => {


  return `'use strict';\rmodule.exports = ${content.replace(/"|(\r\n|\n|\r)/gm, '')}`
};