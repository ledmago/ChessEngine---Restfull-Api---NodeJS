const express = require('express');
const app = express.createServer();

const {checkInsideOfBoard,getFilledStatus,isCollision,getTasFromCordinate,getRenkTaslar,getTas} = require('./functions');
fs = require('fs');
// GENERAL SETTINGS
const PORT = 3000;
// Hata Method

showError = (msg, res) => {
    return res.status(404).send({ error: true, msg: msg })
}




// Server Start

app.get('/currentState', (req, res) => {
    res.send(JSON.stringify(beyazlar) + JSON.stringify(siyahlar));

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
