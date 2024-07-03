import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { db } from '../config/config';
import { ref, push } from 'firebase/database';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GameScreen = ({ navigation }: { navigation: any }) => {
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
          x: invader.x + 5 * invaderDirection.current, // Adjust speed by changing the value from 10 to 5
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
    }, 700); // Adjust interval from 500ms to 700ms to slow down invaders

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
          <TouchableOpacity style={styles.playAgainButton} onPress={() => navigation.navigate('Game')}>
            <Text>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  gameContainer: {
    position: 'relative',
    width: screenWidth,
    height: screenHeight,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
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
    position: 'absolute',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  fireButton: {
    bottom: 150,
    left: screenWidth / 2 - 50,
    backgroundColor: 'green',
  },
  moveLeftButton: {
    bottom: 150,
    left: 20,
    backgroundColor: 'lightblue',
  },
  moveRightButton: {
    bottom: 150,
    right: 20,
    backgroundColor: 'lightblue',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 32,
    marginBottom: 20,
  },
  finalScoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
});

export default GameScreen;
