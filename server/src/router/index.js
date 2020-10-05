const express = require('express');
const chatPostgresController = require('../controllers/chatPostgresController');
const moderatorController = require('../controllers/moderatorController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const transactionHistory = require('../middlewares/transactionHistoryMiddleware');
const transactionsController = require('../controllers/transactionsController');
const upload = require('../utils/fileUpload');
const eventsController = require('../controllers/eventsController');
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
    '/refreshTokens',
    checkToken.checkRefreshToken,
    userController.getTokens,
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
  contestController.getContests,
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
  chatPostgresController.addMessage,
);

router.post(
  '/getChat',
  checkToken.checkToken,
  chatPostgresController.getChat,
);

router.post(
  '/getPreview',
  checkToken.checkToken,
  chatPostgresController.getPreview,
);

router.post(
  '/blackList',
  checkToken.checkToken,
  chatPostgresController.changeChatStatus,
);

router.post(
  '/favorite',
  checkToken.checkToken,
  chatPostgresController.markChatStatusFavorite,
  chatPostgresController.changeChatStatus,
);

router.post(
  '/createCatalog',
  checkToken.checkToken,
  chatPostgresController.createCatalog,
);

router.post(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatPostgresController.renameCatalog,
);

router.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatPostgresController.isAddChatToCatalog,
  chatPostgresController.changeChatsInCatalog
);

router.post(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatPostgresController.changeChatsInCatalog
);

router.post(
  '/deleteCatalog',
  checkToken.checkToken,
  chatPostgresController.deleteCatalog,
);

router.post(
  '/getCatalogs',
  checkToken.checkToken,
  chatPostgresController.getCatalogs,
);

router.post(
    '/getUserTransactions',
    checkToken.checkToken,
    transactionHistory.getAllTransactions,
    transactionsController.getUserTransactions,
);

router.get(
    '/getTransactionsSummary',
    checkToken.checkToken,
    transactionsController.getTransactionsSummary,
);

router.post(
    '/makeTransaction',
    checkToken.checkToken,
    transactionHistory.makeTransaction,
    transactionsController.makeTransaction,
);

router.post(
    '/recoverPassword',
    validators.validateLogin,
    hashPass,
    userController.recoverPassword,
);

router.post(
    '/updatePasswordAndGetUser',
    checkToken.checkToken,
    userController.updatePass,
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
