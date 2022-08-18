const StyleDictionaryPackage = require('style-dictionary');
const { SpacingMatcher: SizeMatcher, FontSizeMatcher, FontWeightMatcher: IntegerMatcher, FontStringMatcher: StringMatcher, FontStringMatcher: FontStringMatcher, FontWeightMatcher, SpacingMatcher } = require('./matchers')

module.exports = () => {
  // Add filter for colors.
  StyleDictionaryPackage.registerFilter({
    name: 'isColor',
    matcher: (prop) => prop.attributes.category === 'color',
  })

  // Add filter for fonts.
  StyleDictionaryPackage.registerFilter({
    name: 'isFont',
    matcher: (prop) => prop.attributes.category === 'font',
  })

  StyleDictionaryPackage.registerFilter({
    name: 'isFontString',
    matcher: FontStringMatcher
  })

  StyleDictionaryPackage.registerFilter({
    name: 'isFontSize',
    matcher: FontSizeMatcher
  })

  StyleDictionaryPackage.registerFilter({
    name: 'isFontWeight',
    matcher: FontWeightMatcher
  })

  // Add filter for spacing.
  StyleDictionaryPackage.registerFilter({
    name: 'isSpacing',
    matcher: SpacingMatcher
  })

  // Add filter for themes.
  StyleDictionaryPackage.registerFilter({
    name: 'isTheme',
    matcher: (prop) => prop.attributes.category === 'theme',
  })

  // Add filter for typography.
  StyleDictionaryPackage.registerFilter({
    name: 'isTypography',
    matcher: (prop) => prop.attributes.category === 'typography',
  })

  StyleDictionaryPackage.registerFilter({
    name: 'isSize',
    matcher: SizeMatcher
  })

  StyleDictionaryPackage.registerFilter({
    name: 'isInteger',
    matcher: IntegerMatcher
  })

  StyleDictionaryPackage.registerFilter({
    name: 'isString',
    matcher: StringMatcher
  })
}
