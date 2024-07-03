// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Space Invaders!</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default WelcomeScreen;
