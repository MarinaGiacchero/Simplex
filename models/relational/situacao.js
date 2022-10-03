/**
 * @author: Helen de Freita Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
 */


 module.exports = (sequelize, DataTypes) => {
    
    const situacao = sequelize.pool.define('situacao', {
        descricao:  DataTypes.STRING
  
    },
    
    {
        freezeTableName: true,
        tableName: 'situacao'
    })

    return situacao
}