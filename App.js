import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './client/components/AddCard';
import SingleCard from './client/components/SingleCard';
import API from './client/API';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Main from './Main';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});


export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


export default function App() {

  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
