import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

  const handleIniciarPress = () => {
    // Navega a la siguiente pantalla cuando se presiona el botón "Iniciar"
    navigation.navigate('Principal'); // Reemplaza 'Principal' con el nombre de tu pantalla principal
  };

  return (
    <ImageBackground source={require('./assets/Sceen1.png')} style={styles.container}>
      <Image
        source={require('../BOOKAPP/assets/book_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Bienvenido a Tu App de Libros</Text>
      <Button
        title="Iniciar"
        onPress={handleIniciarPress}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
