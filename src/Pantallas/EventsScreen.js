import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Componentes/Header';
import { useFocusEffect } from '@react-navigation/native';

const EventosScreen = ({ navigation }) => {
  const [eventos, setEventos] = useState([]);
  const [eventosRecomendados, setEventosRecomendados] = useState([]);
  const [loadingEventosRecomendados, setLoadingEventosRecomendados] = useState(true);

  const fetchEventos = async () => {
    try {
      const response = await fetch('http://192.168.100.21:5001/eventos/futuros');
      if (response.ok) {
        const data = await response.json();
        setEventos(data);
      } else {
        console.error('Error al obtener los eventos futuros:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los eventos futuros:', error);
    }
  };

  const fetchEventosRecomendados = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch('http://192.168.100.21:5001/recommend-events/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEventosRecomendados(data.recommended_events);
      } else {
        console.error('Error al obtener los eventos recomendados:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los eventos recomendados:', error);
    } finally {
      setLoadingEventosRecomendados(false); // Marcar la carga de eventos recomendados como completada
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEventos();
      fetchEventosRecomendados();
    }, [])
  );

  const categorias = [
    { nombre: 'Deportes', color: '#FF6347', icono: 'sports-club' },
    { nombre: 'Música', color: '#6495ED', icono: 'music' },
    { nombre: 'Cine', color: '#32CD32', icono: 'video' },
    { nombre: 'Cultura', color: '#FFA500', icono: 'emoji-flirt' },
    { nombre: 'Gastronomía', color: '#9370DB', icono: 'restaurant' },
    { nombre: 'Tecnología', color: '#1E90FF', icono: 'tablet-mobile-combo' },
  ];

  const handleVerMasEventos = () => {
    console.log('Ver Más Eventos');
  };

  const handleVerDetalleEvento = (evento) => {
    navigation.navigate('EventDetailsScreen', { evento });
  };

  const renderEvento = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.eventoContainer}
        onPress={() => handleVerDetalleEvento(item)}
      >
        {item.imagen ? (
          <Image source={{ uri: item.imagen }} style={styles.eventoImagen} />
        ) : (
          <View style={[styles.eventoImagen, styles.fondoNaranja]}>
            <Entypo name="calendar" size={40} color="white" />
          </View>
        )}
        <Text style={styles.eventoNombre}>{item.nombre}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.section}>
        <Text style={styles.title}>Categorías</Text>
        <ScrollView horizontal contentContainerStyle={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
          {categorias.map((categoria, index) => (
            <TouchableOpacity key={index} style={[styles.button, { backgroundColor: categoria.color }]}>
              {categoria.icono === 'restaurant' ? (
                <Ionicons name={categoria.icono} size={24} color="white" style={styles.icono} />
              ) : (
                <Entypo name={categoria.icono} size={24} color="white" style={styles.icono} />
              )}
              <Text style={styles.buttonText}>{categoria.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Eventos Recomendados</Text>
        {loadingEventosRecomendados ? ( // Mostrar indicador de carga si los eventos recomendados se están cargando
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView horizontal contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
            {eventosRecomendados.map((evento, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.eventoContainer}
                onPress={() => handleVerDetalleEvento(evento)}
              >
                {evento.imagen ? (
                  <Image source={{ uri: evento.imagen }} style={styles.eventoImagen} />
                ) : (
                  <View style={[styles.eventoImagen, styles.fondoNaranja]}>
                    <Entypo name="calendar" size={40} color="white" />
                  </View>
                )}
                <Text style={styles.eventoNombre}>{evento.nombre.length > 20 ? evento.nombre.substring(0, 20) + '...' : evento.nombre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Eventos Futuros</Text>
        <FlatList
          data={eventos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderEvento}
          numColumns={2} // Cambiado a 2 para mostrar dos columnas
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  eventoContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  eventoImagen: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  eventoNombre: {
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  icono: {
    marginRight: 5,
  },
  fondoNaranja: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventosScreen;
