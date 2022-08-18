const StyleDictionaryPackage = require('style-dictionary');
const registerTransforms = require('./lib/transforms');
const registerFilters = require('./lib/filters');
const registerFormats = require('./lib/formats');

console.log("HOWDY!")

registerTransforms();
registerFilters();
registerFormats();