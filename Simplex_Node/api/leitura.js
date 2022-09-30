var getTramitar = require('./getTramitar');
const { default: axios } = require('axios');
var Genero   = require('../entity/genero.js');
var Persistence  = require('../persistence/genero.js');
var persistence  = new Persistence();

var Feedback=  function leitura(res, i){
    codigo=0;
    genero= '';
    i=0
    while(i<100000){
    lidoTramitar = new getTramitar(codigo, genero);   
    let url="https://legis.senado.leg.br/dadosabertos/materia/situacaoatual/"+i+"?v=3";   
    axios.get(url).then(async function (response) {
         codigo= JSON.parse(JSON.stringify(response.data.SituacaoAtualMateria.Materias.Materia[0].Codigo));
         gender= JSON.parse(JSON.stringify(response.data.SituacaoAtualMateria.Materias.Materia[0].Subtipo));
   
      lidoTramitar.id = codigo;
      lidoTramitar.nome= gender;   
      var genero = new Genero(lidoTramitar);
      console.log("AQUI ")
      console.log(lidoTramitar)

      await persistence.add(genero, res);
      console.log(genero)
        }).catch(function (error) {
            console.log(error);
        });
    i++
}}
    module.exports = Feedback;