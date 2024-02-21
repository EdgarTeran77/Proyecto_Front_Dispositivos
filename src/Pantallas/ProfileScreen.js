<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../Componentes/Header';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await fetch('http://192.168.237.37:5001/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserData(userData);
          // Obtener la imagen del perfil desde los datos del usuario
          if (userData.imagen_base64) {
            setProfileImage(`data:image/jpeg;base64,${userData.imagen_base64}`);
          }
        } else {
          console.error('Error al obtener los datos del usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      const response = await fetch('http://192.168.0.100:5001/logout', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigation.navigate('LoginScreen');
        console.log('Sesión cerrada exitosamente');
      } else {
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Icon name="user" size={50} color="white" />
          </View>
        )}
        {userData ? (
          <Text style={styles.userName}>{userData.nombre} {userData.apellido}</Text>
        ) : (
          <Text>Cargando datos del usuario...</Text>
        )}
      </View>
      <Text style={styles.text1}>CUENTA</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="user" size={24} color="black" />
          <Text style={styles.optionText}>Información de cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="edit" size={24} color="black" />
          <Text style={styles.optionText}>Editar gustos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="notification" size={24} color="black" />
          <Text style={styles.optionText}>Notificaciones y configuración</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginBottom: 20,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text1: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    alignItems:'center',
    top:"-2%",
    left:"3%"
  },
=======
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            {/* Foto de perfil */}
            <View style={styles.profileContainer}>
                <View style={styles.profileImage}></View>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Nombre del Usuario</Text>
                    <Text style={styles.date}>Fecha</Text>
                </View>
            </View>

            {/* Cuenta */}
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Cuenta</Text>
            </TouchableOpacity>

            {/* Detalles personales */}
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Detalles Personales</Text>
                <Text style={styles.subOptionText}>Información y Permisos</Text>
            </TouchableOpacity>

            {/* Configuraciones */}
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Configuraciones</Text>
                <Text style={styles.subOptionText}>Privacidad</Text>
                <Text style={styles.subOptionText}>Idioma</Text>
                <Text style={styles.subOptionText}>Ayuda y Soporte</Text>
            </TouchableOpacity>

            {/* Cerrar Sesión */}
            <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Cerrar Sesión</Text>
                <Text style={styles.subOptionText}>Borrar Cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    profileContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gray', // Placeholder color
    },
    profileInfo: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
        marginTop: 5,
    },
    option: {
        marginBottom: 20,
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subOptionText: {
        fontSize: 16,
        marginLeft: 20,
    },
>>>>>>> 01000e3d0c2ede1a536e874e7d3691766d9d7179
});

export default ProfileScreen;


