'use strict';

import ServerError from '../errors/ServerError';

module.exports.getAllTransactions = async (req, res, next) => {
    try {
        if ( (typeof req.body.limit === 'undefined') || (isNaN(req.body.limit)))
        {
            req.body.limit = 10;
        }
        if ( (typeof req.body.offset === 'undefined') || (isNaN(req.body.offset)))
        {
            req.body.offset = 0;
        }
        next();
    }
    catch
        ( e ) {
        next(new ServerError());
    }
};
module.exports.makeTransaction = async (req, res, next) => {
    try {
        if ((typeof req.body.sum === 'undefined') || (typeof req.body.userId === 'undefined'))
        {
            next(new ServerError("not all info"));
        }
        next();
    }
    catch
        ( e ) {
        next(new ServerError());
    }
};

