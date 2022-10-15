const { default: axios } = require('axios');
var Autor   = require('../entity/autor.js');
var Persistence  = require('../persistence/autor.js');
var persistence  = new Persistence();
var PersistencePropoe = require('../persistence/propoe.js');
var persistencePropoe = new PersistencePropoe();

var feedback = function leitura(res, i, id){
    codigo= id;
    
    let url="https://legis.senado.leg.br/dadosabertos/materia/autoria/"+i+"?v=1";   
    axios.get(url).then(async function (response) {
         autor= JSON.parse(JSON.stringify(response.data.AutoriaMateria.Materia.Autoria.Autor[0].NomeAutor))
         tipo= JSON.parse(JSON.stringify(response.data.AutoriaMateria.Materia.Autoria.Autor[0].DescricaoTipoAutor))
         
         var lidoAutor = {
            id : codigo,
            nome : autor,
            cargo : tipo,
         }
         busca= await persistence.getByName(lidoAutor, res)
         buscaPropor = await persistencePropoe.getLast(res)
         idPropor=0;
         if(buscaPropor!=null){
            idPropor= buscaPropor.id
         }
       if(busca[0]==null){
             var autor = new Autor(lidoAutor);
             await persistence.add(autor, res);
             var propor = {
                id : idPropor+1,
                idAutor : codigo,
                idMateria : i
              }
              await persistencePropoe.add(propor,res)
           } else {
            var propor = {
                id : idPropor+1,
                idAutor : busca[0].id,
                idMateria : i
              }
              let objPropoe= await persistencePropoe.getByName(propor,res)
              if(objPropoe[0]==null){
               await persistencePropoe.add(propor,res)
              }
              
           }
        
   //    if(response.data.AutoriaMateria.Materia.Iniciativa!=undefined){
 
   //     var lidoIniciativa = {
   //      id : codigo+1,
   //      nome : autor,
   //      cargo : tipo,
   //   }
   //   resp= await persistence.getByName(lidoIniciativa, res)
   //   if(lidoAutor.nome!=lidoIniciativa.nome || lidoAutor.cargo!=lidoIniciativa.cargo && resp[0]==null){
   //      var inicia = new Autor(lidoIniciativa);
   //      await persistence.add(inicia, res);
   //  }
    //  }
     }).catch(function (error) {
            console.log(error);
        });
}
    module.exports = feedback;