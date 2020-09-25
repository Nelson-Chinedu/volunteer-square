import React, { FunctionComponent } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/react-hooks';

import HomePageView from 'src/components/MainLayout/HomePageView';

const Index: FunctionComponent<{}> = () => {
  const client = new ApolloClient({
    uri: `${process.env.API_URL}/graphql`,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <HomePageView />
    </ApolloProvider>
  );
};

export default Index;
