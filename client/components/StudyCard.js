import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudyCard = props => {
  return (
    <View style={styles.deckContainer} key={props.card.id}>
      <Text style={styles.side}>{props.card.displayedText}</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>
          {props.card[props.card.displayedText]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deckContainer: {
    width: '95%',
    height: 340,
    backgroundColor: '#F5F2D0',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#D6A760',
    // borderWidth: 1,
    padding: 10,
    margin: 5,
    shadowColor: '#99847E',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  cardText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#191823',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  side: {
    color: 'grey',
  },
});

export default StudyCard;
