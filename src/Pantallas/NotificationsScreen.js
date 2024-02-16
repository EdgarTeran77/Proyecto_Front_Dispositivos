import React from 'react';
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


export default NotificationsScreen;



