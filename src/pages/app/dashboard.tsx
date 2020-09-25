import React, { FunctionComponent } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/react-hooks';
import store from 'store';

import DashboardView from 'src/components/AppLayout/DashboardView';

const DashboardPage: FunctionComponent<{}> = () => {
  const httpLink = new HttpLink({ uri: `${process.env.API_URL}/graphql` });
  const token = store.get('__cnt');

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    uri: `${process.env.API_URL}/graphql`,
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });
  return (
    <ApolloProvider client={client}>
      <DashboardView />
    </ApolloProvider>
  );
};

export default DashboardPage;
