import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard (id: $id) {
      id
    }
  }
`;

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

      <View style={styles.buttonBox}>
        <Button title='EDIT'/>
        <Mutation mutation={DELETE_CARD} variables={{id: props.card.id}}>
          {deleteCard => <Button title='DELETE' color='red' onPress={async () => {
            await deleteCard();
            props.deleteCard();
          }} /> }
        </Mutation>
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
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default SingleCard;
