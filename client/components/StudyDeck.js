import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { gql } from 'apollo-boost';
import client from '../apolloClient';
import Loading from './Loading';
import StudyCard from './StudyCard';

const StudyDeck = props => {

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

  const [cardDeck, setCardDeck] = useState([]);
  const [deckLength, setDeckLength] = useState(0);
  const [activeCard, setActiveCard] = useState({});
  const [displayedText, setDisplayedText] = useState('front');

  const fetchCards = async () => {
    try {
      let { data } = await client.query({
        query: GET_DECK_CARDS,
        fetchPolicy: 'network-only'
      });

      console.log('total cards in deck:', data.deck.cards.length);
      setCardDeck(data.deck.cards);
      setDeckLength(data.deck.cards.length);
      setActiveCard(data.deck.cards[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (!deckLength) {
    return <Loading/>;
  }

  const handleDiscard = () => {
    if (cardDeck.length > 1) {
      setActiveCard(cardDeck[1]);
      setCardDeck([...cardDeck.slice(1)]);
      setDisplayedText('front');
    } else {
      setActiveCard({});
      setCardDeck([]);
    }
  };

  const nextCard = () => {
    if (cardDeck.length > 1) {
      setActiveCard(cardDeck[1]);
      setCardDeck([...cardDeck.slice(1), cardDeck[0]]);
      setDisplayedText('front');
    }
  };

  const handleFlip = () => {
    if (displayedText === 'front') {
      setDisplayedText('back');
    } else {
      setDisplayedText('front');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>You have {cardDeck.length} out of {deckLength} Card{deckLength === 1 ? '' : 's'} Left to Study</Text>
      {cardDeck.length ? (
      <View>
        <StudyCard card={activeCard} handleFlip={handleFlip} displayedText={displayedText}/>
        <Button title='I GOT IT!' onPress={handleDiscard}/>
        <Button title='LET ME SEE THAT ONE AGAIN' onPress={nextCard}/>
      </View>
      ) : <Text style={styles.header}>All done!</Text>}
    </View>
  );



};

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    backgroundColor: '#F2F4CB'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    textAlign: 'center'
  }
});

export default StudyDeck;
