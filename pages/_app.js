import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import jwt from 'jsonwebtoken';

import { client } from '../client';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import '../styles/index.scss';
import AuthProvider from '../components/AuthProvider';

export default function MyApp({ Component, pageProps }) {
  const [userPayload, setUserPayload] = useState({
    authenticated: false,
    token: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    let decodedToken;
    if (token) {
      const decoded = jwt.decode(token, { complete: true });
      decodedToken = decoded?.payload;
      setUserPayload(decodedToken);
    }
    // return () => {
    //   console.log('~~~~~~`');

    //   const token = localStorage.getItem('token') || '';
    //   if (token) {
    //     localStorage.removeItem('token');
    //   }
    // };
  }, []);

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}
