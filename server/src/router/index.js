import * as offersMiddleware from '../middlewares/offersMiddleware';
import * as eventsController from '../controllers/eventsController';

const express = require('express');
const moderatorController = require('../controllers/moderatorController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const transactionHistory = require('../middlewares/transactionHistoryMiddleware');
const upload = require('../utils/fileUpload');
const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

router.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

router.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.post(
  '/getUser',
  checkToken.checkToken,
  checkToken.checkAuth,
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

router.post(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.get(
    '/getOffers',
    offersMiddleware.offersSearchOptions,
    contestController.getOffers,
);

router.post(
    '/getAllOffers/',
    checkToken.checkToken,
    basicMiddlewares.onlyForModerator,
    moderatorController.getAllOffers,
);


router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  contestController.setOfferStatus,
);

router.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);

router.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage,
);

router.post(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat,
);

router.post(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);

router.post(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList,
);

router.post(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat,
);

router.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);

router.post(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);

router.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);

router.post(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);

router.post(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);

router.post(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);

router.get(
    '/getAllTransactions',
    transactionHistory.getAllTransactions,
    contestController.getAllTransactions,
);

router.post(
    '/getUserTransactions',
    checkToken.checkToken,
    transactionHistory.getAllTransactions,
    contestController.getUserTransactions,
);

router.get(
    '/getTransactionsSummary',
    checkToken.checkToken,
    contestController.getTransactionsSummary,
);

router.post(
    '/makeTransaction',
    checkToken.checkToken,
    transactionHistory.makeTransaction,
    contestController.makeTransaction,
);

router.post(
    '/recoverPassword',
    validators.validateLogin,
    hashPass,
    userController.recoverPassword,
);

router.post(
    '/getUserEvents',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    eventsController.getUserEvents
);

router.post(
    '/createEvent',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    eventsController.createEvent
);

router.post(
    '/deleteEvent',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    eventsController.deleteEvent
);






module.exports = router;
