const bd = require('../../models');
const ServerError = require('../../errors/ServerError');
const sequelize = require('sequelize');
const CONSTANTS = require('../../constants');
const CONSTANTS_ERROR_MESSAGES = require('../../CONSTANTS_ERROR_MESSAGES');

const Op = sequelize.Op;

module.exports.createContests = async (data, transaction) => {
  const result = await bd.Contests.bulkCreate(data, transaction);
  if ( !result) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.CONTEST_CREATE);
  }
};

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await bd.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.CONTEST_UPDATE);
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await bd.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount[ 0 ] < 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.CONTEST_UPDATE);
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await bd.Offers.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.OFFER_UPDATE);
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const [updatedCount, updatedOffer] = await bd.Offers.update(data,
    { where: predicate, returning: true, transaction: transaction });
  if (updatedCount < 1) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.OFFER_UPDATE);
  } else {
    return updatedOffer;
  }
};

module.exports.createOffer = async (data) => {
  const result = await bd.Offers.create(data);
  if ( !result) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.OFFER_CREATE);
  } else {
    return result.get({ plain: true });
  }
};

module.exports.getDataForContest = async (data) => {
  const characteristics = await bd.Selects.findAll({
    where: data,
    raw: true
  });
  if ( !characteristics ) {
    return next(new ServerError());
  }
  return characteristics;
};

module.exports.findContestById = async (contestId, role, userId ) => {
  const result = bd.Contests.findOne({
    where: {id: contestId},
    order: [
      [bd.Offers, 'id', 'asc'],
    ],
    include: [
      {
        model: bd.Users,
        required: true,
        attributes: {
          exclude: [
            'password',
            'role',
            'balance',
            'accessToken',
          ],
        },
      },
      {
        model: bd.Offers,
        required: false,
        where: role === CONSTANTS.CREATOR
            ? {userId: userId}
            : role === CONSTANTS.CUSTOMER
                ? {
                  status: {
                    [Op.notIn]:  [CONSTANTS.OFFER_STATUS_PENDING,
                      CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR]
                  }
                }
                : {},
        attributes: {exclude: ['userId', 'contestId']},
        include: [
          {
            model: bd.Users,
            required: true,
            attributes: {
              exclude: [
                'password',
                'role',
                'balance',
                'accessToken',
              ],
            },
          },
          {
            model: bd.Ratings,
            required: false,
            where: {userId: userId},
            attributes: {exclude: ['userId', 'offerId']},
          },
        ],
      },
    ],
  });
  console.log(result)
  if ( !result ) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.CONTEST_FIND);}
  return result;
};

module.exports.findAllContestForCustomers = async (where, limit, offset) => {
  return await bd.Contests.findAll({
    where: where,
    limit: limit,
    offset: offset ? offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: bd.Offers,
        where: {
          status: {
            [Op.notIn]: [CONSTANTS.OFFER_STATUS_PENDING,
              CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR]
          }
        },
        required: false,
        attributes: ['id'],
      },
    ],
  });
};

module.exports.findAllContestForCreators = async (predicates, req) => {
  return await bd.Contests.findAll({
    where: predicates.where,
    order: [['createdAt', 'DESC'], ...predicates.order],
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: bd.Offers,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? {userId: req.tokenData.userId} : {},
        attributes: ['id'],
      },
    ],
  });
};

module.exports.findOffer = async (data) => {
  const result = await bd.Offers.findOne({where: data});
  if ( !result ) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.OFFER_FIND);}
  else return result;
};

module.exports.findAllOffersForModerator = async (data, limit, offset ) => {
  const result = await bd.Offers.findAndCountAll(
      {
        include:
            [
              {
                model: bd.Users,
                attributes: {
                  exclude: [
                    'password',
                    'role',
                    'balance',
                    'accessToken',
                  ],
                },
              },
              {
                model: bd.Contests,
                attributes: ['contestType'],
              }
            ],
        where: data,
        order: [['timestamp', 'DESC']],
        attributes: {exclude: ['userId', 'contestId']},
        limit: limit,
        offset: offset,
      });
  if ( !result ) {
    throw new ServerError(CONSTANTS_ERROR_MESSAGES.OFFER_FIND_PROBLEM);}
  return result;
};