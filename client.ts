import 'cross-fetch/polyfill';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import ApolloClient from 'apollo-client';

export const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4001/",
  }),
  cache: new InMemoryCache(),
});
