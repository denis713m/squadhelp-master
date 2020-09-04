import { sendMessageToEmail } from '../utils/sendMessageToEmail';
const CONSTANTS = require('../constants');
const controller = require('../boot/configureSocketIO');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');


module.exports.getAllOffers = async (req, res, next) => {
    try {
        const offers = await contestQueries.findAllOffersForModerator(
            {status: req.body.status},
            req.body.limit,
            req.body.offset ? req.body.offset : 0,
        );
        res.send(offers);
    }
    catch (err) {
        next(err);
    }
};


module.exports.approveRejectOfferByModerator = async (req, res, next) => {
    try {
        const offerToModify = await contestQueries.findOffer({id: req.body.offerId});
        const user = await userQueries.findUser({ id: offerToModify.userId });
        const offer = await approveRejectOffer(req.body.offerId, offerToModify.userId,
                               offerToModify.contestId, user.email, (req.body.command !== 'reject'));
        res.send(offer);
    }
    catch ( err ) {
        next(err);
    }
};

const approveRejectOffer = async (offerId, creatorId, contestId, email, isApprove) => {
    const newOfferStatus = isApprove ? CONSTANTS.OFFER_STATUS_APPROVED : CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR;
    const messageToCreator = isApprove ? CONSTANTS.APPROVE_OFFER_BY_MODERATOR : CONSTANTS.REJECT_OFFER_BY_MODERATOR;
    const decisionAboutOffer = await contestQueries.updateOfferStatus({status: newOfferStatus}, {id: offerId});
    if (!isApprove) {controller.getNotificationController().emitChangeOfferStatus(creatorId,
        CONSTANTS.REJECT_OFFER_BY_MODERATOR, contestId);}
    sendMessageToEmail(messageToCreator, email);
    return decisionAboutOffer;
};