import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { client } from '../client';
import { auth } from '~/utils/auth';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import '../styles/index.scss';

function MyApp({ Component, ...pageProps }) {
  console.log('MyApp:pageProps', pageProps);
  
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// export const getServerSideProps = async (ctx) => {
//   // Check user's session
//   const session = auth(ctx);

//   console.log('MyApp.getServerSideProps:token', session);
//   return {
//     props: session,
//   };
// };

MyApp.getInitialProps = async (ctx) => {
  //  if (process.browser) {
  //    history.go();
  //  }

  // Check user's session
  const token = auth(ctx?.ctx || ctx) || '';

  console.log('MyApp.getInitialProps:ctx', ctx?.ctx?.req?.headers?.cookie, 'MyApp:token', token);
  return token;
  // return {
  //   props: { token },
  // };
};

export default MyApp;
