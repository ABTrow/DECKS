import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { gql } from 'apollo-boost';
import client from '../apolloClient';
import Loading from './Loading';
import StudyCard from './StudyCard';
import Swiper from 'react-native-deck-swiper';

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

  const fetchCards = async () => {
    try {
      let { data } = await client.query({
        query: GET_DECK_CARDS,
        fetchPolicy: 'network-only',
      });

      console.log('total cards in deck:', data.deck.cards.length);
      const sidedCards = data.deck.cards.map(card => {
        return { ...card, displayedText: 'front', active: true };
      });
      setCardDeck(sidedCards);
      setDeckLength(data.deck.cards.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (!deckLength) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Swiper
        cards={cardDeck.filter(card => card.active === true)}
        keyExtractor={card => card.id}
        renderCard={card => {
          return <StudyCard card={card} key={card.id} />;
        }}
        onTapCard={index => {
          const tempCards = [...cardDeck];
          if (tempCards[index].displayedText === 'front') {
            tempCards[index].displayedText = 'back';
          } else {
            tempCards[index].displayedText = 'front';
          }
          setCardDeck(tempCards);
        }}
        onSwipedTop={cardIndex => {
          const tempCards = [...cardDeck];
          tempCards[cardIndex].active = false;
          setCardDeck(tempCards);
        }}
        onSwiped={cardIndex => {
          const tempCards = [...cardDeck];
          tempCards[cardIndex].displayedText = 'front';
          setCardDeck(tempCards);
        }}
        backgroundColor={'#4FD0E9'}
        cardVerticalMargin={240}
        stackSize={3}
        infinite={true}
      >
        <Button
          onPress={() => {
            tempCards = cardDeck.map(card => {
              card.active = true;
              return card;
            });
            setCardDeck(tempCards);
          }}
          title="Reset Deck"
        />

        <Text style={styles.text}>Tap To Flip</Text>
        <Text style={styles.text}>Swipe Up To Dismiss</Text>
        <Text style={styles.text}>
          Swipe Any Other Direction To Review Again
        </Text>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    backgroundColor: '#4FD0E9',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: 25,
    backgroundColor: 'transparent',
    margin: 4,
    color: '#F9F9FF',
    paddingHorizontal: 15,
  },
});

export default StudyDeck;
