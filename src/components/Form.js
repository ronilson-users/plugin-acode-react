import Input from './Input';
import Buttom from './Buttom';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  const styles = StyleSheet.create({
    container: {
      // Add styles here
    },
  });

  return (
    <View style={styles.container}>
      {/* Add View content here */}
      <Buttom />
      <Input />


    </View>
  );
}