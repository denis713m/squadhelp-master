const eventTimer = require('../middlewares/eventsTimer');
const activeUsersController = [];
const activeUsers = {};

module.exports.startSessionCacheControl = () => setInterval(() => {
    const usersToRemoveIndex = [];
    activeUsersController.forEach((item, index) => {
        if (Date.now() - item.lastRequest >= 20*1000) {
            usersToRemoveIndex.push(index);
            console.log(item.id)
        }
    });
    usersToRemoveIndex.forEach(item => activeUsersController.splice(item,1))
    for (let user in activeUsers){
        if (Date.now() - activeUsers[user].lastRequest >= 20*1000) {
            console.log(`DELETE ${activeUsers[user].id}`)
            delete activeUsers[user];
        }
    }
    console.log(activeUsers)
}, 20*1000);


module.exports.getActiveUsers = () => {
    return activeUsersController.map(item => item.id)};

module.exports.addUser = (data) => {
    console.log('ADDD')
    activeUsersController.push(data);
    activeUsers[data.id] = data;

};

module.exports.checkUserAtSessionCache = (token, id) => {
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
    if(activeUsers[id]){
        const t= Date.now();
        const time = t - activeUsers[id].lastRequest;
        if ( time < 10) {
           // activeUsers[id].lastRequest = Date.now();
            //return 'active'
        }
        else {
            //return 'notActive'
        }
    }
    else {
        //return 'absent'
    };
    return isSessionActive;
};

module.exports.updateLastRequest = (data) =>
{
    activeUsersController.forEach((item, index, array) => {
        if(item.id === data) {array[index].lastRequest = Date.now();}
    })
};
