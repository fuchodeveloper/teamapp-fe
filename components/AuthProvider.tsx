import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { Provider } from '../utils/appContext';
import { withAuthSync, auth, logout as logoutAuth } from '~/utils/auth';
import { GetServerSideProps } from 'next';
import nextCookie from 'next-cookies';

const AuthProvider = (props: any) => {
  const { token } = nextCookie(props);
  // console.log('AuthProvider:props', props);
  
  const [userPayload, setUserPayload] = useState({
    user: {},
    authenticated: false,
    logout: () => {},
    admin: false
  });

  const logout = () => {
    logoutAuth();
    setUserPayload({ user: {}, authenticated: false, logout: () => {}, admin: false });
  };

  useEffect(() => {
    // const token = localStorage.getItem('token');
    let decodedToken: string;
    if (token) {
      console.log('token exists');

      const decoded: string | { [key: string]: string } | null | any = jwt.decode(token, { complete: true });
      decodedToken = decoded?.payload;
      setUserPayload({
        user: decodedToken,
        authenticated: true,
        logout: logout,
        admin: false,
      });
    }
    return () => undefined;
  }, [token]);

  const providerValue = {
    ...userPayload,
  };

  return <Provider value={providerValue}>{props.children}</Provider>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check user's session
  const token = auth(ctx);

  return {
    props: { token },
  };
};

export default withAuthSync(AuthProvider);
