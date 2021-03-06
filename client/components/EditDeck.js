import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './AddCard';
import SingleCard from './SingleCard';
import { gql } from 'apollo-boost';
import client from '../apolloClient';

const EditDeck = props => {

  const GET_DECK_CARDS = gql`
    query {
      deck (id: "${props.navigation.getParam('deckId', 'NO DECK')}") {
        cards {
          front
          back
          id
        }
      }
    }
  `;

  const [addingCard, setAddingCard] = useState(false);
  const [cardDeck, setCardDeck] = useState([]);

  const fetchCards = async () => {
    try {
      let { data } = await client.query({
        query: GET_DECK_CARDS,
        fetchPolicy: 'network-only'
      });

      console.log('total cards in deck:', data.deck.cards.length);
      setCardDeck(data.deck.cards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  });

  const addCard = () => {
    setAddingCard(false);
  };

  const deleteCardHandler = cardId => {
    fetchCards();
  };

  const editHandler = () => {
    fetchCards();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header}>{props.navigation.getParam('deckName', 'NO DECK NAME')}</Text>
        <Button title='Create New Card' onPress={() => setAddingCard(true)} color='#F9F9FF' />
        <AddCard visible={addingCard} deckId={props.navigation.getParam('deckId', 'No DECK ID')} addCard={addCard} cancelAddCard={() => setAddingCard(false)}/>

          <FlatList keyExtractor={(item, index) => item.id} data={cardDeck} renderItem={itemData => (
            <SingleCard card={itemData.item} deleteCard={deleteCardHandler} editHandler={editHandler} />
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


export default EditDeck;
