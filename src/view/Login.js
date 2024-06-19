import Form from '../components/Form';
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
      <Form />

    </View>
  );
}