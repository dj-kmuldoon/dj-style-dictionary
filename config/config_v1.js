const BUILD_DIR = 'dist';

module.exports = (brand, platform) => {
    return {
        source: [
          `src/platforms/${platform}/*.json`,
          `src/platforms/${platform}/${brand}/*.json`,
        ],
        include: [
          'src/globals/**/*.json',
          `src/brands/${brand}/**/*.json`,
        ],
        platforms: {
          js: {
            transforms: [
              'attribute/cti',
              'name/cti/pascal',
              'size/rem',
              'color/css',
            ],
            buildPath: `${BUILD_DIR}/js/${brand}/`,
            files: [
              {
                destination: 'tokens.es6.js',
                format: 'javascript/es6'
              },
              {
                destination: 'tokens.js',
                format: 'javascript/module-flat'
              },
            ]
          },
          web: {
            transformGroup: 'custom/css',
            buildPath: `${BUILD_DIR}/web/${brand}/`,
            files: [
              {
                destination: 'tokens.css',
                format: 'css/variables'
              },
              {
                destination: 'tokens.json',
                format: 'json/nested'
              }
            ]
          },
          mercury: {
            transforms: [
              'attribute/cti',
              'name/cti/pascal',
              'units/color'
            ],
            buildPath: `${BUILD_DIR}/mercury/${brand}/`,
            files: [{
              brand: brand,
              destination: 'tokens.mercury.json',
              format: 'dj/brand',
            }],
          },
          android: {
            transformGroup: "AndroidDJ",
            buildPath: `${BUILD_DIR}/android/${brand}/`,
            files: [
              {
                destination: 'token_colors.xml',
                format: 'android/resources',
                filter: 'isColor'
              },
              {
                destination: 'token_integers.xml',
                format: 'android/resources',
                resourceType: 'integer',
                filter: 'isInteger'
              },
              {
                destination: 'token_dimens.xml',
                format: 'android/resources',
                resourceType: 'dimen',
                filter: 'isSize'
              },
              {
                destination: 'token_font_dimens.xml',
                format: 'android/resources',
                resourceType: 'dimen',
                filter: 'isFontSize'
              },
              {
                destination: 'token_strings.xml',
                format: 'android/resources',
                resourceType: 'string',
                filter: 'isString'
              }
            ],
          },
          ios: {
            transformGroup: 'ios-swift-separate',
            buildPath: `${BUILD_DIR}/ios/${brand}/`,
            files: [
              {
                destination: 'ColorToken.swift',
                format: 'ios-swift/enum.swift',
                filter: 'isColor',
                className: 'ColorToken'
              },
              {
                destination: 'FontToken.swift',
                format: 'ios-swift/enum.swift',
                filter: 'isFont',
                className: 'FontToken'
              },
              {
                destination: 'SpacingToken.swift',
                format: 'ios-swift/enum.swift',
                filter: 'isSpacing',
                className: 'SpacingToken'
              },
              {
                destination: 'TypographyToken.swift',
                format: 'ios-swift/enum.swift',
                filter: 'isTypography',
                className: 'TypographyToken'
              },
            ],
          },
          flutter: {
            transformGroup: "FlutterDJ",
            buildPath: `${BUILD_DIR}/flutter/${brand}/`,
            files: [
              {
                destination: 'ColorToken.dart',
                format: 'flutter/class.dart',
                className: 'ColorToken',
                filter: 'isColor'
              },
              {
                destination: 'FontToken.dart',
                format: 'flutter/class.dart',
                filter: 'isFont',
                className: 'FontToken'
              },
              {
                destination: 'SpacingToken.dart',
                format: 'flutter/class.dart',
                filter: 'isSpacing',
                className: 'SpacingToken'
              },
              {
                destination: 'TypographyToken.dart',
                format: 'flutter/class.dart',
                filter: 'isTypography',
                className: 'TypographyToken'
              },
            ]
          },
          compose: {
            transformGroup: "ComposeDJ",
            buildPath: `${BUILD_DIR}/compose/${brand}/`,
            files: [
              {
                destination: 'ColorToken.kt',
                format: 'compose/object',
                className: 'ColorToken',
                packageName: 'com.dowjones.djcomposefoundations.designtoken',
                filter: 'isColor'
              },
              {
                destination: 'FontToken.kt',
                format: 'compose/object',
                className: 'FontToken',
                packageName: 'com.dowjones.djcomposefoundations.designtoken',
                filter: 'isFont',
              },
              {
                destination: 'SpacingToken.kt',
                format: 'compose/object',
                className: 'SpacingToken',
                packageName: 'com.dowjones.djcomposefoundations.designtoken',
                filter: 'isSpacing',
              },
              {
                destination: 'TypographyToken.kt',
                format: 'compose/object',
                className: 'TypographyToken',
                packageName: 'com.dowjones.djcomposefoundations.designtoken',
                filter: 'isTypography',
              },
            ]
          }
        }
      };
}