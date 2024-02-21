import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa DateTimePicker
import Header from '../Componentes/Header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

const CreateEventScreen = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(new Date()); // Establece la fecha inicial
  const [descripcion, setDescripcion] = useState('');
  const [lugar, setLugar] = useState('');
  const [coordenadas, setCoordenadas] = useState({
    latitude: -0.198023, // Latitud de un punto conocido o la ubicación actual del dispositivo
    longitude: -78.503415, // Longitud de un punto conocido o la ubicación actual del dispositivo
  });
  const [aprobado, setAprobado] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false); // Variable para mostrar/ocultar el DatePicker
  const [image, setImage] = useState(null); // Estado para almacenar la imagen seleccionada

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoordenadas({ latitude, longitude });
    setLugar(`Latitud: ${latitude}, Longitud: ${longitude}`);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios'); // Oculta el DatePicker en iOS al seleccionar una fecha
    setFecha(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la galería de imágenes y la cámara.');
      }
    }
  };

  const pickImage = async () => {
    await getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('Resultado de la selección de imagen:', result);
  
    if (!result.cancelled) {
      if (result.assets && result.assets[0].uri) {
        setImage(result.assets[0].uri);
        console.log('URI de la imagen seleccionada:', result.assets[0].uri);
      } else {
        console.log('La URI de la imagen seleccionada es nula.');
      }
    } else {
      console.log('La selección de imagen fue cancelada.');
    }
  };

  const handleSubmit = () => {
    // Aquí puedes enviar los datos del evento al servidor
    console.log('Nombre:', nombre);
    console.log('Fecha:', fecha);
    console.log('Descripción:', descripcion);
    console.log('Lugar:', lugar);
    console.log('Coordenadas:', coordenadas);
    console.log('Aprobado:', aprobado);
    if (image) {
      console.log('Imagen seleccionada:', image);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.hee}>
      <Header />
      </View>
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
          <TextInput
            value={fecha.toLocaleDateString()} // Muestra la fecha en formato legible
            onFocus={showDatepicker}
            style={styles.input}
          />
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
            multiline
            style={styles.input}
          />
          <Text>Lugar:</Text>
          <TextInput
            value={lugar}
            onChangeText={setLugar}
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
              description={lugar}
            />
          </MapView>
        </View>
        <Text style={styles.tex}>Selecciona Imagen:</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={pickImage}
          >
            <MaterialIcons name="photo-camera" size={29} color="white" />
            
          </TouchableOpacity>
          <View style={styles.foto}>
          {image && <Image source={{ uri: image }} style={styles.previewImage} />}
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
    top:'-45%'
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
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
    overflow: 'hidden', // Para asegurar que los bordes redondeados se apliquen correctamente
    paddingBottom:'5%'
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

  },
  button: {
    backgroundColor: 'rgba(249, 144, 3, 0.8)',
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 10,
    right:'28%',
    

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewImage: {
    width: 125,
    height: 125,
    borderRadius: 10,
    position: 'absolute', // Cambiado de relativa a absoluta
    top: '50%', // Posiciona la imagen en el centro verticalmente
    left: '50%', // Posiciona la imagen en el centro horizontalmente
    transform: [{ translateX: -50.5 }, { translateY: -52.5 }],
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width:'95%',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems:'center',
    fontWeight: 'bold',
    textAlign:'center'
  },
  tex: {
    right:"26%"
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
    paddingBottom:'12%'
  },
  hee:{
    height:'55%',
    top:'0.58%',
  },
  titulo:{
    fontSize:25,
    paddingBottom:'6%'
  }
});

export default CreateEventScreen;
