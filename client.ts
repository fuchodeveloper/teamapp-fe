import 'cross-fetch/polyfill';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import ApolloClient from 'apollo-client';
import cookie from 'js-cookie';

const httpLink = createHttpLink({
  uri: 'http://localhost:4001/',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from cookies if it exists
  const token = cookie.get('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
