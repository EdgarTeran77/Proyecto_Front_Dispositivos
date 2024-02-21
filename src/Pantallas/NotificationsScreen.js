import React from 'react';
<<<<<<< HEAD
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

=======
import { View, Text, SectionList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de importar el icono correcto


const CustomHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}></Text>
        </View>
    );
};

const CustomHeader2 = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                <Icon name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notificaciones</Text>
        </View>
    );
};
const DATA = [
    {

        title: "Hoy",
        data: [
            { id: '1', description: "Descripción de la notificación 1 de hoy", imageUri: "https://tu-imagen.com/imagen1.jpg" },
            { id: '2', description: "Descripción de la notificación 2 de hoy", imageUri: "https://tu-imagen.com/imagen2.jpg" }
        ]
    },
    {
        title: "Ayer",
        data: [
            { id: '3', description: "Descripción de la notificación 1 de ayer", imageUri: "https://tu-imagen.com/imagen3.jpg" },
            { id: '4', description: "Descripción de la notificación 2 de ayer", imageUri: "https://tu-imagen.com/imagen4.jpg" }
        ]
    }
];

const NotificationsScreen = () => {

    return (
        <View style={styles.container}>
            <CustomHeader />
            <CustomHeader2 />
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.imageUri }} style={styles.image} />
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    containerNot: {
        flex: 0,
        justifyContent: 'flex-end',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    description: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        backgroundColor: "#fff",
        padding: 8,
        fontWeight: 'bold'
    },
    headerContainer: {
        flex: 0,
        height: 60, // Ajusta esto según tus necesidades
        backgroundColor: '#7C00FF', // Un azul genérico, ajusta según tu tema
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10, // Ajusta la altura del encabezado según necesites
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});


>>>>>>> 01000e3d0c2ede1a536e874e7d3691766d9d7179
export default NotificationsScreen;



