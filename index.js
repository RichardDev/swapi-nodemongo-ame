const app = require('./config/config_express')();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log("Rodando na porta: 3000");
});