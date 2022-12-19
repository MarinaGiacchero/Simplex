/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: custom route for fetching data
*/

var validator    = new (require('./validators/tramitar.js'))()
var Tramitar   = require('../entity/tramitar.js');
const { default: axios } = require('axios');
var leitura = require('../api/leituraTramitar');
var atualizar = require('../api/atualizarNovos');

function TramitarController() {
    var Persistence  = require('../persistence/tramitar.js');
    var persistence  = new Persistence();
 
    // get all objects data 
    this.getAll = function (res) {
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
    this.add = async function (req, res) {
      var response = new leitura(res);    
    };

    // update one object 
    this.update = function (req, res) {
       
      //  var response = new leitura(res);
        var atualiza = new atualizar();
        atualiza.atualizaTramitar(res);
        // Usando o exemplo do Leonardo
      
                // var tramitarParams = {
                //     id:       req.body.id,
                //     nome:     req.body.nome
                // }
                
                // var tramitacao = new Tramitar(tramitarParams);

                // persistence.update(tramitacao, res);
        
    };

    // delete one object 
    this.deleteById = function (id, res) {
        persistence.deleteById(id, res);
    };

}

module.exports = TramitarController;


