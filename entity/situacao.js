/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/

var Situacao = function(params) {
    this.id                   = params.id;
    this.descricao            = params.descricao;
}

module.exports = Situacao;