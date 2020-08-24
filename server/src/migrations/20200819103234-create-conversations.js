'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      participant1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        unique: 'unique_tag'
      },
      participant2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        unique: 'unique_tag'
      },
      blackList:{
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: true,
        defaultValue: [false, false],
      },
      favotiteList:{
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        allowNull: true,
        defaultValue: [false, false],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
        {
          uniqueKeys: {
            unique_tag: {
              customIndex: true,
              fields: ['participant1', 'participant2']
            }
          }
        })
        .then(function() {
          return queryInterface.sequelize.query(
              'ALTER TABLE "Conversations" ADD CONSTRAINT "check_participants" CHECK ( "participant1" < "participant2")')
        }
        );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Conversations');
  }
};