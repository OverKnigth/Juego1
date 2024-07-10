import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Image } from "react-native";
import { ref, set, onValue } from "firebase/database";
import * as ImagePicker from 'expo-image-picker';
import { db } from "../config/config";

const RegisterScreen = ({ navigation } : any) => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [guardadoCorrectamente, setGuardadoCorrectamente] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const guardarUsuario = () => {
    if (usuario && email) {
      set(ref(db, 'users/' + usuario), {
        usuario: usuario,
        email: email,
        image: image
      })
      .then(() => {
        Alert.alert("Mensaje", "¡Usuario registrado correctamente!");
        setUsuario('');
        setEmail('');
        setImage(null);
        setGuardadoCorrectamente(true);
        navigation.navigate('Datos');
      })
      .catch(error => {
        Alert.alert("Error", "Hubo un problema al registrar el usuario: " + error.message);
      });
    } else {
      Alert.alert("Advertencia", "Por favor ingresa un usuario, un email válidos y una imagen.");
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
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Text style={styles.imageButtonText}>Tomar Foto</Text>
            </TouchableOpacity>
          </View>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.btn} onPress={guardarUsuario}>
            <Text style={styles.btntext}>REGISTRARSE</Text>
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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  imageButton: {
    backgroundColor: '#0f0f0ff7',
    padding: 10,
    borderRadius: 10,
  },
  imageButtonText: {
    color: '#817e7ef7',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
});

export default RegisterScreen;