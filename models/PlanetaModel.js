let mongoose = require('mongoose');

if ((process.env.NODE_ENV !== "test"))
    mongoose.connect('mongodb://swapi:S123456@ds121475.mlab.com:21475/app',  {useMongoClient: true});    
else
    mongoose.connect('mongodb://swapitest:S123456@ds259210.mlab.com:59210/app-test', {useMongoClient: true});    

const planetaSchema = new mongoose.Schema({
    versionKey: false,
    nome: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    clima: {
        type: String,
        required: true,
        trim: true
    },
    terreno: {
        type: String,
        required: true,
        trim: true
    },
    numero_filmes: {
        type: Number,
        default: 0
    },
},
{
   collection: 'swapiplanets'
   
});

const Planeta  = mongoose.model('Planeta', planetaSchema);

module.exports = function () {
    return Planeta;
}
