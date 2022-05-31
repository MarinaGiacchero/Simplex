
//Cria construtor
function RegionValidator() {

}


//Define as funções da classe
RegionValidator.prototype.checkBody = (req, res) => {
    // Helen - precisa fazer funcionar
    // req.sanitize('name').trim();
    // req.sanitize('initials').trim();
    
    var errors = []
    var error;

    if(!req.body){
        error  = {  location: 'body', 
                    param:    'body', 
                    msg:      'Body must not be null', 
                    value:     req.body };

        errors.push(error);
    }

    var myName = req.body.name;
    if(myName.length > 50){
        error  = {  location: 'body', 
                    param:    'name', 
                    msg:      'Nome deve ter no máximo 50 caracteres', 
                    value:     req.body.name };

        errors.push(error);
    }

    var myInitials = req.body.initials;
    if(myInitials.length > 2){
        error  = {  location: 'body', 
                    param:    'initials', 
                    msg:      'Sigla deve ter no máximo 2 caracteres', 
                    value:     req.body.initials };

        errors.push(error);
    }

    if(!req.body.name){
        error  = {  location: 'body', 
                    param:    'name', 
                    msg:      'Nome deve ser informado', 
                    value:     req.body.name };

        errors.push(error);
    }

    if(!req.body.initials){
        error  = {  location: 'body', 
                    param:    'initials', 
                    msg:      'Sigla deve ser informada', 
                    value:     req.body.initials };

        errors.push(error);
    }


    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = RegionValidator