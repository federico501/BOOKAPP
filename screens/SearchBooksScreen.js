import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, Image, Dimensions, ScrollView, Linking } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const SearchBooksScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Utiliza la API de Google Books para buscar libros
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        const books = data.items.map((book) => ({
          title: book.volumeInfo.title,
          coverUrl: book.volumeInfo.imageLinks?.thumbnail,
          key: book.id,
        }));
        setSearchResults(books);
      })
      .catch((error) => {
        console.error('Error al buscar libros', error);
      });
  };

 

  // Dividir los resultados en filas de tres elementos
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const resultsChunks = chunkArray(searchResults, 3);

  return (
    <ImageBackground
      source={require('../assets/Screen2.png')}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Buscar Libros</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el título del libro"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button
          title="Buscar"
          onPress={handleSearch}
        />
        <ScrollView>
          {resultsChunks.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item) => (
                <View style={styles.bookContainer} key={item.key}>
                  <Image
                    style={styles.coverImage}
                    source={{ uri: item.coverUrl }}
                  />
                  <Text style={styles.resultText}>{item.title}</Text>
                  <Button
                    title="Leer"
                    onPress={() => {
                      Linking.openURL(`https://books.google.com?id=${item.key}`);
                    }}
                  />
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
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
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookContainer: {
    width: screenWidth / 3 - 20, // Ajusta el ancho para tres elementos por fila
    alignItems: 'center',
    marginBottom: 20, // Espacio vertical entre las filas de libros
  },
  coverImage: {
    width: 100,
    height: 150,
  },
  resultText: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SearchBooksScreen;
