module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [
      {
        cardNumber: '5169654564564564',
        name: 'SquadHelp',
        expiry: '11/20',
        cvc: '453',
        balance: 0,
      },
      {
        cardNumber: '5167111111111111',
        name: 'yriy',
        expiry: '11/21',
        cvc: '043',
        balance: 5000,
      },
    ], {});
  },

};