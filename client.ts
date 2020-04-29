import 'cross-fetch/polyfill';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

const appUrl =
  process.env.NODE_ENV === 'production' ? 'https://teamapp-be.herokuapp.com/' : 'http://localhost:4001/graphql';

const httpLink = createHttpLink({
  uri: appUrl,
  credentials: 'include',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
