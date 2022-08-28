const StyleDictionaryPackage = require('style-dictionary');
const { SpacingMatcher, FontSizeMatcher, FontWeightMatcher, FontFamilyMatcher, FontStyleMatcher, FontCaseMatcher, FontStringMatcher, PaletteMatcher } = require('./matchers')
const { RemoveDuplicateItems, RemoveExtraItems, NormalizeBlackWhiteToken, NormalizeSemanticToPaletteToken } = require('../utilities')
const env = require('../env.json')

module.exports = () => {

    // transform Figma structure(s) as output by 'Figma Tokens' to better naming in code
    StyleDictionaryPackage.registerTransform({
      name: 'name/dj/palette/prefix',
      type: 'name',
      matcher: (prop) => prop.attributes.category === 'color',
      transformer: (prop) => {
        if (prop.filePath.endsWith(env.PALETTE_COLORS)) {
          prop.path.unshift(env.PREFIX) // Add 'dj' Prefix
        }
        return prop
      }
    });

  // transform Figma structure(s) as output by 'Figma Tokens' to better naming in code
  StyleDictionaryPackage.registerTransform({
    name: 'name/dj/palette',
    type: 'name',
    matcher: PaletteMatcher,
    transformer: (prop) => {
        prop.path = NormalizeBlackWhiteToken(prop)
        prop.path = RemoveDuplicateItems(prop.path)
        prop.path = RemoveExtraItems(prop.path)
        prop.path = NormalizeSemanticToPaletteToken(prop.path, "palette")
        prop.path.unshift(env.PREFIX) // Add 'dj' Prefix
      return prop
    }
  });

    // transform Figma structure(s) as output by 'Figma Tokens' to better naming in code
    StyleDictionaryPackage.registerTransform({
      name: 'name/dj/ios-palette',
      type: 'name',
      matcher: PaletteMatcher,
      transformer: (prop) => {
          prop.path = NormalizeBlackWhiteToken(prop)
          prop.path = RemoveDuplicateItems(prop.path)
          prop.path = RemoveExtraItems(prop.path)
          prop.path = NormalizeSemanticToPaletteToken(prop.path, "")
        }
    });

    StyleDictionaryPackage.registerTransform({
      name: 'name/dj/compose-palette',
      type: 'name',
      matcher: PaletteMatcher,
      transformer: (prop) => {
          prop.path = NormalizeBlackWhiteToken(prop)
          prop.path = RemoveDuplicateItems(prop.path)
          prop.path = RemoveExtraItems(prop.path)
          prop.path = NormalizeSemanticToPaletteToken(prop.path, "")
        return prop
      }
    });

    StyleDictionaryPackage.registerTransform({
      name: 'name/dj/flutter-palette',
      type: 'name',
      matcher: PaletteMatcher,
      transformer: (prop) => {
          prop.path = NormalizeBlackWhiteToken(prop)
          prop.path = RemoveDuplicateItems(prop.path)
          prop.path = RemoveExtraItems(prop.path)
          prop.path = NormalizeSemanticToPaletteToken(prop.path, "")
        return prop
      }
    });    


  // handle font size/line height units transformation for web
  StyleDictionaryPackage.registerTransform({
    name: 'units/font',
    type: 'value',
    // SD will only transform matches of resolved values
    // specifying font values two levels deep under `font` is convention
    // { foo: { bar: { font: { TO_PX: { ... } } } } }
    matcher: ({ attributes: { item, subitem }}) => item === 'font' && env.TO_PX.includes(subitem),
    transformer: prop => `${prop.original.value}px`,
  });

  StyleDictionaryPackage.registerTransform({
    name: 'units/spacing',
    type: 'value',
    matcher: (prop) => prop.attributes.category === 'spacing',
    transformer: (prop) => `${prop.original.value}px`,
  });

  // // add custom transforms on top of the CSS transforms that Storybook has by default
  // StyleDictionaryPackage.registerTransformGroup({
  //   name: 'custom/css',
  //   transforms: StyleDictionaryPackage.transformGroup.css.concat(['name/nk-dj/normalize', 'units/font', 'units/spacing'])
  // });

  StyleDictionaryPackage.registerTransformGroup({
    name: 'custom/css',
    transforms: ['units/font', 'units/spacing']
  });

  // add custom CSS RGB to sRGB units transformation for mobile
  StyleDictionaryPackage.registerTransform({
    name: 'units/color',
    type: 'value',
    matcher: prop => prop.attributes.category === 'color' && prop.value.match('rgba'),
    transformer: prop => {
      let value = prop.original.value;
      value = value.replace(/[^\d,.]/g, '').split(',');
      for (let i = 0; i < value.length; i++) {
        if (i < 3) value[i] = parseFloat((value[i] / 255).toFixed(3));
        else value[i] = parseFloat(value[i]);
      }
      return value;
    }
  });

  // Android XML dp dimens size units
  StyleDictionaryPackage.registerTransform({
    name: 'units/sizeTodp',
    type: 'value',
    matcher: SpacingMatcher,
    transformer: prop => `${prop.original.value}dp`,
  });

  // Android XML sp font size units
  StyleDictionaryPackage.registerTransform({
    name: 'units/fontSizeTosp',
    type: 'value',
    matcher: FontSizeMatcher,
    transformer: prop => `${prop.original.value}sp`,
  });

  // Flutter spacer doubles. Same implementation as library 'size/flutter/remToDouble'.
  StyleDictionaryPackage.registerTransform({
    name: 'spacing/flutter/spacerToDouble',
    type: 'value',
    matcher: SpacingMatcher,
    transformer: prop => parseFloat(prop.original.value, 10).toFixed(2),
  });

  // Flutter font size doubles. Same implementation as library 'size/flutter/remToDouble'.
  StyleDictionaryPackage.registerTransform({
    name: 'font/flutter/fontSizeToDouble',
    type: 'value',
    matcher: FontSizeMatcher,
    transformer: prop => parseFloat(prop.original.value, 10).toFixed(2),
  });

  // Flutter FontWeight class: FontWeight.w700
  StyleDictionaryPackage.registerTransform({
    name: 'font/flutter/weightToFontWeight',
    type: 'value',
    matcher: FontWeightMatcher,
    transformer: prop => {
      let value = prop.original.value;
      return 'FontWeight.w' + value;
    },
  });

  // Removes all whitespaces from Font Family value. 
  // The font.family implementation uses a whitespace which is the default for web. 
  // Mobile apps do not use whitespace.
  StyleDictionaryPackage.registerTransform({
    name: 'font/familyWithoutWhitespace',
    type: 'value',
    matcher: FontFamilyMatcher,
    transformer: prop => String(prop.original.value.replace(/\s/g,'')),
  });

  // Compose FontWeight class: FontWeight.W700
  StyleDictionaryPackage.registerTransform({
    name: 'font/compose/weightToFontWeight',
    type: 'value',
    matcher: FontWeightMatcher,
    transformer: prop => {
      let value = prop.original.value;
      return 'FontWeight.W' + value;
    },
  });

  // Compose font case String literal: "setence"
  StyleDictionaryPackage.registerTransform({
    name: 'font/compose/case',
    type: 'value',
    matcher: FontCaseMatcher,
    transformer: prop => {
      let value = prop.original.value;
      return `"${value}"`;
    },
  });

  // Compose font style: FontStyle.Italic
  StyleDictionaryPackage.registerTransform({
    name: 'font/compose/style',
    type: 'value',
    matcher: FontStyleMatcher,
    transformer: prop => {
      if (prop.original.value == "italic") {
        return 'FontStyle.Italic';
      } else {
        return 'FontStyle.Normal';
      }
    },
  });

  // Compose font family String literal: "Retina"
  StyleDictionaryPackage.registerTransform({
    name: 'font/compose/family',
    type: 'value',
    matcher: FontFamilyMatcher,
    transformer: prop => {
      let value = prop.original.value;
      return `"${value}"`;
    },
  });

  // Compose font size to sp: 32.sp
  StyleDictionaryPackage.registerTransform({
    name: 'units/compose/fontSizeTosp',
    type: 'value',
    matcher: FontSizeMatcher,
    transformer: prop => `${prop.original.value}.sp`,
  });

  // Compose spacing tp: 20.dp
  StyleDictionaryPackage.registerTransform({
    name: 'units/compose/spacingTodp',
    type: 'value',
    matcher: SpacingMatcher,
    transformer: prop => `${prop.original.value}.dp`,
  });

  // Custom Flutter Transform Group
  // The default 'font/flutter/literal' converts all font values to Flutter literal Strings.
  // Adds 'font/flutter/weightToFontWeight' to change font.weight to Flutter FontWeight class.
  // Adds 'font/familyWithoutWhitespace' to remove whitespace from font.family.
  // Adds 'font/flutter/fontSizeToDouble' for font.letter-spacing and font.size.
  // Adds 'spacing/flutter/spacerToDouble' for spacing tokens.
  StyleDictionaryPackage.registerTransformGroup({
    name: 'FlutterDJ',
    transforms: [
      'attribute/cti',
      'name/ti/camel',
      'color/hex8flutter',
      'size/flutter/remToDouble',
      'content/flutter/literal',
      'asset/flutter/literal',
      'font/familyWithoutWhitespace', // must be before font/flutter/literal
      'font/flutter/literal',
      'font/flutter/weightToFontWeight',
      'font/flutter/fontSizeToDouble',
      'spacing/flutter/spacerToDouble',
    ]
  });

  // Custom Android Transform Group
  StyleDictionaryPackage.registerTransformGroup({
    name: 'AndroidDJ',
    transforms: [
      'attribute/cti',
      'name/cti/snake',
      'color/hex8android',
      'units/sizeTodp',
      'units/fontSizeTosp'
    ]
  });

  // Custom Compose Transform Group
  StyleDictionaryPackage.registerTransformGroup({
    name: 'ComposeDJ',
    transforms: [
      'attribute/cti',
      'name/ti/camel',
      'color/composeColor',
      'font/compose/weightToFontWeight',
      'font/compose/case',
      'font/compose/style',
      'font/compose/family',
      'units/compose/fontSizeTosp',
      'units/compose/spacingTodp'
    ]
  });

}
