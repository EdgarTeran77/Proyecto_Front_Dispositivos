import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationsScreen = ({ navigation }) => {
  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch('http://192.168.100.21:5001/notificaciones', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotificationsData(data.notificaciones);
      } else {
        console.error('Error fetching notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.mensaje}</Text>
    </TouchableOpacity>
  );

  if (!notificationsData || notificationsData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Notificaciones</Text>
        <Text>No hay notificaciones por ver.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Notificaciones</Text>
      <FlatList
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
    marginTop:10
  },
  notificationList: {
    paddingVertical: 10,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
});

export default NotificationsScreen;
