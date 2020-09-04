'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Conversations',
        'favoriteList1').then(() => queryInterface.removeColumn(
        'Conversations',
        'favoriteList2')).then(()=>queryInterface.addColumn(
        'Conversations',
        'favoriteList1',
        {
          type: Sequelize.BOOLEAN,
        }
    )).then(() => queryInterface.addColumn(
        'Conversations',
        'favoriteList2',
        {
          type: Sequelize.BOOLEAN,
        }
    )).then(async () => {
          const db = require('../models');
          const convers = await db.Conversations.findAll(
              {raw: true}
          );
        for(let i=0; i< convers.length; i++)
        {
            await db.Conversations.update({
                    favoriteList1: convers[i].favotiteList[0],
                    favoriteList2: convers[i].favotiteList[1],
                },
                {
                    where: {
                        id: convers[i].id
                    }
                }
            )
        }

        }
    )
            .then(() => queryInterface.removeColumn(
            'Conversations',
            'favotiteList'))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Conversations',
        'favoriteList1').then(() => queryInterface.removeColumn(
        'Conversations',
        'favoriteList2'))
  }
};