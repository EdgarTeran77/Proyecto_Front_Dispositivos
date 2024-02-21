import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons'; // Importa Ionicons también
import Header from '../Componentes/Header';

const EventosScreen = ({ navigation }) => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://192.168.237.37:5001/eventos/futuros');
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

    fetchEventos();
  }, []);

  const categorias = [
    { nombre: 'Deportes', color: '#FF6347', icono: 'sports-club' },
    { nombre: 'Música', color: '#6495ED', icono: 'music' },
    { nombre: 'Cine', color: '#32CD32', icono: 'video' },
    { nombre: 'Cultura', color: '#FFA500', icono: 'emoji-flirt' },
    { nombre: 'Gastronomía', color: '#9370DB', icono: 'restaurant' }, // Cambiado a 'restaurant' de Ionicons
    { nombre: 'Tecnología', color: '#1E90FF', icono: 'tablet-mobile-combo' },
    // Agrega más categorías según sea necesario
  ];

  const handleVerMasEventos = () => {
    console.log('Ver Más Eventos');
    // Acción a realizar al presionar "Ver Más Eventos"
  };

  const renderEvento = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.eventoContainer}
        onPress={() => navigation.navigate('DetalleEvento', { evento: item })}
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
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <ScrollView horizontal contentContainerStyle={styles.container4} showsHorizontalScrollIndicator={false}>
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
      <Text style={styles.title}>Eventos Futuros</Text>
      <View style={styles.container3}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <FlatList
            data={eventos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderEvento}
            numColumns={2}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    backgroundColor: 'white',
    height: '18%',
    position: 'absolute',
    top: '15%',
  },
  container3: {
    backgroundColor: 'white',
    height: '59%',
    top: '20%',
  },
  container4: {
    backgroundColor: 'white',
    height: '160%',
    top: '7%',
    marginBottom: '3%',
    marginTop: '1%',
    padding: '2%',
    paddingTop: '4%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    top: '19%',
    left: '5%',
  },
  eventoContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: 'white',
    marginTop: '3%',
    top: '1%',
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
    height: '42%',
    borderRadius: 5,
    flexDirection: 'row', // Para alinear el icono y el texto horizontalmente
    alignItems: 'center', // Para alinear el contenido verticalmente
    top: '3%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5, // Espacio entre el icono y el texto
  },
  icono: {
    marginRight: 5, // Espacio entre el borde del botón y el icono
  },
  fondoNaranja: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventosScreen;
