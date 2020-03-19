const express = require('express');
const app = express.createServer();
fs = require('fs');
// GENERAL SETTINGS
const PORT = 3000;
// Hata Method

showError = (msg, res) => {
    return res.status(404).send({ error: true, msg: msg })
}

// Classlar

class Chessman {
    constructor(name, type, startX, startY, renk) {
        this.name = name;
        this.type = type;
        this.startPosition = {
            x: startX,
            y: startY
        };
        this.currentPosition = {
            x: this.startPosition.x,
            y: this.startPosition.y
        };
        this.isDie = false,

            this.renk = renk

    }
    getTeamArray = () => {


        if (this.renk == 'beyaz') {
            return beyazlar;
        }
        else if (this.renk == 'siyah') {
            return siyahlar; // Düzelt
        }



    }
    getEnemyArray = () => {


        if (this.renk == 'beyaz') {
            return siyahlar;
        }
        else if (this.renk == 'siyah') {
            return beyazlar;
        }



    }

}

class piyon extends Chessman {

    avaiblePosForAttacking = () => {
        var tempAttackArray = [];
        var attackingAreas = this.attackingAreas();
        var getEnemyTaslar = this.getEnemyArray();

        attackingAreas.map((item) => {
            var isFind = getEnemyTaslar.find(enemyItem => (enemyItem.currentPosition.x == item.x && enemyItem.currentPosition.y == item.y));
            if (isFind) { tempAttackArray.push(item) }
        })

        return tempAttackArray;




    }
    avaiblePosForNormalMove = () => {
        var tempReturnArray = [];
        var normalMovingAreas = this.normalMovingAreas();
        normalMovingAreas.map((item) => {

            if (!isCollision(item.x, item.y)) { tempReturnArray.push(item) }

        })
        return tempReturnArray;
    }

    attackingAreas = () => {
        var returnTempArry = [];
        var rightSide = {
            x: this.renk == 'beyaz' ? this.currentPosition.x + 1 : this.currentPosition.x + 1,
            y: this.renk == 'beyaz' ? this.currentPosition.y + 1 : this.currentPosition.y - 1,
        };

        var leftSide = {
            x: this.renk == 'beyaz' ? this.currentPosition.x - 1 : this.currentPosition.x - 1,
            y: this.renk == 'beyaz' ? this.currentPosition.y + 1 : this.currentPosition.y - 1,

        }
        // Alan İçinde mi Kontrolü Yapılması lazım (Hepsi 0 ile 8 arasındaysa)

        if (checkInsideOfBoard(rightSide.x, rightSide.y)) returnTempArry.push(rightSide);
        if (checkInsideOfBoard(leftSide.x, leftSide.y)) returnTempArry.push(leftSide);
        return returnTempArry;
    }
    normalMovingAreas = () => {
        var returnTempArry = [];
        // For first Step
        var ileri = {
            x: this.renk == 'beyaz' ? this.currentPosition.x + 0 : this.currentPosition.x + 0,
            y: this.renk == 'beyaz' ? this.currentPosition.y + 1 : this.currentPosition.y - 1,
        }
        var startPosY = this.renk == 'beyaz' ? 2 : 7;
        if ((this.currentPosition.y == startPosY)) returnTempArry.push({ x: this.currentPosition.x + 0, y: this.currentPosition.y + 2 });
        if (checkInsideOfBoard(ileri.x, ileri.y)) returnTempArry.push(ileri);
        return returnTempArry;

    }
    getAvaiblePositions = () => {

        return this.avaiblePosForAttacking().concat(this.avaiblePosForNormalMove());

    }

    move = (x, y) => {
        let differX = Math.abs(this.currentPosition.x - x);
        let differY = Math.abs(this.currentPosition.y - y);


        return { differX: differX, differY: differY };
    }


}


class kale extends Chessman {
avaiblePosForAttacking = () =>{

    var mainX = this.currentPosition.x;
    var mainY = this.currentPosition.y;

    var Xforward;

    for(var x = mainX; x <= 8; x++)
    {
        if(isCollision(mainY,x)) Xforward = {mainY,x}
    }



}

}











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
    if (!isCollising) { return false; } else { return isCollising}
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


// Initialize Game
let beyazlar = [
    // Piyonlar
    new piyon('piyon1', 'piyon', 4, 2, 'beyaz'),







];


let siyahlar = [
    // Piyonlar
    new piyon('piyon1', 'piyon', 5, 3, 'siyah'),
    new piyon('piyon1', 'piyon', 4, 4, 'siyah'),

    new piyon('piyon1', 'piyon', 4, 4, 'siyah'),
    new piyon('piyon1', 'piyon', 4, 3, 'siyah'),





];
// Server Start

app.get('/currentState', (req, res) => {

    res.send(beyazlar);

});

app.get('/filledStatus', (req, res) => {

    res.send(getFilledStatus());

});

app.get('/test', (req, res) => {

    res.send(beyazlar[0].getAvaiblePositions());

});

app.get('/isCollision/:x/:y', (req, res) => {

    res.send(isCollision(req.params.x, req.params.y));

});




app.get('/move/:idName/:positionX/:positionY/:color', (req, res) => {

    var gelenTas = getTas(req.params.color, req.params.idName, res)
    res.send(gelenTas.move(req.params.positionX, req.params.positionY));


});

app.listen(PORT);
