const Chessman = require('./Models/chessman'); 
const piyon = require( './Models/piyon');
const kale = require('./Models/kale');

// Initialize Game
let beyazlar = [
    // Piyonlar
    new piyon('piyon1', 'piyon', 4, 2, 'beyaz'),
    new piyon('piyon2', 'piyon', 4, 3, 'beyaz'),
];


let siyahlar = [
    // Piyonlar
    new piyon('piyon1', 'piyon', 5, 3, 'siyah'),
    new piyon('piyon1', 'piyon', 4, 4, 'siyah'),

    new piyon('piyon1', 'piyon', 4, 4, 'siyah'),
    new piyon('piyon1', 'piyon', 4, 3, 'siyah'),





];
checkInsideOfBoard = (x, y) => {
    return ((x > 0 && x < 8) && y > 0 && y < 8);
}
getFilledStatus = () => {
    var filledStatus = [];

    beyazlar.map((item) => {
        filledStatus.push(item.currentPosition)
    });
    siyahlar.map((item) => {
        filledStatus.push(item.currentPosition)
    });
    return filledStatus;

}

isCollision = (x, y) => {

    var filledArray = getFilledStatus();

    var isCollising = filledArray.find(item => (item.x == x && item.y == y));
    if (!isCollising) { return false; } else { return true; }
}

getTasFromCordinate = (x, y) => {

    var filledArray = getFilledStatus();

    var isCollising = filledArray.find(item => (item.x == x && item.y == y));
    if (!isCollising) { return false; } else { return isCollising }
}

getRenkTaslar = (renk, res = null) => {

    if (renk == 'beyaz') {
        return beyazlar;
    }
    else if (renk == 'siyah') {
        return siyahlar; // Düzelt
    }
    else {
        if (res != null) showError('Verilen Renk Yanlış', res);

    }

}

getTas = (renk, idName, res = null) => {

    var renkArray = getRenkTaslar(renk)
    var chessTas = renkArray.find(item => item.name == idName)
    if (!chessTas) { if (res != null) { showError('Verilen Renk Yanlış', res) } else { return false } } else { return chessTas }

}

module.exports = {checkInsideOfBoard,getFilledStatus,isCollision,getTasFromCordinate,getRenkTaslar,getTas};