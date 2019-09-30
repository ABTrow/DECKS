import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const SingleDeck = props => {

  return (
    <View style={styles.deckContainer}>
      <Text style={styles.name}>{props.deck.name}</Text>
      <Text style={styles.description}>{props.deck.description}</Text>
      <Button title='STUDY!' onPress={() => props.navigation.navigate('StudyDeck', {deckId: props.deck.id, deckName: props.deck.name})}/>
      <Button title='EDIT' onPress={() => props.navigation.navigate('EditDeck', {deckId: props.deck.id, deckName: props.deck.name})} />

    </View>
  );

};


export default SingleDeck;



const styles = StyleSheet.create({
  deckContainer: {
    width: '95%',
    height: 180,
    backgroundColor: '#F5F2D0',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#D6A760',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    shadowColor: '#99847E',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191823'
  },
  description: {
    color: 'grey',
  }
});
