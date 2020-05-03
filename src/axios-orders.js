import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sauce-edge.firebaseio.com/'
});

export default instance;