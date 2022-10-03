/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/

var Materia = function(params) {
    this.id              = params.id;
    this.nome            = params.nome;
    this.sigla           = params.sigla;
    this.anoCriacao      = params.anoCriacao;
    this.anoApresentacao = params.anoApresentacao;
    this.idNatureza      = params.idNatureza;
    this.idSituacao      = params.idSituacao;
}

module.exports = Materia;