const commonQueries = require('./queries/commonQueries');
const {approveRejectOfferByModerator} = require('./moderatorController');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../boot/configureSocketIO');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');

module.exports.dataForContest = async (req, res, next) => {
    let response = {};
    try {
        const characteristic1 = req.body.characteristic1;
        const characteristic2 = req.body.characteristic2;
        const characteristics = await contestQueries.getDataForContest(characteristic1, characteristic2);
        characteristics.forEach(characteristic => {
            if ( !response[characteristic.type] ) {
                response[characteristic.type] = [];
            }
            response[characteristic.type].push(characteristic.describe);
        });
        res.send(response);
    }
    catch ( err ) {
        next(err);
    }
};

module.exports.getContestById = async (req, res, next) => {
    try {
        const contestInfo = await contestQueries.findContestById(req.headers.contestid, req.tokenData.role, req.tokenData.userId);
        contestInfo.Offers.forEach(offer => {
            if ( offer.Rating ) {
                offer.mark = offer.Rating.mark;
            }
            delete offer.Rating;
        });
        res.send(contestInfo);
    }
    catch ( e ) {
        next(e);
    }
};

module.exports.downloadFile = async (req, res, next) => {
    const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
    res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
    if ( req.file ) {
        req.body.fileName = req.file.filename;
        req.body.originalFileName = req.file.originalname;
    }
    const contestId = req.body.contestId;
    delete req.body.contestId;
    try {
        const updatedContest = await contestQueries.updateContest(req.body, {
            id: contestId,
            userId: req.tokenData.userId,
        });
        res.send(updatedContest);
    }
    catch ( e ) {
        next(e);
    }
};

module.exports.setNewOffer = async (req, res, next) => {
    const obj = {};
    if ( req.body.contestType === CONSTANTS.LOGO_CONTEST ) {
        obj.fileName = req.file.filename;
        obj.originalFileName = req.file.originalname;
    }
    else {
        obj.text = req.body.offerData;
    }
    obj.userId = req.tokenData.userId;
    obj.contestId = req.body.contestId;
    try {
        let result = await contestQueries.createOffer(obj);
        delete result.contestId;
        delete result.userId;
        controller.getNotificationController().emitEntryCreated(
            req.body.customerId);
        const User = { ...req.tokenData, id: req.tokenData.userId};
        res.send({...result, User: User});
    }
    catch ( e ) {
        next(e);
    }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
    const rejectedOffer = await contestQueries.updateOfferStatus(
        CONSTANTS.OFFER_STATUS_REJECTED, offerId);
    controller.getNotificationController().emitChangeOfferStatus(creatorId,
        'Someone of yours offers was rejected', contestId);
    return rejectedOffer;
};

const resolveOffer = async (
    contestId, creatorId, orderId, offerId, priority, transaction) => {
    const finishedContest = await contestQueries.updateContestStatus(
        contestId,orderId,priority, transaction);
    await userQueries.updateUserBalance(finishedContest.prize,
        creatorId, transaction);
    const updatedOffers = await contestQueries.updateOfferStatusOnResolve(offerId, {
        contestId: contestId,
    }, transaction);
    const arrayRoomsId = [];
    updatedOffers.forEach(offer => {
        if ( offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
            offer.userId ) {
            arrayRoomsId.push(offer.userId);
        }
    });
    await transaction.commit();
    controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
        'Someone of yours offers was rejected', contestId);
    controller.getNotificationController().emitChangeOfferStatus(creatorId,
        'Someone of your offers WIN', contestId);
    return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
    if ( req.tokenData.role === CONSTANTS.MODERATOR ) {
        await approveRejectOfferByModerator(req, res, next);
    }
    else {
        let transaction;
        if ( req.body.command === 'reject' ) {
            try {
                const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
                    req.body.contestId);
                res.send({id: offer.id, status: offer.status});
            }
            catch ( err ) {
                next(err);
            }
        }
        else if ( req.body.command === 'resolve' ) {
            try {
                transaction = await commonQueries.createTransaction();
                await resolveOffer(req.body.contestId,
                    req.body.creatorId, req.body.orderId, req.body.offerId,
                    req.body.priority, transaction);
                res.send({id: req.body.offerId, status: CONSTANTS.OFFER_STATUS_WON});
            }
            catch ( err ) {
                await transaction.rollback();
                next(err);
            }
        }
    }
};

module.exports.getContests = async (req, res, next) => {
    try{
        let contests;
        if (req.tokenData.role === CONSTANTS.CUSTOMER){
            contests = await contestQueries.findAllContestForCustomers(
            {status: req.headers.status, userId: req.tokenData.userId},
                    req.body.limit,
                    req.body.offset);}
        else {
            const predicates = UtilFunctions.createWhereForAllContests(req.body.typeIndex,
                req.body.contestId, req.body.industry, req.body.awardSort);
            contests = await contestQueries.findAllContestForCreators(predicates, req)}
        let haveMore = true;
        if ( contests.length === 0 ) {
            haveMore = false;
        }
        res.send({contests, haveMore});
    }
    catch ( e ) {
        next(e)
    }
};

