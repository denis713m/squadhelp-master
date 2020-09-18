const transactionsQueries = require('./queries/transactionsQueries');
const commonQueries = require('./queries/commonQueries');

module.exports.getUserTransactions = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const transactions = await transactionsQueries.transactionsFindAll(userId);
        res.send(transactions);
    }
    catch (err) {
        next(err);
    }
};

module.exports.getTransactionsSummary = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const transactions = await transactionsQueries.transactionsGetSummary(userId);
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
        const sum = req.body.sum;
        const customer = req.tokenData.userId;
        const creator = req.body.userId;
        await transactionsQueries.transactionCreation(false, sum, customer, transaction);
        await transactionsQueries.transactionCreation(true, sum, creator, transaction);
        transaction.commit();
        res.send('1')
    }
    catch ( e ) {
        if (transaction) await transaction.rollback();
        next(e);
    }
};

