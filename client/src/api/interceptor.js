import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const instance = axios.create({
    baseURL: CONTANTS.BASE_URL
});

instance.interceptors.request.use(config => {
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    if (token) {
        config.headers = {...config.headers, 'Authorization': token};
    }
    return config;
}, (err) => Promise.reject(err));


instance.interceptors.response.use(response => {
    if (response.data.token) {
        window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
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