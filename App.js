import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './client/components/AddCard';
import SingleCard from './client/components/SingleCard';
import API from './client/API';

export default function App() {

  const [addingCard, setAddingCard] = useState(false);
  const [cardDeck, setCardDeck] = useState([]);
  const [poop, setPoop] =useState('Poop');

  const addCardHandler = card => {
    setCardDeck(currentCards => [...currentCards, { ...card, id: String(cardDeck.length + 1)}]);
    setAddingCard(false);
  };

  const deleteCardHandler = cardId => {
    setCardDeck(currentCards => [...currentCards.filter(card => card.id !== cardId)]);
  };

  const poopHandler = async () => {
    try {
      let newText = await API.get(`/`);
      setPoop(poop + newText.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Create New Card' onPress={() => setAddingCard(true)} />
      <AddCard visible={addingCard} addCard={addCardHandler} cancelAddCard={() => setAddingCard(false)}/>
      <FlatList keyExtractor={(item, index) => item.id} data={cardDeck} renderItem={itemData => (
        <SingleCard card={itemData.item} deleteCard={deleteCardHandler}/>
      )} />
      <Button title='POOP BUTTON' onPress={poopHandler}/>
      <Text>{poop}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    backgroundColor: '#F2F4CB'
  },
});
