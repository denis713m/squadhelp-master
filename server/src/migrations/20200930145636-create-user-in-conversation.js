'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserInConversation', {
      conversation: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Conversations',
          key: 'id',
        },
        unique: 'unique_tag'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        unique: 'unique_tag'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
        {
          uniqueKeys: {
            unique_tag: {
              customIndex: true,
              fields: ['conversation', 'userId']
            }
          }
        })
        .then(async() =>  queryInterface.addConstraint('UserInConversation', {
          fields: ['conversation', 'userId'],
          type: 'primary key',
          name: 'custom_primary_constraint_name'
        }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserInConversation');
  }
};