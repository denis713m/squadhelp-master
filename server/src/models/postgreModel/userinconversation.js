'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInConversation = sequelize.define('UserInConversation', {
    conversation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey : true,
      references: {
        model: 'Conversations', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey : true,
      references: {
        model: 'User', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
    status:{
      type: DataTypes.ENUM('block', 'favorite', 'unset'),
      allowNull: true,
      defaultValue: 'unset'
    }
  }, {
    timestamps: false,
    freezeTableName: true,});
  return UserInConversation;
};