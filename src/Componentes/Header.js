import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../../images/in.png')} style={styles.headerImage} />
      <Text style={styles.headerText}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(243,67,54,255)' }}>E</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(36,198,205,255)' }}>Ui!</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: "100%",
    height: "9%",
    marginTop:"10%",
    backgroundColor:"rgba(255,255,255,255)"
  },
  headerImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: "55%"
  },
});

export default Header;
