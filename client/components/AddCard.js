import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';


const ADD_CARD = gql`
mutation AddCard($front: String!, $back: String!, $deckId: ID!) {
  addCard (front: $front, back: $back, deckId: $deckId) {
    front
    back
    id
  }
}
`;

const AddCard = props => {

  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  const frontInputHandler = text => {
    setFrontText(text);
  };

  const backInputHandler = text => {
    setBackText(text);
  };

  const addCardHandler = () => {
    props.addCard();
    setFrontText('');
    setBackText('');
  };

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Add New Card</Text>
        <TextInput placeholder='front text' style={styles.inputField} onChangeText={frontInputHandler} value={frontText} multiline={true} numberOfLines={2} />
        <TextInput placeholder='back text' style={styles.inputField} onChangeText={backInputHandler} value={backText} multiline={true} numberOfLines={4}/>
        <Mutation mutation={ADD_CARD} variables={{front: frontText, back: backText, deckId: props.deckId}}>
          {addCard => <Button title='CREATE' color='green' onPress={async () => {
            await addCard();
            addCardHandler();
          }} /> }
        </Mutation>
        <Button title='CANCEL' color='red' onPress={props.cancelAddCard} />
      </View>
    </Modal>
  );


};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F4E4AD'
  },
  inputField: {
    borderBottomColor: 'navy',
    borderBottomWidth: 1,
    margin: 10,
    padding: 4,
    width: '80%',
    textAlign: 'center'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2
  }
});

export default AddCard;
