var logger = require('../servicos/logger.js');

module.exports =(app) => {
   
    app.get('/', function(req, res){
        res.send("| --- Star Wars Api Planetas --- |")
    });
    
    app.get('/listar', function(req, res) {
        
        let Planeta = app.models.PlanetaModel;
        
        Planeta.find().then(planetas => {
            res.json(planetas);
        }).catch(e => {
            
            return res.status(500).send({
                message: "Erro na busca:" +e.message});
        });    
    });
    
    app.get('/buscar/id/:id', function(req, res) {
       
        logger.info("Buscando o planeta:" + req.params.id);
        
        let Planeta = app.models.PlanetaModel;        
        
        Planeta.findById(req.params.id)
        .then(planeta => {
            if (!planeta) {
                return res.status(404).send({
                    message: "Planeta não encontardo com o id: " +req.params.id
                })
            }
            res.json(planeta);
        }).catch(e => {
            logger.info("Erro na busca por id: "+e.message);
            return res.status(500).send({
                message: "Erro na busca: " +e.message});
        });
    })

    app.get('/buscar/nome/:nome', function(req, res) {
        
        logger.info("Buscando o planeta pelo nome:" + req.params.nome);

        let query = {nome: {$regex: req.params.nome, $options: 'i'}};
        let q = {nome: new RegExp(req.params.nome, "i")};
        let Planeta = app.models.PlanetaModel;
        
        Planeta.find(q).then(planeta => {        
            res.json(planeta);
        }).catch(e => {
            logger.info("Erro na busca por nome: "+e.message);
            return res.status(500).send({
                message: "Erro na busca: " +e.message});
        });    
    })

    app.post('/adicionar', function(req, res) {
    
        req.assert("nome", "o nome do planeta é obrigatório").notEmpty();
        req.assert("clima", "o clima do planeta é obrigatório").notEmpty();
        req.assert("terreno", "o terreno do planeta é obrigatório").notEmpty();
        
        let erros = req.validationErrors();

        if (erros) {
            let message = '';            
            for(x in erros) {                
                logger.info("Erros de validação encontrado: "+ erros[x].msg);
            }
            console.log("Erros de validação encontrados.");
            
            res.status(400).send(erros);
            return false;
        }

        logger.info("Adicionando um novo planeta: "+ req.body);

        let swapi = new app.servicos.swapi();
        
        swapi.getFilmes(req.body.nome).then((data) => {
        
          let Planeta = app.models.PlanetaModel;
          let query = {nome: {$regex: req.body.nome, $options: 'i'}};
          
           Planeta.find(query).then(planeta => {
              if (planeta.length ==0) {                    
                const planeta = new Planeta({
                    nome: req.body.nome,
                    clima: req.body.clima,
                    terreno: req.body.terreno,
                    numero_filmes: data
                });
                planeta.save()
                .then(data => {
                    res.status(201);
                    res.send(data);
                }).catch(e => { 
                    logger.info("Erro ao adicionar o planeta: "+e.message);
                    res.status(500).send({ message: e.message })
                })    
            } else {
                throw({'message': 'Planeta '+req.body.nome+ ' Já cadastrado nesta galáxia!'});
            }
            }).catch(e => { 
                logger.info("Erro ao adicionar um novo planeta: "+ e.message);                             
                return res.status(500).json(e.message);
            })
        });    
    });

    app.delete('/remover/:id', function (req, res) {
       
        logger.info("Remover um planeta por id: "+ req.params.id);

        let Planeta = app.models.PlanetaModel;
        Planeta.findByIdAndRemove(req.params.id)
        .then(planeta => { 
            if(!planeta) {
                return res.status(404).send({
                    message: "Planeta não encontrado com o id =  "+req.params.id
                });
            }
            res.send({ message: "Planeta destruído!" });
        }).catch(e => {
            logger.info("Erro ao tentar remover um planeta por id: "+ req.params.id);
            return res.status(500).send({
                message: e.message
            })
        })    
    })

}    
        
        
    



    