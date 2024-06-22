import Form from '../components/Form';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
                        
export default function Teste()  {
  return (
    <View style={styles.container}>
      <Text>Welcome to React Native!</Text>
      <Form />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: { 
   backgroundColor: 'red',
   fontSize: 12,
  
  },
});

