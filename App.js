import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Pantallas/LoginScreen';
import HomeScreen from './src/Pantallas/HomeScreen';
import TabNavigator from './src/Navigation';
import CreateUserScreen from './src/Pantallas/CreateUserScreen'; 
import SeleccionGustosScreen from './src/Pantallas/GustosScreen';
import CreateUserScreen1 from './src/Pantallas/CreateUserScreen1'; 
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SeleccionGustosScreen" component={SeleccionGustosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUserScreen1" component={CreateUserScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" options={{headerShown: false}}>
          {() => <TabNavigator />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
