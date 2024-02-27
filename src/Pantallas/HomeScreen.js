import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'; // Importa Image desde react-native
import Header from '../Componentes/Header';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Importa Picker una sola vez

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Inicializa selectedEvent
  const mapViewRef = useRef(null);

  useEffect(() => {
    getLocation();
    fetchEventos();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const parseCoordinates = (coordinatesString) => {
    const [latitude, longitude] = coordinatesString.split(',').map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  };

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://192.168.100.21:5001/eventos/futuros'); 
      console.log('Respuesta de eventos:', response.data); // Imprime la respuesta en la consola
      setEventos(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching eventos:', error);
      setLoading(false);
      // Agregar manejo de error para mostrar un mensaje al usuario
      alert('Error al cargar los eventos. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  
  const handleEdit = (evento) => {
    console.log("estoy aplastando");
    navigation.navigate('EventDetailsScreen', { evento });
    setSelectedEvent(evento); // Actualiza el estado de selectedEvent con el evento seleccionado
  };

  const handleNavigateToClosestEvent = async () => {
    if (!userLocation || !selectedEvent) return;

    handleEdit(selectedEvent);

    const route = await getRoute(userLocation.coords, parseCoordinates(selectedEvent.lugar));
    setRouteCoordinates(route);
  };

  const calculateDistance = (coords1, coords2) => {
    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distancia en kilómetros
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const getRoute = async (origin, destination) => {
    try {
      const apiKey = 'AIzaSyDQrzaG8L8FH4KT_rt0uXgqUhZUiqYSR1k';
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;
      const response = await axios.get(url);
      if (response.data && response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0].overview_polyline.points;
        const decodedRoute = decodePolyline(route);
        return decodedRoute;
      } else {
        console.error('Invalid response from Google Maps API');
        return [];
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      return [];
    }
  };

  const decodePolyline = (encoded) => {
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;
    const path = [];
    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
      lng += dlng;
      path.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return path;
  };

  const handleCenterToUserLocation = async () => {
    if (userLocation && mapViewRef.current) {
      const { latitude, longitude } = userLocation.coords;
      mapViewRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0922,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <Text>Cargando eventos...</Text>
      ) : (
        <View style={styles.mapContainer}>
          <Picker
            selectedValue={selectedEvent}
            onValueChange={(itemValue, itemIndex) => setSelectedEvent(itemValue)}
          >
            {eventos.map(evento => (
              <Picker.Item key={evento.id} label={evento.nombre} value={evento} />
            ))}
          </Picker>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            initialRegion={{
              latitude: userLocation?.coords.latitude || 0,
              longitude: userLocation?.coords.longitude || 0,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0922,
            }}
          >
            {userLocation && (
              <Marker
                coordinate={{
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                }}
                title="Mi Ubicación"
              />
            )}
            
            {eventos.map(evento => (
              <Marker
                key={evento.id}
                coordinate={parseCoordinates(evento.lugar)}
                title={evento.nombre}
                onPress={() => handleEdit(evento)} // Agrega esta línea para actualizar selectedEvent
              >
                <Callout>
                  <CustomCallout evento={evento} onPressEdit={() => handleEdit(evento)} />
                </Callout>
              </Marker>
            ))}

            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#FF0000"
                strokeWidth={3}
              />
            )}
          </MapView>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleNavigateToClosestEvent}>
        <Text style={styles.buttonText}>Ir al evento</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerButton} onPress={handleCenterToUserLocation}>
        <Text style={styles.centerButtonText}>Centrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomCallout = ({ evento, onPressEdit }) => {
  return (
    <View style={styles.calloutContainer}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.calloutTitle}>{evento.nombre}</Text>
        <Text style={styles.calloutDescription}>{evento.descripcion}</Text>

        {/* Mostrar la imagen si está disponible */}
        {evento.foto_base64 && (
          <Image source={{ uri: `data:image/jpeg;base64,${evento.foto_base64}` }} style={styles.image} />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPressEdit} style={styles.button}>
            <Text style={styles.buttonText}>Ver</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 200, 
    maxHeight: 300, 
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutDescription: {
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: '100%', 
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centerButton: {
    position: 'absolute',
    top: 660,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 5,
  },
  centerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: { // Estilos para la imagen
    width: 180,
    height: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default HomeScreen;
