import React, { FunctionComponent } from 'react';
import Profile from 'src/components/AppLayout/ProfileView';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  ApolloLink,
} from '@apollo/react-hooks';
import store from 'store';

const ProfilePage: FunctionComponent<{}> = () => {
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
      <Profile />
    </ApolloProvider>
  );
};

export default ProfilePage;
