const db = require('../../models');
const ServerError = require('../../errors/ServerError');
const Sequelize = require('sequelize');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.transactionCreation = async (data, transaction) => {
    const newTransaction = await db.TransactionHistory.create(data, {transaction: transaction});
    if ( !newTransaction) {
        throw new ServerError(CONSTANTS_ERROR_MESSAGES.MONEY_TRANSACTION);
    }
};

module.exports.transactionsFindAll = async (data) => {
    return await db.TransactionHistory.findAll(
        {
            where: data,
            attributes: ['typeOperation', 'sum'],
            raw: true,
        });
};

module.exports.transactionsGetSummary = async (data) => {
    return await db.TransactionHistory.findAll(
        {
            where: data,
            attributes: ['typeOperation', [Sequelize.fn('sum', Sequelize.col('sum')), 'total']],
            group: ['typeOperation'],
            raw: true
        });
};