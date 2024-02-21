import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { EvilIcons } from '@expo/vector-icons';
import HomeScreen from './Pantallas/HomeScreen';
import EventsScreen from './Pantallas/EventsScreen';
import CreateEventScreen from './Pantallas/CreateEventScreen';
import NotificationsScreen from './Pantallas/NotificationsScreen';
import ProfileScreen from './Pantallas/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const EventsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Events" component={EventsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const CreateEventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const NotificationsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      tabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 15,
        backgroundColor: 'white',
        height: 70,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
      }
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: '', 
        tabBarIcon: ({ color }) => (
          <Image
            source={require('../images/in.png')}
            style={{ width: 50, height: 50, marginTop: 10 }}
          />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="Events"
      component={EventsStack}
      options={{
        tabBarLabel: 'Eventos',
        tabBarIcon: ({ color }) => (
          <EvilIcons name="calendar" size={40} color={'red'} />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="Create"
      component={CreateEventStack}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <Image
            source={require('../images/mas.png')}
            style={{ width: 40, height: 40, marginTop: 10 }}
            resizeMode="contain"
          />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationsStack}
      options={{
        tabBarLabel: 'Notificaciones',
        tabBarIcon: ({ color }) => (
          <EvilIcons name="bell" size={40} color={'orange'} />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ color }) => (
          <EvilIcons name="user" size={40} color={'green'} />
        ),
        headerShown: false
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
