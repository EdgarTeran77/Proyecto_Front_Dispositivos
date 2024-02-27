import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../Componentes/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";


const CreateEventScreen = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [descripcion, setDescripcion] = useState('');
  const [lugar, setLugar] = useState('');
  const [coordenadas, setCoordenadas] = useState({
    latitude: -0.198023,
    longitude: -78.503415,
  });
  const [imageUri, setImageUri] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [confirmacion, setConfirmacion] = useState('');

  useEffect(() => {
    obtenerToken();
  }, []);

  const obtenerToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoordenadas({ latitude, longitude });
    setLugar(`${latitude}, ${longitude}`);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setFecha(currentDate);
    setShowDatePicker(false);
  };

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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('fecha', fecha.toISOString());
      formData.append('descripcion', descripcion);
      formData.append('lugar', lugar);
      if (imageUri) {
        const localUri = imageUri;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('imagen', { uri: localUri, name: filename, type });
      }
  
      const response = await axios.post('http://192.168.100.21:5001/eventos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      console.log('Respuesta del servidor (evento):', response.data);
  
      const notificacionData = {
        mensaje: 'Se ha creado un nuevo evento',
      };
  
      console.log('Datos de la notificación:', notificacionData);
  
      const notificacionResponse = await axios.post('http://192.168.100.21:5001/notificaciones', notificacionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      console.log('Respuesta del servidor (notificación):', notificacionResponse.data);
  
      setConfirmacion('Evento creado exitosamente.');
      Alert.alert('Evento Publicado', 'Tu evento ha sido publicado exitosamente.');
  
    } catch (error) {
      console.error('Error al enviar el evento:', error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.titulo}>Crea un Evento</Text>
        <View style={styles.formContainer}>
          <Text>Nombre del Evento:</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <Text>Fecha:</Text>
          <Text style={styles.dateText} onPress={() => setShowDatePicker(true)}>
            {fecha.toLocaleDateString()}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fecha}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text>Descripción:</Text>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            multiline={true}
            style={styles.input}
          />
          <Text>Lugar:</Text>
          <TextInput
            value={lugar}
            onChangeText={setLugar}
            editable={false}
            style={styles.input}
          />
        </View>
        
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordenadas.latitude,
              longitude: coordenadas.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            <Marker
              coordinate={coordenadas}
              title="Ubicación del evento"
            />
          </MapView>
        </View>
        <Text style={styles.tex}>Selecciona Imagen:</Text>
          <View style={styles.imageContainer}>
                <TouchableOpacity onPress={seleccionarFoto} style={styles.button}>
                <MaterialIcons name="photo-camera" size={29} color="white" />
                </TouchableOpacity>
                <View style={styles.foto}>
                  {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
                </View>
          </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Crear evento</Text>
        </TouchableOpacity>
        <View style={styles.pad}/>
      </View>

      {showImagePicker && (
        <TouchableOpacity
          style={styles.imagePickerOverlay}
          onPress={() => setShowImagePicker(false)} 
        >
          <TouchableOpacity
            style={styles.imagePickerContent}
            activeOpacity={1}
          >
            <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
            <TouchableOpacity
              onPress={seleccionarFoto}
              style={styles.imagePickerButton}
            >
              <Text style={styles.imagePickerButtonText}>Galería</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      {confirmacion ? (
        <View style={styles.confirmacionContainer}>
          <Text style={styles.confirmacionText}>{confirmacion}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    top:'5%'
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
    height:'45%'
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10,
    padding: 5,
    borderRadius:4,
    backgroundColor:'rgba(0,0,0,0.08)'
  },
  mapContainer: {
    width: '88%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    paddingBottom:'5%',
    top:'-12%'
  },
  map: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor:'rgba(0,0,0,0.1)',
    width:"89%",
    borderRadius:19,
    padding:'15%',
    top:'-28%'
  },
  button: {
    backgroundColor: 'rgba(249, 144, 3, 0.8)',
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 10,
    right:'28%',
  },
  previewImage: {
    width: 125,
    height: 125,
    borderRadius: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50.5 }, { translateY: -52.5 }],
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width:'95%',
    top:'-13%'
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems:'center',
    fontWeight: 'bold',
    textAlign:'center',
  },
  tex: {
    right:"26%",
    top:'-12%'
  },
  foto: {
    padding:'5%',
    borderColor:'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderRadius:5,
    height:'160%',
    alignItems:'center',
    width:'68%',
    right:'10%'
  },
  pad:{
    paddingBottom:'8%'
  },
  hee:{
    height:'20%',
    top:'0.58%',
    backgroundColor:'red'
  },
  titulo:{
    fontSize:25,
    paddingBottom:'6%'
  },
  imagePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  imagePickerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  dateText: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10,
    padding: 5,
    borderRadius:4,
    backgroundColor:'rgba(0,0,0,0.08)'
  },
  confirmacionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmacionText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateEventScreen;
