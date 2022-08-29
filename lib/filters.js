const StyleDictionaryPackage = require('style-dictionary');
const { SpacingMatcher: SizeMatcher, FontSizeMatcher, FontWeightMatcher: IntegerMatcher, FontStringMatcher: StringMatcher, FontStringMatcher: FontStringMatcher, FontWeightMatcher, SpacingMatcher } = require('./matchers')
const env = require("../env.json")

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
    matcher: (prop) => {
      return prop.attributes.category === 'typography'
    }
  })

    // Add filter for font.
    StyleDictionaryPackage.registerFilter({
      name: 'isFont',
      matcher: (prop) => {
        return prop.attributes.category === 'font'
      }
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

  StyleDictionaryPackage.registerFilter({
    name: 'color/dj/palette',
    matcher: (prop) => {
      return (prop.filePath.endsWith(env.PALETTE_COLORS) ? true : false)

    },
  })

  StyleDictionaryPackage.registerFilter({
    name: 'isLegacy',
    matcher: (prop) => {
      return (prop.filePath.endsWith(env.PALETTE_COLORS) ? false : true)

    },
  })


  StyleDictionaryPackage.registerFilter({
    name: 'color/legacy',
    matcher: (prop) => {
      return ((prop.attributes.category === 'color') && 
        (prop.filePath.endsWith(env.PALETTE_COLORS) ? false : true))
    }
  })

  StyleDictionaryPackage.registerFilter({
    name: 'path/dj',
    matcher: (prop) => {
      return (prop.filePath.includes(env.PREFIX) ? true : false)
    },
  })

}
