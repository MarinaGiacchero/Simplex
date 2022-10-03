var getTramitar = require('./tramitar');
const { default: axios } = require('axios');
var Tramitar   = require('../entity/tramitar.js');
var Persistence  = require('../persistence/tramitar.js');
var persistence  = new Persistence();

var tabelaTramitar=  function leituraTramitar(res, i){

    materiaTramitando= '';
    i=0;
    parar=0;
    while(i<300){
    teste=0 //eu quero trocar o "teste" para encontrar o último do BD
    
    lidoTramitar = new getTramitar(teste, materiaTramitando);   
    
    let url="https://legis.senado.leg.br/dadosabertos/materia/tramitando";   
    axios.get(url).then(async function (response) {
        console.log("i = "+i)
        
        console.log(JSON.parse(JSON.stringify(response.data.ListaMateriasTramitando.Materias.Materia[teste].IdentificacaoMateria.CodigoMateria)))
         codigoMateria= JSON.parse(JSON.stringify(response.data.ListaMateriasTramitando.Materias.Materia[teste].IdentificacaoMateria.CodigoMateria));
        console.log(codigoMateria)
    
        //  if(response.data.ListaMateriasTramitando.Materias.Materia[teste]!=undefined){
        //     parar=1;
        // }
        if(response.data.ListaMateriasTramitando.Materias.Materia[teste]!=undefined){
            
      lidoTramitar.id = teste;
      lidoTramitar.materiaTramitando = codigoMateria;   
      var tramitar = new Tramitar(lidoTramitar);
      console.log("AQUI i:")
      console.log(i)
      await persistence.add(tramitar, res);
    
      teste++;
    }
      //await console.log(JSON.stringify(persistence.getLast(res)))
        }).catch(function (error) {
            console.log(error);
        });
       
        i++
}}
    module.exports = tabelaTramitar;