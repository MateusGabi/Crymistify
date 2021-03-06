/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import { API, Log } from './Services';
import LogRocket from 'logrocket';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'gestalt/dist/gestalt.css';

import 'moment/locale/pt-br';
moment.locale('pt-br');

Log.init('fwvXm60JcJ6amhxtBDUs5XibZv3zxZ');
LogRocket.init('33uszd/remind');

const httpLink = createHttpLink({
  uri: 'https://us-central1-todo-app-b2a7b.cloudfunctions.net/graphql',
  // uri: 'https://48p1r2roz4.sse.codesandbox.io/',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = await API.getUserToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
