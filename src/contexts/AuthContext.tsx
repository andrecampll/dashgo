import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { authApi } from "../services/api";

type User = {
  name: string;
  email: string;
  permissions: string[];
  roles: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<User>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'dashgo.token': token } = parseCookies();

    if (token) {
      authApi.get('/me').then(response => {
        const { email, name, permissions, roles } = response.data;

        setUser({ email, name, permissions, roles });
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
