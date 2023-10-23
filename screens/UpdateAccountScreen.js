import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage'; // Importa funciones relacionadas con Firebase Storage
import appFirebase from '../credential'; // Importa tu configuración de Firebase

const UpdateAccountScreen = () => {
  const [userName, setUserName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Función para cargar el nombre de usuario desde Firestore
    const loadUserName = async () => {
      try {
        const db = getFirestore(appFirebase);
        const userDocRef = doc(db, 'Usuario', 'ID_DEL_USUARIO'); // Reemplaza 'ID_DEL_USUARIO' con el ID real del usuario
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserName(userData.name); // Actualiza el estado con el nombre del usuario
        }
      } catch (error) {
        console.error('Error al cargar el nombre de usuario:', error);
      }
    };

    loadUserName();
  }, []);

  const handleSelectImage = () => {
    // Configuración para el selector de imágenes
    const options = {
      title: 'Seleccionar una imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Muestra el selector de imágenes
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // El usuario canceló la selección de imágenes
      } else if (response.error) {
        // Ocurrió un error al seleccionar la imagen
      } else {
        // Imagen seleccionada exitosamente
        setSelectedImage(response.uri);
      }
    });
  };

  const handleSaveImage = async () => {
    if (selectedImage) {
      try {
        const db = getFirestore(appFirebase);
        const userDocRef = doc(db, 'Usuario', 'ID_DEL_USUARIO'); // Reemplaza 'ID_DEL_USUARIO' con el ID real del usuario

        // Carga la imagen seleccionada a Firestore Storage
        const imageBlob = await fetch(selectedImage).then((response) => response.blob());
        const imageRef = `images/${Timestamp.now().toMillis()}.jpg`; // Ruta para guardar la imagen en Firestore Storage

        // Sube la imagen a Firestore Storage
        const storageRef = ref(appFirebase.storage(), imageRef);
        await uploadBytes(storageRef, imageBlob);

        // Actualiza el documento del usuario con la URL de la imagen
        await setDoc(userDocRef, { profileImage: imageRef }, { merge: true });

        // Limpiar la selección de imagen
        setSelectedImage(null);

        // Mensaje de éxito
        alert('Imagen guardada con éxito en Firestore');

      } catch (error) {
        console.error('Error al guardar la imagen en Firestore:', error);
      }
    } else {
      alert('Por favor, selecciona una imagen antes de guardarla.');
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        name,
        email,
        age,
        phone,
      };

      const db = getFirestore(appFirebase);
      const userDocRef = doc(db, 'Usuario', 'ID_DEL_USUARIO'); 

      // Actualiza los datos del usuario en Firestore
      await setDoc(userDocRef, updatedData, { merge: true });

      alert('Información actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      alert('Hubo un error al actualizar la información. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Screen3.png')}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.userName}>Bienvenido, {userName}</Text>
      </View>


      <View style={styles.content}>
        <Text style={styles.title}>Actualizar Cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          onChangeText={text => setAge(text)}
          value={age}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          onChangeText={text => setPhone(text)}
          value={phone}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Actualizar Información</Text>
        </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  selectImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  selectImageText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  saveImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
  },
  saveImageText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateAccountScreen;
