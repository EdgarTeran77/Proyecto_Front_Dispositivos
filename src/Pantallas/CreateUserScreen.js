import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const seleccionarFoto = async () => {
    let permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      Alert.alert('Permiso denegado', 'No se puede acceder a la galería de fotos');
      return;
    }

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.cancelled) {
      if (resultado.assets && resultado.assets.length > 0) {
        setImageUri(resultado.assets[0].uri);
      }
    }
  };

  const enviarImagen = async () => {
    if (imageUri) {
      try {
        let formData = new FormData();
        formData.append('imagen', {
          name: 'upload.jpg',
          type: 'image/jpeg',
          uri: imageUri,
        });

        const response = await fetch('http://192.168.0.103:5001/subir-imagen', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (response.ok) {
          Alert.alert('Imagen subida', 'La imagen se ha subido correctamente al servidor');
        } else {
          throw new Error('Error al subir la imagen al servidor');
        }
      } catch (error) {
        console.error('Error de red:', error);
        Alert.alert('Error', 'No se pudo subir la imagen al servidor');
      }
    } else {
      console.log('No se seleccionó ninguna imagen.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Seleccionar Foto" onPress={seleccionarFoto} />
      <Button title="Subir Imagen" onPress={enviarImagen} />
    </View>
  );
}
