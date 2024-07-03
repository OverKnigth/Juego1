// src/screens/GameOverScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameOverScreen = ({ navigation, route }: { navigation: any, route: any }) => {
  const { score } = route.params;

  return (
    <View style={styles.gameOverContainer}>
      <Text style={styles.gameOverText}>Game Over!</Text>
      <Text style={styles.finalScoreText}>Final Score: {score}</Text>
      <Button title="Play Again" onPress={() => navigation.navigate('Game')} />
      <Button title="Go to Welcome" onPress={() => navigation.navigate('Welcome')} />
    </View>
  );
};

const styles = StyleSheet.create({
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  finalScoreText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
});

export default GameOverScreen;
