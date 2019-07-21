const swapi = require('swapi-node');

function SwapiFilmes() {
    this.url = 'https://swapi.co/api/planets/?search=';
}

SwapiFilmes.prototype.getFilmes = function (nome) {    
     let filmes = swapi.get(this.url+nome).then((result)=> {
        return result['results'][0].films.length;
    });
    return filmes;
}

module.exports = function() {
    return SwapiFilmes
}



