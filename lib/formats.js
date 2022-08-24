const StyleDictionaryPackage = require('style-dictionary');

module.exports = () => {

  StyleDictionaryPackage.registerFormat({
    name: 'dj/brand',
    formatter(dictionary, config) {
      return StyleDictionaryPackage.format['json/nested'](dictionary);
    }
  });

  StyleDictionaryPackage.registerFormat({
    name: 'javascript/module-flat',
    formatter(dictionary, config) {
      return `module.exports = ${StyleDictionaryPackage.format['json/flat'](dictionary)}`;
    }
  });

  StyleDictionaryPackage.registerFormat({
    name: 'testing/test/test',
    formatter(dictionary, config) {
      return StyleDictionaryPackage.format['css/variables'](dictionary);

      return `module.exports = ${StyleDictionaryPackage.format['json/flat'](dictionary)}`;
    }
  });

}