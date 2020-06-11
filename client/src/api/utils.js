import CONSTANTS from '../constants';

/**
 * @e{node} - node witch generate error
 * @defaultImage{string} - path to default image
 */
export const addDefaultSrc = (e, defaultImage) => {
    e.target.src = defaultImage || CONSTANTS.ANONYM_IMAGE_PATH
};