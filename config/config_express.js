let express = require('express');
let consign = require('consign');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../servicos/logger.js');

module.exports = function() {
    let app = express();
    
    app.use(morgan("common", {
        stream: {
          write: function(mensagem){
              logger.info(mensagem);
          }
        }
      }));
    

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());
    
    consign()
    .include('controllers')
    
    .then('models')
    .then('servicos')    
    .into(app);
    return app;
}