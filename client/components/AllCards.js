import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './client/components/AddCard';
import SingleCard from './client/components/SingleCard';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const GET_CARDS = gql`
  query {
    cards {
      front
      back
      id
    }
  }
`;

const AllCards = graphql(GET_CARDS)(props => {
  const { error, cards } = props.data;
  if (error) {
    return <Text>{error}</Text>;
  }
  if (cards) {
    return (
      <FlatList keyExtractor={(item, index) => String(item.id)} data={cardDeck} renderItem={itemData => (
        <SingleCard card={itemData.item} deleteCard={deleteCardHandler}/>
      )} />
    );
  }

  return <Text>Loading...</Text>;

});


export default AllCards;
