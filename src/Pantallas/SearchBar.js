import React from 'react';
import { StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ slideUpValue, handleSearchToggle }) => {
  return (
    <Animated.View style={[styles.searchContainer, { transform: [{ translateY: slideUpValue }] }]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar dirección..."
        placeholderTextColor="gray"
        autoFocus={true}
      />
      <TouchableOpacity style={styles.closeButton} onPress={handleSearchToggle}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default SearchBar;
