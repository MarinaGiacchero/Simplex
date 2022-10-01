// var Ultimo = function(id) {
//     this.id         = id;
// }


// module.exports = Ultimo;

function Ultimo() {
    var leitura = require('./leituraTramitar');
    this.id=0;
    this.setUltimo= function(res, id){
      this.id         = id;
      console.log("VEIO PRA CÁ SIM SENHROA"+this.id)
      
      var response = new leitura(res, id);  
    }
    
      this.getUltimo= function(){
          return this.id
      };
     
      
  }
  
  
  module.exports = Ultimo;