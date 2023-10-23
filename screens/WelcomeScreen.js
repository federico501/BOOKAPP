import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleIniciarPress = () => {
    // Navega a la siguiente pantalla cuando se presiona el botón "Iniciar"
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/Sceen1.png')} // Cambia la ruta de la imagen de fondo según tu archivo de imagen
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.text}>¡Bienvenido a Bookapp!</Text>
        <Button
          title="Iniciar"
          onPress={handleIniciarPress}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'top',
  },
  content: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
