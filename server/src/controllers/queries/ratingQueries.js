const bd = require('../../models');
const ServerError = require('../../errors/ServerError');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await bd.Ratings.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.RATING_UPDATE);
  }
  return updatedRating.dataValues;
};

module.exports.createRating = async (data, transaction) => {
  const result = await bd.Ratings.create(data, { transaction });
  if ( !result) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.RATING_MARK);
  }
    return result.get({ plain: true });
};

module.exports.findRating = async (userId, transaction) =>{
  return await bd.Ratings.findAll({
    include: [
      {
        model: bd.Offers,
        required: true,
        where: { userId: userId },
      },
    ],
    raw: true,
    transaction,
  });
};
