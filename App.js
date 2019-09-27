import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './client/components/AddCard';
import SingleCard from './client/components/SingleCard';
import API from './client/API';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  link: '',
  cache: false
});

const GET_CARDS = gql`
  query {
    cards {
      front
      back
      id
    }
  }
`;

export default function App() {

  const [addingCard, setAddingCard] = useState(false);
  const [cardDeck, setCardDeck] = useState([]);
  const [poop, setPoop] = useState('Poop');

  const { loading, error, data } = useQuery(GET_CARDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const addCardHandler = card => {
    setCardDeck(currentCards => [...currentCards, { ...card, id: String(cardDeck.length + 1)}]);
    setAddingCard(false);
  };

  const deleteCardHandler = cardId => {
    setCardDeck(currentCards => [...currentCards.filter(card => card.id !== cardId)]);
  };

  const poopHandler = async () => {
    try {
      let newText = await API.get(`/api`);
      setPoop(poop + newText.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Button title='Create New Card' onPress={() => setAddingCard(true)} />
        <AddCard visible={addingCard} addCard={addCardHandler} cancelAddCard={() => setAddingCard(false)}/>
        <FlatList keyExtractor={(item, index) => String(item.id)} data={data} renderItem={itemData => (
          <SingleCard card={itemData.item} deleteCard={deleteCardHandler}/>
        )} />
        <Button title='POOP BUTTON' onPress={poopHandler}/>
        <Text>{poop}</Text>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    backgroundColor: '#F2F4CB'
  },
});
