import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { db } from '../config/config';
import { ref, push } from 'firebase/database';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GameScreen = ({ navigation }) => {
  const [playerPosition, setPlayerPosition] = useState({ x: screenWidth / 2 - 25, y: screenHeight - 100 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bullets, setBullets] = useState([]);
  const [invaders, setInvaders] = useState(generateInvaders());
  const invaderDirection = useRef(1); // 1 for right, -1 for left

  function generateInvaders() {
    let invadersArray = [];
    for (let i = 0; i < 5; i++) { // 5 rows of invaders
      for (let j = 0; j < 7; j++) { // 7 invaders per row
        invadersArray.push({ x: j * 60 + 10, y: i * 60 + 10 });
      }
    }
    return invadersArray;
  }

  // Move invaders horizontally and change direction at the screen edge
  useEffect(() => {
    const interval = setInterval(() => {
      setInvaders(prevInvaders =>
        prevInvaders.map(invader => ({
          ...invader,
          x: invader.x + 5 * invaderDirection.current,
        }))
      );

      if (invaders.some(invader => invader.x <= 0 || invader.x >= screenWidth - 50)) {
        invaderDirection.current *= -1;
        setInvaders(prevInvaders =>
          prevInvaders.map(invader => ({
            ...invader,
            y: invader.y + 50,
          }))
        );
      }
    }, 700);

    return () => clearInterval(interval);
  }, [invaders]);

  // Move bullets
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets(prevBullets =>
        prevBullets.map(bullet => ({ ...bullet, y: bullet.y - 10 })).filter(bullet => bullet.y > 0)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Check for collisions
  useEffect(() => {
    bullets.forEach(bullet => {
      invaders.forEach(invader => {
        if (
          bullet.x < invader.x + 50 &&
          bullet.x + 10 > invader.x &&
          bullet.y < invader.y + 50 &&
          bullet.y + 20 > invader.y
        ) {
          setScore(prevScore => prevScore + 10);
          setInvaders(prevInvaders => prevInvaders.filter(i => i !== invader));
          setBullets(prevBullets => prevBullets.filter(b => b !== bullet));
        }
      });
    });

    if (invaders.some(invader => invader.y >= screenHeight - 100)) {
      setGameOver(true);
      updateScoreInFirebase(score);
    }
  }, [bullets, invaders]);

  const handleMoveLeft = () => {
    if (playerPosition.x > 0) {
      setPlayerPosition(prevPosition => ({ ...prevPosition, x: prevPosition.x - 10 }));
    }
  };

  const handleMoveRight = () => {
    if (playerPosition.x < screenWidth - 50) {
      setPlayerPosition(prevPosition => ({ ...prevPosition, x: prevPosition.x + 10 }));
    }
  };

  const handleFire = () => {
    setBullets(prevBullets => [...prevBullets, { x: playerPosition.x + 20, y: playerPosition.y }]);
  };

  const updateScoreInFirebase = async score => {
    try {
      await push(ref(db, 'scores'), { score });
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/curiosidades.batanga.com/files/5-cosas-sobre-el-espacio-y-la-materia-que-debemos-tener-claras.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        {!gameOver ? (
          <View style={styles.gameContainer}>
            <View style={[styles.player, { left: playerPosition.x, top: playerPosition.y }]} />
            {invaders.map((invader, index) => (
              <View key={index} style={[styles.invader, { left: invader.x, top: invader.y }]} />
            ))}
            {bullets.map((bullet, index) => (
              <View key={index} style={[styles.bullet, { left: bullet.x, top: bullet.y }]} />
            ))}
            <TouchableOpacity style={[styles.button, styles.fireButton]} onPress={handleFire}>
              <Text style={styles.buttonText}>Fire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.moveLeftButton]} onPress={handleMoveLeft}>
              <Text style={styles.buttonText}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.moveRightButton]} onPress={handleMoveRight}>
              <Text style={styles.buttonText}>Right</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Text style={styles.finalScoreText}>Final Score: {score}</Text>
            <TouchableOpacity
              style={styles.playAgainButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.playAgainButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  gameContainer: {
    position: 'relative',
    width: screenWidth,
    height: screenHeight,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 100,
  },
  player: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
  invader: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  bullet: {
    position: 'absolute',
    width: 10,
    height: 20,
    backgroundColor: 'yellow',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  fireButton: {
    position: 'absolute',
    bottom: 100,
    left: screenWidth / 2 - 50,
    backgroundColor: 'green',
  },
  moveLeftButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    backgroundColor: 'lightblue',
  },
  moveRightButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'lightblue',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 48,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  finalScoreText: {
    fontSize: 24,
    marginBottom: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  playAgainButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  playAgainButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GameScreen;
