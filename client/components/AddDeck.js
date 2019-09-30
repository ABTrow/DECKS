import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';


const ADD_DECK = gql`
mutation AddDeck($name: String!, $description: String!) {
  addDeck (name: $name, description: $description) {
    name
    description
    id
  }
}
`;

const AddDeck = props => {

  const [nameText, setNameText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  const nameInputHandler = text => {
    setNameText(text);
  };

  const descriptionInputHandler = text => {
    setDescriptionText(text);
  };

  const addDeckHandler = () => {
    props.addDeck();
    setNameText('');
    setDescriptionText('');
  };

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Add New Deck</Text>
        <TextInput placeholder='Deck Name' style={styles.inputField} onChangeText={nameInputHandler} value={nameText} />
        <TextInput placeholder='Description' style={styles.inputField} onChangeText={descriptionInputHandler} value={descriptionText} />
        <Mutation mutation={ADD_DECK} variables={{name: nameText, description: descriptionText}}>
          {addDeck => <Button title='CREATE' color='green' onPress={async () => {
            await addDeck();
            addDeckHandler();
          }} /> }
        </Mutation>
        <Button title='CANCEL' color='red' onPress={props.cancelAddDeck} />
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

export default AddDeck;
