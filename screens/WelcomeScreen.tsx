import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import * as Font from 'expo-font';

const WelcomeScreen = ({ navigation }: any) => {
  // const [sound, setSound] = useState<Audio.Sound | null>(null);

  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('../assets/sound.mp3/Master.mp3')
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
      source={{ uri: 'https://i.pinimg.com/564x/c0/0c/16/c00c160278e73916660d1da3e2b34f03.jpg' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image 
          source={require('../assets/logogal.png')}
          style={styles.logo} 
        />
        <Text style={styles.title}>¡BIENVENIDO!</Text>
        <Text style={styles.footer}>"Embárcate junto a Luti en una aventura galáctica única y derrota a los invasores espaciales que quieren apropiarse del ITSQMET."</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            //sound?.unloadAsync();
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.buttonText}>JUGAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    width: 400,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    padding: 10,
    marginBottom: 5,
  },
});

export default WelcomeScreen;
