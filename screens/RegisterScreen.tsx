import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { ref, set, onValue } from "firebase/database";
import { db } from "../config/config";

const RegisterScreen = ({ navigation } : { navigation: any }) => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [guardadoCorrectamente, setGuardadoCorrectamente] = useState(false);

  const guardarUsuario = () => {
    if (usuario && email) {
      set(ref(db, 'users/' + usuario), {
        usuario: usuario,
        email: email
      })
      .then(() => {
        Alert.alert("Mensaje", "¡Usuario registrado correctamente!");
        setUsuario('');
        setEmail('');
        setGuardadoCorrectamente(true);
        navigation.navigate('Game'); 
      })
      .catch(error => {
        Alert.alert("Error", "Hubo un problema al registrar el usuario: " + error.message);
      });
    } else {
      Alert.alert("Advertencia", "Por favor ingresa un usuario y un email válidos.");
    }
  };


  useEffect(() => {
    const nodoUsuario = ref(db, 'users/' + usuario);
    const listener = onValue(nodoUsuario, (snapshot) => {
      const usuarioGuardado = snapshot.val();
      if (usuarioGuardado) {
        console.log("Usuario guardado correctamente:", usuarioGuardado);
      }
    });

    return () => {
    
      listener();
    };
  }, [usuario]);

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
            value={usuario}
            onChangeText={text => setUsuario(text)}
          />
          <Text style={styles.textDos}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu email"
            placeholderTextColor='#434242f7'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        <TouchableOpacity style={styles.btn} onPress={() => { guardarUsuario(); navigation.navigate('Game'); }}>
            <Text style={styles.btntext}>REGISTRARSE Y JUGAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
