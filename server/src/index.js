require('./dbMongo/mongoose');
import httpServer from "./boot/configureHTTPServer";

const controller = require('./socketInit');

controller.createConnection(httpServer);

