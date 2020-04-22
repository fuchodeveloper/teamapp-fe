import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { client } from '../client';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import '../styles/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import AuthProvider from '../components/AuthProvider';

function MyApp({ Component, pageProps }) {
  // console.log('dtgsdfg', pageProps);
  
  // const { token } = nextCookie(pageProps);
  // let decodedUser;
  // let userPayload;

  // if (token) {
  //   const decoded = jwt.decode(token, { complete: true });
  //   decodedUser = decoded?.payload;
  //   userPayload = {
  //     user: decodedUser,
  //     authenticated: true,
  //     logout: logout,
  //   };
  // }

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
