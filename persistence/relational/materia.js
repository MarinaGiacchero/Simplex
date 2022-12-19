/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

const { Op } = require("sequelize");
const { where } = require('sequelize');
const sequelize = require('sequelize');
var Error = require('../../entity/error.js');


function MateriaPersistence() {
    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 

        db.materia
            .findAll()
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getAll = function (res) {

        this.getMateriaAno = function (db, res) {
    
            db.materia
                .findAll({
                    attributes:[
                        'anoCriacao',
                        [sequelize.fn('COUNT', sequelize.col('anoCriacao')), 'qtde']
                    ],
                    group: 
                        'anoCriacao',
                    where: {
                        anoCriacao: {
                        [Op.is]: [true]
                        }
                    }, 
                    order: [ [ 'anoCriacao', 'DESC' ]]
                    
                })
                .then(object => {
                    res.send(JSON.parse(JSON.stringify(object)));
                });
        };

    // get object by id
    this.getById = async function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        let objeto
        await db.materia
            .findAll({ 
                where: {id: id}
            })
            .then(object => {
                objeto= object;
            })
            return objeto;
    }; // this.getById = function (id, res) {

        this.getLast = async function (db, res) {
            
            let objeto
            // get id as parameter to passing into query and return filter data
            await db.materia
                .findOne({ 
                    order: [ [ 'id', 'DESC' ]]
                })
                .then(object => {
                    res.send(JSON.parse(JSON.stringify(object)));
                    objeto= object;
                    // if(object===null){
                    //     id=0;
                    // }else{
                    //     id= object.id
                    // }
                    // var ultimo  = new getUltimo();
                    // ultimo.setUltimo(res,id)
                    // console.log("ESTÁ PASSANDO POR AQUI"+id)
                })
            return objeto;
              
        }; 

    this.add = async function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        await db.materia
            .create(object) 
            .then(function (addedRecord) {
                var params = {
                    code:     200,
                    message:  'OK',
                    response: 'Record is successfully added.'
                };

                 var error = new Error(params);
                 res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao incluir materia',
                    response: err
                };

                // var error = new Error(params);
                // res.json({error});
            });
    }; // this.add = function (object, res) {

    
    // this.update = async function (db, object, res) {
    //     // get object as parameter to passing into query and return filter data
    //    await db.materia
    //         .update(object,
    //             {where: {
    //                 id: object.id
    //             }})
    //         .then(function (updatedRecord) {
    //             var params = {
    //                 code:     200,
    //                 message:  'OK',
    //                 response: 'Record is successfully updated.'
    //             };

    //             var error = new Error(params);
    //             res.json({error});
    //         })
    //         .catch(function (err) {
    //             var params = {
    //                 code:     500,
    //                 message:  'Erro ao alterar materia',
    //                 response: err
    //             };

    //             var error = new Error(params);
    //             res.json({error});
    //         });
    // }; // this.update = function (object, res) {
    
        this.update = async function (db, id, idSituacao, res) {
            // get object as parameter to passing into query and return filter data
        await db.materia
            .update({idSituacao: idSituacao},
                         {where: {
                            id: id
                         }})
            .then(object => {
                console.log("upgrade "+object)
            })
        }; 

    this.deleteById = function (db, id, res) {
        db.materia
            .destroy({
                where: {
                    id: id
                }})
            .then(function (deletedRecord) {
                if (deletedRecord === 1) {
                    code = 200;
                    message = 'OK';
                    response = 'Record is successfully deleted.';
                } 
                else {
                        code = 404;
                        message = 'OK';
                        response = 'Record not found.';
                }
                var params = {
                    code:     code,
                    message:  message,
                    response: response
                };

                var error = new Error(params);
                res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao excluir',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });

    }; // this.deleteById = function (id, res) {

}

module.exports = MateriaPersistence;