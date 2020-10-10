require('./dbMongo/mongoose');
require('./boot/configureSocketIO');
require('./boot/ErrorArchive');
const sessionCache = require('./boot/sessionStore');
sessionCache.startSessionControl();
console.log('Server is ready');



