// src/screens/GameOverScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const GameOverScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Game Over!</Text>
      {/* Mostrar aquí las puntuaciones o resultados finales */}
      <Button title="Play Again" onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

export default GameOverScreen;
