/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data
var leitura = require('../api/leituraMateria');
 function MateriaPersistence() {
    var Persistence  = require('../persistence/materia.js');
    var persistence  = new Persistence();
    let objeto
    i=0;
    this.ultimo = async function (res, tabela) {
        
        objeto= await persistence.getLast(res)
        if(objeto!=null){
            this.i=objeto.id;
        }
        switch (tabela){
            case 'M':
                console.log("materia");
                //this.atualizaMateria(res);
            case 'T':
                console.log("tramitar");
                //this.atualizaTramitar(res);
            default:
                console.log("Nenhuma das opções foi selecionada")
        }
       
    };

    this.atualizaMateria = async function(res){
        while(i<i+200){

            let url="https://legis.senado.leg.br/dadosabertos/materia/"+i;   
            axios.get(url).then(async function (response) {
                console.log("i = "+i)
        if(JSON.parse(JSON.stringify(response.data.DetalheMateria.Materia.IdentificacaoMateria.CodigoMateria))!=undefined){
                    var chamada = new leitura(res, i, id+1);  
                      
                }
             
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }

    this.atualizaTramitar = async function(){

    }


}

module.exports = MateriaPersistence;
