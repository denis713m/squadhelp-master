import configExpress from "./configureExpress";
const http = require('http');
const PORT = process.env.PORT || 9632;

const httpServer = http.createServer(configExpress);
httpServer.listen(PORT);

export default httpServer