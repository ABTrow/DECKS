// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
// import { gql } from 'apollo-boost';
// import { Mutation } from 'react-apollo';

// const EDIT_CARD = gql`
// mutation EditCard($id: ID!, $front: String!, $back: String!) {
//   editCard (id: $id, front: $front, back: $back) {
//     front
//     back
//     id
//   }
// }
// `;

// const EditCard = props => {

//   const [frontText, setFrontText] = useState('');
//   const [backText, setBackText] = useState('');

//   const frontInputHandler = text => {
//     setFrontText(text);
//   };

//   const backInputHandler = text => {
//     setBackText(text);
//   };

//   const addCardHandler = card => {
//     props.addCard(card);
//     setFrontText('');
//     setBackText('');
//   };

//   return (
//     <Modal visible={props.visible} animationType='slide'>
//       <View style={styles.inputContainer}>
//         <Text style={styles.header}>Add New Card</Text>
//         <TextInput placeholder='front text' style={styles.inputField} onChangeText={frontInputHandler} value={frontText} />
//         <TextInput placeholder='back text' style={styles.inputField} onChangeText={backInputHandler} value={backText} />
//         <Mutation mutation={ADD_CARD} variables={{front: frontText, back: backText}}>
//           {addCard => <Button title='CREATE' color='green' onPress={async () => {
//             let newCard = await addCard();
//             addCardHandler(newCard.data.addCard);
//           }} /> }
//         </Mutation>
//         <Button title='CANCEL' color='red' onPress={props.cancelAddCard} />
//       </View>
//     </Modal>
//   );


// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//     backgroundColor: '#F4E4AD'
//   },
//   inputField: {
//     borderBottomColor: 'navy',
//     borderBottomWidth: 1,
//     margin: 10,
//     padding: 4,
//     width: '80%',
//     textAlign: 'center'
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textShadowOffset: {width: 2, height: 2},
//     textShadowRadius: 2
//   }
// });

// export default EditCard;
