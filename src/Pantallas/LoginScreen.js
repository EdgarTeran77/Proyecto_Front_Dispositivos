import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateUserScreen from './CreateUserScreen'; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.237.37:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          contraseña: contraseña,
        }),
      });
      const data = await response.json();
      console.log('Data:', data); // Aquí se imprime el contenido de 'data'
      if (response.ok) {
        // Guarda el token de acceso en AsyncStorage
        await AsyncStorage.setItem('accessToken', data.access_token);
  
        // Guarda el ID de usuario en AsyncStorage
        await AsyncStorage.setItem('userId', data.user_id.toString());
  
        // Verifica si el usuario ha completado sus gustos
        if (data.gustos_completados) {
          // Redirige al usuario a la página de inicio
          navigation.navigate('TabNavigator');
        } else {
          // Redirige al usuario a la pantalla de selección de gustos
          navigation.navigate('SeleccionGustosScreen', { userId: data.user_id });
        }
      } else {
        console.error('Error:', data.message);
        // Maneja errores de inicio de sesión aquí
      }
    } catch (error) {
      console.error('Error:', error);
      // Maneja errores de red u otros errores aquí
    }
  };

  const handleRegister = () => {
    // Navegar al componente CreateUserScreen al hacer clic en el botón de registro
    navigation.navigate('CreateUserScreen1');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, { color: 'rgba(242,69,53,255)' }]}>E</Text>
        <Text style={[styles.logoText, { color: 'rgba(36,198,205,255)' }]}>Ui!</Text>
      </View>
      <View style={styles.containerimg}>
        <Image source={require('../../images/in.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Correo</Text>
          <View style={styles.input}>
            <Icon name='mail' size={20} color='black' style={styles.icon} />
              <TextInput
                placeholder="Ingresa el correo"
                style={styles.textInput}
                onChangeText={text => setCorreo(text)} 
              />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <View style={styles.input}>
            <Icon name='lock' size={20} color='black' style={styles.icon} />
            <TextInput
              placeholder="Ingresa la contraseña"
              style={styles.textInput}
              onChangeText={text => setContraseña(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.googleButtonContainer}>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../../images/buscar.png')}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 2,
    marginTop:"20%"
  },
  logoText: {
    fontSize: 38,
  },
  inputContainer: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: 'black',
    marginBottom: 5,
    color: 'rgba(152, 156, 156, 0.5)',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(209, 213, 214, 1)',
    backgroundColor: 'rgba(209, 213, 214, 0.2)',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: 'rgba(10, 31, 108, 1)',
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: 'rgba(147,157,175,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 2,
    marginBottom: 5,
  },
  registerButton: {
    backgroundColor: 'rgba(147,157,175,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  googleButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:"25%"
  },
  googleButtonText: {
    fontSize: 16,
    color: 'rgba(147,157,175,0.8)',
  },
  containerimg: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default LoginScreen;
