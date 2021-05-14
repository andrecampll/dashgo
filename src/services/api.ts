import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequesttsQueue = [];

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export function setUpAuthApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const authApi = axios.create({
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
        cookies = parseCookies(ctx);
  
        const { 'dashgo.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;
  
        if (!isRefreshing) {
          isRefreshing = true;
  
          authApi.post('/refresh', {
            refreshToken,
          }).then(response => {
            const { token } = response.data;
    
            setCookie(ctx, 'dashgo.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });
      
            setCookie(ctx, 'dashgo.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });
    
            authApi.defaults.headers['Authorization'] = `Bearer ${token}`;
  
            failedRequesttsQueue.forEach(request => request.onSuccess(token));
            failedRequesttsQueue = [];
          }).catch(() => {
            failedRequesttsQueue.forEach(request => request.onFailure(error));
            failedRequesttsQueue = [];
  
            if (process.browser) {
              signOut();
            }
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
        if (process.browser) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
    }
  
    return Promise.reject(error);
  });

  return authApi;
}
