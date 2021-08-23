import axios from 'axios';

const headers = { 
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
};

const apiClient = axios.create({ //maakt een axios req aan
    baseURL: process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000', //basis url dus je als wilt inloggen hoef je niet https://127.0.1:800/api/login in te voeren maar alleen /api/login
    headers
});

apiClient.defaults.withCredentials = true;

apiClient.get((process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000') + '/sanctum/csrf-cookie').then(res => {
	console.log(res.headers);
});

window['apiClient'] = apiClient;

export default apiClient;