let express = require('express');
let consign = require('consign');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

module.exports = function() {
    let app = express();
    
    app.use(bodyParser.json());
    
    consign()
    .include('controllers')
    
    .then('models')
    .then('servicos')    
    .into(app);
    return app;
}