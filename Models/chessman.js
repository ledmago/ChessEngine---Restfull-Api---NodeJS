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
module.exports = Chessman;