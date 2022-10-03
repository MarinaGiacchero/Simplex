const { default: axios } = require('axios');
var Materia   = require('../entity/materia.js');
var Persistence  = require('../persistence/materia.js');
var persistence  = new Persistence();

var tabelaMateria=  function leituraMateria(res, i){
    
    i=0;
    atual=236;
    
   // while(i<5){
    teste=0 //eu quero trocar o "teste" para encontrar o último do BD  
    
    let url="https://legis.senado.leg.br/dadosabertos/materia/"+atual;   
    axios.get(url).then(async function (response) {
        console.log("i = "+i)
        
        console.log()
        id= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.IdentificacaoMateria.CodigoMateria));
        sigla= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.IdentificacaoMateria.SiglaCasaIdentificacaoMateria));
        anoCriacao= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.IdentificacaoMateria.AnoMateria));
        ementa= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.DadosBasicosMateria.EmentaMateria));
        anoApresentacao= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.DadosBasicosMateria.DataApresentacao))
        idNatureza= JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.DadosBasicosMateria.NaturezaMateria.CodigoNatureza))

          idSituacao= 0
         url="https://legis.senado.leg.br/dadosabertos/materia/situacaoatual/"+atual+"?v=3";   
         axios.get(url).then(async function (situ) {
             console.log(JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia.SituacaoAtual)));
         })
        
       // if(response.data.ListaMateriasTramitando.Materias.Materia[teste]!=undefined){
        var lidoMateria = {
                id : id,
                sigla : sigla,   
                anoCriacao : anoCriacao,
                ementa : ementa,
                anoApresentacao : anoApresentacao,
                idNatureza : idNatureza,
                idSituacao : idSituacao
        }
                console.log(anoApresentacao)
                var materia = new Materia(lidoMateria);
                console.log("AQUI i:")
                console.log(i)
                await persistence.add(materia, res);
                
                teste++;
     //   }
      //await console.log(JSON.stringify(persistence.getLast(res)))
        }).catch(function (error) {
            console.log(error);
        });
       
        i++
}//}
    module.exports = tabelaMateria;