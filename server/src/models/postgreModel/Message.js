'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('Messages', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      omitNull: true
    },
    conversation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey : true,
      references: {
        model: 'Conversations', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
    body: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    }
  }, {});
  return message;
};