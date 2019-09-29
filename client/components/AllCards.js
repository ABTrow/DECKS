import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './AddCard';
import SingleCard from './SingleCard';
import { gql } from 'apollo-boost';
import client from '../apolloClient';


const GET_CARDS = gql`
  query {
    cards {
      front
      back
      id
    }
  }
`;


const AllCards = (props) => {

  const [addingCard, setAddingCard] = useState(false);
  const [cardDeck, setCardDeck] = useState([]);

  const fetchCards = async () => {
    try {
      let databaseCards = await client.query({
        query: GET_CARDS,
        fetchPolicy: 'network-only'
      });
      console.log('cards in DB:', databaseCards.data.cards.length);
      setCardDeck(databaseCards.data.cards);
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

  return (
    <View style={styles.container}>

      <Text>ALL CARDS:</Text>

      <FlatList keyExtractor={(item, index) => item.id} data={cardDeck} renderItem={itemData => (
        <SingleCard card={itemData.item} deleteCard={deleteCardHandler}/>
      )} />

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


export default AllCards;
