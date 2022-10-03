/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/

var Historico = function(params) {
    this.id               = params.id;
    this.dataInicio       = params.dataInicio;
    this.idSituacao       = params.idSituacao;
    this.idMateria        = params.idMateria;
}

module.exports = Historico;