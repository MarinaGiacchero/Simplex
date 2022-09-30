/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/

var Tramitar = function(params) {
    this.id                   = params.id;
    this.materiaTramitando    = params.materiaTramitando;
}

module.exports = Tramitar;