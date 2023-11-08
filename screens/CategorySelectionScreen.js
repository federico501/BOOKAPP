import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const CategorySelectionScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const db = getFirestore(); // Obtén una referencia a Firestore

  // Obtén las categorías seleccionadas del usuario desde Firestore
  useEffect(() => {
    const loadSelectedCategories = async () => {
      try {
        const userDocRef = doc(db, 'usuarios', 'ID_DEL_USUARIO'); // Reemplaza 'ID_DEL_USUARIO' con el ID real del usuario
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.selectedCategories) {
            setSelectedCategories(userData.selectedCategories);
          }
        }
      } catch (error) {
        console.error('Error al cargar las categorías seleccionadas:', error);
      }
    };

    loadSelectedCategories();
  }, []);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      // Si la categoría ya está seleccionada, quítala de la lista
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      // Si la categoría no está seleccionada, agrégala a la lista
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleHome = async () => {
    try {
      const userDocRef = doc(db, 'categorias', 'ID_DEL_USUARIO'); // Reemplaza 'ID_DEL_USUARIO' con el ID real del usuario

      // Actualiza las categorías seleccionadas en Firestore
      // await setDoc(userDocRef, { selectedCategories }, { merge: true });

      navigation.replace('Home');
    } catch (error) {
      console.error('Error al actualizar las categorías seleccionadas:', error);
    }
  };


  const categories = ['Ficción', 'Filosofía', 'Misterio', 'Economia', 'Romance', 'Aventura', 'Poesía'];

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
          <TouchableOpacity style={styles.button} onPress={ handleHome}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
        <Text>Categorías seleccionadas: {selectedCategories.join(', ')}</Text>
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
    padding: 50,
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
    color: 'white',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'right',
  },
});

export default CategorySelectionScreen;
