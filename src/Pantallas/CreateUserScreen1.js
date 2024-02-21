import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(true);

  const navigation = useNavigation();

  const checkEmailAvailability = async () => {
    try {
      const response = await axios.post('http://192.168.100.21:5001/check-email', { correo });
      const { message } = response.data;
      setEmailAvailable(message === 'El correo electrónico está disponible');
    } catch (error) {
      console.error('Error al verificar disponibilidad del correo electrónico:', error);
    }
  };

  useEffect(() => {
    if (correo) {
      checkEmailAvailability();
    }
  }, [correo]);

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
  
  console.log(password);

  const signUp = async () => {
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
  
    if (!emailAvailable) {
      Alert.alert('Error', 'El correo electrónico ya está en uso.');
      return;
    }
  
    if (!image) {
      Alert.alert('Error', 'Por favor, selecciona una imagen.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('correo', correo);
      formData.append('telefono', telefono);
      formData.append('password', password);
      formData.append('cedula', cedula);
      formData.append('imagen', {
        uri: image,
        name: 'image.jpg', // Nombre de archivo para la imagen
        type: 'image/jpeg', // Tipo de archivo para la imagen
      });

      console.log(formData);
  
      const response = await axios.post('http://192.168.100.21:5001/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Alert.alert('Registro exitoso', '¡Tu cuenta ha sido creada exitosamente!');
      navigation.navigate('LoginScreen');
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar la información:', error);
      Alert.alert('Error', 'Hubo un problema al registrar tu cuenta. Por favor, inténtalo nuevamente más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear una cuenta</Text>
      <View style={styles.inputContainer_cuadro}>
        <View style={styles.inputContainer}>
          <Ionicons name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="user" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="idcard" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Cédula"
            value={cedula}
            onChangeText={setCedula}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="black" style={styles.icon} />
          <TextInput
            style={[styles.input, !emailAvailable && styles.inputError]} 
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="phone" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock1" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eyeo'} size={24} color="black" style={styles.icon2} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock1" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Repetir contraseña"
            secureTextEntry={!showRepeatPassword}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
          <TouchableOpacity onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
            <Ionicons name={showRepeatPassword ? 'eye' : 'eyeo'} size={24} color="black" style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttoncontent}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Seleccionar de la galería</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signUp} disabled={!emailAvailable}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    color: 'rgba(0, 0, 0 ,0.9)'
  },
  icon2: {
    marginRight: 10,
    color: 'rgba(0, 0, 0 ,0.7)',
    position:'absolute',
    top:'-30%',
    right:'20%',
    padding:'15%'
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(209, 213, 214, 1)',
    backgroundColor: 'rgba(209, 213, 214, 0.5)',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
    width:'92%'
  },
  title: {
    fontSize: 25,
    margin:'6%'
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor:'rgba(147,157,175,0.5)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 2,
    width:'100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  containerimg: {
    alignItems: 'center',
    marginTop:'-11%'
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer_cuadro:{
    padding:'8%',
    backgroundColor:'rgba(241, 241, 241 ,0.9)',
    borderRadius: 20
  },
  buttoncontent:{
    padding:'2%',
    borderRadius: 0,
    width:'105%'
  }
});

export default SignUpScreen;
