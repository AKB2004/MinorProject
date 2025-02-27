import { View, Text,StyleSheet } from 'react-native';
import React from 'react';

const First = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>A Smart Hostel Management App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: 'center',
      marginTop:-10,
      marginBottom:50,
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'black', // Custom color
      textAlign: 'center',
    },
  });

export default First;
