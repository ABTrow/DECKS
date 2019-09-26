import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SingleCard = props => {

  const [displayedText, setDisplayedText] = useState('front');

  const handleFlip = () => {
    if (displayedText === 'front') {
      setDisplayedText('back');
    } else {
      setDisplayedText('front');
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.deleteButton}>
        <Button title='DELETE' color='red' onPress={() => props.deleteCard(props.card.id)} />
      </View>
      <Text>{props.card[displayedText]}</Text>
      <Button title='FLIP' onPress={handleFlip} />
    </View>
  );

};

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    height: 140,
    backgroundColor: '#F4E4AD',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#D6A760',
    borderWidth: 1,
    padding: 10,
    margin: 5
  },
  deleteButton: {
    alignSelf: 'flex-end'
  }
});

export default SingleCard;
