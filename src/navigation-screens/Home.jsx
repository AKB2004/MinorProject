/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import First from './First';
import LinearGradient from 'react-native-linear-gradient';
// import Pic from './Pic';
// import MyButton from './MyButton';

const Home = ( {navigation} ) => {
  return (
    <LinearGradient colors={['#E6E6FA', '#43328B']}
    locations={[0.01, 1]}
    style={styles.gradient}>
    <View style={styles.container}>
    <Image source={require('../../assets/img/first.png')} style={styles.img}/>
      <First/>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>       Get Started       </Text>
        </TouchableOpacity>
        {/* <Pic/> */}
    </View>
    </LinearGradient>
  );
};

export default Home;
const styles = StyleSheet.create({
  gradient:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    alignItems:'center',
    // top:350,
},
// Button:{
//     textAlign:'center',
// },
button: {
  backgroundColor: '#43328B',
  paddingVertical: 12,
  paddingHorizontal: 70,
  borderRadius: 8,
  marginTop: 35,
},
buttonText: {
  color: 'white', // Text color
  fontSize: 19,
  fontWeight: 'bold',
  textAlign: 'center',
},
logo: {
  width: 200,
  height: 100,
  resizeMode: 'contain',
  marginBottom: 20,
},
img: {
  width:300,
  height:150,
},
});
