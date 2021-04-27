import axios from 'axios';
//rrequire("dotenv/config");

const api = axios.create({
    baseURL: 'http://192.168.18.49:3000/',
});

export default api;