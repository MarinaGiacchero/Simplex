/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var globals    = require('../models/global.js');
var persistence;
var DataBase   = require('../models/database.js');
var dataBase   = new DataBase();

 function MateriaPersistence() {

    this.getPersistence = 
    function () {    
          return new Promise(function (resolve, reject) {
              if   (globals.dataBaseType == 1) {
                    var Persistence = require('./relational/materia.js');
                    var persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                  /*firebase ainda não possui o model personagem*/
                          var Persistence = require('./firebase/materia.js');          
                          var persistence = new Persistence();
                          resolve(persistence);
                  }
                   else {
                       reject();
                   }
        }); 
    };

    this.getPersistence()
        .then((data) => {
            persistence = data;
        });

    // get all objects data 
    this.getAll = function (res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getAll(db, res);
        });
    };

    this.getMateriaAno = function (res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getMateriaAno(db, res);
        });
    };
    
    this.getLast = async function (res) {
        let objeto
         await dataBase.getDataBase(globals.dataBaseType)
         .then((db) => {
             objeto= persistence.getLast(db, res);
            
         });
      return objeto;
     };


    // get object by id
    this.getById = async function (id, res) {
        let objeto
        await dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            objeto = persistence.getById(db, id, res);
        });
        return objeto;
    };

    this.add = async function (object, res) {
       await dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.add(db, object, res);
        });
    };

    this.update = async function (id, idSituacao, res) {
        await dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.update(db, id, idSituacao, res);
        });
    };


    this.deleteById = function (id, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.deleteById(db, id, res);
        });
    };

}

module.exports = MateriaPersistence;
