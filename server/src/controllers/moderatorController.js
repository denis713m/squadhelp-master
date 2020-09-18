import { sendMessageToEmail } from '../utils/sendMessageToEmail';
const CONSTANTS = require('../constants');
const controller = require('../boot/configureSocketIO');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');


module.exports.getAllOffers = async (req, res, next) => {
    try {
        const offerStatus = req.body.status;
        const offerLimit = req.body.limit;
        const offerOffset = req.body.offset ? req.body.offset : 0;
        const offers = await contestQueries.findAllOffersForModerator(offerStatus,offerLimit,offerOffset);
        res.send(offers);
    }
    catch (err) {
        next(err);
    }
};


module.exports.approveRejectOfferByModerator = async (req, res, next) => {
    try {
        const offerId = req.body.offerId;
        const offerToModify = await contestQueries.findOffer(offerId);
        const offerCreatorId = offerToModify.userId;
        const offerCreator = await userQueries.findUserById(offerCreatorId);
        const isModeratorApprove = req.body.command !== 'reject';
        const offer = await approveRejectOffer(offerId, offerToModify.userId,
                               offerToModify.contestId, offerCreator.email, isModeratorApprove);
        res.send(offer);
    }
    catch ( err ) {
        next(err);
    }
};

const approveRejectOffer = async (offerId, creatorId, contestId, email, isApprove) => {
    const newOfferStatus = isApprove ? CONSTANTS.OFFER_STATUS_APPROVED : CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR;
    const messageToCreator = isApprove ? CONSTANTS.APPROVE_OFFER_BY_MODERATOR : CONSTANTS.REJECT_OFFER_BY_MODERATOR;
    const decisionAboutOffer = await contestQueries.updateOfferStatus(newOfferStatus, offerId);
    if (!isApprove) {controller.getNotificationController().emitChangeOfferStatus(creatorId,
        CONSTANTS.REJECT_OFFER_BY_MODERATOR, contestId);}
    sendMessageToEmail(messageToCreator, email);
    return decisionAboutOffer;
};