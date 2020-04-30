import moment from 'moment';
const fs = require('fs');
import CONSTANTS from './../constants'

export default function (err) {
    const data = {
        message: err.message,
        time: moment().format('x'),
        code: err.code,
        stackTrace: err.stack
    };
    fs.writeFile(CONSTANTS.ERROR_LOG_FILE, JSON.stringify(data)+'\n', {flag:'a'},(err) => {
        if (err) throw err;
    });
}