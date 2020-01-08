import axios from 'axios';
import { message } from 'antd';

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

instance.interceptors.response.use(
  undefined,
  (err) => {
    if((err.response)&&(err.response.status===401)){
      message.error("太长时间未使用，请重新登录");
      const UserInfoStore = require('./Stores/UserInfoStore').default;
      if(UserInfoStore.isLogin){
        UserInfoStore.logout();
      }
    }
    return Promise.reject(err);
  }
)

export default instance;
