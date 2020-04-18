'use strict';

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
}
;