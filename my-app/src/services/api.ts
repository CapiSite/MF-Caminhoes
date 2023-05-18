import axios from 'axios';

console.log(process.env.REACT_BACK)
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_BACK
});

export default instance;