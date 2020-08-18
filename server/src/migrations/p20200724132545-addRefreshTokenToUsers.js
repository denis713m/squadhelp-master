'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Users',
        'refreshToken',
        {
          type: Sequelize.TEXT,
        }
    )
        .then(() =>
            {
              queryInterface.bulkUpdate('Users', {
                    'refreshToken': 'admin',
                  } ,
              );
            }
        )
        .then(() =>
            {
              queryInterface.changeColumn(
                  'Users',
                  'refreshToken',
                  {
                    allowNull : false
                  })
            }

        )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Users',
        'refreshToken'
    );
  }
};
