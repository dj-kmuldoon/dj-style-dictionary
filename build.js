const StyleDictionaryPackage = require('style-dictionary');
const BUILD_DIR = 'build';
const fs = require('fs');
const registerTransforms = require('./lib/transforms');
const registerFilters = require('./lib/filters');
const registerFormats = require('./lib/formats');
// const platforms = ['mercury', 'android', 'ios', 'web', 'flutter', 'compose']
const platforms = ['js', 'android', 'ios', 'web', 'flutter', 'compose', 'mercury']
const brandsDirectory = 'tokens/brands';


registerTransforms();
registerFilters();
registerFormats();

// Loop through all brand directories which contain tokens...

brands().map(brand => {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${brand}]`);

    platforms.map(platform => {
        const StyleDictionary = StyleDictionaryPackage.extend(config(brand));
        StyleDictionary.buildPlatform(platform);
    });

});
console.log('\n==============================================');
console.log('\nBuild completed!');

function brands() {
    let result = getDirectories(brandsDirectory)
    console.log(result)
    return result
}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

function config(brand, platform) {
    return {
        source: [
            `${brandsDirectory}/${brand}/**/*.json`
        ],
        platforms: {
            js: {
                transforms: [
                    'attribute/cti',
                    'name/dj/normalize',
                    'name/cti/pascal',
                    'size/rem',
                    'color/css',
                ],
                buildPath: `${BUILD_DIR}/${brand}/js/`,
                options: {
                    outputReferences: true
                },
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
                transforms: [
                    'attribute/cti',
                    'name/dj/normalize',
                    'name/cti/kebab',
                    'time/seconds',
                    'content/icon',
                    'size/rem',
                    'color/css'],
                buildPath: `${BUILD_DIR}/${brand}/web/`,

                files: [
                    {
                        destination: 'tokens.css',
                        format: 'css/variables'
                    }
                ]
            },

            ios: {
                transforms: [
                    'attribute/cti',
                    'name/dj/normalize',
                    'name/dj/prefix',
                    'name/ti/camel',
                    'color/UIColorSwift',
                    'content/swift/literal',
                    'asset/swift/literal',
                    'size/swift/remToCGFloat',
                    'font/swift/literal'
                ],
                buildPath: `${BUILD_DIR}/${brand}/ios/`,
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
            android: {
                transforms: [
                    'attribute/cti',
                    'name/dj/normalize',
                    'name/cti/snake',
                    'color/hex8android',
                    'units/sizeTodp',
                    'units/fontSizeTosp'
                ],
                buildPath: `${BUILD_DIR}/${brand}/android/`,
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
            flutter: {
                transforms: [
                    'attribute/cti',
                    'name/dj/normalize', 
                    'name/dj/prefix',                                     
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
                buildPath: `${BUILD_DIR}/${brand}/flutter/`,
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
                transforms:['attribute/cti',
                'name/dj/normalize', 
                'name/dj/prefix',   
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
                buildPath: `${BUILD_DIR}/${brand}/compose/`,
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
            },
            mercury: {
                transforms: [
                    'attribute/cti',
                    'name/cti/pascal',
                    'units/color'
                ],
                buildPath: `${BUILD_DIR}/${brand}/mercury/`,

                files: [{
                    brand: brand,
                    destination: 'tokens.mercury.json',
                    format: 'dj/brand',
                }],
            },
        }
    };
}

// function config(brand) {
//     return {
//         source: [
//             `${brandsDirectory}/${brand}/**/*.json`
//         ],
//         platforms: {
//             js: {
// transforms: [
//     'name/nk-dj/normalize',
//     'attribute/cti',
//     'name/cti/pascal',
//     'size/rem',
//     'color/css',
// ],
//                 buildPath: `${BUILD_DIR}/js/${brand}/`,
//                 options: {
//                     outputReferences: true
//                 },
//                 files: [
//                     {
//                         destination: 'tokens.es6.js',
//                         format: 'javascript/es6'
//                     },
//                     {
//                         destination: 'tokens.js',
//                         format: 'javascript/module-flat'
//                     },
//                 ]
//             },
//             web: {
//                 transformGroup: 'custom/css',
//                 buildPath: `${BUILD_DIR}/web/${brand}/`,
//                 files: [
//                     {
//                         destination: 'tokens.css',
//                         format: 'css/variables'
//                     },
//                     {
//                         destination: 'tokens.json',
//                         format: 'json/nested'
//                     }
//                 ]
//             },
// mercury: {
//     transforms: [
//         'attribute/cti',
//         'name/cti/pascal',
//         'units/color'
//     ],
//     buildPath: `${BUILD_DIR}/mercury/${brand}/`,
//     files: [{
//         brand: brand,
//         destination: 'tokens.mercury.json',
//         format: 'dj/brand',
//     }],
// },
// android: {
//     // transformGroup: "AndroidDJ",
//     transforms: [
//         'attribute/cti',
//         'name/nk-dj/normalize',
//         'name/cti/snake',
//         'color/hex8android',
//         'units/sizeTodp',
//         'units/fontSizeTosp'
//     ],

//     buildPath: `${BUILD_DIR}/android/${brand}/`,
//     files: [
//         {
//             destination: 'token_colors.xml',
//             format: 'android/resources',
//             filter: 'isColor'
//         },
//         {
//             destination: 'token_integers.xml',
//             format: 'android/resources',
//             resourceType: 'integer',
//             filter: 'isInteger'
//         },
//         {
//             destination: 'token_dimens.xml',
//             format: 'android/resources',
//             resourceType: 'dimen',
//             filter: 'isSize'
//         },
//         {
//             destination: 'token_font_dimens.xml',
//             format: 'android/resources',
//             resourceType: 'dimen',
//             filter: 'isFontSize'
//         },
//         {
//             destination: 'token_strings.xml',
//             format: 'android/resources',
//             resourceType: 'string',
//             filter: 'isString'
//         }
//     ],
// },
// ios: {
//     transformGroup: 'ios-swift-separate',
//     buildPath: `${BUILD_DIR}/ios/${brand}/`,
//     files: [
//         {
//             destination: 'ColorToken.swift',
//             format: 'ios-swift/enum.swift',
//             filter: 'isColor',
//             className: 'ColorToken'
//         },
//         {
//             destination: 'FontToken.swift',
//             format: 'ios-swift/enum.swift',
//             filter: 'isFont',
//             className: 'FontToken'
//         },
//         {
//             destination: 'SpacingToken.swift',
//             format: 'ios-swift/enum.swift',
//             filter: 'isSpacing',
//             className: 'SpacingToken'
//         },
//         {
//             destination: 'TypographyToken.swift',
//             format: 'ios-swift/enum.swift',
//             filter: 'isTypography',
//             className: 'TypographyToken'
//         },
//     ],
// },
//             flutter: {
//                 transformGroup: "FlutterDJ",
//                 buildPath: `${BUILD_DIR}/flutter/${brand}/`,
//                 files: [
//                     {
//                         destination: 'ColorToken.dart',
//                         format: 'flutter/class.dart',
//                         className: 'ColorToken',
//                         filter: 'isColor'
//                     },
//                     {
//                         destination: 'FontToken.dart',
//                         format: 'flutter/class.dart',
//                         filter: 'isFont',
//                         className: 'FontToken'
//                     },
//                     {
//                         destination: 'SpacingToken.dart',
//                         format: 'flutter/class.dart',
//                         filter: 'isSpacing',
//                         className: 'SpacingToken'
//                     },
//                     {
//                         destination: 'TypographyToken.dart',
//                         format: 'flutter/class.dart',
//                         filter: 'isTypography',
//                         className: 'TypographyToken'
//                     },
//                 ]
//             },
            // compose: {
            //     transformGroup: "ComposeDJ",
            //     buildPath: `${BUILD_DIR}/compose/${brand}/`,
            //     files: [
            //         {
            //             destination: 'ColorToken.kt',
            //             format: 'compose/object',
            //             className: 'ColorToken',
            //             packageName: 'com.dowjones.djcomposefoundations.designtoken',
            //             filter: 'isColor'
            //         },
            //         {
            //             destination: 'FontToken.kt',
            //             format: 'compose/object',
            //             className: 'FontToken',
            //             packageName: 'com.dowjones.djcomposefoundations.designtoken',
            //             filter: 'isFont',
            //         },
            //         {
            //             destination: 'SpacingToken.kt',
            //             format: 'compose/object',
            //             className: 'SpacingToken',
            //             packageName: 'com.dowjones.djcomposefoundations.designtoken',
            //             filter: 'isSpacing',
            //         },
            //         {
            //             destination: 'TypographyToken.kt',
            //             format: 'compose/object',
            //             className: 'TypographyToken',
            //             packageName: 'com.dowjones.djcomposefoundations.designtoken',
            //             filter: 'isTypography',
            //         },
            //     ]
            // }
//         }
//     };
// }

function getStyleDictionaryConfig(brand, platform) {
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
                    'name/nk-dj/normalize',
                    'attribute/cti',
                    'name/cti/pascal',
                    'size/rem',
                    'color/css',
                ],
                buildPath: `${BUILD_DIR}/js/${brand}/`,
                options: {
                    outputReferences: true
                },
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
                // transformGroup: 'custom/css',
                transforms: [
                    'attribute/cti',
                    'name/nk-dj/normalize',
                    'units/font',
                    'units/spacing'
                ],
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
                buildPath: `${BUILD_DIR}/${brand}/flutter/`,
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