import axios from 'axios';
import CONFIG from './config';
import Storage from '../storage';

const instance = axios.create({
  baseURL: CONFIG.LOGIN.BASE_URL,
  timeout: 10000,
  // 设置传递的对象
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(config => {
  // 在发送请求的时候，需要携带token信息，所以要将token信息取出来。
  const access_token = Storage.getStorage('access_token');
  // 如果access_token信息存在的话，那么我们就要让请求头携带信息。
  if (access_token) {
    // 请求头携带token信息
    config.headers.Authorization = 'Bearer ' + access_token;
  };
  // 返回config参数
  return config;
}, err => {
  Promise.reject(err);
});

instance.interceptors.response.use(response => {
  // 在响应的时候，需要获取token信息，如果存在的话就要保存token信息
  const { token } = response.data;
  // 判断响应的请求头中是否存在token字段
  if (token) {
    Storage.setStorage('access_token', token);
  };
  // 返回响应参数
  return response.data;
}, err => {
  Promise.reject(err);
});

export default instance;