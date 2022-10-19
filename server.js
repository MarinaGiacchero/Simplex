/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 21/11/2021
 * @desc: Creating server using express.js
 * 
*/
var express          = require('express');
var bodyparser       = require('body-parser');
var validator        = require("express-validator");
const passport       = require('passport')
const swaggerUi      = require('swagger-ui-express')
const swaggerDocs    = require('./swagger.json')


var routeGenero                 = require('./routes/genero');
//Tabela matéria
var routeMateria                = require('./routes/materia');
//Tabela tramitar
var routeTramitar               = require('./routes/tramitar'); 
//Tabela situacao
var routeSituacao               = require('./routes/situacao');
//Tabela natureza
var routeNatureza               = require('./routes/natureza');
//Tabela histórico
var routeHistorico              = require('./routes/historico');
//Tabela propoe
var routePropoe                 = require('./routes/propoe');
//Tabela autor
var routeAutor                  = require('./routes/autor');

const { Passport } = require('passport');


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


//set application route with server instance
//app.use(passport.initialize())

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


 routeGenero.configure(app);
 routeTramitar.configure(app);
 routeMateria.configure(app);
 routeSituacao.configure(app);
 routeNatureza.configure(app);
 routeHistorico.configure(app);
 routePropoe.configure(app);
 routeAutor.configure(app);


// require('./api/autenticacao/passport')(passport)

app.get('/', async(req, res) => {
    res.send('foi')
})

// listening application on port 8000
var server = app.listen(8000, function(){
    console.log('Server Listening on port ' + server.address().port);
});