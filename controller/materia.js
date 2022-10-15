/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: custom route for fetching data
*/


var validator    = new (require('./validators/materia.js'))()
var Materia   = require('../entity/materia');
const { default: axios } = require('axios');
var leitura = require('../api/leituraMateria');

function MateriaController() {
    var Persistence  = require('../persistence/materia.js');
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
    this.add = async function (req, res) {
            materias= 0;
            id=92810
            let objeto= await persistence.getLast(res)
        
            if(objeto==null){
              id=1;    
          }else{
              id= objeto.id+1
          }
     //    while(materias<1000){
          var response = new leitura(res, id); 
          id++ 
          console.log("MENOR: "+id+ " MATERIA: "+materias)
          materias++
      //   }
        };

    // update one object 
    this.update = function (req, res) {
        // Usando o exemplo do Leonardo
      
                var materiaParams = {
                    id:       req.body.id,
                    nome:     req.body.nome
                }
                
                var materia = new Materia(materiaParams);

                persistence.update(materia, res);
        
    };

    // delete one object 
    this.deleteById = function (id, res) {
        persistence.deleteById(id, res);
    };

}

module.exports = MateriaController;


