'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Conversations',
        'blackList1',
        {
          type: Sequelize.BOOLEAN,
        }
    ).then(() =>  queryInterface.addColumn(
        'Conversations',
        'blackList2',
        {
          type: Sequelize.BOOLEAN,
        }
    )).then(async () =>
    {
      const db = require('../models');
      const convers = await db.Conversations.findAll(
          {raw: true}
      );
        for(let i=0; i< convers.length; i++)
        {
            await db.Conversations.update({
                    blackList1: convers[i].blackList[0],
                    blackList2: convers[i].blackList[1],
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
/*        .then(() => queryInterface.removeColumn(
        'Conversations',
        'blackList'))*/
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Conversations',
        'blackList1'). then(()=>queryInterface.removeColumn(
        'Conversations',
        'blackList2'))
  }
};
