import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de inicio de sesión, como validar las credenciales con tu backend o sistema de autenticación.
    // Por simplicidad, aquí solo mostraremos un mensaje de inicio de sesión exitoso.
    alert('Inicio de sesión exitoso');

    navigation.navigate('Category');
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
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para resaltar el formulario
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
  },
});

export default LoginScreen;
