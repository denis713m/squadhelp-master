const db = require('../../models');
const ServerError = require('../../errors/ServerError');
const Sequelize = require('sequelize');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.transactionCreation = async (isIncome, sum, userId, transaction) => {
    const typeOperation = isIncome ? 'INCOME': 'CONSUMPTION'
    const newTransaction = await db.TransactionHistory.create(
        {
            typeOperation: typeOperation,
            sum: sum,
            userId: userId,
        }, {transaction: transaction});
    if ( !newTransaction) {
        throw new ServerError(CONSTANTS_ERROR_MESSAGES.MONEY_TRANSACTION);
    }
};

module.exports.transactionsFindAll = async (userId) => {
    return await db.TransactionHistory.findAll(
        {
            where: {userId: userId},
            attributes: ['typeOperation', 'sum'],
            raw: true,
        });
};

module.exports.transactionsGetSummary = async (userId) => {
    return await db.TransactionHistory.findAll(
        {
            where: {userId: userId},
            attributes: ['typeOperation', [Sequelize.fn('sum', Sequelize.col('sum')), 'total']],
            group: ['typeOperation'],
            raw: true
        });
};