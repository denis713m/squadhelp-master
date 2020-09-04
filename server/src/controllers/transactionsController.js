const transactionsQueries = require('./queries/transactionsQueries');
const commonQueries = require('./queries/commonQueries');

module.exports.getUserTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionsQueries.transactionsFindAll(
            {userId: req.tokenData.userId});
        res.send(transactions);
    }
    catch (err) {
        next(err);
    }
};

module.exports.getTransactionsSummary = async (req, res, next) => {
    try {
        const transactions = await transactionsQueries.transactionsGetSummary(
            {userId: req.tokenData.userId});
        res.send(transactions);
    }
    catch (err) {
        next(err);
    }
};

module.exports.makeTransaction = async (req, res, next) => {
    let transaction;
    try {
        transaction = await commonQueries.createTransaction();
        await transactionsQueries.transactionCreation(
            {
                typeOperation: 'CONSUMPTION',
                sum: req.body.sum,
                userId: req.tokenData.userId,
            },
            transaction);
        await transactionsQueries.transactionCreation(
            {
                typeOperation: 'INCOME',
                sum: req.body.sum,
                userId: req.body.userId,
            },
            transaction);
        transaction.commit();
        res.send('1')
    }
    catch ( e ) {
        if (transaction) await transaction.rollback();
        next(e);
    }
};

