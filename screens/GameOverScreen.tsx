import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

export const GameOverScreen = ({ navigation, route } : any) => {
  const { score } = route.params;
  // const [sound, setSound] = useState<Audio.Sound | null>(null);

  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require('../assets/sound.mp3/GameOver.mp3')
  //   );
  //   setSound(sound);
  //   await sound.playAsync();  
  // }

  // useEffect(() => {
  //   playSound();
  //   return () => {
  //     if (sound) {
  //       sound.unloadAsync();
  //     }
  //   };
  // }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/c0/0c/16/c00c160278e73916660d1da3e2b34f03.jpg' }} // Reemplaza con la URL de tu imagen de galaxia
      style={styles.background}
    >
      <View style={styles.overlay}>
      <Image source={require('../assets/logogals.png')} style={styles.logo} />
        <Text style={styles.scoreText}>Tu puntuación: {score}</Text>
        <Image source={require('../assets/gameov.gif')} style={styles.gif} />

        <TouchableOpacity
          style={[styles.button, styles.playAgainButton]}
          onPress={() => navigation.navigate('Select')}
        >
          <Text style={styles.buttonText}>Jugar de Nuevo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.mainMenuButton]}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.buttonText}>Menú Principal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.datosButton]}
          onPress={() => navigation.navigate('Datos')}
        >
          <Text style={styles.buttonText}>Revisar Datos</Text>
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
    width: '100%',
    padding: 16,
  },
  logo: {
    width: 300, 
    height: 200, 
    marginBottom: 20,
  },
  gif: {
    width: 300,
    height: 200,

  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  playAgainButton: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  mainMenuButton: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  datosButton: {
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Press Start 2P, cursive',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default GameOverScreen;
