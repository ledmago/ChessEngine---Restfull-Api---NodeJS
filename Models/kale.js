const Chessman = require('./chessman.js'); 
class kale extends Chessman {
    avaiblePosForAttacking = () => {

        var mainX = this.currentPosition.x;
        var mainY = this.currentPosition.y;

        var Xforward;

        for (var x = mainX; x <= 8; x++) {
            if (isCollision(mainY, x)) Xforward = { mainY, x }
        }



    }

}
module.exports = kale;