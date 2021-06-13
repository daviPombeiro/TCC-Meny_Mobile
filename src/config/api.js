import axios from 'axios';
//require("dotenv/config");

const api = axios.create({
    baseURL: 'http://192.168.18.49:3000/',
});

export default api;