import React, { FunctionComponent } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks';

import Events from 'src/components/MainLayout/HomePageView/EventCategory';
import HomePageNavbar from 'src/components/SharedLayout/Navbar';

const AllEvents: FunctionComponent<{}> = () => {
  const client = new ApolloClient({
    uri: `${process.env.API_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <HomePageNavbar />
      <div className="mt-20">
        <Events title="Events" seeAll={false} />
      </div>
    </ApolloProvider>
  );
};

export default AllEvents;
