import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';
import React from 'react';
import ReactNotification from 'react-notifications-component';
import 'react-datepicker/dist/react-datepicker.css';
import { client } from '../client';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import '../styles/index.scss';

function MyApp({ Component, ...pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ReactNotification />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

// TODO: handle all errors in the app

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = {};

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     return { pageProps };
//   }

//   componentDidCatch(error, errorInfo) {
//     Sentry.withScope((scope) => {
//       Object.keys(errorInfo).forEach((key) => {
//         scope.setExtra(key, errorInfo[key]);
//       });

//       Sentry.captureException(error);
//     });

//     super.componentDidCatch(error, errorInfo);
//   }

//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       <Container>
//         <Component {...pageProps} />
//       </Container>
//     );
//   }
// }


// export default MyApp;
