/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 20/11/2022
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
*/

'use strict'

//methods for fetching mysql data

const mysql     = require('../../connections/mysql/MySQLConnect');


// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};
db.Sequelize = mysql.Sequelize;
db.mysql     = mysql;

// initialize database connection
db.mysql.init();

//Models/tables
//db.personagem = require('./personagem.js')(db.mysql,       db.Sequelize);
db.tramitar = require('./tramitar.js')(db.mysql,       db.Sequelize);
db.natureza = require('./natureza.js')(db.mysql,       db.Sequelize);
db.situacao = require('./situacao.js')(db.mysql,       db.Sequelize);
db.genero = require('./genero.js')(db.mysql,       db.Sequelize);
db.materia = require('./materia.js')(db.mysql,       db.Sequelize);
db.historico = require('./historico.js')(db.mysql,       db.Sequelize);
db.autor = require('./autor.js')(db.mysql,       db.Sequelize);
db.propoe = require('./propoe.js')(db.mysql,       db.Sequelize);

db.mysql.pool.sync({alter:true});

module.exports = db; 
