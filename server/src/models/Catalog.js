'use strict';
module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define('Catalogs', {
    _id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      omitNull: true
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chats: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
  }, {});

  return Catalog;
};