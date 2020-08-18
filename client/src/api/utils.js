import CONSTANTS from '../constants';
import moment from 'moment';

/**
 * @e{node} - node witch generate error
 * @defaultImage{string} - path to default image
 */
export const addDefaultSrc = (e, defaultImage) => {
    e.target.src = defaultImage || CONSTANTS.ANONYM_IMAGE_PATH
};

export const getTimeStr = (date, type) => {
    const diff = (moment.duration(moment().diff(moment(date, 'YYYY-MM-DDTHH:mm'))));
    let str = '';
    if (diff._data.months !== 0)
        str = `${diff._data.months}${type ? 'months' : 'm'} `;
    if (diff._data.days !== 0)
        str += `${diff._data.days}${type ? 'days':'d'} `;
    if (diff._data.hours !== 0)
        str += `${diff._data.hours}${type ? 'hours' : 'h'}`;
    if (str.length === 0)
        str = 'less than one hour';
    return str;
};