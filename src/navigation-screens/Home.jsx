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
// import MyButton from './MyButton';

const Home = ( {navigation} ) => {
  return (
    <LinearGradient colors={['#E6E6FA', '#43328B']}
    locations={[0.01, 1]}
    style={styles.gradient}>
    <View style={styles.container}>
    {/* <Image source={require('./assets/img/first.png')} style={styles.logo} /> */}
      <Text style={{fontSize:30, fontWeight:'light'}}>SecuResidences </Text>
      <First/>
      {/* <Button title='Get Started' onPress={()=> navigation.navigate('Login') } style={styles.Button}/> */}
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>     Get Started     </Text>
        </TouchableOpacity>
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
  paddingHorizontal: 40,
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
  width: 200, // Adjust width as needed
  height: 100, // Adjust height as needed
  resizeMode: 'contain', // Ensures the image maintains aspect ratio
  marginBottom: 20,
},
});
