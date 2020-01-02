import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  timeout: 2000,
  headers: {},
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {

    let token = localStorage.getItem('Travel-Manager-User-Token');
    if(token===null){
      token = "";
    }

    // Add token to HTTP header before request is sent
    if(!('headers' in config)){
      config.headers = {};
    }

    config.headers['Authorization'] = token;

    return config;
  }
);

export default instance;
