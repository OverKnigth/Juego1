import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import GameScreen from '../screens/GameScreen';
import GameOverScreen from '../screens/GameOverScreen';
<<<<<<< HEAD
import LoginScreen from '../screens/LoginScreen';
=======
import DatosScreen from '../screens/DatosScreen';
>>>>>>> 605e03bce29f13bdd75be8fcecdaa67b1bd56454

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="GameOver" component={GameOverScreen} />
<<<<<<< HEAD
        <Stack.Screen name="Login" component={LoginScreen} />
=======
        <Stack.Screen name="Datos" component={DatosScreen} />
>>>>>>> 605e03bce29f13bdd75be8fcecdaa67b1bd56454
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;



