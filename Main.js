import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './client/components/AddCard';
import SingleCard from './client/components/SingleCard';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


const GET_CARDS = gql`
  query {
    cards {
      front
      back
      id
    }
  }
`;

const cards = [
  {
    front: 'First Card',
    back: 'Card the First',
    id: 1
  },
  {
    front: 'Second Card',
    back: 'Card the Second',
    id: 2
  }
];

const Main = (props) => {

  const [addingCard, setAddingCard] = useState(false);
  const [cardDeck, setCardDeck] = useState(cards);
  const [poop, setPoop] = useState('Poop');

  const addCardHandler = card => {
    setCardDeck(currentCards => [...currentCards, { ...card, id: String(cardDeck.length + 1)}]);
    setAddingCard(false);
  };

  const deleteCardHandler = cardId => {
    setCardDeck(currentCards => [...currentCards.filter(card => card.id !== cardId)]);
  };

  return (
    <View style={styles.container}>
        <Button title='Create New Card' onPress={() => setAddingCard(true)} />
        <AddCard visible={addingCard} addCard={addCardHandler} cancelAddCard={() => setAddingCard(false)}/>

        <Query query={GET_CARDS}>
          {({loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :(</Text>;
            console.log(data);
            const cards = data.cards;
            return (
              <View>
                {cards.map(card => <Text>{card.front}</Text>)}
              </View>
            );
          }}
        </Query>




        {/* <FlatList keyExtractor={(item, index) => String(item.id)} data={cardDeck} renderItem={itemData => (
          <SingleCard card={itemData.item} deleteCard={deleteCardHandler}/>
        )} /> */}
        <Button title='POOP BUTTON' onPress={() => console.log('i do nothing')}/>
        <Text>{poop}</Text>
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
