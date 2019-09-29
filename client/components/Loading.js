import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Loading = props => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F4CB'}}>
      <Text color='blue'>Loading...</Text>
    </View>
  );

};

export default Loading;

