'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TransactionHistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeOperation: {
        type: Sequelize.ENUM(['INCOME', 'CONSUMPTION']),
        allowNull: false
      },
      sum: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        noUpdate: {
          readOnly: true
        },
        default: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TransactionHistory', {});
  }
};