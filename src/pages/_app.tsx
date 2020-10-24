import React from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'antd/dist/antd.css';

import '../styles/pages.scss';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  concat,
  ApolloLink,
  HttpLink,
} from '@apollo/react-hooks';
import store from 'store';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
