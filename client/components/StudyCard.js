import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const StudyCard = props => {

  return (
    <View style={styles.deckContainer}>
      <Text>{props.card.displayedText}</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>{props.card[props.card.displayedText]}</Text>
      </View>
    </View>
  );


};

const styles = StyleSheet.create({
  deckContainer: {
    width: '95%',
    height: 340,
    backgroundColor: '#F4E4AD',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D6A760',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    shadowColor: '#99847E',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 1,
    shadowOpacity: 1
  },
  cardText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#191823',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default StudyCard;


