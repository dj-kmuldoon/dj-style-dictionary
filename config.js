const env = require("./env.json");

module.exports = (brand, platform) => {

    return {
        source: [
            `${env.TOKENS_DIR}/${brand}/**/*.json`
        ],
        platforms: {
            js: {
                transforms: [
                    'attribute/cti',
                    'name/dj/palette',
                    'name/cti/pascal',
                    'size/rem',
                    'color/css',
                ],
                buildPath: `${env.BUILD_DIR}/${brand}/${platform}/`,
                options: {
                    outputReferences: true
                },
                files: [
                    {
                        destination: `${env.PREFIX}-palette.es6.js`,
                        format: 'javascript/es6',
                        filter: 'color/dj/palette',
                        className: 'djToken'
                    },    
                    {
                        destination: `${env.PREFIX}-palette.js`,
                        format: 'javascript/module-flat',
                        filter: 'color/dj/palette',
                        className: 'djToken'
                    },                        
                    {
                        destination: 'tokens.es6.js',
                        filter: 'isLegacy',
                        format: 'javascript/es6'
                    },
                    {
                        destination: 'tokens.js',
                        filter: 'isLegacy',
                        format: 'javascript/module-flat'
                    }, 
                ]
            },
            web: {
                transforms: [
                    'attribute/cti',
                    'name/dj/palette',
                    'name/cti/kebab',
                    'time/seconds',
                    'content/icon',
                    'size/rem',
                    'color/css'],
                    buildPath: `${env.BUILD_DIR}/${brand}/${platform}/`,
                    files: [
                        {
                            destination: `${env.PREFIX}-palette.css`,
                            format: 'css/variables',
                            filter: 'color/dj/palette',
                        },    
                    {
                        destination: 'tokens.css',
                        filter: 'isLegacy',
                        format: 'css/variables'
                    }
                ]
            },
            ios: {
                transforms: [
                    'attribute/cti',
                    'name/dj/ios-palette',
                    'name/dj/palette/prefix',
                    'name/ti/camel',
                    'color/UIColorSwift',
                    'content/swift/literal',
                    'asset/swift/literal',
                    'size/swift/remToCGFloat',
                    'font/swift/literal'
                ],
                buildPath: `${env.BUILD_DIR}/${brand}/${platform}/`,
                files: [
                    {
                        destination: 'DJPalette.swift',
                        format: 'ios-swift/enum.swift',
                        filter: 'color/dj/palette',
                        className: 'DJPalette'
                    },
                    {
                        destination: 'ColorToken.swift',
                        format: 'ios-swift/enum.swift',
                        filter: 'color/legacy',
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
            android: {
                transforms: [
                    'attribute/cti',
                    'name/dj/palette',
                    'name/cti/snake',
                    'color/hex8android',
                    'units/sizeTodp',
                    'units/fontSizeTosp'
                ],
                buildPath: `${env.BUILD_DIR}/${brand}/${platform}/`,
                files: [
                    {
                        destination: 'dj_palette.xml',
                        format: 'android/resources',
                        filter: 'color/dj/palette',
                    },
                    {
                        destination: 'token_colors.xml',
                        format: 'android/resources',
                        filter: 'color/legacy',
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
            flutter: {
                transforms: [
                    'attribute/cti',
                    'name/dj/flutter-palette',
                    'name/dj/palette/prefix',
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
                ],
                buildPath: `${env.BUILD_DIR}/${brand}/${platform}/`,
                files: [
                    {
                        destination: 'DJPalette.dart',
                        format: 'flutter/class.dart',
                        className: 'DJPalette',
                        filter: 'color/dj/palette',
                    },
                    {
                        destination: 'ColorToken.dart',
                        format: 'flutter/class.dart',
                        className: 'ColorToken',
                        filter: 'color/legacy',
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
                transforms: ['attribute/cti',
                    'name/dj/compose-palette',
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
                ],
                buildPath: `${env.BUILD_DIR}/${brand}/${platform}/`,
                files: [
                    {
                        destination: 'DJPalette.kt',
                        format: 'compose/object',
                        className: 'DJPalette',
                        packageName: 'com.dowjones.djcomposefoundations.designtoken',
                        filter: 'color/dj/palette',
                    },
                    {
                        destination: 'ColorToken.kt',
                        format: 'compose/object',
                        className: 'ColorToken',
                        packageName: 'com.dowjones.djcomposefoundations.designtoken',
                        filter: 'color/legacy',
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
            },
            mercury: {
                transforms: [
                    'attribute/cti',
                    'name/dj/palette',
                    'name/dj/palette/prefix',
                    'name/cti/pascal',
                    'units/color'
                ],
                buildPath: `${env.BUILD_DIR}/${brand}/${platform}/`,
                files: [{
                    brand: brand,
                    destination: 'tokens.mercury.json',
                    format: 'dj/brand',
                }],
            },
        }
    };
}