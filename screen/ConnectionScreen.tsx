import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

function ConnectionScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Connection Screen!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ConnectionScreen;
