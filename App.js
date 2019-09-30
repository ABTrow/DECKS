import React from 'react';
import AllCards from './client/components/AllCards';
import HomeScreen from './HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client/apolloClient';
import AllDecks from './client/components/AllDecks';
import EditDeck from './client/components/EditDeck';
import SingleDeck from './client/components/SingleDeck';
import StudyDeck from './client/components/StudyDeck';




const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    AllCards: AllCards,
    AllDecks: AllDecks,
    EditDeck: EditDeck,
    SingleDeck: SingleDeck,
    StudyDeck: StudyDeck
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default function App() {

  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}

