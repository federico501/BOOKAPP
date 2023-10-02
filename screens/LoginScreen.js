import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { firebaseConfig } from '../firebase-config';
import {initializeApp} from 'firebase/app'
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, FacebookAuthProvider,signInWithPopup} from 'firebase/auth';





const app= initializeApp(firebaseConfig);
const auth=getAuth(app);

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const navigation=useNavigation();

 

  const handleCreateAccount= () => {
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      alert('cuenta creada')
      const user= userCredential.user;
      console.log(user)
    })
    .catch(error=>{
        alert(error)
    }) 
  }
  
  const handleLogin = () => {
  signInWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
    alert('Inicio exitoso')
    const user= userCredential.user;
    console.log(user)
    navigation.navigate('Category');
    
  })
  .catch(error=>{
    alert(error)
}) 
 };

 const handleFacebookLogin = async () => {
 
  
  try {
    const provider = new FacebookAuthProvider();
    const result =await signInWithPopup(auth, provider);
    const user = result.user;
    alert('Inicio de sesión con Facebook exitoso');
    console.log(user);
    navigation.navigate('Category');
  } catch (error) {
    console.log(error.message);
  }
};


  return (
    <ImageBackground
      source={require('../assets/Screen2.png')} // Cambia la ruta de la imagen de fondo según tu archivo de imagen
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
         <TouchableOpacity  style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount} style={styles.registrationButton}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookLogin} style={styles.facebookButton}>
      <Text style={styles.buttonText}>Iniciar Sesión con Facebook</Text>
    </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'right',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'right',

  },
  registrationButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default LoginScreen;
