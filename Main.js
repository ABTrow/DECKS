import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AddCard from './client/components/AddCard';
import SingleCard from './client/components/SingleCard';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { client } from './App';


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
      let databaseCards = await client.query({
        query: GET_CARDS
      });
      setCardDeck(databaseCards.data.cards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => fetchCards);

  const addCard = async card => {
    // setCardDeck([...cardDeck, card]);
    console.log(cardDeck);
    setAddingCard(false);
  };

  const deleteCardHandler = cardId => {
    setCardDeck(currentCards => [...currentCards.filter(card => card.id !== cardId)]);
  };

  return (
    <View style={styles.container}>
        <Button title='Create New Card' onPress={() => setAddingCard(true)} />
        <AddCard visible={addingCard} addCard={addCard} cancelAddCard={() => setAddingCard(false)}/>

        <Query query={GET_CARDS}>
          {({loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :(</Text>;
            const cards = data.cards;
            return (

              <FlatList keyExtractor={(item, index) => String(item.id)} data={cardDeck} renderItem={itemData => (
                <SingleCard card={itemData.item} deleteCard={deleteCardHandler}/>
              )} />

            );
          }}
        </Query>

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
