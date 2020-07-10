const Chessman = require('./chessman.js'); 
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
module.exports = piyon;