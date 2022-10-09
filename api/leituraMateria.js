const { default: axios } = require('axios');
var Materia   = require('../entity/materia.js');
var Persistence  = require('../persistence/materia.js');
var persistence  = new Persistence();
var Persistence  = require('../persistence/tramitar.js');
var Tramitar   = require('../entity/tramitar.js');
var persistenceTramitar  = new Persistence();
var tabelaMateria=  function leituraMateria(res, i){
    
    // rodar=0
    // while(rodar<10){
    
    let url="https://legis.senado.leg.br/dadosabertos/materia/"+i;   
    axios.get(url).then(async function (response) {
        console.log("i = "+url)
        if(response.data.DetalheMateria.Materia==undefined){
            console.log('Matéria fora do ar')
        }else{
          urlSituacao="https://legis.senado.leg.br/dadosabertos/materia/situacaoatual/"+i+"?v=3";  
          console.log("SEGUNDO URL: "+urlSituacao) 
          
          await axios.get(urlSituacao).then(async function (situ) {
              idSituacao= JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].SituacaoAtual.Autuacoes.Autuacao[0].Situacoes.Situacao[0].CodigoSituacao));
              if(JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].Tramitando))=='Sim'){
            
                var tramit= {
                    id : i
                 }
                 console.log("ESTÁ TRAMITANDO: ID "+id+" AA E CONFERINDO "+ JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].Tramitando)))
                 var tramitar = new Tramitar(tramit)
                 await persistence.add(tramitar, res);   
              }
              
              console.log(i)
              id= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.IdentificacaoMateria.CodigoMateria));
              sigla= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.IdentificacaoMateria.SiglaCasaIdentificacaoMateria));
              anoCriacao= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.IdentificacaoMateria.AnoMateria));
              ementa= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.DadosBasicosMateria.EmentaMateria));
              anoApresentacao= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.DadosBasicosMateria.DataApresentacao))
                if(response.data.DetalheMateria.Materia.DadosBasicosMateria.NaturezaMateria==undefined){
                    idNatureza= 7359122
                }else{
                    idNatureza= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.DadosBasicosMateria.NaturezaMateria.CodigoNatureza))
                }
              var lidoMateria = {
                id : i,
                sigla : sigla,   
                anoCriacao : anoCriacao,
                ementa : ementa,
                anoApresentacao : anoApresentacao,
                idNatureza : idNatureza,
                idSituacao : idSituacao
             }

             console.log(lidoMateria)
             var materia = new Materia(lidoMateria);
             
             await persistence.add(materia, res);   
             }).catch(function (error) {
             console.log(error);
         });    
    }
        }).catch(function (error) {
            console.log(error);
        });
      //  rodar++
        
}//}
    module.exports = tabelaMateria;