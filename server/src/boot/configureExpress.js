const express = require('express');
const router = require('./../router');
const cors = require('cors');
const handlerError = require('./../handlerError/handler');

const configExpress = express();

configExpress.use(cors());
configExpress.use(express.json());
configExpress.use('/public', express.static('public'));
configExpress.use(router);
configExpress.use(handlerError);

export default configExpress

