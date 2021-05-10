import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

import { signOut } from '../contexts/AuthContext';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequesttsQueue = [];

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const authApi = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['dashgo.token']}`
  },
});

authApi.interceptors.response.use((response) => {
  return response;
}, (error: AxiosError) => {
  if(error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies();

      const { 'dashgo.refreshToken': refreshToken } = cookies;
      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        authApi.post('/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data;
  
          setCookie(undefined, 'dashgo.token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          });
    
          setCookie(undefined, 'dashgo.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          });
  
          authApi.defaults.headers['Authorization'] = `Bearer ${token}`;

          failedRequesttsQueue.forEach(request => request.onSuccess(token));
          failedRequesttsQueue = [];
        }).catch(() => {
          failedRequesttsQueue.forEach(request => request.onFailure(error));
          failedRequesttsQueue = [];
        }).finally(() => {
          isRefreshing = false;
        });
      }

      return new Promise((resolve, reject) => {
        failedRequesttsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization']= `Bearer ${token}`;

            resolve(authApi(originalConfig));
          },
          onFailure: (error: AxiosError) => {
            reject(error);
          }
        });
      });
    } else {
      signOut();
    }
  }

  return Promise.resolve(error);
});
