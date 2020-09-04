const bd = require('../../models');
const BankDeclineError = require('../../errors/BankDeclineError');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount, [updatedBank]] = await bd.Banks.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount < 2) {
    throw new BankDeclineError(CONSTANTS_ERROR_MESSAGES.BANK_DECLINE);
  }
};
