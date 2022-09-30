var getTramitar = require('./tramitar');
const { default: axios } = require('axios');
var Tramitar   = require('../entity/tramitar.js');
var Persistence  = require('../persistence/tramitar.js');
var persistence  = new Persistence();

var tabelaTramitar=  function leituraTramitar(res, i){

    materiaTramitando= '';
    i=0
    while(i<10){
    teste=0 //eu quero trocar o "teste" para encontrar o último do BD
    
    lidoTramitar = new getTramitar(i, materiaTramitando);   
    let url="https://legis.senado.leg.br/dadosabertos/materia/situacaoatual/"+i+"?v=3";   
    axios.get(url).then(async function (response) {
         codigoMateria= JSON.parse(JSON.stringify(response.data.SituacaoAtualMateria.Materias.Materia[0].Codigo));
        
      lidoTramitar.id = teste;
      teste++;
      lidoTramitar.materiaTramitando = codigoMateria;   
      var tramitar = new Tramitar(lidoTramitar);
      console.log("AQUI i:")
      console.log(i)

      await persistence.add(tramitar, res);
      
      //await console.log(JSON.stringify(persistence.getLast(res)))
        }).catch(function (error) {
            console.log(error);
        });
    i++
}}
    module.exports = tabelaTramitar;