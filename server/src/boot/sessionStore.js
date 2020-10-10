const sessionStore = new Map();

module.exports.startSessionControl = () => setInterval(() => {
    sessionStore.forEach((data, id) => {
        if (Date.now() - data.lastRequest >= 60*1000) {
            sessionStore.delete(id);
        }
    })
}, 30*60*1000);


module.exports.getActiveUsers = () => {
    return sessionStore.keys();
};

module.exports.addUser = (data) => {
    sessionStore.set(data.id, data);

};

module.exports.checkUserAtSessionStore = (token, id) => {
    if(sessionStore.has(id)) return sessionStore.get(id).accessToken === token;
    return false;
};

module.exports.updateLastRequest = (userId) =>
{
    sessionStore.get(userId).lastRequest = Date.now();
};
