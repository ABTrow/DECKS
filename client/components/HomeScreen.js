import React from 'react';
import { View, Text, Button } from 'react-native';


const HomeScreen = props => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4FD0E9'}}>
      <Text style={{ color: 'white' }}>DECKS</Text>

      <Button
        title="View Your Decks"
        onPress={() => props.navigation.navigate('AllDecks')}
      />


      <Button
          title="View All Cards"
          onPress={() => props.navigation.navigate('AllCards')}
      />
    </View>
  );

};


export default HomeScreen;
