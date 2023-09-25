// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const handleSearchBooks = () => {
    // Navegar a la pantalla de búsqueda de libros
    navigation.navigate('SearchBooks');
  };

  const handleUpdateAccount = () => {
    // Navegar a la pantalla de actualización de datos de la cuenta
    navigation.navigate('UpdateAccount');
  };

  const handleAddBooks = () => {
    // Navegar a la pantalla de añadir libros
    navigation.navigate('AddBooks');
  };

  return (
    <ImageBackground
      source={require('../assets/Sceen1.png')} // Ruta de la imagen de fondo
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a Tu Biblioteca</Text>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleSearchBooks}>
          <Ionicons name="search" size={32} color="white" />
          <Text style={styles.iconText}>Buscar Libros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleUpdateAccount}>
          <Ionicons name="person" size={32} color="white" />
          <Text style={styles.iconText}>Actualizar Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleAddBooks}>
          <Ionicons name="add-circle" size={32} color="white" />
          <Text style={styles.iconText}>Añadir Libros</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'top',
    alignItems: 'top',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
});

export default HomeScreen;
