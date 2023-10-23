import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Modal, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Importa las funciones de Firestore

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [randomBooks, setRandomBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const getRandomBooks = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=random&maxResults=10'
      );
      const books = response.data.items || [];
      setRandomBooks(books);
    } catch (error) {
      console.error('Error al obtener libros aleatorios:', error);
    }
  }, []);

  useEffect(() => {
    // Función para obtener el nombre del usuario desde Firestore
    const fetchUserName = async () => {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'Usuario', 'ID_DEL_USUARIO'); // Reemplaza 'ID_DEL_USUARIO' con el ID real del usuario
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserName(userData.name); // Suponiendo que el campo de nombre en Firestore se llama 'name'
        }
      } catch (error) {
        console.error('Error al cargar el nombre del usuario:', error);
      }
    };

    // Llama a la función para obtener el nombre del usuario cuando se carga la pantalla
    fetchUserName();
    // Llama a la función para obtener libros aleatorios cuando se carga la pantalla
    getRandomBooks();

    // Establece un temporizador para actualizar los libros cada 30 segundos
    const timerId = setInterval(getRandomBooks, 30000);

    // Limpia el temporizador cuando se desmonta el componente
    return () => clearInterval(timerId);
  }, [getRandomBooks]);

  const handleSearchBooks = () => {
    navigation.navigate('SearchBooks');
  };

  const handleUpdateAccount = () => {
    navigation.navigate('UpdateAccount');
  };

  const handleAddBooks = () => {
    navigation.navigate('AddBooks');
  };

  const openBookModal = (book) => {
    setSelectedBook(book);
  };

  const closeBookModal = () => {
    setSelectedBook(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => openBookModal(item)}
    >
      <Image
        source={{ uri: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150' }}
        style={styles.bookCover}
      />
      <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
      <Text style={styles.bookAuthor}>
        {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor Desconocido'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/Sceen1.png')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.userName}>Bienvenido, {userName}</Text>
      </View>

      <FlatList
        data={randomBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Organiza los libros en 2 columnas
        contentContainerStyle={styles.bookList}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedBook !== null}
        onRequestClose={closeBookModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedBook && (
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedBook.volumeInfo.title}</Text>
                <Text style={styles.modalAuthor}>
                  {selectedBook.volumeInfo.authors ? selectedBook.volumeInfo.authors.join(', ') : 'Autor Desconocido'}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedBook.volumeInfo.description || 'Sin descripción disponible.'}
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeBookModal}>
                  <Ionicons name="close" size={32} color="white" />
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

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
  bookList: {
    padding: 16,
  },
  bookItem: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
    margin: 8,
  },
  bookCover: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalAuthor: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
  modalDescription: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  closeButton: {
    alignItems: 'flex-end',
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
