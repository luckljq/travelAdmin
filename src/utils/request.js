import axios from 'axios';

let token = '';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: 'http://localhost:8888',
    timeout: 500000
});

service.interceptors.request.use( config => {
    let url = config.url;
    if(url.indexOf("login") === -1){
        let user = JSON.parse(window.sessionStorage.getItem('UserState'));
        if (user) {
            token = user.user.token;
        }
        config.headers["Authorization"] ="Bearer " + token ;
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
});

service.interceptors.response.use(response => {
    if(response.status === 200){
        return response.data;
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
});

export default service;
