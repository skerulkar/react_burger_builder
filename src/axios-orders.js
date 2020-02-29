import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-95655.firebaseio.com/'
});

export default instance;