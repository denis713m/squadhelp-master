const bd = require('../../models');
const BankDeclineError = require('../../errors/BankDeclineError');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.updateBankBalance = async (cardFrom, cardTo, sum, predicate, transaction) => {
  const [updatedCount, [updatedBank]] = await bd.Banks.update({
        balance: bd.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${ cardFrom.number }' AND "cvc"='${ cardFrom.cvc }' AND "expiry"='${ cardFrom.expiry }'
                THEN "balance"-${ sum }
            WHEN "cardNumber"='${ cardTo.number }' AND "cvc"='${ cardTo.cvc }' AND "expiry"='${ cardTo.expiry }'
                THEN "balance"+${ sum } END
        `),
      },
    { where: {
            cardNumber: {
                [ bd.sequelize.Op.in ]: [
                    cardTo.number,
                    cardFrom.number,
                ],
            },
        }, returning: true, transaction });
  if (updatedCount < 2) {
    throw new BankDeclineError(CONSTANTS_ERROR_MESSAGES.BANK_DECLINE);
  }
};
