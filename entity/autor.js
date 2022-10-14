/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/

var Autor = function(params) {
    this.id         = params.id;
    this.nome       = params.nome;
    this.cargo      = params.cargo;
}

module.exports = Autor;