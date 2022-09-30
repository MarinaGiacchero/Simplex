
//Cria construtor
function TramitarValidator() {

}


//Define as funções da classe
TramitarValidator.prototype.checkBody = (req, res) => {
    //req.sanitize('name').trim();
    
    var errors = []
    var error;

    if(!req.body){
        error  = {  location: 'body', 
                    param:    'body', 
                    msg:      'Body must not be null', 
                    value:     req.body };

        errors.push(error);
    }

    if(req.body.materiaTramitando == ""){
        error  = {  location: 'body', 
                    param:    'materiaTramitando', 
                    msg:      'A matéria tramitando deve ser informada', 
                    value:     req.body.materiaTramitando };

        errors.push(error);
    }
    
    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = TramitarValidator