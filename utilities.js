
const fs = require('fs');
const env = require('./env.json')
var tinycolor = require("tinycolor2");

module.exports = {

    fsDirectories: (path) => {
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path + '/' + file).isDirectory();
        });
    },

    RemoveDuplicateItems: (path) => {
        let result = []
        for (let index = path.length - 1; index >= 0; index--) {
            const item = path[index];
            if (result.length === 0) {
                result.push(item)
            } else {
                const lastItem = result[result.length - 1]
                if (!lastItem.startsWith(item)) {
                    result.push(item)
                }
            }
        }
        return result.reverse()
    },

    RemoveExtraItems: (path) => {
        return path.filter(item => !env.REMOVE_ITEMS.includes(item))
    },

    NormalizeBlackWhiteToken: (prop) => {
        var color = tinycolor(prop.value);
        if (tinycolor.equals(color, tinycolor("white")) ) {
            return ['color', 'white']
        } else if (tinycolor.equals(color, tinycolor("black")) ) {
            return ['color', 'black']
        } else {
            return prop.path
        }
    },

    NormalizeSemanticToPaletteToken: (path, name) => {
        path[path.indexOf("color")] = name;
        return path
    },

}