import axios from 'axios';

const instance = axios.create({
  baseURL: "http://154.49.246.233:5000"
});

export default instance;