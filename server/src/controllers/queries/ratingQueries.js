const bd = require('../../models/postgreModel');
const ServerError = require('../../errors/ServerError');

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await bd.Ratings.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('problem with rating update');
  }
  return updatedRating.dataValues;
};

module.exports.createRating = async (data, transaction) => {
  const result = await bd.Ratings.create(data, { transaction });
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
