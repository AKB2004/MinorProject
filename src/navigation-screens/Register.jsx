import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Import eye icon
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  return (
    <LinearGradient
          colors={['#E6E6FA', '#43328B']}
          locations={[0.01, 1]}
          style={styles.gradient}
        >
    <View>
      <Text style={{fontSize:30, justifyContent:'center'}}>Register</Text>
    </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
    gradient: {
      flex: 1, // Full screen gradient
      justifyContent: 'center',
      alignItems: 'center',
    },
});
export default Register;
