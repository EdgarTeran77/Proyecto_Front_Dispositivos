import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import Header from '../Componentes/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SeleccionGustosScreen = ({ navigation }) => {
  const [gustos, setGustos] = useState([]);
  const [gustosSeleccionados, setGustosSeleccionados] = useState([]);
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID de usuario

  useEffect(() => {
    obtenerGustos();
    obtenerUserId(); // Obtener el ID de usuario al cargar la pantalla
  }, []);

  const obtenerUserId = async () => {
    try {
      const userIdFromStorage = await AsyncStorage.getItem('userId');
      setUserId(userIdFromStorage);
    } catch (error) {
      console.error('Error al obtener el ID de usuario:', error);
    }
  };

  const obtenerGustos = async () => {
    try {
      const response = await axios.get('http://192.168.100.21:5001/gustos');
      setGustos(response.data);
    } catch (error) {
      console.error('Error al obtener los gustos:', error);
    }
  };

  const toggleSeleccionGusto = (gustoId) => {
    if (gustosSeleccionados.includes(gustoId)) {
      setGustosSeleccionados(gustosSeleccionados.filter(id => id !== gustoId));
    } else {
      setGustosSeleccionados([...gustosSeleccionados, gustoId]);
    }
  };

  const guardarGustos = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      // Verificar si se pudo obtener el ID de usuario
      if (!userId) {
        throw new Error('ID de usuario no disponible');
      }

      const response = await axios.post(
        'http://192.168.100.21:5001/guardar-gustos',
        {
          usuario_id: userId, // Utilizar el ID de usuario obtenido
          gustos: gustosSeleccionados
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);
      Alert.alert('Gustos guardados exitosamente');
      navigation.navigate('TabNavigator');
    } catch (error) {
      console.error('Error al guardar los gustos:', error);
      Alert.alert('Error al guardar los gustos. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    console.log('Gustos seleccionados actualizados:', gustosSeleccionados);
  }, [gustosSeleccionados]);

  const renderGusto = (item) => (
    <TouchableOpacity key={item.id} onPress={() => toggleSeleccionGusto(item.id)}>
      <View style={[styles.gustoContainer, gustosSeleccionados.includes(item.id) && styles.gustoSeleccionado]}>
        <Text style={styles.nombreGusto}>{item.nombre}</Text>
        <Text style={styles.descripcionGusto}>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
        <Header />
        <Text style={styles.title}>Selecciona tus gustos:</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {gustos.map((gusto) => (
            <View key={gusto.id} style={styles.gustoItem}>
              {renderGusto(gusto)}
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal style={styles.scrollViewHorizontal}>
        <View style={styles.gustosSeleccionadosContainer}>
          {gustosSeleccionados.map((gustoId) => {
            const gusto = gustos.find((item) => item.id === gustoId);
            return (
              <View key={gusto.id} style={styles.gustoSeleccionadoItem}>
                <Text style={styles.nombreGusto}>{gusto.nombre}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.botonGuardar} onPress={guardarGustos}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor:'white'
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  gustoItem: {
    width: '48%',
    marginBottom: 20,
    
  },
  gustoContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,1)',
    borderRadius: 5,
    
  },
  gustoSeleccionado: {
    backgroundColor: '#AED581', 
  },
  nombreGusto: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descripcionGusto: {
    color: '#666',
  },
  scrollViewHorizontal: {
    maxHeight: 130,
    marginTop: 0,
    padding:'3%',
    height:'11%',
    borderColor:'black',
    borderTopWidth: 1,
    
  },
  gustosSeleccionadosContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    height:'120%',
    paddingBottom:'-15%',
    height:'87%',
    marginBottom:'-18%'
  },
  gustoSeleccionadoItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'white',
    
  },
  title: {
    fontSize: 20,
    margin:'6%',
    alignSelf: 'flex-start'
  },
  botonGuardar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 80,
    paddingVertical: 15,
    paddingHorizontal: 30,
    height:"6%",
    bottom:"9%"
    
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SeleccionGustosScreen;
