/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: custom route for fetching data
*/


var validator    = new (require('./validators/autor.js'))()
var Autor   = require('../entity/autor.js');
const { default: axios } = require('axios');
var leitura = require('../api/leitura.js');

function AutorController() {
    var Persistence  = require('../persistence/autor.js');
    var persistence  = new Persistence();
    
    // get all objects data 
    this.getAll = function (res) {
       
            i=236;
            let url="https://legis.senado.leg.br/dadosabertos/materia/situacaoatual/"+i+"?v=3";
    
             axios.get(url).then(function (response) {
    
                codigo= JSON.parse(JSON.stringify(response.data.SituacaoAtualMateria.Materias.Materia[0].Codigo));
                 console.log(codigo);
                 console.log(";AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
             }).catch(function (error) {
                 console.log(error);
             });
        persistence.getAll(res);
    };

    // get object by id 
    this.getById = function (req, res) {
        persistence.getById(req.params.id, res);
    };

    // get object by name 
    this.getByName = function (req, res) {
        persistence.getByName(req.params.name, res);
    };

    // add one object
    this.add = function (req, res) {
        i=0
        //while(i<10){
            // console.log("CODIGO A SE GUIR ")
            // console.log(i)
        var response = new leitura(res);  
     //   i++;
       // }
    };

    // update one object 
    this.update = function (req, res) {
        // Usando o exemplo do Leonardo
      
                var autorParams = {
                    id:       req.body.id,
                    nome:     req.body.nome
                }
                
                var autor = new Autor(autorParams);

                persistence.update(autor, res);
        
    };

    // delete one object 
    this.deleteById = function (id, res) {
        persistence.deleteById(id, res);
    };

}

module.exports = AutorController;


