import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const StudyCard = props => {


  return (
    <View style={styles.deckContainer}>
      <Text>{props.card[props.displayedText]}</Text>
      <Button title='FLIP' onPress={props.handleFlip} />
    </View>
  );


};

const styles = StyleSheet.create({
  deckContainer: {
    width: '95%',
    height: 140,
    backgroundColor: '#F4E4AD',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#D6A760',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    shadowColor: '#99847E',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 1,
    shadowOpacity: 1
  },
});

export default StudyCard;


