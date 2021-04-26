import axios from 'axios';
//rrequire("dotenv/config");

const api = axios.create({
    baseURL: 'http://192.168.134.1:3000/',
});

export default api;