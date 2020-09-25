import React, { FunctionComponent } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  concat,
  ApolloLink,
  HttpLink,
} from '@apollo/react-hooks';
import store from 'store';

import CreateEventView from 'src/components/AppLayout/CreateEventView';

const CreateEventPage: FunctionComponent<{}> = () => {
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
      <CreateEventView />
    </ApolloProvider>
  );
};

export default CreateEventPage;
