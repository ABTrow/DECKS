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



const Main = (props) => {

  const [addingCard, setAddingCard] = useState(false);
  const [cardDeck, setCardDeck] = useState([]);

  const fetchCards = async () => {
    try {
      let databaseCards = await props.client.query({
        query: GET_CARDS
      });
      console.log('cards in DB:', databaseCards.data.cards.length);
      //setCardDeck(databaseCards.data.cards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  });

  const addCard = async card => {
    console.log('pushing this to db: ', card);
    console.log('current cardDeck: ', cardDeck);
    console.log('should be:', [...cardDeck, card]);
    setCardDeck([...cardDeck, card]);
    setAddingCard(false);
  };

  const deleteCardHandler = cardId => {
    setCardDeck(currentCards => [...currentCards.filter(card => card.id !== cardId)]);
  };

  return (
    <View style={styles.container}>
        <Button title='Create New Card' onPress={() => setAddingCard(true)} />
        <AddCard visible={addingCard} addCard={addCard} cancelAddCard={() => setAddingCard(false)}/>

          <FlatList keyExtractor={(item, index) => String(item.id)} data={cardDeck} renderItem={itemData => (
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


export default Main;
