

module.exports={
    //set up route configuration that will be handle by express server
   configure: function (app) {
       var graficoController = require('../controller/grafico.js');
       
       app.get('/rest/grafico', function (req, res) {
      graficoController.getAll(res);

            });
      
 }
 
};