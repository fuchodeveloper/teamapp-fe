import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

import { Provider } from '../utils/appContext';

const AuthProvider = (props: any) => {
    
  const [userPayload, setUserPayload] = useState({
    user: {},
    authenticated: false
  });

    useEffect(() => {     
      const token = localStorage.getItem('token');
      let decodedToken: string;
      if (token) {
        const decoded: string | { [key: string]: string } | null | any = jwt.decode(token, { complete: true });
        decodedToken = decoded?.payload;
        setUserPayload({
          user: decodedToken,
          authenticated: true
        });
      }
      return () => undefined;
    }, []);

  const providerValue = {
    ...userPayload,
    // setSession: setSession(),
    // logout: logout(),
  };

  return <Provider value={providerValue}>{props.children}</Provider>;
}

export default AuthProvider;
