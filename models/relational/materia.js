/**
 * @author: Helen de Freita Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
 */


 module.exports = (sequelize, DataTypes) => {
    
    const materia = sequelize.pool.define('materia', {
        ementa:  DataTypes.STRING,
        sigla: DataTypes.STRING,
        anoCriacao:  DataTypes.STRING,
        anoApresentacao: DataTypes.DATE,

        idNatureza: {
          type: DataTypes.INTEGER,
          references: {
            model: "natureza",
            key: "id"
          } 
      },

      idSituacao: {
        type: DataTypes.INTEGER,
        references: {
          model: "situacao",
          key: "id"
        } 
     },

        created_at: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.pool.literal('CURRENT_TIMESTAMP'),
          allowNull: false
        },
          
        updated_at: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.pool.literal('CURRENT_TIMESTAMP'),
          allowNull: false
        }
  
    },
    
    {
        freezeTableName: true,
        tableName: 'materia'
    })

    return materia
}