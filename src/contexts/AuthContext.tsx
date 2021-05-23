import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { authApi } from "../services/apiClient";

type User = {
  name: string;
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'dashgo.token');
  destroyCookie(undefined, 'dashgo.refreshtoken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<User>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');
    
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    const { 'dashgo.token': token } = parseCookies();

    if (token) {
      authApi.get('/me')
        .then(response => {
          const { email, name, permissions, roles } = response.data;

          setUser({ email, name, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await authApi.post('sessions', {
        email,
        password,
      });

      const { token, refreshToken, name, permissions, roles } = response.data;

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({
        name,
        email,
        permissions,
        roles
      });

      authApi.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');

      authChannel.postMessage('signIn');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
