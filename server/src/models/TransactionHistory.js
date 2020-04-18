'use strict';
module.exports = (sequelize, DataTypes) => {
    const TransactionHistory = sequelize.define('TransactionHistory', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        createdAt: {
            type: DataTypes.DATE,
            noUpdate: {
                readOnly: true
            },
        },
        typeOperation: {
            type: DataTypes.ENUM('INCOME', 'CONSUMPTION'),
            allowNull: false
        },
        sum: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    TransactionHistory.associate = function (models) {
        TransactionHistory.belongsTo(models.User, {foreignKey: 'userId', sourceKey: 'id'});
    };
    return TransactionHistory;
};