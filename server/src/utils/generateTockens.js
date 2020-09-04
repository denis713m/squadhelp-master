const CONSTANTS = require('../constants');
const jwt = require('jsonwebtoken');

module.exports.generateTokens = (user) => {
    const accessToken = jwt.sign({
        firstName: user.firstName,
        userId: user.id,
        role: user.role,
        lastName: user.lastName,
        avatar: user.avatar,
        displayName: user.displayName,
        balance: user.balance,
        email: user.email,
        rating: user.rating,
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    const refreshToken = jwt.sign({
        email: user.email
    }, CONSTANTS.REFRESH_JWT_SECRET, { expiresIn: CONSTANTS.REFRESH_TOKEN_TIME });
    return { token: accessToken,
        refreshToken: refreshToken}
};

module.exports.generateRecoverAccesToken = (useId, hashPass) =>{
    return  jwt.sign({
        userId: useId,
        hashPass: hashPass,
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
};