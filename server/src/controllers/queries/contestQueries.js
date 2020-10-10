const bd = require('../../models/postgreModel');
const ServerError = require('../../errors/ServerError');
const sequelize = require('sequelize');
const CONSTANTS = require('../../constants');

const Op = sequelize.Op;

module.exports.createContests = async (data, transaction) => {
  await bd.Contests.bulkCreate(data, transaction);
};

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await bd.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('problem with contest updating');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (contestId,orderId,priority, transaction) => {
  const [updatedCount, [updatedContest]] = await bd.Contests.update(
      {
        status: bd.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${CONSTANTS.CONTEST_STATUS_FINISHED}'
            WHEN "orderId"='${orderId}' AND "priority"=${priority +
        1}  THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
      },
    { where: {orderId: orderId, status:{
          [Op.ne]:CONSTANTS.CONTEST_STATUS_FINISHED
        }
      }, returning: true, transaction });
  if (updatedCount[ 0 ] < 1) {
    throw new ServerError('problem with contest updating');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateOfferStatus = async (newOfferStatus, offerId) => {
  const [updatedCount, [updatedOffer]] = await bd.Offers.update({status: newOfferStatus},
    { where: {id: offerId}, returning: true });
  if (updatedCount !== 1) {
    throw new ServerError('problem with offerStatus updating');
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatusOnResolve = async (offerId, predicate, transaction) => {
  const [updatedCount, updatedOffer] = await bd.Offers.update(
      {
        status: bd.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            WHEN "status"='${CONSTANTS.OFFER_STATUS_APPROVED}' THEN '${CONSTANTS.OFFER_STATUS_REJECTED}'
            WHEN "status"='${CONSTANTS.OFFER_STATUS_REJECTED}' THEN '${CONSTANTS.OFFER_STATUS_REJECTED}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR}'
            END 
    `),
      },
    { where: predicate, returning: true, transaction: transaction });
  if (updatedCount < 1) {
    throw new ServerError('problem with offerStatus updating');
  } else {
    return updatedOffer;
  }
};

module.exports.createOffer = async (data) => {
  const result = await bd.Offers.create(data);
  return result.get({ plain: true });
};

module.exports.getDataForContest = async (characteristic1, characteristic2) => {
  const characteristics = await bd.Selects.findAll({
    where: {
      type: {
        [Op.or]: [
          characteristic1,
          characteristic2,
          'industry',
        ],
      },
    },
    raw: true
  });
  if ( characteristics.length === 0 ) {
    return next(new ServerError());
  }
  return characteristics;
};

module.exports.findContestById = async (contestId, role, userId ) => {
  const result = await bd.Contests.findOne({
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
  if ( !result ) {
    throw new ServerError('contest doesnt exists');}
  return result.get({plain:true});
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

module.exports.findOffer = async (offerId) => {
  const result = await bd.Offers.findOne({where: {id: offerId}});
  if ( !result ) {
    throw new ServerError('can not find offers');}
  else return result;
};

module.exports.findAllOffersForModerator = async (status, limit, offset ) => {
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
        where: {status: status},
        order: [['timestamp', 'DESC']],
        attributes: {exclude: ['userId', 'contestId']},
        limit: limit,
        offset: offset,
      });
  if ( !result ) {
    throw new ServerError(`can't find offers`);}
  return result;
};