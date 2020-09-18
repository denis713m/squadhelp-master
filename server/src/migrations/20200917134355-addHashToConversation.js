'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Conversations', 'participantsHash', {
              type: Sequelize.STRING})
          .then(async ()=>{
                 const db = require('../models');
                 const hash = require('object-hash');
                 const convers = await db.Conversations.findAll(
                     {raw: true}
                 );
                 for(let i=0; i< convers.length; i++)
                 {
                     const hashPart= hash([convers[i].participant1, convers[i].participant2], {unorderedArrays:true} )
                     await db.Conversations.update({
                             participantsHash: hashPart

                         },
                         {
                             where: {
                                 id: convers[i].id
                             }
                         , returning: true
                         }
                     );
                 }
             }
         )
         .then(()=> queryInterface.addConstraint('Conversations',{
             fields:['participantsHash'],
             type: 'unique'
         }));

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Conversations', 'Conversations_participantsHash_uk')
        .then(() => queryInterface.removeColumn('Conversations', 'participantsHash'))


  }
};
