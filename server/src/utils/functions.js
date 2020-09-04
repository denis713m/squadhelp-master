const bd = require('../models');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  typeIndex, contestId, industry, awardSort) => {
  let object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    object.where = { contestType: getPredicateTypes(typeIndex) };
  }
  if (contestId) {
    object.where =  {...object.where, id: contestId };
  }
  if (industry) {
    object.where =  {...object.where, industry: industry };
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  object.where =  {...object.where,
    status: {
      [ bd.Sequelize.Op.or ]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  };
  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes (index) {
  return { [ bd.Sequelize.Op.or ]: [types[ index ].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo'
];