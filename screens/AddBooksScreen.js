import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { collection, addDoc, getFirestore, query, getDocs } from 'firebase/firestore';

const AddBooksScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');
  const [books, setBooks] = useState([]); // Estado para almacenar los libros
  const [isBookListVisible, setIsBookListVisible] = useState(false);

  const db = getFirestore();

  // Función para cargar los libros desde Firestore
  const loadBooks = async () => {
    try {
      const booksRef = collection(db, 'books'); // Cambia 'books' al nombre de tu colección
      const booksQuery = query(booksRef);
      const querySnapshot = await getDocs(booksQuery);
      const bookList = [];

      querySnapshot.forEach((doc) => {
        const bookData = doc.data();
        bookList.push({
          id: doc.id,
          title: bookData.title,
          link: bookData.link,
        });
      });

      setBooks(bookList);
    } catch (error) {
      console.error('Error al cargar los libros:', error);
    }
  };

  // Cargar los libros al montar el componente
  useEffect(() => {
    loadBooks();
  }, []);

  const handleSaveBook = async (bookData) => {
    try {
      const booksRef = collection(db, 'books'); // Cambia 'books' al nombre de tu colección
      await addDoc(booksRef, bookData);
      alert('Libro guardado con éxito.');
      // Vuelve a cargar los libros después de agregar uno nuevo
      loadBooks();
      setTitle('');
      setAuthor('');
      setLink('');
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      alert('Hubo un error al guardar el libro. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSave = () => {
    if (title && author && link) {
      const bookData = {
        title,
        author,
        link,
      };
      handleSaveBook(bookData);
    } else {
      alert('Por favor, ingresa el título, autor y enlace del libro.');
    }
  };

  const toggleBookList = () => {
    setIsBookListVisible(!isBookListVisible);
  };

  return (
    <ImageBackground
      source={require('../assets/Screen2.png')} // Ruta de la imagen de fondo
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Añadir Libros</Text>
        <Text style={styles.title}>Título del libro:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.title}>Autor del libro:</Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />
        <Text style={styles.title}>Enlace del libro:</Text>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={(text) => setLink(text)}
        />
        <Button title="Guardar Libro" onPress={handleSave} />
        <Button
          title={isBookListVisible ? 'Ocultar Libros' : 'Ver Libros Guardados'}
          onPress={toggleBookList}
        />
        {isBookListVisible && (
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {/* Acción al hacer clic en un libro */}}>
                <Text>Título: {item.title}</Text>
                <Text>Enlace: {item.link}</Text>
              </TouchableOpacity>
            )}
          />
        )}
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: '80%',
    color: 'white',
  },
});

export default AddBooksScreen;
