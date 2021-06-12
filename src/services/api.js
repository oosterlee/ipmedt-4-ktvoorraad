import axios from 'axios';

const apiClient = axios.create({ //maakt een axios req aan
    baseURL: 'http://127.0.0.1:8000', //basis url dus je als wilt inloggen hoef je niet https://127.0.1:800/api/login in te voeren maar alleen /api/login
    withCredentials: true, //geeft de cookies nodig zijn om req te sturen
});

export default apiClient;