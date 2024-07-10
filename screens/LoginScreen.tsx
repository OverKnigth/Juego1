import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../config/config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }: { navigation: any }) {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                console.log(user);
                navigation.navigate('Game');
                //Alert.alert("ACCESO")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                let titulo = ""
                let mensaje = ""

                if (errorCode == "auth/wrong-password") {
                    titulo = "Error de contraseña"
                    mensaje = "Contraseña incorrecta, revisar credenciales"
                } else if (errorCode == "auth/user-not-found") {
                    titulo = "Error de usuario"
                    mensaje = "Usuario no encontrado, revisar el correo electronico"
                } else {
                    titulo = "Advertencia"
                    mensaje = "Revisar credenciales de correo y contraseña"
                }


                Alert.alert(titulo, mensaje)
            });

    }




    return (
        <ImageBackground source={{ uri: "https://e1.pxfuel.com/desktop-wallpaper/22/1001/desktop-wallpaper-galaxy-vertical-portrait.jpg" }} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.containerdos}>
                    <Text style={styles.text}>¡INICIAR SESION!</Text>
                    <Text style={styles.textDos}>Correo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu correo"
                        placeholderTextColor='#434242f7'
                        onChangeText={(texto) => (setEmail(texto))} />
                    <Text style={styles.textDos}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu contraseña"
                        placeholderTextColor='#434242f7'
                        onChangeText={(texto) => (setPassword(texto))}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => login()} >
                        <Text style={styles.btntext}>INICIAR SESION</Text>
                    </TouchableOpacity>
                    <Text style={styles.textTres}>¿NO TIENES CUENTA? <TouchableOpacity style={styles.btn} onPress={() => login()} >
                        <Text style={styles.btntext} onPress={() => navigation.navigate('Register')}>REGISTRATE</Text>
                    </TouchableOpacity></Text>

                </View>
            </View>
        </ImageBackground>

    )
}

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
})