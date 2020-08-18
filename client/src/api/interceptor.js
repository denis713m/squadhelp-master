import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const jwt = require('jsonwebtoken');

const instance = axios.create({
    baseURL: CONTANTS.BASE_URL
});
instance.interceptors.request.use(async(config) => {
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    const addres = config.url.split('/').pop();
    console.log(addres);
    if( addres !== 'login' && addres !== 'refreshTokens' && addres !== 'recoverPassword' && addres !== 'registration'){
        if (token) {
            const {exp} = jwt.decode(token);
            if (Date.now() >= exp * 1000) {
                await instance.post(config.baseURL + 'refreshTokens');
                console.log('go after refresh')
            }
            config.headers = {...config.headers, 'Authorization': window.localStorage.getItem(CONTANTS.ACCESS_TOKEN)};
        }
    }
    if( addres === 'refreshTokens'){
        console.log('refresh is going');
        const refresh = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN);
        config.headers = {...config.headers, 'Authorization': refresh};
        }
    return config;
}, (err) => Promise.reject(err));


instance.interceptors.response.use(response => {
    if (response.data.token) {
        window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
    }
    if (response.data.refreshToken) {
        window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, response.data.refreshToken);
    }
    return response;
}, err => {
    if (err.response.status === 408 && !CONTANTS.pagesWithout.includes(history.location.pathname)
    ) {
        history.replace('/login');
    }
    if (err.response.status === 423){
        history.replace('/notFound');
    }
    return Promise.reject(err);
});

export default instance;