import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput } from 'react-native';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard (id: $id) {
      id
    }
  }
`;

const EDIT_CARD = gql`
  mutation EditCard($id: ID!, $front: String!, $back: String!) {
    editCard (id: $id, front: $front, back: $back) {
      id
      front
      back
    }
  }
`;

const SingleCard = props => {

  const [displayedText, setDisplayedText] = useState('front');
  const [frontText, setFrontText] = useState(props.card.front);
  const [backText, setBackText] = useState(props.card.back);
  const [isEditing, setIsEditing] = useState(false);

  const handleFlip = () => {
    if (displayedText === 'front') {
      setDisplayedText('back');
    } else {
      setDisplayedText('front');
    }
  };

  const frontInputHandler = text => {
    setFrontText(text);
  };

  const backInputHandler = text => {
    setBackText(text);
  };

  return (
    <View style={styles.cardContainer}>

      <View style={styles.buttonBox}>
        <Button title='EDIT' onPress={() => setIsEditing(true)} />
        <Mutation mutation={DELETE_CARD} variables={{id: props.card.id}}>
          {deleteCard => <Button title='DELETE' color='red' onPress={async () => {
            await deleteCard();
            props.deleteCard();
          }} /> }
        </Mutation>
        <Modal visible={isEditing} animationType='slide'>
          <View style={styles.inputContainer}>
            <Text style={styles.header}>Edit Card</Text>
            <TextInput placeholder='front text' style={styles.inputField} onChangeText={frontInputHandler} value={frontText} />
            <TextInput placeholder='back text' style={styles.inputField} onChangeText={backInputHandler} value={backText} />
            <Mutation mutation={EDIT_CARD} variables={{front: frontText, back: backText, id: props.card.id}}>
              {editCard => <Button title='EDIT' color='green' onPress={async () => {
                await editCard();
                setIsEditing(false);
                props.editHandler();
              }} /> }
            </Mutation>
            <Button title='CANCEL' color='red' onPress={() => setIsEditing(false)} />
          </View>
        </Modal>

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
    color: '#191823'
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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

export default SingleCard;
