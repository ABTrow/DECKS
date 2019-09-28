import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const SingleDeck = props => {

  return (
    <View style={styles.cardContainer}>
      <Text>{props.deck.name}</Text>
      <Text>{props.deck.description}</Text>
      <Button title='EDIT THIS DECK' onPress={() => props.navigation.navigate('EditDeck', {deckId: props.deck.id, deckName: props.deck.name})} />
    </View>
  );

};


export default SingleDeck;



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
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
