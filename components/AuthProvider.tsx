import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { Provider } from '../utils/appContext';

const AuthProvider = (props: any) => {
  const [userPayload, setUserPayload] = useState({
    user: {},
    authenticated: false,
    logout: () => {},
  });

  const logout = () => {
    localStorage.removeItem('token');
    setUserPayload({ user: {}, authenticated: false, logout: () => {} });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    let decodedToken: string;
    if (token) {
      const decoded: string | { [key: string]: string } | null | any = jwt.decode(token, { complete: true });
      decodedToken = decoded?.payload;
      setUserPayload({
        user: decodedToken,
        authenticated: true,
        logout: logout,
      });
    }
    return () => undefined;
  }, []);

  const providerValue = {
    ...userPayload,
  };

  return <Provider value={providerValue}>{props.children}</Provider>;
};

export default AuthProvider;
