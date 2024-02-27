import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../Componentes/Header';
import Icon from 'react-native-vector-icons/AntDesign'; // Importar el icono de AntDesign
import MapView, { Marker } from 'react-native-maps'; // Importar MapView y Marker desde react-native-maps

const EventDetailsScreen = ({ route }) => {
  const { evento } = route.params;

  // Verificar si evento es null
  if (!evento) {
    return (
      <View style={styles.container}>
        <Text>No se ha seleccionado ningún evento.</Text>
      </View>
    );
  }

  // Separar las coordenadas en latitud y longitud
  const [latitud, longitud] = evento.lugar.split(',').map(coord => parseFloat(coord.trim()));

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Header />
        {/* Verificar si hay una imagen disponible, si no, mostrar un espacio con un icono */}
        {evento.foto_base64 ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${evento.foto_base64}` }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Icon name="picture" size={100} color="gray" />
            <Text>Sin imagen</Text>
          </View>
        )}
        <View style={styles.contenedornom}>
          <Text style={styles.title}>{evento.nombre}</Text>
        </View>
        <View style={styles.mapContainer}>
          {/* Mapa con las coordenadas marcadas */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitud,
              longitude: longitud,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: latitud,
                longitude: longitud,
              }}
              title={evento.nombre}
            />
          </MapView>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.label}>Fecha:</Text>
            <Text>{evento.fecha}</Text>
            <Text style={styles.label}>Lugar:</Text>
            <Text>{evento.lugar}</Text>
          </View>
        </View>
        <View style={styles.contentContainer2}>
          <View style={styles.content}>
            <Text style={styles.label}>Descripción:</Text>
            <Text>{evento.descripcion}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contenedornom: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center', 
    top:'-3%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '-20%',
    textAlign: 'center',
    marginBottom:"2%"
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    top: '-2%',
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 200,
  },
  content: {
    padding: 34,
    width: '88%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    borderRadius: 8,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contentContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  map: {
    width: '100%',
    height: 200,
  },
});

export default EventDetailsScreen;
