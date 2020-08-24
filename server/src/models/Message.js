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
      references: {
        model: 'conversations', // name of Target model
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
  message.associate = function(models) {
    message.belongsTo(models.User, { foreignKey: 'sender', sourceKey: 'id' });
  };
  message.associate = function(models) {
    message.belongsTo(models.conversations, { foreignKey: 'sender', sourceKey: 'id' });
  };
  return message;
};