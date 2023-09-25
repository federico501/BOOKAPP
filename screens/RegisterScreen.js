import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Aquí puedes implementar la lógica de registro, como enviar los datos del usuario a tu backend o guardarlos localmente.
    // Por simplicidad, aquí solo mostraremos un mensaje de registro exitoso.
    alert('Registro exitoso');

    navigation.replace('Login')
  };

  return (
    <ImageBackground
      source={require('../assets/Screen2.png')} // Cambia la ruta de la imagen de fondo según tu archivo de imagen
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Registro de Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          onChangeText={text => setUsername(text)}
          value={username}
        />
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
          title="Registrar"
          onPress={handleRegister}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'right',
    
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para resaltar el formulario
    padding: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
  },
  input: {
    width: '150%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    
  },
});

export default RegisterScreen;
