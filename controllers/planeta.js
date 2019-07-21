module.exports =(app) => {
   
    app.get('/', function(req, res){
        res.send("| --- Star Wars Api Planetas --- |")
    });
    
    app.get('/planetas', function(req, res) {
        
        let Planeta = app.models.PlanetaModel;
        
        Planeta.find().then(planetas => {
            res.json(planetas);
        }).catch(e => {
            return res.status(500).send({
                message: "Erro na busca:" +e.message});
        });    
    });
    
    app.get('/planetas/id/:id', function(req, res) {
       
        let Planeta = app.models.PlanetaModel;
        console.log(req.params);
        Planeta.findById(req.params.id)
        .then(planeta => {
            if (!planeta) {
                return res.status(404).send({
                    message: "Planeta não encontardo com o id: " +req.params.id
                })
            }
            res.json(planeta);
        }).catch(e => {
            return res.status(500).send({
                message: "Erro na busca: " +e.message});
        });
    })

    app.get('/planetas/nome/:nome', function(req, res) {
        
        let query = {nome: {$regex: req.params.nome, $options: 'i'}};
        let q = {nome: new RegExp(req.params.nome, "i")};
        let Planeta = app.models.PlanetaModel;
        
        Planeta.find(q).then(planeta => {        
            res.json(planeta);
        }).catch(e => {
            return res.status(500).send({
                message: "Erro na busca: " +e.message});
        });    
    })

    app.post('/criar', function(req, res) {
    
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
                    res.send(data)
                }).catch(e => { 
                    res.status(500).send({ message: e.message })
                })    
            } else {
                throw({'message': 'Planeta Já cadastrado nesta galáxia!'});
            }
            }).catch(e => {                              
                return res.status(500).json(e.message);
            })
        });    
    });

    app.delete('/remover/:id', function (req, res) {
       
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
            return res.status(500).send({
                message: e.message
            })
        })    
    })

}    
        
        
    



    