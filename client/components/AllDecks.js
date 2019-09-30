import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { gql } from 'apollo-boost';
import client from '../apolloClient';
import SingleDeck from './SingleDeck';
import AddDeck from './AddDeck';


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
  const [addingDeck, setAddingDeck] = useState(false);

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

  const addDeck = () => {
    setAddingDeck(false);
  };

  return (
    <View style = {styles.container}>
      <Text style={styles.header}>My Decks:</Text>
      <Button title='Create New Deck' onPress={() => setAddingDeck(true)} color='#F9F9FF' />
      <AddDeck visible={addingDeck} addDeck={addDeck} cancelAddDeck={() => setAddingDeck(false)}/>

      <FlatList keyExtractor={(item, index) => item.id} data={decks} renderItem={itemData => (
        <SingleDeck deck={itemData.item} navigation={props.navigation} />
      )} />

    </View>
  );



};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#4FD0E9'
  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    color: '#F9F9FF',
    paddingBottom: 20,
    fontWeight: 'bold',
    textShadowOffset: {width: 2, height: 2},
    textShadowColor: 'grey',
    textShadowRadius: 1
  },
});

export default AllDecks;
