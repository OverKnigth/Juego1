import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../config/config";  // Asegúrate de que la ruta sea correcta

const DatosScreen = ({ navigation } : any) => {
  const [ultimoUsuario, setUltimoUsuario] = useState(null);

  useEffect(() => {
    const nodoUsuarios = ref(db, 'users');
    const listener = onValue(nodoUsuarios, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usuariosArray = Object.values(data);
        setUltimoUsuario(usuariosArray[usuariosArray.length - 1]);
      }
    });

    return () => {
      listener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Último Usuario Registrado</Text>
      {ultimoUsuario ? (
        <View style={styles.usuarioContainer}>
          <Text style={styles.text}>Usuario: {ultimoUsuario.usuario}</Text>
          <Text style={styles.text}>Email: {ultimoUsuario.email}</Text>
          {ultimoUsuario.image && <Image source={{ uri: ultimoUsuario.image }} style={styles.image} />}
        </View>
      ) : (
        <Text style={styles.text}>Cargando...</Text>
      )}
      <Button title="Ir al Juego" onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2e2e2ef7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  usuarioContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#1c1c1cf7',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});

export default DatosScreen;
