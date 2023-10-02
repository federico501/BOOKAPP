import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'; // Importa las funciones de Firestore

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const db = getFirestore();
    const userDocRef = doc(db, 'Usuario', 'ID_DEL_USUARIO'); // Reemplaza 'ID_DEL_USUARIO' con el ID real del usuario

    const fetchUserData = async () => {
      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserName(userData.name); // Suponiendo que el campo de nombre en Firestore se llama 'name'
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearchBooks = () => {
    navigation.navigate('SearchBooks');
  };

  const handleUpdateAccount = () => {
    navigation.navigate('UpdateAccount');
  };

  const handleAddBooks = () => {
    navigation.navigate('AddBooks');
  };

  return (
    <ImageBackground
      source={require('../assets/Sceen1.png')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.userName}>Bienvenido, {userName}</Text>
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
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 1,
    alignItems: 'center',
  },
  userName: {
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
