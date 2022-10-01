
//Cria construtor
function MateriaValidator() {

}


//Define as funções da classe
MateriaValidator.prototype.checkBody = (req, res) => {
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

    if(req.body.materia == ""){
        error  = {  location: 'body', 
                    param:    'materia', 
                    msg:      'A materia deve ser informada', 
                    value:     req.body.materia };

        errors.push(error);
    }
    
    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = MateriaValidator