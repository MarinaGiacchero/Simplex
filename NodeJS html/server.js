/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: Creating server using express.js
 * 
 * http://localhost:8000/rest/users
 * http://localhost:8000/rest/user/1
 * http://localhost:8000/rest/regions
 * http://localhost:8000/rest/region/1
*/
var express          = require('express');
var cors             = require('cors');
// Helen- Comentei para resolver depois
//var sqlinjection     = require('sql-injection');
var bodyparser       = require('body-parser');
var validator        = require("express-validator");

var routeRegion      = require('./routes/region');
var routeState       = require('./routes/state');
var routeCity        = require('./routes/city');
var routeProduct     = require('./routes/product');
var routeUser        = require('./routes/user');
var routeDonation    = require('./routes/donation');
var routeGrafico     = require('./routes/grafico');
const { application } = require('express');

// creating server instance
var app = express();


// parsing JSON
app.use(bodyparser.json());

// for posting nested object if we have set extended true
// Helen: gostaria de usar sqlinjection, mas quando inseri, não funcionou mais o insert, update e delete
// Comentei para resolver depois
//app.use(sqlinjection);

app.use(bodyparser.urlencoded({ extended : true}));
// Helen - parece que houve uma mudança no uso. Não sei onde estou usando validator
//app.use(validator());

//app.use((req, res) =>{
   // res.header("Access-Control-Allow-Origin", "*");
  //  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  //  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, 'Authorization'");
  //  app.use(cors());
//});

//set application route with server instance
routeRegion.configure(app);
routeState.configure(app);
routeCity.configure(app);
routeProduct.configure(app);
routeUser.configure(app);
routeDonation.configure(app);
routeGrafico.configure(app);

// listening application on port 8000
var server = app.listen(8080, function(){
    console.log('Server Listening on port ' + server.address().port);
});