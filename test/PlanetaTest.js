let app = require('../config/config_express')();
let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);

describe('Planetas', function() {

    beforeEach(function(done) {
        let PlanetaModel = app.models.PlanetaModel;
        PlanetaModel.remove({}, (err) => {
            done();
        });
    });

    describe('/GET planetas', function () {
        it('Retornam os planetas cadastrados', function(done) {
            chai.request(app)
            .get('/listar')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');                
                done();
            });
        });
    });

    describe('POST adicionar', function() {
        it('Adicionar um planeta', function(done) {
            let planeta = {
                nome: "Alderaan",
                clima: "temperate",
                terreno: "grasslands, mountains"
            };
            chai.request(app)
            .post('/adicionar')
            .send(planeta)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('nome');
                res.body.should.have.property('clima');
                res.body.should.have.property('terreno');
                res.body.should.have.property('numero_filmes');
                //done();                
            });
            done();            
        });
    });

    describe('GET buscar/:nome', function() {
        it('Buscar um planeta pelo nome', function(done){
            let PlanetaModel = app.models.PlanetaModel;
            let planeta = new PlanetaModel({
            nome: "Alderaan",
            clima: "temperate",
            terreno: "grasslands, mountains",
            numero_filmes: 2
            });
            planeta.save((err, planeta) => {                
                chai.request(app)
                .get('/buscar/nome/' + planeta.nome)
                .send(planeta)
                .end((err, res) => {                    
                    res.should.have.status(200);
                    let body = res.body[0];                   
                    assert.equal(body.nome, 'Alderaan');
                    assert.equal(body.clima, 'temperate');
                    assert.equal(body.terreno, 'grasslands, mountains');                         
                    done();
                });
            });
        });
    });

    describe('GET buscar/:id', function() {
        it('Buscar um planeta pelo id', function(done){
            let PlanetaModel = app.models.PlanetaModel;
            let planeta = new PlanetaModel({
            nome: "Alderaan",
            clima: "temperate",
            terreno: "grasslands, mountains",
            numero_filmes: 2
            });
            planeta.save((err, planeta) => {                
                chai.request(app)
                .get('/buscar/id/' + planeta.id)
                .send(planeta)
                .end((err, res) => {                    
                    res.should.have.status(200);                    
                    let body = res.body;                   
                    assert.equal(body.nome, 'Alderaan');
                    assert.equal(body.clima, 'temperate');
                    assert.equal(body.terreno, 'grasslands, mountains');                         
                    done();
                });
            });
        });
    });

    describe('/DELETE/:id ', function() {
        it('Remover um planeta pelo ID', function(done){
            let PlanetaModel = app.models.PlanetaModel;
            let planeta = new PlanetaModel({
                nome: "Alderaan",
                clima: "temperate",
                terreno: "grasslands, mountains",
                numero_filmes: 2
            });
            planeta.save((err, planeta) => { 
                chai.request(app)
                .delete('/remover/' + planeta.id)
                .end((err, res) => {                    
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Planeta destruído!');
                    done();
                })
            });               
        })
    })
});