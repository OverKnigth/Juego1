import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../config/config"; // Asegúrate de que 'auth' está siendo exportado correctamente desde tu config
import WelcomeScreen from "./WelcomeScreen";

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const guardarUsuario = () => {
    if (usuario && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Usuario registrado correctamente
          const user = userCredential.user;
          Alert.alert("Mensaje", "¡Usuario registrado correctamente!");
          setUsuario('');
          setEmail('');
          setPassword('');
          navigation.navigate('Game');
          console.log(user)
        })
        .catch(error => {
          Alert.alert("Error", "Hubo un problema al registrar el usuario: " + error.message);
        });
    } else {
      Alert.alert("Advertencia", "Por favor ingresa un usuario, email y contraseña válidos.");
    }
  };

  return (
    <ImageBackground source={{ uri: "https://e1.pxfuel.com/desktop-wallpaper/22/1001/desktop-wallpaper-galaxy-vertical-portrait.jpg" }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerdos}>
          <Text style={styles.text}>¡REGÍSTRATE Y DIVIÉRTETE!</Text>
          <Text style={styles.textDos}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            placeholderTextColor='#434242f7'
            onChangeText={text => setUsuario(text)}
          />
          <Text style={styles.textDos}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu email"
            placeholderTextColor='#434242f7'
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.textDos}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor='#434242f7'
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.btn} onPress={guardarUsuario}>
            <Text style={styles.btntext}>REGISTRARSE Y JUGAR</Text>
          </TouchableOpacity>
          <Text style={styles.textTres}>¿NO TIENES CUENTA? <TouchableOpacity style={styles.btn} >
            <Text style={styles.btntext} onPress={() => navigation.navigate('Login')}>INICIAR SESION</Text>
          </TouchableOpacity></Text>

        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textTres: {
    padding: 20,
    color: '#7a7a7a',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerdos: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e2e2ef7',
    borderRadius: 30,
    padding: 20,
  },
  text: {
    fontSize: 22,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 35,
    color: "white",
    fontWeight: "bold",
  },
  textDos: {
    textAlign: "left",
    color: "white",
    fontSize: 19,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#0f0f0ff7',
    height: 40,
    width: '80%',
    borderRadius: 40,
    marginVertical: 20,
    borderWidth: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  btntext: {
    color: '#817e7ef7',
    fontSize: 15,
  },
  input: {
    height: 50,
    width: "80%",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 21,
    fontSize: 20,
    backgroundColor: '#1c1c1cf7',
    paddingHorizontal: 20,
    color: '#747272f7',
    textAlign: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default RegisterScreen;
