import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import SearchBar from '../Pantallas/SearchBar';

const HomeScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const mapRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const slideUpValue = useRef(new Animated.Value(100)).current; // Inicializar en posición oculta

  useEffect(() => {
    getLocation();
    loadFacultiesCoordinates();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  const loadFacultiesCoordinates = () => {
    const faculties = [
      { latitude: -0.217994, longitude: -78.513437, title: 'Facultad de Ingeniería Civil' },
      { latitude: -0.218120, longitude: -78.511750, title: 'Facultad de Ciencias Económicas' },
      { latitude: -0.216550, longitude: -78.512818, title: 'Facultad de Ciencias Naturales' },
    ];
    setCoordinates(faculties);
  };

  const handleCenterMap = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    Animated.timing(slideUpValue, {
      toValue: isSearching ? 100 : 0, // Mostrar u ocultar el componente de búsqueda
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.coords.latitude : 0,
          longitude: userLocation ? userLocation.coords.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        customMapStyle={lightMapStyle}>
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            title={coordinate.title}
            pinColor="red"
          />
        ))}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
          >
            <Ionicons name="location" size={40} color="rgba(250, 214, 34, 1)" />
          </Marker>
        )}
      </MapView>
      <SearchBar
        slideUpValue={slideUpValue}
        handleSearchToggle={handleSearchToggle}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchToggle}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerButton} onPress={handleCenterMap}>
        <Ionicons name="locate" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const lightMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#D7E6C8',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#BABCAA',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchButton: {
    position: 'absolute',
    bottom: 20, // Cambiar la posición de arriba a abajo
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    position: 'absolute',
    bottom: 90, // Ajustar la posición para que no se solape con la barra de búsqueda
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
