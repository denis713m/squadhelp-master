'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversations = sequelize.define('Conversations', {
    id:{
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      omitNull: true
    },
    participant1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
    participant2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },

  }, {
    indexes: [
      {
        unique: true,
        fields: ['participant1', 'participant2']
      }
    ]
  });


  return Conversations;
};