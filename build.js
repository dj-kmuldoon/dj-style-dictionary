const StyleDictionaryPackage = require('style-dictionary');
const env = require("./env.json")
const config = require('./config/config.js');
const getStyleDictionaryConfig = require('./config/config_v1.js')
const { fsDirectories } = require('./utilities')

const registerTransforms = require('./lib/transforms');
const registerFilters = require('./lib/filters');
const registerFormats = require('./lib/formats');

registerTransforms();
registerFilters();
registerFormats();

// Loop through all brand directories which contain tokens...

const platforms = env.PLATFORMS
const brands = fsDirectories(env.TOKENS_DIR)

brands.map(brand => {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${brand}]`);
    
    platforms.map(platform => {
        const StyleDictionary = StyleDictionaryPackage.extend(config(brand, platform));
        StyleDictionary.buildPlatform(platform);
    });
});
console.log('\n==============================================');
console.log('\nBuild completed!');

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS
['wsj', 'noted'].map(function (brand) {
  ['mercury', 'android', 'ios', 'web', 'flutter', 'compose'].map(function (platform) {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${brand}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));
    StyleDictionary.buildPlatform(platform);

    console.log('\nEnd processing');
  });

  console.log('\n==============================================');
  console.log(`\nProcessing: [js] [${brand}] with [web] property defintions`);

  const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, 'web'))
  StyleDictionary.buildPlatform('js');

  console.log('\nEnd processing');
})

console.log('\n==============================================');
console.log('\nBuild completed!');