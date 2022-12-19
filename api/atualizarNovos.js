/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

const { default: axios } = require('axios');

var leitura = require('../api/leituraMateria');
 function MateriaPersistence() {
    var Persistence  = require('../persistence/materia.js');
    var persistence  = new Persistence();

    var PersistenceT  = require('../persistence/tramitar.js');
    var persistenceT  = new PersistenceT();

    var PersistenceH = require('../persistence/historico.js');
    var persistenceH = new PersistenceH();
    var Historico = require('../entity/historico.js');

    let objeto

    this.atualizaTramitar = async function(res){
        offset = 0
        fim = await persistenceT.getLast(res);
        
        objeto = await persistenceT.getAtt(offset, res);
        i = objeto.id;
        console.log("i do att tramitar = "+i)
        
        for(f = i; i != fim.id; offset++){
            console.log("OFFSET: "+ offset)
            console.log("OFFSET: "+ i)
        urlSituacao="https://legis.senado.leg.br/dadosabertos/materia/situacaoatual/"+i+"?v=3"; 
        
        await axios.get(urlSituacao).then(async function (situ) {
            idSituacao = JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].SituacaoAtual.Autuacoes.Autuacao[0].Situacoes.Situacao[0].CodigoSituacao));
           
            if(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].Tramitando) == '"Sim"'){
                obj = await persistence.getById(i, res);
                console.log(JSON.stringify(obj))
                 if(JSON.stringify(obj) == '[]'){
                     //adicionar materia
                    var response = new leitura(res, i, 0); 
                 }else{
                  
                
                    if(idSituacao != (JSON.parse(JSON.stringify(obj[0].idSituacao)))){
                        // chamar historico aqui, adicionando +1
            
                        let object
                        object = await persistenceH.getLast(res);
                        idH = object.id;
                        dataHistorico = JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].SituacaoAtual.Autuacoes.Autuacao[0].Situacoes.Situacao[0].DataSituacao));
                
                        var historico = {
                        id         : idH,
                        dataInicio : dataHistorico,
                        idSituacao : idSituacao,
                        idMateria  : i
                        }
                        var his= new Historico(historico);
                        await persistenceH.add(his, res);

                        // atualizar materia
                        await persistence.update(i, idSituacao, res);
                    }   }
                }else{
                    // chamar historico aqui para atualizar o novo 
                    let object
                    object = await persistenceH.getLast(res);
                    idH = object.id;
                    dataHistorico = JSON.parse(JSON.stringify(situ.data.SituacaoAtualMateria.Materias.Materia[0].SituacaoAtual.Autuacoes.Autuacao[0].Situacoes.Situacao[0].DataSituacao));
            
                    var historico= {
                    id        : idH,
                    dataInicio : dataHistorico,
                    idSituacao : idSituacao,
                    idMateria  : i
                    }
                    var his= new Historico(historico);
                    await persistenceH.add(his, res);

                    // deletar da tabela tramitar (deletebyid) persistenceT
                     await persistenceT.deleteById(i, res);
                    
                    console.log("i = "+ i + " idSituacao " + idSituacao)
                    // atualizar materia (update) persistence
                    await persistence.update(i, idSituacao, res); //deu erro no  save()
                }
            

                }).catch(function (error) {
                    console.log(error);
                });
                objeto = await persistenceT.getAtt(offset, res);
                console.log("printa offset: "+offset+" e "+objeto.id)
                i = objeto.id;
            
        }


}


}

module.exports = MateriaPersistence;
