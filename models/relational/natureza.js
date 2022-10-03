/**
 * @author: Helen de Freita Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
 */


 module.exports = (sequelize, DataTypes) => {
    
    const natureza = sequelize.pool.define('natureza', {
        Descricao: DataTypes.STRING 
    },
    
    {
        freezeTableName: true,
        tableName: 'natureza'
    })

    return natureza
}