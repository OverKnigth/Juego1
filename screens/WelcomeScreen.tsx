// screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/curiosidades.batanga.com/files/5-cosas-sobre-el-espacio-y-la-materia-que-debemos-tener-claras.jpg' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image 
          source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11a10a01-ac23-4fea-ad5a-b51f53084159/d5qe2di-7968e77c-4c28-408e-874e-f5f7c0548ff2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzExYTEwYTAxLWFjMjMtNGZlYS1hZDVhLWI1MWY1MzA4NDE1OVwvZDVxZTJkaS03OTY4ZTc3Yy00YzI4LTQwOGUtODc0ZS1mNWY3YzA1NDhmZjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dX9Fx5j0okP10pXbab0ca7TbmT8ELfizG9CRzzZO-dI' }} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Welcome to Galaxian!</Text>
        <Text style={styles.footer}>"Embárcate en una aventura galáctica y derrota a los invasores espaciales."</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>START GAME</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajusta el tamaño de la imagen para cubrir toda la pantalla
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro semitransparente para que el contenido se vea bien
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para destacar en el fondo negro
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'transparent', // Hacer el botón transparente
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#fff', // Borde blanco para que el botón se vea bien
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // Texto blanco para el botón
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff', // Texto blanco para el footer
    marginTop: 20,
    padding: 10,
  },
});

export default WelcomeScreen;
