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
    blackList:{
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: true,
      defaultValue: [false, false],
    },
    favotiteList:{
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: true,
      defaultValue: [false, false],
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['participant1', 'participant2']
      }
    ]
  });
  Conversations.associate = function(models) {
    Conversations.belongsTo(models.User, { foreignKey: 'participant1', sourceKey: 'id' });// associations can be defined here
  };
  Conversations.associate = function(models) {
    Conversations.belongsTo(models.User, { foreignKey: 'participant2', sourceKey: 'id' });// associations can be defined here
  };
  return Conversations;
};