import axios from 'axios';
//require("dotenv/config");

const api = axios.create({
    baseURL: 'http://192.168.100.1:3000/',
});

export default api;