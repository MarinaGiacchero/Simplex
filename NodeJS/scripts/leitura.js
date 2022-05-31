
i=150099;
fim=1;
ultimo=false;
while(i<150110){
    
let url="https://legis.senado.leg.br/dadosabertos/materia/"+i;
console.log("no while "+ fim + " ultimo = "+ultimo);

$.ajax(url)
    .done(function(xml){
       
        if(($(xml).find("Autor").text())!=''){  
        $(xml).find('DadosBasicosMateria').each(function(){     
        $("#cards").append(`<p class="Autor"> ${ $(this).find("Autor").text()} </p>`);
        ultimo=false;
        fim=1;
        console.log('Passou no achado ' +fim);
    })
 

}else{
   
    console.log('não achou ' +fim);
        if(ultimo){
        fim=fim+1;
    }  
   ultimo=true;
}

})
    .fail(function(){      
        alert("Ocorreu um erro na leitura do arquivo XML");
    })
    i++;
}

