'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Conversations',
        'favoriteList1').then(() => queryInterface.removeColumn(
        'Conversations',
        'favoriteList2')).then(() => queryInterface.removeColumn(
        'Conversations',
        'blackList1')).then(() => queryInterface.removeColumn(
        'Conversations',
        'blackList2'));
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
    /*

      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
