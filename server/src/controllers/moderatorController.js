import { sendMessageToEmail } from '../utils/sendMessageToEmail';
import ServerError from '../errors/ServerError';
const NotFound = require('../errors/UserNotFoundError');
const CONSTANTS = require('../constants');
const contestQueries = require('./queries/contestQueries');
const controller = require('../boot/configureSocketIO');
const db = require('../models');
const userQueries = require('./queries/userQueries');


module.exports.getAllOffers = (req, res, next) => {
    console.log(req.body);
    db.Offers.findAndCountAll(
        {
            where: {status: req.body.status
            },
            attributes: {exclude: ['userId', 'contestId']},
            limit: req.body.limit,
            offset: req.body.offset ? req.body.offset : 0,
            order: [['text', 'ASC']],
            include: [
                {
                    model: db.Users,
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
                    model: db.Contests,
                    required: true,
                    attributes: {
                        exclude: [
                            'id',
                            'fileName',
                            'originalFileName',
                            'title',
                            'typeOfName',
                            'industry',
                            'focusOfWork',
                            'targetCustomer',
                            'styleName',
                            'nameVenture',
                            'typeOfTagLine',
                            'status',
                            'brandStyle',
                            'prize',
                            'createdAt',
                            'priority',
                            'orderId',
                            'userId',
                        ],
                    },
                },
            ]
        }
    )
        .then(offers => {
            res.send(offers);
        })
        .catch(err => {
            next(new ServerError());
        })
};


module.exports.moderatorOptions = async (req, res, next) => {
    try {
        const offerToModify = await db.Offers.findOne({where: {id: req.body.offerId}});
        const user = await userQueries.findUser({ id: offerToModify.userId });
        if ( req.body.command === 'reject' ) {
            const offer = await rejectOffer(req.body.offerId, offerToModify.userId,
                offerToModify.contestId, user.email);
            res.send(offer);
        }
        else {
            const offer = await approveOffer(req.body.offerId, offerToModify.userId,
                offerToModify.contestId, user.email);
            res.send(offer);
        }
    }
    catch ( err ) {
        next(err);
    }


};

const rejectOffer = async (offerId, creatorId, contestId, email) => {
    const rejectedOffer = await contestQueries.updateOffer(
        {status: CONSTANTS.OFFER_STATUS_REJECTED_MODERATOR}, {id: offerId});
    controller.getNotificationController().emitChangeOfferStatus(creatorId,
        'Some of yours offers was rejected', contestId);
    sendMessageToEmail('<p>Some of yours offers was rejected</p>', email);
    return rejectedOffer;
};

const approveOffer = async (offerId, creatorId, contestId, email) => {
    const approveOffer = await contestQueries.updateOffer(
        {status: CONSTANTS.OFFER_STATUS_APPROVED}, {id: offerId});
    sendMessageToEmail('<p>Some of yours offers was approved</p>', email);
    return approveOffer;
};