'use strict';

const operationType = ['INCOME', 'CONSUMPTION'];
const records = [];
for ( let i = 0; i < 10; i ++ ) {
    records.push(
        {
            id: i,
            typeOperation: operationType[Math.floor(Math.random() * 2)],
            sum: Math.floor(Math.random() * 100000)/100,
            userId: Math.floor(Math.random() * 6)+1,
            createdAt: `2020-${Math.floor(Math.random() * 6)+1}-${Math.floor(Math.random() * 26)+1}`,

        },
    );
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('TransactionHistory',
            records, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('TransactionHistory',
            records, {});
    }
};
