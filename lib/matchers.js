const StyleDictionaryPackage = require('style-dictionary');
const env = require('../env.json')

module.exports = {
    // Returns all spacing tokens. Can be used to create type safe exports and to append size units.
    SpacingMatcher: (prop) => {
        if (prop.attributes.category === 'spacing') {
            return true
        }
    },

    // Returns all font size tokens. Can be used to create type safe exports and append font size units.
    FontSizeMatcher: (prop) => {
        if (prop.attributes.category === 'font') {
            if (prop.attributes.type === 'letter-spacing') {
                return true
            }
        } else if (prop.attributes.category === 'typography') {
            if (prop.attributes.subitem === 'size' || prop.attributes.subitem == 'line-height' ||
                prop.attributes.state === 'font-size' || prop.attributes.state == 'line-height' ||
                prop.attributes.state === 'letter-spacing') {
                return true
            }
        } else {
            return false
        }
    },

    // Returns all font weight tokens. Can be used to create type safe exports.
    FontWeightMatcher: (prop) => {
        if (prop.attributes.category === 'font') {
            if (prop.attributes.type === 'weight') {
                return true
            }
        } else if (prop.attributes.category === "typography") {
            if (prop.attributes.subitem === "font-weight" || prop.attributes.state === "font-weight") {
                return true
            }
        } else {
            return false
        }
    },

    // Returns all font string tokens. Can be used to create type safe exports.
    FontStringMatcher: (prop) => {
        if (prop.attributes.category === 'font') {
            if (prop.attributes.type === 'family' || prop.attributes.type === 'style' ||
                prop.attributes.type === 'case') {
                return true
            }
        } else if (prop.attributes.category === 'typography') {
            if (prop.attributes.subitem === 'font-family' || prop.attributes.subitem === 'case' ||
                prop.attributes.state === 'font-family' || prop.attributes.state === 'case') {
                return true
            }
        } else {
            return false
        }
    },

    // Returns all font family tokens. Can be used to create type safe exports.
    FontFamilyMatcher: (prop) => {
        if (prop.attributes.category === 'font') {
            if (prop.attributes.type === 'family') {
                return true
            }
        } else if (prop.attributes.category === 'typography') {
            if (prop.attributes.subitem === 'font-family' || prop.attributes.state === 'font-family') {
                return true
            }
        } else {
            return false
        }
    },

    // Returns all font style tokens. Can be used to create type safe exports.
    FontStyleMatcher: (prop) => {
        if (prop.attributes.category === 'font') {
            if (prop.attributes.type === 'style') {
                return true
            }
        } else if (prop.attributes.category === 'typography') {
            if (prop.attributes.subitem === 'font-style' || prop.attributes.state === 'font-style') {
                return true
            }
        } else {
            return false
        }
    },

    // Returns all font case tokens. Can be used to create type safe exports.
    FontCaseMatcher: (prop) => {
        if (prop.attributes.category === 'font') {
            if (prop.attributes.type === 'case') {
                return true
            }
        } else if (prop.attributes.category === 'typography') {
            if (prop.attributes.subitem === 'font-case' || prop.attributes.state === 'font-case') {
                return true
            }
        } else {
            return false
        }
    },

    // Returns semantic-weighted colors from geneome
    PaletteMatcher: (prop) => {
        if ((prop.attributes.category === 'color') &&
            (prop.filePath.endsWith(env.PALETTE_COLORS))) {
            return true
        }
    },
}
