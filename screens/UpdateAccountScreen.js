// UpdateAccountScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const UpdateAccountScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/Screen3.png')} // Ruta de la imagen de fondo
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Actualizar Cuenta</Text>
   
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default UpdateAccountScreen;
