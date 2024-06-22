
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const MyButton = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Press me"
        onPress={() => alert('Button pressed!')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyButton;
