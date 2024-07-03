import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'; 
 
const GameOverScreen = ({ navigation, score }: { navigation: any, score: number }) => { 
  return ( 
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/564x/c0/0c/16/c00c160278e73916660d1da3e2b34f03.jpg' }} // Reemplaza con la URL de tu imagen de galaxia 
      style={styles.background} 
    > 
      <View style={styles.overlay}> 
        <Image 
          style={styles.logo} 
          source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11a10a01-ac23-4fea-ad5a-b51f53084159/d5qe2di-7968e77c-4c28-408e-874e-f5f7c0548ff2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzExYTEwYTAxLWFjMjMtNGZlYS1hZDVhLWI1MWY1MzA4NDE1OVwvZDVxZTJkaS03OTY4ZTc3Yy00YzI4LTQwOGUtODc0ZS1mNWY3YzA1NDhmZjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dX9Fx5j0okP10pXbab0ca7TbmT8ELfizG9CRzzZO-dI' }} 
        /> 
        <Text style={styles.scoreText}>Your Score: {score}</Text> 
        <Image 
          style={styles.gif} 
          source={{ uri: 'https://media.tenor.com/nuyIpGF-YOEAAAAj/game-over-edited-graphic.gif' }} 
        /> 
         
        <TouchableOpacity 
          style={[styles.button, styles.playAgainButton]} 
          onPress={() => navigation.navigate('Game')} 
        > 
          <Text style={styles.buttonText}>Play Again</Text> 
        </TouchableOpacity> 
        <TouchableOpacity 
              style={[styles.button, styles.mainMenuButton]} 
              onPress={() => navigation.navigate('Welcome')} 
            > 
              <Text style={styles.buttonText}>Main Menu</Text> 
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
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente para mejorar la legibilidad 
    width: '100%', 
    padding: 16, 
  }, 
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
     
    color: '#fff', // Texto blanco 
    marginBottom: 20, 
  }, 
  score: { 
    fontSize: 24, 
    color: '#fff', // Texto blanco 
    marginBottom: 40, 
  }, 
  logo: { 
    width: 300, // Ajusta el tamaño según sea necesario 
    height: 100, // Ajusta el tamaño según sea necesario 
    resizeMode: 'contain', // Asegura que la imagen no se deforme 
    marginBottom: 20, 
  }, 
  gif: { 
    width: 200, 
    height: 200, 
    marginBottom: 20, 
  }, 
  button: { 
    width: '80%', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginVertical: 10, 
  }, 
  playAgainButton: { 
    backgroundColor: 'green', 
  }, 
  mainMenuButton: { 
    backgroundColor: 'orange', 
  }, 
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
  }, 
  scoreText: { 
    fontSize: 24, 
    marginBottom: 20, 
    color: 'red', 
    fontFamily: 'Press Start 2P, cursive', 
    textTransform: 'uppercase',  
    textAlign: 'center', 
     
  }, 
   
}); 
 
export default GameOverScreen;