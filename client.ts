import 'cross-fetch/polyfill';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

console.log('process', process.env);
let appUrl = '';

const httpLink = createHttpLink({
  // uri: 'http://localhost:4001/graphql',
  uri: 'https://teamapp-be.now.sh/graphl',
  credentials: 'include',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
