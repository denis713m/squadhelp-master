'use strict';
const Sequelize = require('sequelize');

module.exports.offersSearchOptions = async (req, res, next) => {
    try {
        const Op = Sequelize.Op;
        const searchOptions = {
            fileName: {
                [Op.ne]: null
            }
        };
        if ( (req.body.time) && ( !isNaN(new Date(req.body.time))) ) {
            searchOptions.timestamp = {
                [Op.gte]: new Date(req.body.time)
            }
        }
        req.body.searchOptions = searchOptions;
        next();
    } catch (e) {
        next(new ServerError());
    }
};