'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Offers', 'timestamp',{
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Offers', 'timestamp')
  }
};
