import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const NotificationsScreen = () => {
  // Datos de ejemplo para las notificaciones
  const notificationsData = [
    { id: 1, title: 'Notificación 1', message: 'Este es un mensaje de la notificación 1' },
    { id: 2, title: 'Notificación 2', message: 'Este es un mensaje de la notificación 2' },
    { id: 3, title: 'Notificación 3', message: 'Este es un mensaje de la notificación 3' },
  ];

  // Renderizar cada elemento de la lista de notificaciones
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text>{item.message}</Text>
    </TouchableOpacity>
  );

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
