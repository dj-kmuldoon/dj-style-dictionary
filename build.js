const StyleDictionaryPackage = require('style-dictionary');
const env = require("./env.json")
const config = require('./config.js');
const { fsDirectories } = require('./utilities')

const registerTransforms = require('./lib/transforms');
const registerFilters = require('./lib/filters');
const registerFormats = require('./lib/formats');

registerTransforms();
registerFilters();
registerFormats();

// Loop through all brand directories which contain tokens...

fsDirectories(env.TOKENS_DIR).map(brand => {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${brand}]`);
    env.PLATFORMS.map(platform => {
        const StyleDictionary = StyleDictionaryPackage.extend(config(brand, platform));
        StyleDictionary.buildPlatform(platform);
    });
});
console.log('\n==============================================');
console.log('\nBuild completed!');
