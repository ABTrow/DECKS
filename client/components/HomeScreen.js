import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const HomeScreen = props => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DECKS</Text>

      <Button
        title="View Your Decks"
        onPress={() => props.navigation.navigate('AllDecks')}
        color='#F9F9FF'
      />


      <Button
          title="View All Cards"
          onPress={() => props.navigation.navigate('AllCards')}
          color='#F9F9FF'
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4FD0E9'
  },
  title: {
    color: '#F9F9FF',
    fontSize: 50,
    fontWeight: 'bold',
    padding: 80,
    textShadowOffset: {width: 2, height: 2},
    textShadowColor: 'grey',
    textShadowRadius: 1
  },
});

export default HomeScreen;
