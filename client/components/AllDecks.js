import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { gql } from 'apollo-boost';
import client from '../apolloClient';
import SingleDeck from './SingleDeck';


const GET_DECKS = gql`
  query {
    decks {
      name
      description
      id
    }
  }
`;

const AllDecks = props => {

  const [decks, setDecks] = useState([]);

  const fetchDecks = async () => {
    try {
      let { data } = await client.query({
        query: GET_DECKS,
        fetchPolicy: 'network-only'
      });
      console.log('decks in DB:', data.decks.length);
      setDecks(data.decks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDecks();
  });

  return (
    <View style = {styles.container}>
      {decks.map(deck => <SingleDeck deck={deck} key={deck.id} navigation={props.navigation} />)}
    </View>
  );



};

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    backgroundColor: '#F2F4CB'
  },
});

export default AllDecks;
