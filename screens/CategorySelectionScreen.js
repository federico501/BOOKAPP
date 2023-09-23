import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const CategorySelectionScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    // Función para alternar la selección de categorías
    if (selectedCategories.includes(category)) {
      // Si la categoría ya está seleccionada, quítala de la lista
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      // Si la categoría no está seleccionada, agrégala a la lista
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const categories = ['Ficción', 'No Ficción', 'Misterio', 'Ciencia Ficción', 'Romance', 'Aventura', 'Poesía'];

  return (
    <ImageBackground
      source={require('../assets/Screen3.png')} // Ruta de la imagen de fondo
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Selecciona tus Categorías Favoritas:</Text>
        <View style={styles.categoryList}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategories.includes(category) && styles.selectedCategoryButton,
              ]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: 'blue',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CategorySelectionScreen;
