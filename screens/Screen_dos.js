import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button,ImageBackground} from 'react-native';


export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para verificar las credenciales del usuario,
    // por ejemplo, comparar el correo electrónico y la contraseña con una base de datos o valores predefinidos.
    // Si las credenciales son válidas, puedes redirigir al usuario a la página principal de la aplicación.
    // De lo contrario, puedes mostrar un mensaje de error.
    // Por simplicidad, aquí solo mostraremos un mensaje de alerta.
    if (email === 'usuario@example.com' && password === 'contraseña') {
      alert('Inicio de sesión exitoso');
    } else {
      alert('Credenciales incorrectas');
    }
  };


  return (
    <ImageBackground source={require('../BOOKAPP/assets/Screen2.png')} style={styles.container}>
      <Text>BOOKAPP!</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
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
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '390 px',
    height: '844 px',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    color:'black'
  },
});
