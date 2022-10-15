const { default: axios } = require('axios');

var Materia   = require('../entity/materia.js');
var Persistence  = require('../persistence/materia.js');
var persistence  = new Persistence();

var PersistenceT  = require('../persistence/tramitar.js');
var Tramitar   = require('../entity/tramitar.js');
var persistenceTramitar  = new PersistenceT();

var PersistenceH = require('../persistence/historico.js');
var Historico = require('../entity/historico.js');
var persistenceHistorico = new PersistenceH();

var PersistenceA = require('../persistence/autor.js');
var persistenceAutor = new PersistenceA();

var lerAutor = require('../api/leituraAutorPropoe');

var tabelaMateria=  function leituraMateria(res, i){
    

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
                 var tramitar = new Tramitar(tramit)
                 await persistenceTramitar.add(tramitar, res);   
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

             dataHistorico= JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].SituacaoAtual.Autuacoes.Autuacao[0].Situacoes.Situacao[0].DataSituacao));
             ultimoHist= await persistenceHistorico.getLast(res)
             idH=1;  
            
              if(ultimoHist!=null){
                 idH= ultimoHist.id+1    
                
              }
           
             var historic= {
                id        : idH,
               dataInicio : dataHistorico,
               idSituacao : idSituacao,
               idMateria  : i
             }
             var his= new Historico(historic);
             await persistenceHistorico.add(his, res);

             // Chamando o autor
             id = 1
             objetAutor= await persistenceAutor.getLast(res)
             if(objetAutor!=null){
                id = objetAutor.id+1
             }
             var lendo = new lerAutor(res, i, id); 

             }).catch(function (error) {
             console.log(error);
         });    
    }
        }).catch(function (error) {
            console.log(error);
        });
        
}
    module.exports = tabelaMateria;