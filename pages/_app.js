import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../client';

import '../node_modules/@fortawesome/fontawesome-free/js/all';
import '../styles/index.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
