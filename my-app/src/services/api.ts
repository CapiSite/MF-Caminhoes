import axios from 'axios';

const instance = axios.create({
  baseURL: (process.env.REACT_BACK !== undefined? process.env.REACT_BACK :"http://154.49.246.233:5000")
});

export default instance;