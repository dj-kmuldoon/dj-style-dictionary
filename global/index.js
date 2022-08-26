
//
// If color is black or white, normalize names
// to ColorBlack and ColorWhite, regardless of Figma 
// structure.
//

export function normalizeBlackWhite(prop) {
    if (prop.value === "#ffffffff") {
        return ['color', 'white']
    } else if (prop.value === "#000000ff") {
        return ['color', 'black']
    } else {
        return prop.path
    }
}