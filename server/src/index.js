require('./dbMongo/mongoose');
require('./boot/configureSocketIO');
require('./boot/ErrorArchive');
const sessionCache = require('./controllers/activeUsersController');
sessionCache.startSessionCacheControl();
console.log('Server is ready');



