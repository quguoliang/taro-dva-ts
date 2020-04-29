/*
 * @file:
 * @author: quguoliang
 * @Date: 2020-04-29 13:34:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-29 13:34:50
 */
import axios from 'taro-axios';

const baseURL = `http://127.0.0.1:8080`;
const service = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 300000
});
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
