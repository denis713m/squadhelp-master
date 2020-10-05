'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      omitNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remind: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  return Events;
};