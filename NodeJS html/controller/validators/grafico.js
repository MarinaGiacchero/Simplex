
function graficoController() {
    var Persistence  = require('../persistence/grafico.js');
    var persistence  = new Persistence();
    
    // get all objects data 
    this.getAll = function (res) {
        persistence.getAll(res);
    };

}