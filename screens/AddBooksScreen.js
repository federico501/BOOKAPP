import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc, getFirestore } from 'firebase/firestore';


const AddBooksScreen = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const db = getFirestore();

  const handleSaveBook = async (bookData) => {
    try {
      const booksRef = collection(db, 'books'); // Cambia 'books' al nombre de tu colección
      await addDoc(booksRef, bookData);
      alert('Libro guardado con éxito.');
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      alert('Hubo un error al guardar el libro. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSave = () => {
    if (title && author) {
      const bookData = {
        title,
        author,
      };
      handleSaveBook(bookData);
      setTitle('');
      setAuthor('');
    } else {
      alert('Por favor, ingresa el título y el autor del libro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir Libros</Text>
      <Text style={styles.label}>Título del libro:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.label}>Autor del libro:</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={text => setAuthor(text)}
      />
      <Button title="Guardar Libro" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: '80%',
  },
});

export default AddBooksScreen;
