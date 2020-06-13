import jwt from 'jsonwebtoken';
import React from 'react';
import { logout as logoutAuth } from '~/utils/auth';
import { Provider } from '../utils/appContext';

// TODO: deprecate provider
const AuthProvider = (props: any) => {
  /**
   * cookie not available on FE AND can't use SSR outside /pages
   * Beause of this, we have to get the props and pass it in React context for access in
   * non-next.js page routes
   */

  const token = props?.pageProps?.token || '';
  let userPayload = {};


  const logout = () => {
    logoutAuth();
  };

  if (token) {
    let decodedToken: string;
    const decoded: string | { [key: string]: string } | null | any = jwt.decode(token, { complete: true });
    decodedToken = decoded?.payload;
    userPayload = {
      user: decodedToken,
      authenticated: true,
      logout: logout,
      admin: false,
    };
  }

  const providerValue = {
    ...userPayload,
  };

  return <Provider value={providerValue}>{props.children}</Provider>;
};

export default AuthProvider;
