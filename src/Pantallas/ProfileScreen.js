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
});

export default ProfileScreen;


