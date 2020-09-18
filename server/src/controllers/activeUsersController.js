const eventTimer = require('../middlewares/eventsTimer');
const activeUsersController = [];

module.exports.startSessionCacheControl = () => setInterval(() => {
    const usersToRemoveIndex = [];
    activeUsersController.forEach((item, index) => {
        if (Date.now() - item.lastRequest >= 20*1000) {
            usersToRemoveIndex.push(index);
            console.log(item.id)
        }
    });
    usersToRemoveIndex.forEach(item => activeUsersController.splice(item,1))
}, 20*1000);


module.exports.getActiveUsers = () => {
    return activeUsersController.map(item => item.id)};

module.exports.addUser = (data) => {
    activeUsersController.push(data);

};

module.exports.checkUserAtSessionCache = (token) => {
    let isSessionActive = 'absent';
    activeUsersController.forEach((item, index, array) => {
        if (item.accessToken === token) {
            const time = Date.now() - item.lastRequest;
            if ( time < 10*1000) {
                array[index].lastRequest = Date.now();
                isSessionActive = 'active'}
            else {
                isSessionActive = 'notActive'
            }
        }
    });
    return isSessionActive;
};

module.exports.updateLastRequest = (data) =>
{
    activeUsersController.forEach((item, index, array) => {
        if(item.id === data) {array[index].lastRequest = Date.now();}
    })
};
