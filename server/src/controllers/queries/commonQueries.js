const db = require('../../models/postgreModel');
const ServerError = require('../../errors/ServerError');
const constantsErrorMessages = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.createTransaction = async () =>
{
    const transaction = await db.sequelize.transaction();
    if ( !transaction ) {
        throw new ServerError(constantsErrorMessages.Transaction);}
    return transaction;

};

module.exports.createTransaction_READ_UNCOMMITTED = async () =>
{
    const transaction = await db.sequelize.transaction(
        { isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
    if ( !transaction ) {
        throw new ServerError(constantsErrorMessages.Transaction);}
    return transaction;
};