// src/screens/RegisterScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register Screen</Text>
      <Button title="Play Game" onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

export default RegisterScreen;
